from bs4 import BeautifulSoup
from urllib.request import urlopen as uReq
import mechanize
import re
import json

def getCourseInfo(DeptName, CourseNum):

        CourseNum = str(CourseNum)
        br = mechanize.Browser()

        br.set_handle_robots(False)   # ignore robots
        br.set_handle_refresh(False)
        response = br.open('https://compass-ssb.tamu.edu/pls/PROD/bwckschd.p_disp_dyn_sched')
        #print (response.read())     # the text of the page
        #response1 = br.response()  # get the response again

        br.form = list(br.forms())[0]         # works when form has no name
        for control in br.form.controls:
            if control.type == "select":  # means it's class ClientForm.SelectControl
                control.value = ['201931']

        for control in br.form.controls:
            if control.type == "submit":
                response = br.submit()
        br.form = list(br.forms())[0]
        for control in br.form.controls:
            if control.type == "select":  # means it's class ClientForm.SelectControl
                control.value = [DeptName]
                break
        for control in br.form.controls:
            if control.type == "text":  # means it's class ClientForm.SelectControl
                control.value = CourseNum
                break
        for control in br.form.controls:
            if control.type == "submit":
                response = br.submit()

        soup = BeautifulSoup(br.response().read(), 'html.parser')


        SectionList = []

        for table in soup.find_all('table', {'summary': 'This layout table is used to present the sections found'}):
                for header in table.find_all('th', {'class': 'ddtitle'}):
                        singleSection = {}
                        k = 0
                        h = header.text
                        # h now contains the following info: Honors, CRN, deptName, courseNum, and sectionNum
                        h = h.split(' - ')
                        if(h[0][0:3] == 'HNR'):
                                singleSection['honors'] = True
                        else:
                                singleSection['honors'] = False
                        singleSection['CRN'] = int(h[1])
                        singleSection['deptName'] = h[2][0:4]
                        singleSection['courseNum'] = h[2][5:]
                        singleSection['sectionNum'] = int(h[3])
                        # navigating d up and over to the meeting info
                        d = header.find_parent('tr')
                        d = d.find_next_sibling()
                        d = d.find('td')

                        a = d.find('a')  # 'a' contains the professor names
                        singleSection['profName'] = a.text
                        d = d.find('table')
                        k = []
                        for i in d.find_all('td'):
                                k.append(i.text)
                        i = 0
                        singleSection['meetings'] = []
                        while((i+7) <= len(k)):
                                meeting = k[i+1] + ' ' + k[i+2]
                                singleSection['meetings'].append(meeting)
                                i += 7
                        SectionList.append(singleSection)
        return SectionList
        #OLDER VERSION OF THE WEBSCRAPER THAT doesn't get the meeting times right

        # page_soup = soup((br.response().read()), "html.parser")

        # containers = page_soup.findAll("table", {"summary": "This layout table is used to present the sections found"})

        # This is where the scraping stuff starts:

        # course_final = []
        # meeting_time = []
        # meeting_day = []
        # instructor = []
        

        # for container in containers:
        #     course_bin = container.findAll("th", {"class": "ddtitle"})
        #     for r in course_bin:
        #         course_title=r.findAll("a")
        #         l = 0
        #         for s in course_title:
        #             if l==0:
        #                 course_titles=r.a # this is the final scraped course title
        #                 #print(course_titles.text)
        #                 course_final.append(course_titles.text)
        #             l=l+1        
        
        #     table_container = container.findAll("table", {"summary": "This table lists the scheduled meeting times and assigned instructors"
        #         " for this class.."})
        #     GrossMeetings = []
        #     for i in table_container:
        #         tr = i.findAll('tr')
        #         GM = (len(tr)-1)
        #         for j in tr:
        #                 td = j.findAll("td")
        #                 if(len(td)>0):
        #                         meeting_time.append(td[1].text)
        #                         meeting_day.append(td[2].text)
        #                         if(td[0].text == "Lecture"):
        #                                 trueStringList = td[6].text.split(" ")
        #                                 instructor.append(trueStringList[len(trueStringList)-2])
        #         GrossMeetings.append(GM)
        # course_actual_final = []
        # for r in range(0, len(course_final)):
        #     course_actual_final.append(course_final[r].split("-"))
        # #print(GrossMeetings)
        # #print(course_final)
        # #print(instructor)
        # #print(meeting_day)
        # #print(meeting_time)
        # #print(course_actual_final)
        # courseList = []
        # meetingStopPoint = 0
        # for i in range(0, len(course_final)):
        #         singleCourse = [course_actual_final[i][0],
        #                         course_actual_final[i][1], course_actual_final[i][2], course_actual_final[i][3], instructor[i]]
        #         j=0
        #         while(j<GrossMeetings[i]):
        #                 singleCourse.append(meeting_day[meetingStopPoint+j])
        #                 singleCourse.append(meeting_time[meetingStopPoint+j])
        #                 j= j+1
        #         meetingStopPoint = meetingStopPoint+j
        #         #print(singleCourse)
        #         #print("***********")
        #         courseList.append(singleCourse)
        # DictList = []
        # for i in range(0,len(courseList)):
        #         TimeList = []
        #         for j in range(6, len(courseList[i])):
        #                 TimeList.append(courseList[i][j])
        #         singleDict = {
        #                 "dept" : DeptName,
        #                 "courseNum": CourseNum,
        #                 "Section": courseList[i][3],
        #                 "profName": courseList[i][4],
        #                 "meetings": TimeList,
        #         }
        #         DictList.append(singleDict)
        # # Uncomment for debug tools
        # # print(DictList)
        # # file = open('ClassSchedule.txt', 'w', encoding="utf-8")
        # # json.dump(DictList, file)
        # # file.close()
        # return DictList
