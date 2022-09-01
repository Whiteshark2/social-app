const expres=require('express')
const router=expres.Router()


router.use('/posts',require('./post'))
router.use('/users',require('./users'))
module.exports=router