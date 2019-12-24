/*var Sect = new courseSect({
            honors: data.honors,
            deptName: data.deptName,
            courseNum: data.courseNum,
            section: data.section,
            CRN: data.CRN,
            profName: data.profName,
            meetings: data.meetings
        });
*/

function parseTime(timestr){
    splitstr = timestr.split(':')
    var start_time
    if (parseInt(splitstr[0]) == 12){
        start_time = parseInt(splitstr[1].substring(0,2))
    }

    else{
        start_time = 60 * parseInt(splitstr[0]) + parseInt(splitstr[1].substring(0, 2))
    }

    if(splitstr[1].substring(3,5) == "pm"){
        start_time += 12*60 
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

function MakeSchedule(courses){

}


var courses = [{
        "meetings": [
            "2:20 pm - 3:35 pm TR",
            "11:10 am - 2:00 pm R"
        ],
        "_id": "5e0150d2bfc93e0104bb81a6",
        "honors": true,
        "deptName": "ECEN",
        "courseNum": "326",
        "CRN": "41234",
        "profName": "Kamran   Entesari",
        "__v": 0
    },
    {
        "meetings": [
            "2:20 pm - 3:35 pm TR",
            "8:00 am - 10:50 am R"
        ],
        "_id": "5e0150d2bfc93e0104bb81a7",
        "honors": false,
        "deptName": "ECEN",
        "courseNum": "326",
        "CRN": "34975",
        "profName": "Kamran   Entesari",
        "__v": 0
    },
    {
        "meetings": [
            "2:20 pm - 3:35 pm TR",
            "11:10 am - 2:00 pm R"
        ],
        "_id": "5e0150d2bfc93e0104bb81a8",
        "honors": false,
        "deptName": "ECEN",
        "courseNum": "326",
        "CRN": "34976",
        "profName": "Kamran   Entesari",
        "__v": 0
    }
]
console.log(parseTime(courses[0].meetings[0]))

module.exports = []