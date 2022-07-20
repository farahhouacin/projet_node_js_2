const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method } = req;
    console.log(url, method);
})

server.listen(8080);