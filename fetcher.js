//require fs and request
const fs = require('fs');
const request = require('request');

//receive command line args - take a URL as a command-line argument as well as a local file path
let userInput = process.argv.splice(2)

//write a file to the local directory
// const fetcher = function(userInput, callback) {
//   fs.writeFile('mynewfile3.txt', callback , function (err) {
//     if (err) throw err;
//     console.log(`Saved to location: ${userInput[1]}`);
//   });
// };

// const returnBody = () => {
//   request(userInput[0], (error, response, body) => {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     if (!error) return (body);
//     console.log("end of callback")
//   }
// )};

// fetcher(userInput, returnBody());

const fetcher = function(userInput, callback) {
  request(userInput[0], (error, response, body) => {
    if (error) {
      console.log('Application will terminate now as an error occurred with statusCode:', response && response.statusCode)
    }
    else if (!error) {
      callback(body, userInput[1])
    };
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

// const fetcher = function(userInput, callback) {
//   request(userInput[0], (error, response, body) => {
//     if (error) console.log('error:', error); // Print the error if one occurred
//     if (error) console.log('Application will terminate now as an error occurred with statusCode:', response && response.statusCode);
//      // Print the response status code if a response was received
//     if (!error) callback(body, userInput[1]);
//   }
// )};