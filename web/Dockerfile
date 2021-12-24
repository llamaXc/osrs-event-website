FROM node:16.13-alpine3.14
WORKDIR /workspace

ADD package*.json ./

RUN npm install

RUN npm install -D @swc/cli @swc/core

CMD npm run dev