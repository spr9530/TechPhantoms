const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose'); 
app.use(express.urlencoded({extended:false}))
app.use(express.json());
const {studentRegistration,
    studentLogin,
    verify,
    explore,
    projectInfo} = require('../Controllers/studentController.js')
    
const path = require('path');
const static_path = path.join(__dirname, 'public');
app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path))
app.use(express.json());

    const verification = require('../middleware/authorisation')
// sRegi -- college registration


const connectDatabase = require('../dataBase/database.js')




router.route('/registration').get((req, res)=>{
    res.render('studentRegi')
});

router.post('/registration',studentRegistration, (req,res)=>{
    res.redirect('/TechPhantoms/student/verify')
})
router.get('/verify',(req,res, next)=>{
    res.render('otp')
})
router.post('/verify',verify)

router.route('/login').get((req, res)=>{
    res.render('loginstu')
});
router.route('/login').post(studentLogin, (req, res)=>{
    res.render('userhome')
});

//private Route
// router.route('/explore').get(verification, (req,res)=>{
// res.render('homepage')
// });
router.route('/').get(verification,(req,res)=>{
    res.render('userhome')
});

router.route('/explore').get(verification,(req,res)=>{
    res.render('explore')
})
// router.get('/projectInfo', (req,res)=>{
//     res.render('projectInfo')
// })


//backend workigs
router.route('/backend').get(explore);
router.route('/project/:id').get(projectInfo)

module.exports = router;