const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary =require('cloudinary').v2

cloudinary.config({
    // cloud_name : process.env.CLOUD_NAME
    cloud_name : "dr0586m1l",
    api_key : "453134643571718",
    api_secret : "-drrxb7s6CVkPZGmDDwmy1eErAA"
})

app.set('view engine', 'ejs');
// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and file upload middlewares
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))
// morgan middleware
app.use(morgan("tiny"));

// routes
const home = require("./routes/home");

// router middleware
app.use("/api/v1", home);
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('home')
})

app.post("/mypost",async(req,res)=>{
    console.log(req.body);
    console.log(req.files);

    let result;
    let imageArray = [];
    let imageArray2 = [];
    if(typeof(req.files.Legal) == "object")
    {
        result = await cloudinary.uploader.upload(req.files.Legal.tempFilePath,{
            folder : 'Legal'
        }) ;
        imageArray.push({
            public_id : result.public_id,
            secure_URL : result.secure_url
        })
    }
    else
    {
        
    for (let index = 0; index < req.files.Legal.length; index++) {
        console.log(req.files.Legal[index].tempFilePath)
        result = await cloudinary.uploader.upload(req.files.Legal[index].tempFilePath,{
            folder : 'Legal'
        }) ;
        imageArray.push({
            public_id : result.public_id,
            secure_URL : result.secure_url
        })
        }
    }
    if(typeof(req.files.Pics) == "object")
    {
        result = await cloudinary.uploader.upload(req.files.Pics.tempFilePath,{
            folder : 'Pics'
        }) ;
        imageArray2.push({
            public_id : result.public_id,
            secure_URL : result.secure_url
        })
    }
    else
    {
        
    for (let index = 0; index < req.files.Pics.length; index++) {
        console.log(req.files.Pics[index].tempFilePath)
        result = await cloudinary.uploader.upload(req.files.Pics[index].tempFilePath,{
            folder : 'Pics'
        }) ;
        imageArray2.push({
            public_id : result.public_id,
            secure_URL : result.secure_url
        })
        }
    }
    // let file = req.files.Legal

    // result = await cloudinary.uploader.upload(file.tempFilePath,{
    //     folder: 'users'
    // })

    // console.log(result);
    details = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        result : result,
        imageArray,
        imageArray2
    }
    console.log(details)
    res.send(details)
})


// export app

module.exports = app;