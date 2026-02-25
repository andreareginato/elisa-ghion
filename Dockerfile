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

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
COPY ./server.js /app/server.js
COPY ./scripts /app/scripts
COPY ./app/data /app/app/data
COPY ./app/db /app/app/db
COPY ./app/lib /app/app/lib
COPY ./drizzle /app/drizzle
COPY ./drizzle.config.ts /app/drizzle.config.ts
WORKDIR /app

ENV DATABASE_PATH=/data/site.db
ENV UPLOAD_DIR=/data/uploads
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
