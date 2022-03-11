FROM node:12.22.1-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY [".", "."]

RUN mkdir backups

CMD [ "npm", "start" ]