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

module.exports.create=async function(req,res){
    try{
        if(req.body.password!=req.body.confirm_password){
            return res.redirect('back')
        }
        const user= await User.findOne({email:req.body.email})
            if(!user){
                const user_create= await User.create(req.body)
                    return res.redirect('/users/sign-in')
                }
    }catch(err){
        console.log("error in creating user",err)
        return
    }
    }
        
       

  


module.exports.createSession= function(req,res){
    req.flash('success',"you have logged in")
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
        req.flash('success',"you have Logged out")
        return;
    })
    return res.redirect('/users/sign-in')
    }

module.exports.update=function(req,res){
    if(req.user.id=req.params.id){
        try{
            let user=User.findByIdAndUpdate(req.params.id)
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("error in update *******",err)
                }
                user.name=req.body.name
                user.email=req.body.email
                if(req.file){
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save()
                return res.redirect('back');
            })

        }catch(err){
            return res.redirect('back')

        }
    }
    else{
        return res.status(401).send('unauthorised')
    }
}