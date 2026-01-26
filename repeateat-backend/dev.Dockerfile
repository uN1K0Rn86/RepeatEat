FROM node:24.12-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY repeateat-backend/package.json ./repeateat-backend/
COPY repeateat-frontend/package.json ./repeateat-frontend/

RUN npm install

COPY . .

EXPOSE 3000

WORKDIR /usr/src/app/repeateat-backend

CMD ["npm", "run", "dev"]