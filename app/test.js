//This script fires a POST request to Flask server with neccessary 

const callPython = require('./sender/send.js');

data = {
    message: "Hello World"
}

callPython('http://localhost:5000/', data);