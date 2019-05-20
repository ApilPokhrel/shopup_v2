'use strict';
const router = require('express').Router();
const auth = require('../src/auth/AuthRoutes');

router.use('/api/v1/auth', auth);


module.exports = router;