const express = require('express');
const router = express.Router();
const callPython = require('../sender/send.js')
const bodyParser = require('body-parser')
const courseSect = require('../models/courseSchema3.js')
var jsonParser = bodyParser.json()
var urlextendedParser = bodyParser.urlencoded({extended : false})
let MakeSchedule = require("../scheduleGenerator/algorithm.js")


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
    /*This endpoint recieves post requests for class information
     from the python server and after parsing the data, sticks it in the database*/
    //console.log("POST request recieved at /api!");
    console.log((req.body.batch.length) + ' Sections Were Found!');
    var TBA = false;
    for (i = 0; i < req.body.batch.length; i++) {
        var data = req.body.batch[i];
        var MeetingDays = []
        for(var j = 0; j<data.meetings.length; j++){
            if(data.meetings[j].substring(0,3) != "TBA"){
                MeetingDays.push(parseTime(data.meetings[j]))
            }
            else{
                TBA = true
            }
        }
        var Sect = new courseSect({
            honors: data.honors,
            deptName: data.deptName,
            courseNum: data.courseNum,
            section: data.sectionNum,
            CRN: data.CRN,
            profName: data.profName,
            meetings: MeetingDays
        });
        //console.log(Sect)
        Sect.save();
    }
    //console.log("New Course Added to database")
    if (TBA) console.log("Some Sections are TBA")
    res.status(200).send();

});

router.post('/py', urlextendedParser, async function(req,res,next){
    /*This endpoint recieves calls for class data from the user.
    If the class is already in the database, that data is used.
    Otherwise, the Python server is called*/
    console.log("### NEW REQUEST ###")
    courseList = []
    let len = req.body.courseList.length
    let i=0
    while(i < len){
        console.log(i)
        console.log("Looking for " + req.body.courseList[i].deptName + " " + req.body.courseList[i].courseNum + " Sections")
        var inDatabase = false;
        let courseName = req.body.courseList[i].deptName + " " + req.body.courseList[i].courseNum;
        courseList.push(courseName)
        let result = await courseSect.find({
            deptName: req.body.courseList[i].deptName,
            courseNum: req.body.courseList[i].courseNum
        })
        if((result != undefined) && (result.length != 0 )){
            console.log("Found in Database!")
            inDatabase = true;
        }
        if(!inDatabase){
            data = {
                "DeptName": req.body.courseList[i].deptName,
                "courseNum": req.body.courseList[i].courseNum
            };
            console.log("Calling Python")
            var resData = await newCourseFound('http://127.0.0.1:5000/', data)//.then(function(result, err){
            console.log("Course Data Acquired")
        }
        i++;
    }
    console.log(courseList)
    let combos = await MakeSchedule(courseList)
    res.send(combos)
    console.log("Combinations Sent!")
});

router.get('/', function (req, res, next) {
    res.sendFile('C:/Users/willp/Desktop/Code/TAMUHack2019/TAMUHACK2019/app/public2/dummy.html')
})
router.get('/dummy.js', function (req, res, next) {
    res.sendFile('C:/Users/willp/Desktop/Code/TAMUHack2019/TAMUHACK2019/app/public2/dummy.js')
})
router.get('/dummy.css', function (req, res, next) {
    res.sendFile('C:/Users/willp/Desktop/Code/TAMUHack2019/TAMUHACK2019/app/public2/dummy.css')
})


async function newCourseFound(sauce, data){
    //This function makes an API call to Python via the callPython function
    try{
        var resData = await callPython(sauce, data);
        return resData
    }catch(error){
        console.log('Error: ')
        console.log(error);
    }
}


module.exports= router;