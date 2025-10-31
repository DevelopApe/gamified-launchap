# Production deployment notes

This document lists recommended steps and considerations to move this project from local development into a production deployment.

1) Back up your data
   - Create a full dump/backup of your Strapi/Postgres database before migrating. Use `pg_dump` or snapshot the volume.
   - Backup any uploaded files stored in `strapi/public/uploads`.

2) Build immutable images
    - Use the provided production Dockerfiles (multi-stage) and the example compose file `docker-compose.prod.example.yml` as a template.
    - Copy the example to a local file that won't be committed (ignored by .gitignore):
       - `cp docker-compose.prod.example.yml docker-compose.prod.yml`
    - Update domains, passwords, and variables in your local `docker-compose.prod.yml`.
    - Build and run:
       - `docker compose -f docker-compose.prod.yml build`
       - `docker compose -f docker-compose.prod.yml up -d`

3) Database
   - In production, use a managed Postgres or a standalone Postgres container with persistent volumes.
   - Ensure correct credentials and restrict network access.
   - Run migrations if your stack needs them, and run data seeds if required.

4) Environment variables and secrets
   - Do NOT store secrets in the repository. Use environment variables, Docker secrets, or your hosting provider's secret manager.
   - Prepare `.env.production` locally for testing (do not commit) and load it securely in production.

5) Traefik / reverse proxy
   - The production compose file expects a Traefik network called `traefik` (external). Deploy Traefik as the edge router and attach it to the same network.
   - Configure Traefik to use HTTP -> HTTPS redirection, Let's Encrypt (certresolver) and required middlewares.
   - Replace placeholder host rules (`example.com`, `strapi.example.com`) in your local `docker-compose.prod.yml` with your real domains.

6) File uploads & media
   - Use an object storage (S3, MinIO) in production or ensure the uploads volume is backed up and shared between replicas.

7) Backups & monitoring
   - Schedule regular DB backups and snapshots of volumes.
   - Add logging and monitoring (Prometheus, Grafana, or a hosted provider).

8) CI/CD
   - Build and push images in CI; deploy with tags and use health checks and rolling updates.

9) Scaling & zero-downtime
   - Run multiple instances behind Traefik if needed; store sessions externally and use a shared database and storage.

10) Post-deploy checklist
   - Verify environment variables and DB connectivity.
   - Check file uploads, auth, and any third-party APIs.
   - Run smoke tests on the public site and admin panel.

11) Rollback plan
   - Keep a tested rollback plan (database restore and previous image tags) in case of issues.

If you want, I can expand any section with exact commands or a CI/CD example (GitHub Actions/GitLab CI) to automate builds and deployments.
