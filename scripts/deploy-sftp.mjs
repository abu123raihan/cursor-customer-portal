/**
 * Hostinger SFTP deploy for cursor-customer-portal main → dev.akfusion.com only.
 * Credentials via env only — never commit secrets.
 *
 * Required: DEPLOY_HOST DEPLOY_PORT DEPLOY_USER DEPLOY_PASS DEPLOY_LOCAL_DIR
 * Optional: DEPLOY_REMOTE_DIR (default domains/dev.akfusion.com/public_html)
 *
 * Strict mapping:
 *   main branch build → https://dev.akfusion.com
 *   API → https://dev-api.akfusion.com
 * Do not use this script against akfusion.com / api.akfusion.com.
 */
import { Client } from "ssh2";
import { createReadStream, readdirSync, statSync } from "node:fs";
import { basename, join, posix, relative, sep } from "node:path";

const host = process.env.DEPLOY_HOST;
const port = Number(process.env.DEPLOY_PORT || "22");
const username = process.env.DEPLOY_USER;
const password = process.env.DEPLOY_PASS;
const localDir = process.env.DEPLOY_LOCAL_DIR;
const remoteHint = process.env.DEPLOY_REMOTE_DIR || "domains/dev.akfusion.com/public_html";

if (!host || !username || !password || !localDir) {
  console.error("Missing DEPLOY_HOST / DEPLOY_USER / DEPLOY_PASS / DEPLOY_LOCAL_DIR");
  process.exit(1);
}

function listFiles(dir) {
  /** @type {string[]} */
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...listFiles(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function toPosixRel(file) {
  return relative(localDir, file).split(sep).join("/");
}

function runRemote(conn, command) {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) {
        reject(err);
        return;
      }
      let stdout = "";
      let stderr = "";
      stream.on("data", (d) => {
        stdout += d.toString();
      });
      stream.stderr.on("data", (d) => {
        stderr += d.toString();
      });
      stream.on("close", (code) => {
        resolve({ code, stdout, stderr });
      });
    });
  });
}

function mkdirp(sftp, dir) {
  return new Promise((resolve, reject) => {
    const parts = dir.split("/").filter(Boolean);
    let cur = dir.startsWith("/") ? "" : ".";
    const next = (i) => {
      if (i >= parts.length) {
        resolve();
        return;
      }
      cur = `${cur}/${parts[i]}`.replace(/^\.\//, "");
      if (!cur.startsWith("/") && dir.startsWith("/")) {
        cur = `/${parts.slice(0, i + 1).join("/")}`;
      } else if (dir.startsWith("/")) {
        cur = `/${parts.slice(0, i + 1).join("/")}`;
      }
      sftp.mkdir(cur, (err) => {
        // ignore exists
        next(i + 1);
      });
    };
    if (dir.startsWith("/")) {
      let built = "";
      const segs = dir.split("/").filter(Boolean);
      const step = (i) => {
        if (i >= segs.length) {
          resolve();
          return;
        }
        built += `/${segs[i]}`;
        sftp.mkdir(built, () => step(i + 1));
      };
      step(0);
      return;
    }
    next(0);
  });
}

function putFile(sftp, local, remote) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(local, remote, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const conn = new Client();
conn
  .on("ready", async () => {
    try {
      const probe = await runRemote(
        conn,
        "pwd; echo ---; ls -la; echo ---; ls -la domains 2>/dev/null || true; echo ---; ls -la public_html 2>/dev/null || true; echo ---; ls -la domains/akfusion.com/public_html 2>/dev/null || true; echo ---; ls -la domains/dev.akfusion.com/public_html 2>/dev/null || true"
      );
      console.log(probe.stdout);
      if (probe.stderr) {
        console.error(probe.stderr);
      }

      let remoteDir = remoteHint;
      if (!remoteDir) {
        remoteDir = "domains/dev.akfusion.com/public_html";
      }
      const allowed = "domains/dev.akfusion.com/public_html";
      if (remoteDir !== allowed && !remoteDir.endsWith("/dev.akfusion.com/public_html")) {
        throw new Error(
          `Refusing deploy to "${remoteDir}". This repo deploys only to ${allowed}.`
        );
      }
      const check = await runRemote(conn, `test -d ${remoteDir} && echo OK:${remoteDir}`);
      if (!check.stdout.includes(`OK:${remoteDir}`)) {
        throw new Error(`Remote dir missing: ${remoteDir}`);
      }
      console.log(`Using remote dir: ${remoteDir}`);

      // Clear default placeholder HTML but keep hidden system files.
      await runRemote(
        conn,
        `cd ${remoteDir} && rm -rf index.html default.php .htaccess brand favicon.png assets media css js chunk-* main-* styles-* 2>/dev/null; true`
      );

      await new Promise((resolve, reject) => {
        conn.sftp(async (err, sftp) => {
          if (err) {
            reject(err);
            return;
          }
          try {
            const files = listFiles(localDir);
            for (const file of files) {
              const rel = toPosixRel(file);
              const remotePath = posix.join(remoteDir, rel);
              const remoteParent = posix.dirname(remotePath);
              await mkdirp(sftp, remoteParent);
              process.stdout.write(`put ${rel}\n`);
              await putFile(sftp, file, remotePath);
            }
            console.log(`Uploaded ${files.length} files to ${remoteDir}`);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });

      const verify = await runRemote(conn, `ls -la ${remoteDir}; test -f ${remoteDir}/index.html && echo INDEX_OK`);
      console.log(verify.stdout);
      if (!verify.stdout.includes("INDEX_OK")) {
        throw new Error("index.html missing after upload");
      }
      conn.end();
      process.exit(0);
    } catch (e) {
      console.error(e);
      conn.end();
      process.exit(1);
    }
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  })
  .connect({
    host,
    port,
    username,
    password,
    readyTimeout: 30000,
    algorithms: {
      // Hostinger shared SSH sometimes needs broader kex/cipher support
    }
  });
