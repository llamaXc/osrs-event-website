FROM node:16.13-alpine3.14

WORKDIR /workspace

ADD . .

RUN ["npm", "install"]

CMD ["npm", "run", "start"]