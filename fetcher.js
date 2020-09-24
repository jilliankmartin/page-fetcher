const fs = require('fs');
const request = require('request');

let userInput = process.argv.splice(2)

const fetcher = function(userInput, callback) {
  request(userInput[0], (error, response, body) => {
    if (error) console.log("'Application will terminate now as an error occurred:'", error);
    if (!error) callback(body, userInput[1]);
  }
)};

const writeFile = (body, filename) => {
  fs.writeFile(filename, body , function (err) {
    if (err) throw err;
    let stats = fs.statSync(filename);
    let fileSizeInBytes = stats["size"]
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${userInput[1]}`);
  }); 
};

fetcher(userInput, writeFile);