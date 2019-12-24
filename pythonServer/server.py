import requests as req
import json
from flask import Flask, request
from API import getCourseInfo
pySauce = 'http://localhost:4000/api' #URL of Node Server

app = Flask(__name__) #Flask App 
@app.route('/', methods = ['POST'])
def result():
    #magic- don't touch
    #print(request)
    reqJSON = request.get_json()
    print(reqJSON)
    CourseNum = reqJSON["courseNum"]
    DeptName = reqJSON["DeptName"]
    resJSON = json.dumps(getCourseInfo(DeptName, CourseNum))

    resJSON = '{\"batch\": ' + resJSON + '}'
    print("Sending to Node")
    # f = open('debugFile.txt', 'w')
    # f.write(resJSON)
    # f.close()
    headers = {'content-type': 'application/json'}
    req.post(pySauce, data = resJSON, headers = headers) #Make a post request with proper data to Node Server
    return  resJSON #sends response to Node.js
