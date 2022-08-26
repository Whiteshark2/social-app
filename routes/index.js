const expres=require('express')
const router=expres.Router()
const homeController=require('../controller/home_controller')



router.get('/',homeController.home)
router.use('/users',require('./user'))



module.exports=router