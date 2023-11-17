const http = require('http');

const server = http.createServer(); // we create a server object from nodejs http module, note that Server object extends EventEmitter 

server.on('request', (request, response) => { // request object inherits from ReadableStream, response object inherits from WritableStream (hence writeHead() and end() methods being called on it)
    console.log("request url is "+request.url);
    response.writeHead('200', { 'Content-Type': 'text/plain' });
    response.end('hello world!!!11'); // if we don't call write(), we can just pass data to end() to send it as the response body. Otherwise end() by default without any params just signals to Node.js that both the headers and body have been sent, and the server should consider the message complete.
});

server.listen('3000', '127.0.0.1');

console.log('listening to requests on port 3000 on localhost');