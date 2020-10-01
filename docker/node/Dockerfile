FROM node:13-alpine AS node

ENV PORT=8080
ENV SERVER_NAME=Docker
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY server.js /usr/src/app/server.js
COPY public /usr/src/app/public

RUN cd /usr/src/app && \\
    npm install

EXPOSE 8080

VOLUME [ "/usr/src/app/public" ]

CMD [ "npm", "start" ]

# docker run --rm -d -it --name node -v $(pwd):/usr/src/app -p 3000:8080 -e PORT=8080 -e SERVER_NAME=Docker -e NODE_ENV=production -w /usr/src/app node:13-alpine npm start
