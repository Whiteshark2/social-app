const Post=require('../model/post')
const Comment=require('../model/comment')

module.exports.create= async function(req,res){
    try{
        const post=await Post.create({
            content:req.body.content,
            user:req.user.id
        })
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },message:"post created"
            })
        }
            return res.redirect('back');
    }catch(err){
        console.log("error in creating post",err)
        return
    }
}
module.exports.destroy= async function(req,res){
    try{
        const post= await Post.findById(req.params.id)
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id})
            return res.redirect('back')
        }
    }catch(err){
        if(err){
             console.log("error in destroying post",err)
             return
        }
    }
}