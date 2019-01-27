import requests as req
import json
from flask import Flask, request
from API import getCourseInfo
pySauce = 'http://localhost:4000/' #URL of Node Server

app = Flask(__name__) #Flask App 
@app.route('/', methods = ['POST'])
def result():
    #magic- don't touch
    #print(request)
    print(req)
    reqJSON = request.get_json()
    print(reqJSON);
    CourseNum = reqJSON["courseNum"]
    DeptName = reqJSON["DeptName"]
    resJSON = json.dumps(getCourseInfo(DeptName, CourseNum))
    req.post(pySauce, json = resJSON) #Make a post request with proper data to Node Server
    return  'Received!' #sends response to Node.js
