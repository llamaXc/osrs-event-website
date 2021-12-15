FROM node:16.13-alpine3.14

WORKDIR /workspace

ADD . .

RUN ["npm", "install"]
RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]