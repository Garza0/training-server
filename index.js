// const http = require('http')
// const server = http.createServer((request, response) => {
//     response.write('hi')
//     response.end()
// })

// server.listen(3000, () => console.log('Server started.'))
const fs = require('fs')
const scriptJs = fs.readFileSync('D:\\andrey\\gitHub\\training-server\\script.js')
const dir = fs.readdirSync('D:\\andrey\\gitHub\\training-server')
const isDir = fs.statSync('D:\\andrey\\gitHub\\training-server').isDirectory()
require('http').createServer((request, response) => {
    if (request.url == '/script.js') return response.end(scriptJs)
    if (request.url == '/index.html') return response.end('<script src="script.js"></script>' + new Date)
    if (request.url == '/hi') return response.end('hello')
    if (request.url == '/bye') return response.end('Goodbye')
    if (request.url == '/dir') return response.end()
    response.write('I\'m running.')
    response.end()
}).listen(3000, () => console.log('Server started.'))

