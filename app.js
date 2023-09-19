const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const hbs = require('hbs');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser')


//Database
const connectDatabase = require('./dataBase/database.js')
connectDatabase();


//firebase
const firebaseConfig = require('./config/fireBase.js')
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const base = initializeApp(firebaseConfig);

const uploadSchema = require('./Models/uploadProjSchema.js')


const app = express();
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, 'views'))


const static_path = path.join(__dirname, 'public');
//Middle wares
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path))
app.use(express.json());


hbs.registerPartials(path.join(__dirname, '/partial'));


// Routes
app.use('/TechPhantoms/college', require('./Routes/collegeRoutes'));
app.use('/TechPhantoms/student', require('./Routes/studentRoutes'));


app.get('/TechPhantoms',(req,res,next)=>{
    const hasCookie = req.cookies.token;
    if(hasCookie)
    {
        res.clearCookie("token");
        res.status(200).render('logout');
    }
    else{
        next();
    }
}, (req, res) => {
    res.render('welcomepage')
})
app.get('/check', (req, res) => {
    res.render('userhome');
})

app.use(express.static(__dirname));

const storage = getStorage()

const upload = multer({ storage: multer.memoryStorage() });
app.post('/TechPhantoms/college/upload', upload.array('image', 6), async (req, res) => {

    try {

        const obj = [];
        const dateTime = new Date();

        const uploadedFile = req.files;

        for (const file of uploadedFile) {

            const storageRef = ref(storage, `files/${file.originalname + "     " + dateTime}`);

            const metadata = {
                contentType: file.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

            const downloadURL = await getDownloadURL(snapshot.ref);

            obj.push({
                imageUrl: downloadURL,
            });
        }
        if(!obj[2]){
            res.send({'err':'ee'})
        }
        if(obj[0] && obj[1] && obj[2] && obj[3]){
            if(!obj[4]){
                obj.push({
                    imageUrl:"",
                });
            }
            if(!obj[5]){
                obj.push({
                    imageUrl:"",
                });
            }
            if(!obj[6]){
                obj.push({
                    imageUrl:"",
                });

                res.redirect('/TechPhantoms/college/upload/done')
                const currdate = new Date();
                const time = currdate.getTime();
                const randomSuffix = Math.floor(Math.random() * 1000);

                const id = `${time}${randomSuffix}`

                const data = new uploadSchema({
                    title:req.body.title,
                    mainImage:obj[0].imageUrl,
                    image1:obj[1].imageUrl,
                    image2:obj[2].imageUrl,
                    image3:obj[3].imageUrl,
                    image4:obj[4].imageUrl,
                    image5:obj[5].imageUrl,
                    image6:obj[6].imageUrl,
                    id:id,
                })
                await data.save();
            }
            else{
                res.send({'error':'Please add atleast 3 Images'})
            }
            

        }
        
    }
    catch (err) {
        console.log(err);
    }

})

app.get('/', (req, res) => {
    res.render('welcomepage');
})




app.listen('4001', () => {
    console.log('SERVER STARTED');
})

