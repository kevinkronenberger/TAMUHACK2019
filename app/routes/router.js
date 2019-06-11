const express = require('express');
const router = express.Router();
const callPython = require('../sender/send.js')
const bodyParser = require('body-parser')
const courseSect = require('../models/courseSchema3.js')
var jsonParser = bodyParser.json()
var urlextendedParser = bodyParser.urlencoded({extended : false})

router.post('/', jsonParser, function (req, res) {
    console.log("POST request recieved!");
    console.log((req.body.batch.length) + ' sections were found!');
    for (i = 0; i < req.body.batch.length; i++) {
        var data = req.body.batch[i];
        var Sect = new courseSect({
            honors: data.honors,
            deptName: data.deptName,
            courseNum: data.courseNum,
            section: data.section,
            CRN: data.CRN,
            profName: data.profName,
            meetings: data.meetings
        });
        Sect.save();
    }
    res.status(200).send();

});

router.post('/py', urlextendedParser, function(req,res,next){
    console.log(req.body.deptName)
    var inDatabase = false;
    var FoundCourse;
    courseSect.find({deptName: req.body.deptName, courseNum: req.body.courseNum}).then(function(result, err){
        if(err){
            console.log(err)
        }
        else{
            if((result != undefined) && (result.length != 0 )){
                console.log("Not in Database \nResult = ")
                console.log(result)
                inDatabase = true;
                FoundCourse = result
            }
        }
    }).then(function(){
        if(!inDatabase){
            data = {
                "DeptName": req.body.deptName,
                "courseNum": req.body.courseNum
            };
            console.log("Calling Python")
            var resData = newCourseFound('http://127.0.0.1:5000/', data).then(function(result, err){
                console.log(result)
                res.send(result);
            })
        }
        else{
            res.send(FoundCourse);
        }
    });
})
router.get('/', function (req, res, next) {
   res.status(200).sendFile('C:/Users/willp/Desktop/Code/TAMUHack2019/TAMUHACK2019/app/dummy.html')
})


async function newCourseFound(sauce, data){
    try{
        var resData = await callPython(sauce, data);
        return resData
    }catch(error){
        console.log('Error: ')
        console.log(error);
    }
}



module.exports= router;