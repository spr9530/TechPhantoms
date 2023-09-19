const mongoose = require('mongoose');
const uri = "mongodb+srv://9530504126:9530504126@cluster0.rwsrhic.mongodb.net/?retryWrites=true&w=majority"

const connectdb = async()=>{
    try{
        const connect = await mongoose.connect(uri);
        console.log("DB CONNECTED")
    }
    catch{
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectdb;