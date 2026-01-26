FROM node:24.12

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY repeateat-backend/package.json ./repeateat-backend/
COPY repeateat-frontend/package.json ./repeateat-frontend/

RUN npm install

COPY . .

WORKDIR /usr/src/app/repeateat-frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]