const express = require('express')
const app = express()
const authCtrl = require('./src/controllers/auth')
const { isAuthenticated } = require('./src/middlewares/auth')
const quizzesCtrl = require('./src/controllers/quiz')
const choicesCtrl = require('./src/controllers/choice')
const questCtrl = require('./src/controllers/question')
const pageCtrl = require('./src/controllers/page')
const cors = require('cors')
const bodyParser =require('body-parser')
const session = require('express-session')
app.use(session({
    saveUninitialized: false,
    secret: 'youthful banana',
    cookie: { maxAge: 60000},
    resave: false
    
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "allowCrossDomain": true
}))

app.get('/',(request,response,next)=>{response.render('home/home')})

app.use('/quizzes', isAuthenticated, quizzesCtrl)
app.use('/choices', isAuthenticated, choicesCtrl)
app.use('/questions', isAuthenticated, questCtrl)
app.use('/auth',authCtrl)
app.use('/', pageCtrl)



app.listen(2222)

//Client ID: f9126f0ebd7e06020173
//secret:6681904f7f0371705350bb369cfc627477a268db