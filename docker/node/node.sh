# 1. check Node version
# docker run --rm --name node -v $(pwd):/usr/src/app -p 3000:3000 -e NODE_ENV=production node:13-alpine node -v

# 2. run server in Docker
# docker run --rm -d -it --name node -v $(pwd):/usr/src/app -p 3000:8080 -e PORT=8080 -e SERVER_NAME=Docker -e NODE_ENV=production -w /usr/src/app node:13-alpine node server.js

# 3. run npm script in Docker
docker run --rm -d -it --name node -v $(pwd):/usr/src/app -p 3000:8080 -e PORT=8080 -e SERVER_NAME=Docker -e NODE_ENV=production -w /usr/src/app node:13-alpine npm start

# 4. run server on host
# export PORT=80 && export SERVER_NAME=Host && node server.js

# 5. SSH into container
# docker ps
# docker run -it node ls
# docker exec -it node /bin/sh
# cd public
# touch new.html
# exit

# 6. create image from container
# docker commit node marcus/node:2.0

# 7. run container from new image
# docker run --rm -d -it --name node2 -v $(pwd):/usr/src/app -p 80:8080 marcus/node:2.0 npm start

# 8. add to Docker Hub repository
# docker push marcus/node:2.0