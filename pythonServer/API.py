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
                        d = d.find('table')
                        k = []
                        for i in d.find_all('td'):
                                k.append(i.text)
                        i = 0
                        singleSection['meetings'] = []
                        singleSection['profName'] = k[6]

                        if(singleSection['profName'][-4:] == ' (P)'):
                                singleSection['profName'] = singleSection['profName'][:-4]
                        if(singleSection['profName'][-1] == ' '):
                           singleSection['profName']=singleSection['profName'][:-1]

                        while((i+7) <= len(k)):
                                meeting = k[i+1] + ' ' + k[i+2]
                                singleSection['meetings'].append(meeting)
                                i += 7
                        SectionList.append(singleSection)
        return SectionList
