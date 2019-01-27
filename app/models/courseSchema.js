var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({

    dept: String, //4 letter TAMU department abbreviation
    courseNum: Number,

    applicableRestrictions: Boolean,

    timestamp: Date,

    Sections: [{ 
                    
        sectionNum: Number,

        //A given professor's first and last name should be in the same index of the profLastNames and profFirstNames arrays, respectively.
	//Thus, for a given index i, a a professors' full name can be obtained from profFirstNames[i] + profLastNames[i].
        profLastNames: [{ type: String }],
        profFirstNames: [{ type: String }],

        meetings: [{

            startTime: { hr: Number, min: Number },
            endTime: { hr: Number, min: Number },
            duration: { hr: Number, min: Number },
            
            daysOfWeek: [{ type: String }], //M-F, S (for Sunday), A (for Saturday)

        }],

        restrictions: [{

            restrictionText: String,

            applicable: Boolean,

        }],

    }], //end Sections

});

const course = mongoose.model('course', courseSchema);

module.exports = course;