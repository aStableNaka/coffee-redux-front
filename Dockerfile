FROM node:14.3.0-alpine AS base
COPY . .
RUN apk add git
RUN npm install -D
CMD npm run init