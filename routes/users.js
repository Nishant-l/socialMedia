const express=require('express');
const router=express.Router();

const usersController=require('../controller/users_controller');

router.get('/profile',usersController.profile);

router.get('/signIn',usersController.signIn);

router.get('/signUp',usersController.signUp);

router.post('/create',usersController.create);

module.exports = router;