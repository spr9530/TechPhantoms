const mongoose = require('mongoose');


const CollegeRegistration = new mongoose.Schema({

    collegeName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    collegeID:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },

})

const collegSchema  = new mongoose.model("CollegeData", CollegeRegistration);

module.exports = collegeSchema;