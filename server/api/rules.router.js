'use strict';
const firebase = require('../firebase')
const router = require('express').Router()


router.put('/:gameId', function (req, res, next) {
  console.log('REQ: ', req.body)

  // let updates = {}
  // updates[`/spaces/`]

  // firebase.ref(`/${req.params.gameId}`).once('value')
  // .then(snap => res.status(200).send(snap.val()))
  // .catch(err => next(err))
})

module.exports = router;
