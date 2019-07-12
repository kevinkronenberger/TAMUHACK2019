const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

port = process.env.PORT || 4000

const app = express();

//once database is connected, begin listening for requests
mongoose.connect('mongodb://localhost:27017/scheduler', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectionerror:'));
db.once('open', function() {

    console.log("Connected to database");

    app.use(bodyParser.json());

    app.use('/', require('./routes/router.js'));

    app.use(function(err,req,res,next){
        res.send({error: err._message})
    });

    app.listen(port, function(){
        console.log("Listening on port 4000")
    });
});
