FROM node:alpine

COPY package*.json ./

RUN apk add --no-cache bash

RUN npm install

USER node

WORKDIR /home/node/app
