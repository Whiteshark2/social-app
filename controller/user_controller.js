const User=require('../model/user')
const passport=require('passport')

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,users){
        return res.render('user_profile',{
            title:"Profile",
            profile_user:users
        })
    })
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_signup',{
        title:'Codeial | Signup'
    })
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_signin',{
        title:'Codeial | signin'
    })
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log(err,"Error in finding user")
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log(err,"Error in creating user")
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back')
        }
       

    })
    
};

module.exports.createSession= function(req,res){
   return res.redirect('/')
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log("Error in finding user",err)
    //         return;
    //     }
    //     if(user){
    //         if(user.password!=req.body.password){
    //             return res.redirect('back')
    //         }
    //         res.cookie('user_id',user.id)
    //         return res.redirect('/users/profile')
    //     }
    //     else{
    //         return res.redirect('back')
    //     }
          
    // })
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
        console.log("error in logging out")
        }
        return;
    })
    return res.redirect('/users/sign-in')
    }

module.exports.update=function(req,res){
    if(req.user.id=req.params.id)
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        return res.redirect('back')
    })
    else{
        return res.status(401).send('unauthorised')
    }
}