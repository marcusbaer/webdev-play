# Select reference image
FROM node:13-alpine

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app

# Copy project files into the docker image
COPY package.json package.json
COPY .eslintignore .eslintignore
COPY .eslintrc.json .eslintrc.json
COPY .stylelintrc .stylelintrc
COPY bundlesize.config.json bundlesize.config.json
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js
COPY webpack.config.js webpack.config.js

# Install app dependencies
RUN npm set progress=false && npm install

VOLUME /usr/src/app/.storybook
VOLUME /usr/src/app/dist
VOLUME /usr/src/app/public
VOLUME /usr/src/app/src
VOLUME /usr/src/app/webpack-utils

EXPOSE 3000

# run dev environment
CMD ["npm", "start"]
