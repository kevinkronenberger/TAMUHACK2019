const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.json());

app.use('/', require('./routes/router.js'));

app.use(function(err,req,res,next){
    res.status(418).send({error: err._message})
})

app.listen(4000, function(){
    console.log("Listening on port 4000")
})
