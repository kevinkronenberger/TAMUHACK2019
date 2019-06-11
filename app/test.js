var callPython = require('./sender/send.js') //function to send POST request to Pytho Flask Server
const bodyParser = require('body-parser'); //Middleware for parsing request bodies
const express = require('express'); //Express...does what it does
const mongoose = require('mongoose'); //connects to MongoDB stuff
const courseSect = require('./models/courseSchema3') //Getting the schema from models folder

//Assigning app to express()
const app = express();
//Setting Port number
const port = 4000;

//Setting up the body parsers
var JSONParser = bodyParser.json();
//var TextParser = bodyParser.urlencoded({extended: false}); //Unneccesary textParser

//ES6 promises
mongoose.Promise = global.Promise;

//Connect to MongoDB
mongoose.connect('mongodb://localhost/testaroo', { useNewUrlParser: true });
//ensures connection is made before proceeding
/*mongoose.connection.once('open', function () {
    console.log('Connection has been made');
    done();
}).on('error', function (error) {
    console.log('Connection error: ', error)
});*/

app.post('/', JSONParser, function(req, res){
    console.log("new post request");

    for(i = 0; i < req.body.batch.length; i++){
        var data = req.body.batch[i];
        var Sect = new courseSect({
            honors : data.honors,
            dept : data.dept,
            courseNum : data.courseNum,
            section : data.section,
            CRN : data.CRN,
            profName : data.profName,
            meetings : data.meetings 
        });
        Sect.save();
    }
    res.send();
    
});

app.listen(port)
console.log('Listening to Port 4000');

//Test Data time
data = {
    "DeptName": "ECEN",
    "courseNum": "314"
};
console.log("calling python server...")
callPython("http://localhost:5000/", data);