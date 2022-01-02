const express = require('express');
const passport = require('passport');
const router = express.Router();
const commentsController = require('../controller/commentsController');

router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/deleteComment/:id',passport.checkAuthentication,commentsController.deleteComment);

module.exports = router;