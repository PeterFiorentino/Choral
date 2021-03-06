var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const bodyParser = require('body-parser');

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
        storage: storageAudio
    })

const uploadImage = multer(
    {
        storage: storageImage
    })

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reefsRouter = require('./routes/reefs');
const collaborationsRouter = require('./routes/collaborations');
const authRouter = require('./routes/auth');
const followRouter = require('./routes/following')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("NOT_A_GOOD_SECRET"));

app.use(
  session({
    secret: "NOT_A_GOOD_SECRET",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/reefs', reefsRouter);
app.use('/api/collaborations', collaborationsRouter);
app.use('/api/auth', authRouter);
app.use('/api/follows', followRouter);

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