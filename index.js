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
const session=require('express-session')




const port=8000

app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(express.static('./assets'))
app.use(expressLayout)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.use('/',require('./routes/index'))
app.set('view engine','ejs')
app.set('views','./views')





app.listen(port,function(e){
    if(e){
        console.log("Error in server",e)
    }
    console.log("Server is running on port : ",port)
})