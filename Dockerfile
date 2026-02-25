FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN apk add --no-cache python3 make g++ && npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN apk add --no-cache python3 make g++ && npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build
RUN npx esbuild scripts/seed.ts --bundle --platform=node --format=esm --packages=external --outfile=scripts/seed.mjs

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
COPY ./server.js /app/server.js
COPY --from=build-env /app/scripts/seed.mjs /app/scripts/seed.mjs
COPY ./drizzle /app/drizzle
COPY ./drizzle.config.ts /app/drizzle.config.ts
WORKDIR /app

ENV DATABASE_PATH=/data/site.db
ENV UPLOAD_DIR=/data/uploads
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
