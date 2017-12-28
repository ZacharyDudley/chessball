'use strict';
const firebase = require('../firebase')
const router = require('express').Router()


router.get('/:gameId', function (req, res, next) {
  firebase.ref(`/${req.params.gameId}`).once('value')
  .then(snap => res.status(200).send(snap.val()))
  .catch(err => next(err))
})

router.post('/', function (req, res, next) {
  firebase.ref('/').push(req.body)
  .then(snap => res.status(201).send(snap.key))
  .catch(err => next(err))
})

module.exports = router;
