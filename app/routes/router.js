const express = require('express');
const router = express.Router();
const callPython = require('../sender/send.js')
const bodyParser = require('body-parser')
const course = require('../models/courseSchema.js')
var jsonParser = bodyParser.json()

router.post('/', jsonParser, function(req,res,next){
    console.log(req.body);
    course.create(req.body).then(function(course){
        res.send(course)
    }).catch(next);
    
})

router.get('/', function(req,res,next){
    data = {
        "DeptName": "ECEN",
        "courseNum": "214"
    };
    var something = callPython("http://localhost:5000/", data);



    res.send('something')
})


module.exports= router;