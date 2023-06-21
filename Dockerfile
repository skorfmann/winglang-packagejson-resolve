FROM node:18-slim

ENV DEBUG="true"

COPY . .

RUN npm install -g winglang@0.21.5
RUN npm ci

ENTRYPOINT ["node", "/foo.mjs"]