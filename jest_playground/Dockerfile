FROM node:16.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@8.11.0
RUN npm install

COPY . .

EXPOSE 3000
