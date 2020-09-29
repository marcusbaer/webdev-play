const http = require('http')

const port = process.env.PORT || 8080
const name = process.env.SERVER_NAME || 'default server'

http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.url === '/kill') {
        res.write(`<h1>You killed me!</h1><p>My name was <em>${name}</em>.</p>`)
        res.end()
        process.exit()
    } else {
        res.write(`<h1>Hello World!</h1><p>I am <em>${name}</em>.</p><p>It's ${Date()}.</p>`)
        res.end()
    }

  }).listen(port, () => {
    console.log(`Running server '${name}' on port ${port}.`)
  })