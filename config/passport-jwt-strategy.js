 const passport =require('passport')
 const JwtStrategy=require('passport-jwt').Strategy
 const ExtractJWT=require('passport-jwt').ExtractJwt
 const User=require('../model/user')


 var opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),secretOrKey:'codeial'
 }

 passport.use(new JwtStrategy(opts, function(jwt_payload,done){
    User.findById(jwt_payload.id,function(err,user){
        if(err){
            console.log("Error from jwt",err)
            return
        }
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
 }))

 module.exports=passport