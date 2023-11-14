const fs = require('fs');

let buffer = fs.readFileSync("./readme.txt"); // blocking file read call (notice the Sync postfixed to the function name)
// any code below this function will not be executed until this entire file is read, if it was a very long file, then we would be blocking the main thread, which is bad.

console.log(buffer.toString('utf8')); // even if we didn't pass utf-8 encoding, it's used by default, but it's good to be explicit with charset encodings

fs.writeFileSync('writeme.txt', "just writing some extra text!");
buffer = fs.readFileSync("./writeme.txt");
console.log(buffer.toString('utf8'));