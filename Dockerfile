# stage 1
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install --include=optional
#RUN npm install @esbuild/linux-arm64
RUN npm install @esbuild/linux-x64
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=build /app/dist/drive-and-fleet-admin-fe/browser /usr/share/nginx/html
RUN apk add --no-cache python3 py3-pip certbot-nginx build-base libressl-dev musl-dev libffi-dev rust cargo
RUN mkdir /etc/letsencrypt

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
