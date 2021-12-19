const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controller/users_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/signIn',usersController.signIn);

router.get('/signUp',usersController.signUp);

router.post('/create',usersController.create);
// use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signIn'},
),usersController.createSession);
module.exports = router;

router.get('/destroy-session',usersController.destroySession);