const { urlencoded } = require('express')
const express=require('express')
const app=express()
const expressLayout=require('express-ejs-layouts')
const db=require('./config/mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
//used for session cookie
const passport=require('passport')
const localStrategy=require('./config/passport-local-strategy')
const passportJwt=require('./config/passport-jwt-strategy')
const passportGoogle=require('./config/passport-google-oauth2-strategy')
const session=require('express-session')
const mongoStore=require('connect-mongo')
const sassMiddleware = require('node-sass-middleware');
const flash=require('connect-flash')
const customMware=require('./config/middleware')




app.use(sassMiddleware({
    src:'./assets/sass',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'

}))




const port=8000

app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(express.static('./assets'))
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(expressLayout)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.set('view engine','ejs')
app.set('views','./views')
app.use(session({
    name:'codeail',
    secret:'monkey',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*100
    },
    store: mongoStore.create({
        mongoUrl:'mongodb://localhost:27017/social_development',
        auotRemove:'disabled'
    },function(err){
        if(err){
            console.log("error in mongo connect")
        }
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setauthenticatedUser)
app.use(flash())
app.use(customMware.setFlash)


app.use('/',require('./routes/index'))


app.listen(port,function(e){
    if(e){
        console.log("Error in server",e)
    }
    console.log("Server is running on port : ",port)
})