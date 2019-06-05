var callPython = require('./sender/send.js')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 4000;

var JSONParser = bodyParser.json();
var TextParser = bodyParser.urlencoded({extended: false});


app.post('/', JSONParser, function(req, res){
    console.log("new post request")
    console.log(req.body.batch[0].meetings[0])
    console.log('done')
    res.send()
});

app.listen(port)
console.log('Listening to Port 4000');
data = {
    "DeptName": "ECEN",
    "courseNum": "214"
};
console.log("calling python server...")
callPython("http://localhost:5000/", data);