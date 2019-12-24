const express = require('express');
const router = express.Router();
const callPython = require('../sender/send.js')
const bodyParser = require('body-parser')
const courseSect = require('../models/courseSchema3.js')
var jsonParser = bodyParser.json()
var urlextendedParser = bodyParser.urlencoded({extended : false})



function parseTime(timestr) {
    splitstr = timestr.split(':')
    var start_time
    if (parseInt(splitstr[0]) == 12) {
        start_time = parseInt(splitstr[1].substring(0, 2))
    } else {
        start_time = 60 * parseInt(splitstr[0]) + parseInt(splitstr[1].substring(0, 2))
    }

    if (splitstr[1].substring(3, 5) == "pm") {
        start_time += 12 * 60
    }

    var end_time
    if (parseInt(splitstr[1].substring(8)) == 12) {
        end_time = parseInt(splitstr[1].substring(0, 2))
    } else {
        end_time = 60 * parseInt(splitstr[1].substring(8)) + parseInt(splitstr[2].substring(0, 2))
    }

    if (splitstr[2].substring(3, 5) == "pm") {
        end_time += 12 * 60
    }
    let day = splitstr[2].substring(6)
    let retobj = {
        "start_time": start_time,
        "end_time": end_time,
        "days": day
    }
    return retobj
}

router.post('/api', jsonParser, function (req, res) {
    console.log("POST request recieved!");
    console.log((req.body.batch.length) + ' Sections Were Found!');
    console.log(req.body.batch.length)
    for (i = 0; i < req.body.batch.length; i++) {
        var data = req.body.batch[i];
        var MeetingDays = []
        for(var j = 0; j<data.meetings.length; j++){
            MeetingDays.push(parseTime(data.meetings[j]))
        }
        var Sect = new courseSect({
            honors: data.honors,
            deptName: data.deptName,
            courseNum: data.courseNum,
            section: data.section,
            CRN: data.CRN,
            profName: data.profName,
            meetings: MeetingDays
        });
        //console.log(Sect)
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
                //console.log(result)
                res.send(result);
            })
        }
        else{
            res.send(FoundCourse);
        }
    });
})

router.get('/', function (req, res, next) {
    res.sendFile('C:/Users/willp/Desktop/Code/TAMUHack2019/TAMUHACK2019/app/public2/dummy.html')
})
router.get('/dummy.js', function (req, res, next) {
    res.sendFile('C:/Users/willp/Desktop/Code/TAMUHack2019/TAMUHACK2019/app/public2/dummy.js')
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