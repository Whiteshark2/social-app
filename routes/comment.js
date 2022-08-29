const expres=require('express')
const router=expres.Router()
const passport=require('passport')

const commentController=require('../controller/comment_controller')

router.post('/create',commentController.create)

router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy)

module.exports=router