const req = require('request');


function callPython(sauce, data){
    req.post(sauce, {json: data}, function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
        else{
            console.log(error);
        }
    });
}

module.exports = callPython;