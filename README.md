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