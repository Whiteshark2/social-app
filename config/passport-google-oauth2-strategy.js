const passport=require('passport')
const googleStrategy=require('passport-google-oauth2').Strategy
const User=require('../model/user')
const randomString=require('randomstring')


passport.use(new googleStrategy({
    clientID:'194964049778-f2vvh4p5fh5qunj9cjch4dcpkneh3cot.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:"http://localhost:8000/users/auth/google/callback",

},function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value},function(err,user){
        if(err){
            console.log("Error in google Strategy",err)
            return
        }
        if(user){
            return done(null,user)
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:randomString.generate(10)

            },function(err,user){
                if(err){
                    console.log("error in creating google auth ",err)
                    return
                }
                return done(null,user)
            })
        }
    })
}))


module.exports=passport