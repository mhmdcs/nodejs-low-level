const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (request, response) => {
    const filePath = path.join(__dirname, '/index.html');
    const readableStream = fs.createReadStream(filePath);

    response.writeHead(200, { 'Content-Type': 'text/html' } );
    readableStream.pipe(response);
});

server.listen(3000, '127.0.0.1');
console.log('listening to port 3000');