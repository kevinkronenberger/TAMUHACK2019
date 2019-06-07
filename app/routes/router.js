const express = require('express');
const router = express.Router();
const callPython = require('../sender/send.js')
const bodyParser = require('body-parser')
const course = require('../models/courseSchema3.js')
var jsonParser = bodyParser.json()

router.post('/', jsonParser, function (req, res) {
    for (i = 0; i < req.body.batch.length; i++) {
        var data = req.body.batch[i];
        var Sect = new courseSect({
            honors: data.honors,
            dept: data.dept,
            courseNum: data.courseNum,
            section: data.section,
            CRN: data.CRN,
            profName: data.profName,
            meetings: data.meetings
        });
        Sect.save().then(function () {
            res.status(200).send();
        });
    }

});

router.get('/', function(req,res,next){
    data = {
        "DeptName": "ECEN",
        "courseNum": "214"
    };
    var something = callPython("http://localhost:5000/", data);
    res.send('something')
})


module.exports= router;