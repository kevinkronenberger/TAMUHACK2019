const courseSect = require('../models/courseSchema3.js')
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/scheduler', {useNewUrlParser: true});
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connectionerror:'));

//console.log("Connected to database");

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

function collisionCheck(combo){
    let n = combo.length;
    for(let i = 0; i < n; i++){
        for(let j = i+1; j < n; j++){
            for (let x = 0; x < combo[i].meetings.length; x++){
                for (let y = 0; y < combo[j].meetings.length; y++){

                    let re1 = new RegExp("["+combo[i].meetings[x].days+"]")
                    let re2 = new RegExp("["+combo[j].meetings[y].days+"]")

                    if (re2.test(combo[i].meetings[x].days) || re1.test(combo[j].meetings[y].days)){
                        if ((combo[i].meetings[x].start_time >= combo[j].meetings[y].start_time) && (combo[i].meetings[x].end_time <= combo[j].meetings[y].end_time)){
                            return false
                        }
                        else if ((combo[j].meetings[y].start_time >= combo[i].meetings[x].start_time) && (combo[j].meetings[y].end_time <= combo[i].meetings[x].end_time)) {
                            return false
                        }
                    }
                }
            }
        }
    }
    return true
}

async function MakeSchedule(courses){
    //it will be assumed that courses is an array in the form of [ "DeptNum CoureseNum"]
    //first, get courses from the database
    allcourses = []
    let validCount = 0;
    for(let i = 0; i < courses.length; i++){
        let dept = courses[i].substring(0, 4)
        let course = courses[i].substring(5)
        //console.log(dept,course)
        let result = await courseSect.find({deptName: dept, courseNum: course});
        if(result == ""){//Course not found in database
            console.error("Unknown Course: "+dept+" "+course)
        }
        else{
            allcourses.push(result)
        }
    }
    let n = allcourses.length
    let indeces = new Array(n).fill(0);
    let cont = true
    ValidCombos = []
    while(cont){
        PossCombo = []
        for(let i = 0; i<n; i++){
            PossCombo.push(allcourses[i][indeces[i]])
        }
        
        let next = n-1
        while ((next >= 0) && (indeces[next] + 1 >= allcourses[next].length)) {
            next-=1
        }
        if(next < 0){
            cont = false
            break
        }

        indeces[next]+=1
        
        for(let i = next+1; i < n; i++){
            indeces[i] = 0
        }
        if(collisionCheck(PossCombo)){
            //console.log("---------NewCombo-------------")
            validCount++;
            // for(let i = 0; i<n; i++){
            //     console.log(PossCombo[i].deptName, PossCombo[i].courseNum, PossCombo[i].section)
            // }
            ValidCombos.push(PossCombo)
        }
    }
    console.log(validCount + " possible schedules found")
    return ValidCombos
}


// db.once('open',async function() {
//     let sched = await MakeSchedule(["ECEN 322", "ECEN 370", "ECEN 326", "ECEN 449"])
//     console.log("Done")
//     console.log(sched);
//     return
// });

// console.log(collisionCheck([{
//     "_id" : "5e0919dec5026b6f5cfd03d3",
//     "honors" : true,
//     "deptName" : "ECEN",
//     "courseNum" : "322",
//     "section" : "200",
//     "CRN" : "34317",
//     "profName" : "Linda   Katehi-Tseregounis",
//     "meetings" : [ 
//         {
//             "_id" : "5e0919dec5026b6f5cfd03d4",
//             "start_time" : 480,
//             "end_time" : 530,
//             "days" : "F"
//         }
//     ],
//     "__v" : 0
// },{
//     "_id" : "5e0919dec5026b6f5cfd03d5",
//     "honors" : false,
//     "deptName" : "ECEN",
//     "courseNum" : "322",
//     "section" : "501",
//     "CRN" : "34319",
//     "profName" : "Linda   Katehi-Tseregounis",
//     "meetings" : [ 
//         {
//             "_id" : "5e0919dec5026b6f5cfd03d6",
//             "start_time" : 480,
//             "end_time" : 530,
//             "days" : "MW"
//         }
//     ],
//     "__v" : 0
// }]))

module.exports = MakeSchedule;