import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const production = process.argv.includes("--production");

function parseEnvFile(path) {
  if (!existsSync(path)) {
    return {};
  }

  /** @type {Record<string, string>} */
  const values = {};
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const eq = line.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

const examplePath = resolve(root, ".env.example");
const envPath = resolve(root, ".env");
if (!existsSync(envPath) && existsSync(examplePath)) {
  copyFileSync(examplePath, envPath);
}

const env = {
  ...parseEnvFile(examplePath),
  ...parseEnvFile(envPath),
  ...(production ? parseEnvFile(resolve(root, ".env.production")) : {})
};

const apiBaseUrl =
  (production ? env.API_BASE_URL_PRODUCTION || env.API_BASE_URL : env.API_BASE_URL) ||
  (production ? "/api" : "http://localhost:3000");
const storeHost = env.STORE_HOST || "demo";

const outPath = resolve(root, "src/environments/environment.generated.ts");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(
  outPath,
  `export const environment = {
  production: ${production},
  apiBaseUrl: ${JSON.stringify(apiBaseUrl)},
  storeHost: ${JSON.stringify(storeHost)}
};
`
);
