# stage: 1
FROM node:11
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build