// const http = require('http')
// const server = http.createServer((request, response) => {
//     response.write('hi')
//     response.end()
// })

// server.listen(3000, () => console.log('Server started.'))
const fs = require('fs')
const scriptJs = fs.readFileSync('D:/andrey/gitHub/training-server/script.js')
// const dir = fs.readdirSync('D:/andrey/gitHub/training-server')

// const dirObj = dir.reduce((obj, name) => {
//     obj[name] = {'@name' : name, 
//                  '@dir' : fs.statSync('D:/andrey/gitHub/training-server/' + name).isDirectory()}
//     return obj
// } , {})

function structure(path) {
    return fs.readdirSync(path).reduce((obj, name) => {
        const isDir = fs.statSync(path + '/' + name).isDirectory()
        obj[name] = {'@name': name, '@dir': isDir}
        //if (isDir) Object.assign(obj[name], structure(path + '/' + name))
        if (isDir) obj[name] = {...obj[name], ...structure(path + '/' + name)}
        return obj
    } , {})
}

const dirObj = structure('D:/andrey/gitHub/training-server')



require('http').createServer((request, response) => {
    if (request.url == '/script.js') return response.end(scriptJs)
    if (request.url == '/index.html') return response.end('<script src="script.js"></script>' + new Date)
    if (request.url == '/hi') return response.end('hello')
    if (request.url == '/bye') return response.end('Goodbye')
    if (request.url == '/dir') return response.end('<style>div {margin-left:10px;} div div{display:none;}</style>' + render(dirObj))
    response.write('I\'m running.')
    response.end()
}).listen(3000, () => console.log('Server started.'))

// structure = {
//     '@name': 'training-server',
//     '@type': 'dir',
//     '.gitignore': {
//         '@name': '.gitignore',
//         '@type': 'file',
//     },
//     'index.js': {
//         '@name': 'index.js',
//         '@type': 'file',
//     },
//     'package.json': {
//         '@name': 'package.json',
//         '@type': 'file',
//     },
//     'people': {
//         '@name': 'people',
//         '@type': 'dir',
//         'people.js': {
//             '@type': 'file',
//         },
//         'Person.js': {
//             '@type': 'file',
//         }
//     },
// }

function render(structure){
    var html = ''
    for (var name in structure){
        if (name.startsWith('@')) continue
        html += '<div>'
        const isDir = structure[name]['@dir']
        if (isDir) html += '<b onclick="this.parentNode.querySelectorAll(\'div\').forEach(div=>div.style.display=\'block\')" >'
        html += name
        if (isDir) {
            html += '</b>'
            html += render(structure[name])
        }
        html += '</div>'
    }
    return html
}