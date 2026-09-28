# Deploy mapping (strict)

**cursor-customer-portal `main` → https://dev.akfusion.com only**

| Item | Value |
| --- | --- |
| Website | `https://dev.akfusion.com` |
| Agent API | `https://dev.api.akfusion.com` |
| SSH host | `dev.akfusion.com` (use IP if DNS fails) |
| SSH port | `65002` |
| Remote dir | `domains/dev.akfusion.com/public_html` |

Do **not** deploy this repo’s `main` to `akfusion.com`, and do **not** call `api.akfusion.com` from it.

```
npm run build
# then, with DEPLOY_* env vars set (password never committed):
npm run deploy:dev
```
