FROM node:14-alpine as build-stage

RUN mkdir -p /home/node/app && chown node:node -R /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build

FROM caddy:alpine
EXPOSE 80
COPY ./caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build-stage /home/node/app/build /srv

CMD nginx -g 'daemon off;'