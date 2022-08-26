const User=require('../model/user')

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:"Profile",
                    user:user
                })
            }
            return res.redirect('/users/sign-in')
        })

    }
    else{
        return res.redirect('/users/sign-in')
    }
}

module.exports.signup=function(req,res){
    return res.render('user_signup',{
        title:'Codeial | Signup'
    })
}

module.exports.signin=function(req,res){
    return res.render('user_signin',{
        title:'Codeial | signin'
    })
}

module.exports.create=function(req,res){
    console.log(req.body.password)
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
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user",err)
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back')
            }
            res.cookie('user_id',user.id)
            return res.redirect('/users/profile')
        }
        else{
            return res.redirect('back')
        }
          
    })
}

module.exports.destroySession=function(req,res){
    res.clearCookie("user_id");
    return res.redirect('/users/sign-in')
    }
