import requests as req
import json
from flask import Flask, request

pySauce = 'http://localhost:4000/' #URL of Node Server

app = Flask(__name__) #Flask App 
@app.route('/', methods = ['POST'])
def result():
    reqJSON = request.get_json()

    req.post(pySauce, json = reqJSON) #Make a post request with proper data to Node Server

    return  'Received!' #sends response to Node.js
