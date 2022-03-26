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


app.get('/', (req, res)=>{
    res.render('home')
})
// export app

module.exports = app;