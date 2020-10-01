const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 8080
const name = process.env.SERVER_NAME || 'default server'

http
  .createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    console.log(req.url)

    if (req.method === 'POST') {
      let data = []
      req.on('data', chunk => {
        data.push(chunk)
      })
      req.on('end', () => {
        const post = data
          .toString()
          .split('&')
          .reduce((acc, curr) => {
            const [key, value] = curr.split('=')
            acc[key] = value

            return acc
          }, { name, time: Date() })
        
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(post), 'utf-8')
      })
    } else if (req.url === '/tutorial/submit') {
        res.writeHead(302, { 'Location': '/tutorial/' })
        res.end()
    } else if (req.url === '/tutorial/kill') {
      res.write(`<h1>You killed me!</h1><p>My name was <em>${name}</em>.</p>`)
      res.end()
      process.exit()
    } else if (req.url.length > 1) {
      const filePath = './public/tutorial' + req.url
      fs.readFile(filePath, (error, content) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(content, 'utf-8')
      })
    } else {
      res.write(
        `<h1>Hello World!</h1><p>I am <em>${name}</em>.</p><p>It's ${Date()}.</p><p><a href="./formular.html">Open form</a></p>`
      )
      res.end()
    }
  })
  .listen(port, () => {
    console.log(`Running server '${name}' on port ${port}.`)
  })
