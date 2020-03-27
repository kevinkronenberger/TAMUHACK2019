let scheduleIterator = 0
let combos = []

async function SendRequest() {
    combos = []
    var lis = document.getElementById("list").getElementsByTagName("li");
    courseList = [];
    for (i = 0; i < lis.length; i++) {
        let text = lis[i].innerText;
        deptName = text.substring(0, 4);
        courseNum = text.substring(5);
        courseList.push({
            deptName,
            courseNum
        })
    }
    const data = {
        courseList
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(courseList)
    const response = await fetch('/py', options);
    const resdata = await response.json();
    combos = resdata
    count = resdata.length
    document.getElementById("count").innerText = "Showing schedule " + (scheduleIterator + 1) + " of " + count
    ShowSchedule(resdata, 0)
}

function AddToList() {
    let list = document.getElementById("list");
    var deptName = document.getElementById("deptName").value
    var courseNum = document.getElementById("courseNum").value


    if ((deptName.length != 4) || (courseNum.length != 3)) {
        document.getElementById("error").innerText = "Error: Invalid Course Format (should be 4 letter department name and 3 digit course number)";
    } else if (((/\d/.test(deptName))) || (isNaN(courseNum))) {

        document.getElementById("error").innerText = "Error: Invalid Course Format (should be 4 letter department name and 3 digit course number)";
    } else {
        var lis = document.getElementById("list").getElementsByTagName("li");
        for (i = 0; i < lis.length; i++) {
            if ((deptName.toLowerCase() + " " + courseNum.toLowerCase()) == lis[i].innerText.toLowerCase()) {
                document.getElementById("error").innerText = "Error: Course is already on list";
                return;
            }
        }
        document.getElementById("error").innerText = "";
        var item = document.createElement("li");
        item.onclick = function () {
            this.parentNode.removeChild(this);
        };
        item.innerHTML = deptName + " " + courseNum;
        list.appendChild(item);
    }
}
function ShowSchedule(data, h) {
    console.log(data[h])
    const colorArr = ["Crimson", "LightBlue", "Orange", "DimGray", "MediumVioletRed", "CadetBlue"]
    let usedColors = []
    for (i = 0; i < data[h].length; i++) {
        let color;
        let repeat = true;
        while (repeat) {
            repeat = false;
            color = colorArr[Math.floor(Math.random() * colorArr.length)];
            for (a = 0; a < usedColors.length; a++) {
                if (color == usedColors[a]) {
                    repeat = true
                }
            }
            if (usedColors.length >= colorArr.length) {
                repeat = false
            }
        }
        usedColors.push(color)

        if(data[h][i].section == "700"){
            document.getElementById("online").innerText = data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section + " is an online class"
        }

        for (j = 0; j < data[h][i].meetings.length; j++) {
            let days = data[h][i].meetings[j].days;
            let start = data[h][i].meetings[j].start_time;
            let end = data[h][i].meetings[j].end_time;
            let startTag;
            let endTag;

            let startStr = deParseTime(start)
            let endStr = deParseTime(end)

            //console.log("endtime = ",end)
            for (k = 0; k < 29; k++) {
                let time = 480 + k * 30;
                if (parseInt(start) - time < 0) {
                    startTag = 480 + (k - 1) * 30
                    //console.log("Start = ",startTag)
                    break
                }
            }
            for (k = 0; k < 29; k++) {
                let time = 480 + k * 30;
                if (parseInt(end) - time < 0) {
                    endTag = 480 + (k - 1) * 30
                    //console.log("End = ",endTag)
                    break
                }
            }
            
            if (/X/.test(days)) { //Sunday
                let slot1 = document.getElementById(startTag).getElementsByClassName("Sunday")[0]
                slot1.innerText += data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section +"\n"
                slot1.innerText += (startStr + "-" + endStr)
                slot1.style.backgroundColor = color
                for (i = startTag; i <= endTag; i += 30) {
                    let slot2 = document.getElementById(i).getElementsByClassName("Sunday")[0]
                    slot2.style.backgroundColor = color
                }
            }
            if (/M/.test(days)) { //Monday
                let slot1 = document.getElementById(startTag).getElementsByClassName("Monday")[0]
                slot1.innerText += data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section + "\n"
                slot1.innerText += (startStr + "-" + endStr)
                slot1.style.backgroundColor = color
                for (i2 = startTag; i2 <= endTag; i2 += 30) {
                    let slot2 = document.getElementById(i2).getElementsByClassName("Monday")[0]
                    slot2.style.backgroundColor = color
                }
            }
            if (/T/.test(days)) { //Tuesday
                let slot1 = document.getElementById(startTag).getElementsByClassName("Tuesday")[0]
                slot1.innerText += data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section + "\n"
                slot1.innerText += (startStr + "-" + endStr)
                slot1.style.backgroundColor = color
                for (i2 = startTag; i2 <= endTag; i2 += 30) {
                    let slot2 = document.getElementById(i2).getElementsByClassName("Tuesday")[0]
                    slot2.style.backgroundColor = color
                }
            }
            if (/W/.test(days)) { //Wednesday
                let slot1 = document.getElementById(startTag).getElementsByClassName("Wednesday")[0]
                slot1.innerText += data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section + "\n"
                slot1.innerText += (startStr + "-" + endStr)
                slot1.style.backgroundColor = color
                for (i2 = startTag; i2 <= endTag; i2 += 30) {
                    let slot2 = document.getElementById(i2).getElementsByClassName("Wednesday")[0]
                    slot2.style.backgroundColor = color
                }
            }
            if (/R/.test(days)) { //Thursday
                let slot1 = document.getElementById(startTag).getElementsByClassName("Thursday")[0]
                slot1.innerText += data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section + "\n"
                slot1.innerText += (startStr + "-" + endStr)
                slot1.style.backgroundColor = color
                for (i2 = startTag; i2 <= endTag; i2 += 30) {
                    let slot2 = document.getElementById(i2).getElementsByClassName("Thursday")[0]
                    slot2.style.backgroundColor = color
                }
            }
            if (/F/.test(days)) { //Friday
                let slot1 = document.getElementById(startTag).getElementsByClassName("Friday")[0]
                slot1.innerText += data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section + "\n"
                slot1.innerText += (startStr + "-" + endStr)
                slot1.style.backgroundColor = color
                for (i2 = startTag; i2 <= endTag; i2 += 30) {
                    let slot2 = document.getElementById(i2).getElementsByClassName("Friday")[0]
                    slot2.style.backgroundColor = color
                }
            }
            if (/S/.test(days)) { //Saturday
                let slot1 = document.getElementById(startTag).getElementsByClassName("Saturday")[0]
                slot1.innerText += data[h][i].deptName + " " + data[h][i].courseNum + "-" + data[h][i].section + "\n"
                slot1.innerText += (startStr + "-" + endStr)
                slot1.style.backgroundColor = color
                for (i2 = startTag; i2 <= endTag; i2 += 30) {
                    let slot2 = document.getElementById(i2).getElementsByClassName("Saturday")[0]
                    slot2.style.backgroundColor = color
                }
            }

        }
    }
}

function nextSchedule() {
    if (scheduleIterator < combos.length-1) {
        scheduleIterator++;
        //console.log(scheduleIterator)
        document.getElementById("online").innerText = "";
        for (i = 0; i < 29; i++) {
            document.getElementById(480 + i * 30).getElementsByClassName("Sunday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Sunday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Monday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Monday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Tuesday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Tuesday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Wednesday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Wednesday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Thursday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Thursday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Friday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Friday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Saturday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Saturday")[0].style.backgroundColor = ""
        }
        document.getElementById("count").innerText = "Showing schedule " + (scheduleIterator + 1) + " of " + count
        ShowSchedule(combos, scheduleIterator)
    }
}

function prevSchedule() {
    if (scheduleIterator > 0) {
        scheduleIterator--;
        //console.log(scheduleIterator)
        document.getElementById("online").innerText = "";
        for (i = 0; i < 29; i++) {
            document.getElementById(480 + i * 30).getElementsByClassName("Sunday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Sunday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Monday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Monday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Tuesday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Tuesday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Wednesday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Wednesday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Thursday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Thursday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Friday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Friday")[0].style.backgroundColor = ""

            document.getElementById(480 + i * 30).getElementsByClassName("Saturday")[0].innerText = ""
            document.getElementById(480 + i * 30).getElementsByClassName("Saturday")[0].style.backgroundColor = ""
        }
        document.getElementById("count").innerText = "Showing schedule " + (scheduleIterator + 1) + " of " + count
        ShowSchedule(combos, scheduleIterator)
    }
}

function deParseTime(n){
    let hours = Math.floor(parseInt(n)/60)
    let minutes = n - hours*60;
    console.log(n, hours, minutes)
    if(minutes == 0){
        minutes = "00"
    }
    if(hours > 12){
        hours = hours - 12;
        return (hours.toString() + ":" + minutes.toString() + "PM")
    }
    return (hours.toString() +":"+ minutes.toString()+" AM")
}