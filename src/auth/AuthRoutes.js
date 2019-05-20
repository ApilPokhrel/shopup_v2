'use strict';
const router = require('express').Router();
const AuthController = require('./AuthController');
const auth = require('../../middleware/Authenticate');
const { catchError } = require('../../handler/ErrorHandler');

router.post('/login',auth.restrict, catchError(AuthController.login));
router.post('/register',auth.restrict, catchError(AuthController.register));
router.delete('/logout', auth.user, catchError(AuthController.logout));

module.exports = router;
