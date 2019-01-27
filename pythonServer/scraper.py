import re
from robobrowser import RoboBrowser
from bs4 import BeautifulSoup
import requests as req


br = RoboBrowser()
br.open('https://compass-ssb.tamu.edu/pls/PROD/bwckschd.p_disp_dyn_sched')

form = br.get_form()
form['p_term']= '201911'
br.submit_form(form)

#SECOND LAYERVVVVV
#print("entering layer 2")
selform = br.get_form()
#print(selform)

#selform['sel_subj'] = "ECEN"
selDict = selform.serialize().data
serialDict = selform.serialize()
print(selDict)
selDict.setlist('sel_subj',['','ECEN'])
print('******************************************************')
print(selDict)
serialDict.data = selDict
req.post(br.url,serialDict)
print(selform)

#print(selform)
#print(selform)

#print(selform)
#print(type(selform))
#selform['sel_title'].value = ""
#selform['sel_schd'].value = "%"
#selform['sel_insm'].value = "%"
#selform['sel_from_cred'].value = ""
#selform['sel_to_cred'].value = ""
#selform['sel_camp'].value = "%"
#selform['sel_levl'].value = "%"
#selform['sel_ptrm'].value = "%"
#selform['sel_instr'].value = "%"
#selform['sel_attr'].value = "%"
#selform['begin_hh'].value = "0"
#selform['begin_mi'].value = "0"
#selform['begin_ap'].value = "a"
#selform['end_hh'].value = "0"
#selform['end_mi'].value = "0"
#selform['end_ap'].value = "a"
#print(selform['sel_subj'].value)
#print(selform['sel_crse'].value)
#print(selform)
br.submit_form(selform)
src = str(br.parsed)
soup = BeautifulSoup(src, features = "html.parser")
#print(type(src))
f = open("text.txt", 'w')
stringysoup = soup.encode('utf-8')
#print(type(soup.text))
f.write(str(stringysoup))
f.close()
#print(soup.prettify)

