const Post=require('../../../model/post')
const Comment=require('../../../model/comment')
module.exports.index= async function(req,res){
    const posts= await Post.find({}).sort('-createdAt')
    .populate('user')
    .populate({
        path:'comment',
        populate:({
            path:'user'
        })})
    return res.json(200,{
        message:"list of post",
        post:posts
    })
}

module.exports.destroy= async function(req,res){
    try{
        const post= await Post.findById(req.params.id)
        // if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id})
            return res.json(200,{
                message:"Post and its associated comment deleted"
            })
        // } 
  }
    catch(err){

        return res.json(501,{
            message:"inernal server error"
        })
    }
}