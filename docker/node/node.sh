# 1. check Node version
# docker run --rm --name node -v $(pwd):/usr/src/app -p 3000:3000 -e NODE_ENV=production node:13-alpine node -v

# 2. run server in Docker
# docker run --rm -d -it --name node -v $(pwd):/usr/src/app -p 3000:8080 -e PORT=8080 -e SERVER_NAME=Docker -e NODE_ENV=production -w /usr/src/app node:13-alpine node server.js

# 3. run npm script in Docker
docker run --rm -d -it --name node -v $(pwd):/usr/src/app -p 3000:8080 -e PORT=8080 -e SERVER_NAME=Docker -e NODE_ENV=production -w /usr/src/app node:13-alpine npm start

# 4. run server on host
# export PORT=80 && export SERVER_NAME=Host && node server.js
