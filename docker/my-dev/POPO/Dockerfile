# Select reference image
FROM node:13-alpine

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app

# Copy project files into the docker image
COPY package.json package.json
COPY .babelrc .babelrc
COPY rollup.config.js rollup.config.js

# Install app dependencies
# RUN npm install -g node-static
RUN npm set progress=false && npm install

# VOLUME /usr/design-system
VOLUME /usr/src/app/public
VOLUME /usr/src/app/src

# Make port 3000 available
# EXPOSE 3000

# run rollup in watch mode
CMD ["npm", "run", "dev"]
