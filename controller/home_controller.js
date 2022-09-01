const Post=require('../model/post')
const User=require('../model/user')

module.exports.home=async function(req,res){
    try{
        const posts= await Post.find({}).sort('-createdAt')
    .populate('user')
    .populate({
        path:'comment',
        populate:({
            path:'user'
        })
    })
    const user= await User.find({})
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users:user
            })

    }catch(err){
        if(err){
            console.log("error",err)
            return
        }
    }
        
    }



    