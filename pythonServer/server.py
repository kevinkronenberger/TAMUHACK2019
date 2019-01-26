import requests as req
import json
from flask import Flask, request

pySauce = 'http://localhost:4000/'

app = Flask(__name__)
@app.route('/', methods = ['POST'])
def result():
    content = request.get_json()
    req.post(pySauce, json = content)

    return  'Received!'
