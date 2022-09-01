const expres=require('express')
const router=expres.Router()
const homeController=require('../controller/home_controller')



router.get('/',homeController.home)
router.use('/users',require('./user'))
router.use('/posts',require('./post'))
router.use('/comments',require('./comment'))
router.use('/api',require('./api'))



module.exports=router