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
# docker run -it <image> ls
# docker exec -it node /bin/sh
# cd public
# touch new.html
# exit

# 6. create image from container
# docker commit node marcus/node:2.0

# 7. run container from new image
# docker run --rm -d -it --name node2 -v $(pwd):/usr/src/app -p 80:8080 marcus/node:2.0 npm start

# 7a. FAILED TO save volumes inside -> Dockerfile
# docker build --tag marcus/node:1.0 .
# docker run --rm -d -it --name node2 -v $(pwd)/public:/usr/src/app/public -p 3000:8080 marcus/node:1.0 npm start

# 8. add to Docker Hub repository
# docker push marcus/node:2.0

# 9. save image to tar
# docker save --output marcus-node-2.0.0.tar marcus/node:2.0
# docker load --input marcus-node-2.0.0.tar
# (`docker save` an image or `docker export` a container. This will output a tar file to standard output, so you will like to do something like docker save 'dockerizeit/agent' > dk.agent.latest.tar. Then you can use `docker load` or `docker import` in a different host.)

# 10. run container from loaded image
# docker run -e -p 8080 marcus/node:2.0
# docker port 

# deploy to cloud (AWS ECS)
# https://docs.docker.com/get-started/part2/
# https://docs.docker.com/engine/context/aci-integration/
# https://docs.docker.com/engine/context/ecs-integration/

# AWS ECS
# Docker not only runs multi-container applications locally, but also enables developers to seamlessly deploy Docker containers on Amazon ECS using a Compose file with the docker compose up command. The following sections contain instructions on how to deploy your Compose application on Amazon ECS.
# docker context create ecs webdevecscontext
# docker context ls
# docker context use webdevecscontext
# docker-compose up
# docker-compose down

# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html
# aws ecr create-repository --repository-name webdev-repository --region us-west-2
# docker tag marcus/node:2.0 aws_account_id.dkr.ecr.us-west-2.amazonaws.com/webdev-repository/node:2.0
# aws ecr get-login | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.us-west-2.amazonaws.com
# docker push aws_account_id.dkr.ecr.us-west-2.amazonaws.com/webdev-repository
# aws ecr delete-repository --repository-name webdev-repository --region us-west-2 --force
# https://console.aws.amazon.com/ecs/home#/firstRun

# docker login azure
# docker context create aci webdevacicontext
# docker --context webdevacicontext run -p 80:8080 marcus/node:2.0
# docker --context webdevacicontext run -p 80:80 nginx