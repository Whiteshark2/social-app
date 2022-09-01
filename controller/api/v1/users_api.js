const User=require('../../../model/user')
const jwt=require('jsonwebtoken')


module.exports.createSession=async function(req,res){
    try{
        let user= await User.findOne({email:req.body.email})
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid userid/password"
            })
        }
        return res.json(200,{
            message:"Signin successful,here is token",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'900000'})
            }
        })

    }catch(err){
        console.log("*****",error)
        return res.json(500,{
            message:"Invalid servor error"
        })
    }
}