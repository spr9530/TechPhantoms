const mongoose = require('mongoose');


const studentRegistration = new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    // phone:{
    //     type:Number,
    // },
    // qualification:{
    //     type:String,
    // },
    // Institution:{
    //     type: String,
    // }

})

const studentSchema  = new mongoose.model("studentData", studentRegistration);

module.exports = studentSchema;