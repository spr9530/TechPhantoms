const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const { uploding } = require('../Controllers/collegeController');



// cRegi -- college registration
router.route('/registration').get((req, res)=>{
    res.render('collegeRegi');
});
router.route('/').get((req,res)=>{
    res.render('collegehome')
})
router.route('/login').get((req, res)=>{
    res.render('collegelogin');
} );
router.route('/login').post(async(req, res)=>{
    try{

    const mail = req.body.email;
    const pass = req.body.c_lg_pass;
    const aschic = req.body.c_lg_code;

    const obj = {
        mail,
        pass,
        aschic
    }
    console.log(obj)
    res.render('welcomepage');
    }catch(err){
        console.log(err)
    }
} );
router.route('/profile').get((req, res)=>{
    res.render('collegeProfile')
});
router.route('/challange').get((req,res)=>{
    res.render('postChanlange')
})
router.route('/upload/done').get((req,res)=>{
    res.render('loading')
})
router.get('/upload', (req,res)=>{
    res.render('uploadpage')
})
// router.route('/upload').post(upload.array('image', 6), uploding);
router.route('/chlng').get((req, res)=>{
    res.json({status:'ok'});
} );
router.route('/chlng').post((req, res)=>{
    res.json({status:'ok'});
});


module.exports = router ;

// (cRegis)
// (cRegisDataStoring)
// (cHome)
// (projUpload)
// (postProj)
// (chlngUpload)
// (postChlng)