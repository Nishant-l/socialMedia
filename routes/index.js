const express=require('express');
const router=express.Router();

const home_controller=require('../controller/home_controller');

router.get('/',home_controller.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));

module.exports=router;
