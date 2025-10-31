## Multi-stage Dockerfile for Strapi (works for dev and production)
## Stages:
##  - base    : base image
##  - deps    : install dependencies (cached by lockfile)
##  - builder : build the application
##  - runner  : runtime image (non-root)

FROM node:18-alpine AS base
WORKDIR /srv/app
RUN corepack enable || true

FROM base AS deps
# glibc compat and other minimal packages if needed by native deps
RUN apk add --no-cache libc6-compat
WORKDIR /srv/app

# Copy lockfiles and package.json (and any scripts used by lifecycle hooks)
# We copy only what's needed for dependency install so Docker can cache this layer
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY scripts ./scripts

# Install dependencies depending on available lockfile. Prefer yarn, then npm, then pnpm.
RUN if [ -f yarn.lock ]; then \
			yarn install --frozen-lockfile --production=false; \
		elif [ -f package-lock.json ]; then \
			npm ci --no-audit --no-fund; \
		elif [ -f pnpm-lock.yaml ]; then \
			npm install -g pnpm && pnpm i --frozen-lockfile; \
		else \
			npm install --no-audit --no-fund; \
		fi

FROM base AS builder
WORKDIR /srv/app
# Reuse installed node_modules from deps stage
COPY --from=deps /srv/app/node_modules ./node_modules
# Copy the rest of the source
COPY . .

# Build for production (ok if it fails for dev images)
ENV NODE_ENV=production
RUN if [ -f package.json ]; then npm run build || true; fi

FROM node:18-alpine AS runner
WORKDIR /srv/app
ENV NODE_ENV=production

# create a non-root user
RUN addgroup -S strapi && adduser -S -G strapi strapi

# Copy built app from builder
COPY --from=builder /srv/app .

# Ensure uploads folder exists and correct ownership
RUN mkdir -p /srv/app/public/uploads && chown -R strapi:strapi /srv/app

USER strapi

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD curl -f http://localhost:1337/_health || exit 1

# Default command runs in production; docker-compose.dev.yml can override to `npm run develop`
CMD ["npm", "run", "start"]
