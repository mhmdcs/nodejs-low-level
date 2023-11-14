const fs = require('fs');
const path = require('path');

fs.mkdirSync("stuff");

setTimeout(() => fs.rmdirSync("stuff", { recursive: true }), 3000); // use fs.rm() to delete directory instead, since it's a unified new node.js api for both file/directory deletion
// for testing we delete the directory after 3 seconds of creating it, also, we pass in the recursive: true configuration option so that in case if the directory contains files, the files within it are also deleted