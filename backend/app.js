var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const cors = require('cors');

const storageAudio = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"./public/audios")
    },
    filename: (req,file,cb) =>{
        let name = Date.now() + "-" + file.originalname
        cb(null,name)
    }

})

const storageImage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"./public/images")
    },
    filename: (req,file,cb) =>{
        let name = Date.now() + "-" + file.originalname
        cb(null,name)
    }

})

const uploadAudio = multer(
    {
        storageAudio: storageAudio
    })

const uploadImage = multer(
    {
        storageImage: storageImage
    })

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');
const collaborationsRouter = require('./routes/collaborations');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/collaborations', collaborationsRouter);

app.post('/upload/audio',uploadAudio.single("audio"),(req,res,next) =>{
    console.log("file",req.file) 
    console.log("body",req.body)
    let audioURL = "http://localhost:3001" + req.file.path.replace('public','')
    res.json({
        message: "file uploaded",
        audioUrl: audioURL
    })
} )

app.post('/upload/image',uploadImage.single("image"),(req,res,next) =>{
    console.log("file",req.file) 
    console.log("body",req.body)
    let imageURL = "http://localhost:3001" + req.file.path.replace('public','')
    res.json({
        message: "file uploaded",
        imageUrl: imageURL
    })
} )

module.exports = app;
