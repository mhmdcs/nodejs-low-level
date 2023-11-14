const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "./test.txt");

if (fs.existsSync(filePath)) { // fs.access() and fs.stat() are better for async file existence checking

    fs.unlink(filePath, (err) => {
        if (err) console.log("error is "+err);
        else console.log("successfully deleted "+ filePath);
    });

} else {
    console.log("file does not exist")
}