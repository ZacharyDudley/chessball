'use strict';

var router = require('express').Router();
module.exports = router;

router.use('/games', require('./game.router'))
// router.use('/game', require('./game.router'))

// router.use('/stories', require('./stories/story.router'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
