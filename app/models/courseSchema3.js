var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
    start_time: Number,
    end_time: Number,
    days: String
});

var courseSchema = new Schema({

    honors: Boolean,

    CRN: String,

    deptName: String,

    courseNum: String,

    section: String,

    profName: String,

    meetings: [meetingSchema]

});

const course = mongoose.model('course', courseSchema);

module.exports = course;