var profArray = []
var sectionArray = []
var courseArray = []
var courseDict ={}
var courseID = 0
class professor{
	constructor(name, avoid){
		this.name = name
		this.avoid = avoid
	}
}
class section{
	constructor(number, avoid){
		this.number = number
		this.avoid = avoid
	}
}
class course{
	constructor(profArray, sectionArray, department, number, honors, campus){
		this.profs = profArray
		this.sections = sectionArray
		this.department = department
		this.number = number
		this.honors = honors
		this.campus = campus
	}
}

function addProf(){
	var profName = document.getElementById("profName").value
	var avoid = document.getElementById("profAvoid").checked
	var pref
	var dup = false
	for (i = 0; i < profArray.length; ++i) {
		var prof = profArray[i]
		if(prof.name == profName){
			prof.avoid = avoid
			dup = true
		}
	}
		
	if(avoid){
		pref = "avoid"
	}else{
		pref = "prefer"
	}
	if(!dup){
		var prof = new professor(profName, avoid)
		profArray.push(prof)
	}
	var html = document.getElementById("profList").innerHTML
	if(html.includes(profName)){
		var texts = html.substring(0,html.search(profName)+profName.length + 6) + pref +" " + html.substring(html.search(profName)+profName.length + 12)
		document.getElementById("profList").innerHTML = texts 
		return
	}
	document.getElementById("profList").innerHTML = html + "<p><b>" +profName+"</b> -" + pref +"  </p>" 
}

function addSection(){
	var sectionNumber = document.getElementById("sectionNum").value
	var sectionNumberInt = parseInt(sectionNumber)
	var avoid = document.getElementById("sectionAvoid").checked
	var pref
	var dup = false
	for (i = 0; i < sectionArray.length; ++i) {
		var sect = sectionArray[i]
		if(sect.number == sectionNumber){
			sect.avoid = avoid
			dup = true
		}
	}
		
	if(avoid){
		pref = "avoid"
	}else{
		pref = "prefer"
	}
	if(!dup){
		var sect = new section(sectionNumberInt, avoid)
		sectionArray.push(sect)
	}
	var html = document.getElementById("sectionList").innerHTML
	if(html.includes(sectionNumber)){
		var texts = html.substring(0,html.search(sectionNumber)+sectionNumber.length + 6) + pref +" " + html.substring(html.search(sectionNumber)+sectionNumber.length + 12)
		document.getElementById("sectionList").innerHTML = texts 
		return
	}
	document.getElementById("sectionList").innerHTML = html + "<p><b>" +sectionNumber+"</b> -" + pref +"  </p>" 
}

function addCourse(){
	var department = document.getElementById("dep").value
	var courseNumber = parseInt(document.getElementById("courseNum").value)
	var honors = document.getElementById("honors").checked
	var c = document.getElementById("campus")
	var campus = c.options[c.selectedIndex].value
	var dup = false
	for(i = 0; i < courseArray.length; ++i){
		var course1 = courseArray[i]
		console.log(course1)
		if(course1.department == department && course1.number == courseNumber){
			dup = true
			course.honors = honors
			course.campus = campus
			course.profArray = profArray
			course.sectionArray = sectionArray
		}
	}
	console.log(dup)
	var cor = new course(profArray, sectionArray, department, courseNumber, honors, campus)
	profArray = []
	sectionArray = []
	document.getElementById("profList").innerHTML = ""
	document.getElementById("sectionList").innerHTML = ""
	
	if(dup){
		id = courseDict[department+courseNumber]
		document.getElementById(id).innerHTML = editCourseDesc(cor)
		
	}else{
		
		courseDict[department+courseNumber] = ++courseID
		document.getElementById("courseList").innerHTML = document.getElementById("courseList").innerHTML + generateCourseDesc(cor, courseID)
		courseArray.push(cor)
	}
	
}
function generateCourseDesc(course, id){
	var profs = ""
	var sects = ""
	for (i = 0; i < course.profs.length; ++i) {
		var prof = course.profs[i]
		if(prof.avoid){
			var pref = "avoid"
		}else{
			var pref = "prefer"
		}
		profs += prof.name + "-" + pref
	}
	for (i = 0; i < course.sections.length; ++i) {
		var sect = course.sections[i]
		if(sect.avoid){
			var pref = "avoid"
		}else{
			var pref = "prefer"
		}
		sects += sect.number + "-" + pref
	}
	return "<div id=" + id + "> <p class=\"course_title\">" + course.department + " " + course.number  + 
	"</p> <p class=\"course_data\"> Honors?: " + course.honors + " Campus " + course.campus +
	"<h5 class=\"prof_and_section\"> professors </h5>" +
	"<p class\"prof_and_section>" + profs + "</p>" +
	"<h5 class=\"prof_and_section\"> sections </h5>" +
	"<p class\"prof_and_section>" + sects + "</p>" + "</div>"
}
function editCourseDesc(course){
	var profs = ""
	var sects = ""
	for (i = 0; i < course.profs.length; ++i) {
		var prof = course.profs[i]
		if(prof.avoid){
			var pref = "avoid"
		}else{
			var pref = "prefer"
		}
		profs += prof.name + "-" + pref
	}
	for (i = 0; i < course.sections.length; ++i) {
		var sect = course.sections[i]
		if(sect.avoid){
			var pref = "avoid"
		}else{
			var pref = "prefer"
		}
		sects += sect.number + "-" + pref
	}
	
	return "<p class=\"course_title\">" + course.department + " " + course.number  + 
	"</p> <p class=\"course_data\"> Honors?: " + course.honors + " Campus: " + course.campus +
	"<h5 class=\"prof_and_section\"> professors </h5>" +
	"<p class\"prof_and_section>" + profs + "</p>" +
	"<h5 class=\"prof_and_section\"> sections </h5>" +
	"<p class\"prof_and_section>" + sects + "</p>"
}