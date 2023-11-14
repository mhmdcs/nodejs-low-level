const fs = require('fs');
const path = require('path');

// this is non-blocking file reading

// To make your script work regardless of the current working directory, you can use the __dirname global variable, which gives you the directory path of the current module (i.e., the asyncFileIO.js file).
// Use __dirname to get the directory of the current script, then construct the path to readme.txt relative to this directory
const readmeTxtFilePath = path.join(__dirname, '../syncFileIO/readme.txt');
const writemeTxtFilePath = path.join(__dirname, './writemeAsync.txt');

// asynchornous file reading; this doesn't block 
fs.readFile(readmeTxtFilePath, 'utf8', (err, data) => {
    if (err) {
        console.log("an error has occurred: " + err);
    } else {
        console.log(data);
        fs.writeFile(writemeTxtFilePath, data, 'utf8', function () {
            if (!err) {
                console.log(data);
            }
        });
    }
});
// if there's code below readFile() here, it would still get executed imemdiately after readFile() returns asynchronously
console.log("testing if i don't get blocked!")