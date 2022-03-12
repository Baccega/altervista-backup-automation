FROM node:12.22.1-alpine
FROM mcr.microsoft.com/playwright:focal

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY [".", "."]

RUN mkdir backups

CMD [ "npm", "start" ]