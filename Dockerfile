# stage 1
FROM node:11-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# stage 2: the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]