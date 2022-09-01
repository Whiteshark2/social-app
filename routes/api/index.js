const expres=require('express')
const router=expres.Router()


router.use('/v1',require('./v1'))
module.exports=router