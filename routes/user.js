const express=require('express')
const passport = require('passport')
const router=express.Router()
const userController=require('../controller/user_controller')


router.get('/profile/:id',passport.checkAuthentication,userController.profile)

router.post('/update/:id',passport.checkAuthentication,userController.update)

router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)
router.post('/create',userController.create)
router.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/users/sign-in'}
),userController.createSession)
router.get('/signout',userController.destroySession)



router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}),userController.createSession);

module.exports=router