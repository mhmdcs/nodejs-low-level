const http = require('http');
const fs = require('fs');

// the act of creating readable streams to read data and then writable streams to write that data turned out to be so common in Node.js they've given us a more elagent approach for this known as "pipes".
// it's all quite manual this whole process of "creating both a readable stream and a writable stream, listening to blocks of data (buffers) on the readable stream, then passing each block of data to the writable stream".
// a pip can help us do the same exact thing, take data from a readable stream and then pipe it to a writable stream, instaed of manually listening for the .on('data') event when we receive a block of data, the pipe just automatically does that for us;
 
const server = http.createServer(function(request, response) {
    const readableStream = fs.createReadStream(__dirname + "/loremIpsum.txt"); // we should use path.join instead, also we could optionally also pass "utf8" or "ascii", since by default this stream will only emit/produce raw buffer bytes, if we want to read them, we have to encode the memory blocks, we could also set the buffer size with config option object { highWaterMark: 900000 } to set the buffer to 900KB, the default size for buffers (chunks) is 64KB (65,536 bytes)
    const writableStream = fs.createWriteStream(__dirname + "/writmeLorem.txt");

    readableStream.pipe(writableStream); // write the readable stream to a file by piping it to a writable stream

    response.writeHead(200, { 'Content-Type': 'text/plain'});
    readableStream.pipe(response); // we'll also write the readable stream, bceause the response is a writable stream
});

server.listen(3000);