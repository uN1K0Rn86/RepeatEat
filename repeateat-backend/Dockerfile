FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
COPY repeateat-backend/package*.json ./repeateat-backend/
COPY shared/package*.json ./shared/

RUN npm ci

COPY shared/ ./shared
COPY repeateat-backend/ ./repeateat-backend

WORKDIR /app/shared
RUN npm run build

WORKDIR /app/repeateat-backend
RUN npm run build

FROM node:22-alpine AS prod-stage

WORKDIR /app

COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/repeateat-backend/node_modules ./repeateat-backend/node_modules
COPY --from=build-stage /app/shared ./shared
COPY --from=build-stage /app/repeateat-backend/dist ./repeateat-backend/dist
COPY --from=build-stage /app/repeateat-backend/package*.json ./repeateat-backend/

ENV NODE_PATH=/app/node_modules

EXPOSE 3000
CMD ["node", "repeateat-backend/dist/index.js"]