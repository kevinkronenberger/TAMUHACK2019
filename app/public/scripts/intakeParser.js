var profArray = []
var sectionArray = []
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
	constructor(profArray, sectionArray, department, number){
		this.profs = profArray
		this.sections = sectionArray
		this.department = department
		this.number = number
	}
}

function addProf(){
	var profName = document.getElementById("profName").value
	var avoid = document.getElementById("profAvoid").checked
	var pref
	var dup = false
	for (i = 0; i < profArray.length; ++i) {
		console.log(i)
		var prof = profArray[i].name
		console.log(profName)
		console.log(prof.name)
		console.log(prof)
		if(prof == profName){
			prof.avoid = avoid
			dup = true
			console.log("dup = true")
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
	var sectionNumber = document.getElementById("profName").value
	var avoid = document.getElementById("profAvoid").checked
	var pref
	var dup = false
	for (i = 0; i < sectionArray.length; ++i) {
		var prof = sectionArray[i].name
		if(section == sectionNumber){
			prof.avoid = avoid
			dup = true
			console.log("dup = true")
		}
	}
		
	if(avoid){
		pref = "avoid"
	}else{
		pref = "prefer"
	}
	console.log(dup)
	if(!dup){
		var sect = new section(sectionNumber, avoid)
		sectionArray.push(sect)
	}
	var html = document.getElementById("sectionList").innerHTML
	if(html.includes(sectionNumber)){
		var texts = html.substring(0,html.search(profName)+profName.length + 6) + pref +" " + html.substring(html.search(profName)+profName.length + 12)
		document.getElementById("sectionList").innerHTML = texts 
		return
	}
	document.getElementById("sectionList").innerHTML = html + "<p><b>" +sectionNumber+"</b> -" + pref +"  </p>" 
}