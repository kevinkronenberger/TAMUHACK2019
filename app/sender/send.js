const req = require('request');


async function callPython(sauce, data){
    return new Promise(function(resolve, reject){
        req.post({
            uri: sauce,
            method: 'POST',
            json: data
        }, function (error, response, body) {
            if (error || response.statusCode != 200) {
                reject(error)
            }
            resolve(body);
        });
    });
}

module.exports = callPython;