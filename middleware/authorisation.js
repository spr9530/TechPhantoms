const studentSchema = require('../Models/studentRegSchema');
const jwt = require('jsonwebtoken')

const verification = async (req,res,next)=>{
    let token;
    const authorization = req.cookies.token;
    console.log(authorization)
    if((authorization)){
        try{
            token = authorization;
            const userId = jwt.verify(token, process.env.secret_key, (err, decodedToken)=>{
                if(err){
                    res.send({'err': 'You are authorised'});
                }
                else{
                    next();
                }
            })

            // req.user = await studentSchema.findById(userId).select(-password)

        }catch(error){
            res.redirect('/TechPhantoms/student/login');
        }
    }
    if(!token){
        res.redirect('/TechPhantoms/student/login');
    }
}

module.exports = verification