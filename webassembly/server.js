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
    } else if (req.url.length > 1) {
      const filePath = './public' + req.url
      const ext = req.url.split('.').pop()
      const contentTypes = {
        'css': 'text/css',
        'html': 'text/html; charset=utf-8',
        'ico': 'image/ico',
        'jpg': 'image/jpeg',
        'js': 'application/js',
        'json': 'application/json',
        'png': 'image/png',
        'wasm': 'application/wasm'
      }
      fs.readFile(filePath, (error, content) => {
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' })
        res.end(content, 'utf-8')
      })
    } else {
        res.writeHead(302, { 'Location': '/index.html' })
        res.end()
    }
  })
  .listen(port, () => {
    console.log(`Running server '${name}' on port ${port}.`)
  })
