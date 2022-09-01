const nodeMailer=require('../config/nodemailer')

module.exports.newComment=(comment)=>{
    console.log("Inside new comment",comment)
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comment_mailer/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'rahulkumar6540288@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:htmlString
    },
    (err,info)=>{
        if(err){
            console.log("error in sending mail")
            return;
        }
        console.log('Message sent',info)
        return
    })
}