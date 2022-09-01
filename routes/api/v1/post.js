const expres=require('express')
const router=expres.Router()

const postsApi=require('../../../controller/api/v1/post_api')


router.get('/',postsApi.index)
router.delete('/:id',postsApi.destroy)

module.exports=router