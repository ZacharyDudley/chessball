'use strict';
// const firebase = require('firebase')
// const db = firebase.database()
const firebase = require('../firebase')
const router = require('express').Router()

// var HttpError = require('../../utils/HttpError');
// var User = require('./user.model');
// var Story = require('../stories/story.model');

router.get('/', function (req, res, next) {
  console.log('HERE')
  const { gameId } = req.body
  // firebase.ref(`/games/${gameId}/`).on('value', snap => {
  firebase.ref(`/${gameId}`).once('value')
    .then(snap => {
      res.send(snap.val())
    })
})

router.post('/', function (req, res, next) {
  // firebase.ref('/').push(req.body, err => {
  //   if (err) {
  //     res.sendStatus(500)
  //   } else {

  //     res.sendStatus(201)
  //   }
  // })
  firebase.ref('/').push(req.body)
    .then(snap => res.status(201).send(snap.key))
    .catch(err => next(err))
})

// router.param('id', function (req, res, next, id) {
//   User.findById(id)
//   .then(function (user) {
//     if (!user) throw HttpError(404);
//     req.requestedUser = user;
//     next();
//     return null;
//   })
//   .catch(next);
// });



// router.get('/:id', function (req, res, next) {
//   req.requestedUser.reload(User.options.scopes.populated())
//   .then(function (requestedUser) {
//     res.json(requestedUser);
//   })
//   .catch(next);
// });

// router.put('/:id', function (req, res, next) {
//   req.requestedUser.update(req.body)
//   .then(function (user) {
//     res.json(user);
//   })
//   .catch(next);
// });

// router.delete('/:id', function (req, res, next) {
//   req.requestedUser.destroy()
//   .then(function () {
//     res.status(204).end();
//   })
//   .catch(next);
// });

module.exports = router;
