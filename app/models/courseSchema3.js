var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({

    honors: Boolean,

    CRN: String,

    dept: String,

    courseNum: String,

    section: String,

    profName: String,

    meetings: [{
        type: String
    }]

});

const course = mongoose.model('course', courseSchema);

module.exports = course;