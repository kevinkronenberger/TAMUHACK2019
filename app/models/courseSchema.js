var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({

    dept: String, //4 letter TAMU department abbreviation
    courseNum: Number,

    applicableRestrictions: Boolean,

    timestamp: Date,

    Sections: [{ 
                    
        sectionNum: Number,

        profLastName: String, 
        profFirstName: String,

        meetings: [{

            startTime: { hr: Number, min: Number },
            endTime: { hr: Number, min: Number },
            duration: { hr: Number, min: Number },
            
            daysOfWeek: [{ type: String }], //M-F, S (for Sunday), A (for Saturday)

            //Possible feature: Add type to differentiate between recitations, lectures, etc.

        }],

        restrictions: [{

            restrictionText: String,

            applicable: Boolean,

        }],

    }], //end Sections

});

const course = mongoose.model('course', courseSchema);

module.exports = course;