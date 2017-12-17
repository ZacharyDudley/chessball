'use strict';

var router = require('express').Router();
module.exports = router;

router.use('/game', require('./field.router'))
router.use('/team', require('./team.router'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
