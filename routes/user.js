const express=require('express')
const passport = require('passport')
const router=express.Router()
const userController=require('../controller/user_controller')


router.get('/profile',passport.checkAuthentication,userController.profile)
router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)
router.post('/create',userController.create)
router.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/users/sign-in'}
),userController.createSession)
router.get('/signout',userController.destroySession)

module.exports=router