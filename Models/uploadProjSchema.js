const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({

    title:{
        type:String,
        require: true,
    },
    Description:{
        type:String,
        require: true,
    },
    mainImage:{
        type:String,
        require:true,
    },
    image1:{
        type:String,
        require:true,
    },
    image2:{
        type:String,
        require:true,
    },
    image3:{
        type:String,
        require:true,
    },
    image4:{
        type:String,
    },
    image5:{
        type:String,
    },
    image6:{
        type:String,
    },
    id:{
        type:String,
        required:true,
    },
})

const product =  mongoose.model('productInfo', uploadSchema)
module.exports = product;