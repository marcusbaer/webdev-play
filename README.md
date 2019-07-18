## Web.Dev Play

### Start

#### Development

```
npm install
npm run start:dev
```

#### Build the project

```
npm run build
```

#### Run from static build

```
npm start
```

Running with `npm start` requires a global installation of NPM package `node-static`.

### Deploy

Deploy to Now.sh with command `now`.

Deployment requires to have Now CLI installed globally: `npm i -g now`.

To quickly start a new project, run the following commands:

```
now init        # Pick an example project to clone
cd <PROJECT>    # Change directory to the newly created project
now dev         # Run locally during development
now             # Deploy to the cloud
```