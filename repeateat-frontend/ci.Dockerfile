FROM node:24.12

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY repeateat-frontend/package-lock.json ./repeateat-frontend/
COPY shared/package-lock.json ./shared/
COPY repeateat-backend/package-lock.json ./repeateat-backend/
COPY shared/package.json ./shared/
COPY repeateat-backend/package.json ./repeateat-backend/
COPY repeateat-frontend/package.json ./repeateat-frontend/

RUN npm ci

COPY . .

WORKDIR /usr/src/app/repeateat-frontend

EXPOSE 4173

CMD ["sh", "-c", "npm run build && npm run preview -- --host 0.0.0.0"]