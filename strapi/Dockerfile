FROM node:18-alpine

WORKDIR /srv/app

# Enable Corepack (yarn v4) if available
RUN corepack enable || true
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy source and build
COPY . .
RUN yarn build || true

EXPOSE 1337

# Run Strapi in development mode by default (change to start in production flavors)
CMD ["yarn", "develop"]
