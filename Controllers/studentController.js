//     
//   _|__|_
//  /(.)(.)\
// / |    | \
//  (__()__)
//    /   \
//   /     \

const asyncHandler = require('express-async-handler')
const studentSchema = require('../Models/studentRegSchema');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId; 
require("dotenv").config();
const nodemailer = require("nodemailer")
const product = require('../Models/uploadProjSchema')
var otp;
var regobj;

const verify = asyncHandler(async (req,res)=>{
    
    const eotp = req.body.otp;
    if(otp == eotp)
    {
         try{
                const data = new studentSchema({
                    firstName:regobj.firstname,
                    lastName:regobj.lastname,
                    email:regobj.email,
                    password:regobj.pswrd,
                })
                await data.save();
                console.log(data)
                res.redirect('/TechPhantoms/student/login')
            }catch(err){
                res.json({error: 'Unable to register'});
            }
    }
    else{
        res.redirect('/techPhantoms')
    }

})

//method POST
///sRegi
const studentRegistration = asyncHandler(async (req,res,next)=>{


    const pswrd = req.body.pswrd;
    const cpswrd = req.body.confirmpswrd;
    const email = req.body.email;
    const obj = {
     firstname:req.body.firstname,
     lastname : req.body.lastname,
     email : req.body.email,
     vcode : req.body.vcode,
     pswrd : req.body.pswrd,
     cpswrd : req.body.confirmpswrd,
    }

    regobj = obj
    console.log(regobj)
    if(pswrd === cpswrd){
        const hasMail = await studentSchema.findOne({email:email})
        if(!hasMail){
            try{
                 otp =Math.floor(1000+ Math.random()*9000);
                const transporter = nodemailer.createTransport({
                    service:"Gmail",
                    port: 587,
                    auth: {
                        user: process.env.Auth_Email,
                        pass: process.env.Auth_Pass
                    }
                });
                
                async function main() {
                    // send mail with defined transport object
                    const info = await transporter.sendMail({
                      from: process.env.Auth_Email, // sender address
                      to: `${email}`, // list of receivers
                      subject: "Hello ✔", // Subject line
                      text: "TechPhantom", // plain text body
                      html: `<b>${otp}<b>`, // html body
                    });
                }
                main();
                next();
            }catch(err){
                throw err;
            }
            // try{
            //     const data = new studentSchema({
            //         firstName:firstname,
            //         lastName:lastname,
            //         email:email,
            //         password:pswrd,
            //     })
            //     await data.save();
            //     console.log(data)
            // }catch(err){
            //     res.json({error: 'Unable to register'});
            // }
        }
        else{
           res.json({err:'mail already rgister'})
        }
    }else{res.send({"error": "password doesnt match"})}
});


//post
///login

const studentLogin = async (req,res, next)=>{

    const email = req.body.email;
    const password = req.body.pswrd;
    if(email && password){
        const user = await studentSchema.findOne({email: email})
        if(user == null){
            res.send({"err": "email is not registered"})
        }
        else{
            //password amtching
            if((password == user.password) && (email == user.email)){

                const token = jwt.sign({userID: user._id}, process.env.secret_key, {expiresIn:"5m"})
                
                res.cookie('token', token, {
                    expires  : new Date(Date.now() + 9999999),
                    httpOnly : false
                  });
                next()

            }else{
                res.redirect('/TechPhantoms/student/login');
            }
        }
    }else{
        res.json({err: 'Please Enter all Details'});
    }
};

const explore = async(req, res)=>{
    // res.render('explore')
    try {
        const prod = await product.find();
        res.json(prod);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const projectInfo = async(req,res)=>{
    try{
        const item = await product.findOne({id:req.params.id});

        if(item){
            const title = item.title
        const maineImage = item.mainImage
        const image1 = item.image1
        const image2 = item.image2
        const image3 = item.image3
        const image4 =  item.image4
        res.render('projectInfo', {title, maineImage, image1, image2, image3, image4})
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {studentRegistration, studentLogin, verify, explore, projectInfo}