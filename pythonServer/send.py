import requests as req
import json

pySauce = 'http://localhost:4000/'

dataString = '{"message": "Hello World"}'

dataJSON = json.loads(dataString)

print(dataJSON)

req.post(pySauce, json = dataJSON)
