const Post=require('../model/post')
const User=require('../model/user')

module.exports.home=function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comment',
        populate:({
            path:'user'
        })
    })
    .exec(function(err, posts){
        User.find({},function(err,user){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users:user
            });
        })
        
    })
}

