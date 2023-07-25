FROM node:20.5.0-alpine3.17

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "src/index.js" ]