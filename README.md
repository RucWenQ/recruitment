# AI Experiment App (React + Vite + Node API)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run API server:

```bash
npm run server
```

3. Run frontend dev server:

```bash
npm run dev
```

## Qwen API Configuration (Page4 Chat)

1. Create local env file:

```bash
cp server/.env.example server/.env
```

2. Edit `server/.env` and fill:

- `QWEN_API_KEY`: your real key
- `QWEN_MODEL`: default is `qwen-plus`
- `QWEN_BASE_URL`: default DashScope compatible endpoint

Security notes:
- API key is read only on backend (`/api/chat`), never exposed to frontend code.
- `server/.env` is ignored by git, so key will not be pushed to GitHub.

## Recommended Cloud Deployment Method

Use one cloud VM with Docker Compose:
- `web`: Nginx serves Vite build and proxies `/api/*`
- `backend`: Node/Express API stores submissions
- `experiment_data` volume: persistent data for experiment records

This method is simple, reproducible, and easy to migrate.

## Deploy on Cloud VM

Prerequisites:
- Ubuntu 22.04+ (or equivalent Linux)
- Docker + Docker Compose plugin installed
- Ports `80` (and `443` if you add TLS later) opened in firewall/security group

Commands:

```bash
git clone <your-repo-url>
cd recruitment
docker compose up -d --build
```

Check services:

```bash
docker compose ps
curl http://<server-ip>/api/health
```

When successful, participants can access:
- Frontend: `http://<server-ip>/`
- API health: `http://<server-ip>/api/health`

## Data Storage

Submission data is appended to:
- Container path: `/app/server/data/submissions.jsonl`
- Backed by Docker volume: `experiment_data`

Backup example:

```bash
docker run --rm -v recruitment_experiment_data:/data -v $PWD:/backup alpine \
  sh -c "cp /data/submissions.jsonl /backup/submissions-$(date +%F).jsonl"
```

## Production Notes

1. Add HTTPS before real participants (Nginx + certbot, or put a managed HTTPS proxy/CDN in front).
2. Restrict CORS in production by setting `CORS_ORIGIN` to your real domain.
3. Add automated backups for the `experiment_data` volume.
