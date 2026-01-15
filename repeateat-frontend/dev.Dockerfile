FROM node:24.12

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]