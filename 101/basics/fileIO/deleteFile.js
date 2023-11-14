const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "./test.txt");

// we can either use writeFile for creating a file in a non-blocking wy, or writeFileSync for a blocking way; it'll block Node.js event loop.
// or use fs.appendFile or appendFileSync if you want to append to an existing file, rather than creating a new one/overwriting an old one.
fs.writeFile(filePath, "hi world", 'utf8', (err) => err && console.log(err)); // pass the file's path and its name, pass the file's data, pass the encoding, pass a callback and check if err is not null/undefined, then print it.

setTimeout(() => {
    if (fs.existsSync(filePath)) { // prefer fs.access() and fs.stat() since they are better for async file existence checking.

        fs.unlink(filePath, (err) => { // use fs.rm() to delete files instead, since it's a unified new node.js api for both file/directory deletion
            if (err) console.log("error is "+err);
            else console.log("successfully deleted "+ filePath);
        });
    
    } else {
        console.log("file does not exist")
    }
}, 3000);