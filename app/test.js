var callPython = require('./sender/send.js')

data = {
    "DeptName": "ECEN",
    "courseNum": "214"
};
var something = callPython("http://localhost:5000/", data);
