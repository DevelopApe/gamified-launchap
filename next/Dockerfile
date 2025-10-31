FROM node:18-alpine

WORKDIR /app

# Install dependencies (Corepack + Yarn is required by the project)
RUN corepack enable || true
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy source and build
COPY . .
RUN yarn build

ENV PORT=3000
EXPOSE 3000

CMD ["yarn", "start"]
