const req = require('request');


function callPython(sauce){
    req.post(sauce, {json: { message: 'Hello World'}}, function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
        else{
            console.log(error);
        }
    });
}

module.exports = callPython;