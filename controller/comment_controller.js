const Comment=require('../model/comment')
const Post=require('../model/post')

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user.id,
                post:req.body.post
            },function(err,comment){
                post.comment.push(comment)
                post.save()
                res.redirect('/')
            })
        }
    })
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment){
            let postId=comment.post;
            comment.remove;
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err,post){
                return res.redirect('back');
            }) 
        }
        else{
            return res.redirect('back')
        }
    })
}