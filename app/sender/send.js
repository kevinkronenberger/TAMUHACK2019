const req = require('request');


function callPython(sauce, data){//Sauce = URL; data = course name in JSON format
    req.post({uri: sauce, method: 'POST', json: data}, function(error, response, body){

        if(!error && response.statusCode == 200){
            //console.log(body);//logs the body of the response
            return(body)
        }
        else{
            console.log(error);//puts error on server terminal
        }
    });
}

module.exports = callPython;