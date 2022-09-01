const nodemailer=require('nodemailer')
const ejs=require('ejs')
const path=require('path')
const SMTPConnection = require('nodemailer/lib/smtp-connection')

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'rahulkumar6540288@gmail.com',
        pass:'towcbirmfyypcpey'
    }
})

let renderTemplate=(data,relativePath)=>{
    let mailHTML
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering mail template")
                return;
            }
            mailHTML=template
        }
    )
    return mailHTML
}


module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}