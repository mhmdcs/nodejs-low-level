const fs = require('fs');
const path = require('path');

// this is kind of a similar thing to what we did in fileIO, but this time it's different because we're reading a file from a stream
// except when we used fs.readFile and fs.readFileSync, what they did is that they grabbed whole, entirty of all of the data and loaded it into memory, waited for it all to be stored in memory before it fired a callback function in which we got the readable data in one, big piece.
// but using fs.createReadStream here, we're splitting the data into small memory block pieces, and the benefit is that we don't have to wait until all the data is loaded in its entirety; we can start working on it right as the first chunk/block of data arrives in a buffer.

const readableStream = fs.createReadStream(__dirname + "/loremIpsum.txt"); // we should use path.join instead, also we could optionally also pass "utf8" or "ascii", since by default this stream will only emit/produce raw buffer bytes, if we want to read them, we have to encode the memory blocks, we could also set the buffer size with config option object { highWaterMark: 900000 } to set the buffer to 900KB, the default size for buffers (chunks) is 64KB (65,536 bytes)
const writableStream = fs.createWriteStream(__dirname + "/writmeLorem.txt");
// Node.js streams operate in two modes
// Stream Modes: Binary mode (default mode, buffers up to 64KB by default, can be reconfigured by resetting highWaterMark) and object mode (buffers up to 16 objects).
// In binary mode, data is handled in instances of Buffer (or Uint8Array in newer versions of Node.js).
// In binary mode, we can also encoding the binary to strings. If you want to work with strings instead of Buffer objects, you can set the encoding of the stream using readableStream.setEncoding('utf8') or 'ascii'. After this, the stream will emit encoded strings instead of buffers (bytes).
console.log(readableStream.readableHighWaterMark); // outputs 65536 bytes, the default buffer size.

// the chunk/block parameter received in the callback is a buffer (a byte array). These chunks of data are instances of the Buffer class.
readableStream.on('data', function (chunk) { // we read the file, it fills up the buffer, and the buffer passes that chunk on, and every time it passes that chunk of data, it emits it for us to observe
    console.log("new chunk received:");
    console.log(chunk); // a chunk/block of memory. This is a Buffer object.
    writableStream.write(chunk); // we write a block of memory (buffer) we've read from loremIpsum.txt to another file named writmeLorem.txt
});