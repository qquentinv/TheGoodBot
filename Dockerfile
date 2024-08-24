FROM node:22-alpine3.20

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "index.js" ]