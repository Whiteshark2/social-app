const Comment=require('../model/comment')
const Post=require('../model/post')
const commentsMailer=require('../mailers/comment_mailer')

module.exports.create= async function(req,res){
    try{
        const post= await Post.findById(req.body.post)
        if(post){
            let comment= await Comment.create({
                content:req.body.content,
                user:req.user.id,
                post:req.body.post
            })
                post.comment.push(comment)
                post.save()
                comment=await comment.populate('user','name email')
                commentsMailer.newComment(comment)

                return res.redirect('/')
        }

    }catch(err){
        if(err){
            console.log("Error in creating comment",err)
            return
        }

    }
}
    


module.exports.destroy= async function(req,res){
    try{
        const comment= await Comment.findById(req.params.id)
        if(comment){
            let postId=comment.post;
            comment.remove;
            let post = await Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
            return res.redirect('back')
        }

    }catch(err){
        if(err){
            console.log('error in destroying comment',err)
            return
        }

    }
} 