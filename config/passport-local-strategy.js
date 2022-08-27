const passport=require('passport')
const localStrategy=require('passport-local').Strategy
const User=require('../model/user')



passport.use(new localStrategy({
    usernameField:'email'
},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("Error in finding user ")
            return done(err)
        }
        if(!user || user.password!=password){
            console.log("Invalid email or password")
            return done(null,false)
        }
        return done(null,user)
    })
}))


//sending cookies to browser

passport.serializeUser(function(user,done){
    done(null,user.id)
})

//get cookie in browserr

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user')
            return done(err)
        }
        return done(null,user)
    })
})


passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
    return next();
    }
    return res.redirect('/users/sign-in')
}

passport.setauthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user
    }
    return next()
}

module.exports=passport