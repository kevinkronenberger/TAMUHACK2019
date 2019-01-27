from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
import mechanize

br = mechanize.Browser()

br.set_handle_robots(False)   # ignore robots
br.set_handle_refresh(False)
response = br.open('https://compass-ssb.tamu.edu/pls/PROD/bwckschd.p_disp_dyn_sched')
#print (response.read())     # the text of the page
response1 = br.response()  # get the response again

br.form = list(br.forms())[0]         # works when form has no name
for control in br.form.controls:
    if control.type == "select":  # means it's class ClientForm.SelectControl
        control.value = ['201911']

for control in br.form.controls:
    if control.type == "submit":
        response = br.submit()
br.form = list(br.forms())[0]
for control in br.form.controls:
    if control.type == "select":  # means it's class ClientForm.SelectControl
        control.value = ['ECEN']
        break
for control in br.form.controls:
    if control.type == "text":  # means it's class ClientForm.SelectControl
        control.value = "214"
        break
for control in br.form.controls:
    if control.type == "submit":
        response = br.submit()

page_soup = soup((br.response().read()), "html.parser")

containers = page_soup.findAll("table", {"summary": "This layout table is used to present the sections found"})

#

# This is where the scraping stuff starts:

course_final = []
meeting_time = []
meeting_day = []
instructor = []

for container in containers:
    course_bin = container.findAll("th", {"class": "ddtitle"})
    for r in course_bin:
        course_title=r.findAll("a")
        l = 0
        for s in course_title:
            if l==0:
                course_titles=r.a # this is the final scraped course title
                #print(course_titles.text)
                course_final.append(course_titles.text)
            l=l+1

    table_container = container.findAll("table", {"summary": "This table lists the scheduled meeting times and assigned instructors"
        " for this class.."})
    x = 0
    for i in table_container:
        tr = i.findAll("tr")
        if x >= 1:
            for j in tr:
                td = j.findAll("td")
                if (len(td)>0):
                    meeting_time.append(td[1].text) #adds meeting time to the list
                    meeting_day.append(td[2].text) # adds meeting day to a list
                    instructor.append(td[6].text) # adds instructor to list
        x = x+1 # don't knwow why it's here but it's important

print(course_final)
print(instructor)
print(meeting_day)
print(meeting_time)
