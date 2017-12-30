'use strict';
const firebase = require('../firebase')
const router = require('express').Router()

const isSpaceNeighbor = (oldSpaceCoords, newSpaceCoords) => {
  return (
    Math.abs(oldSpaceCoords[0] - newSpaceCoords[0]) <= 1 &&
    Math.abs(oldSpaceCoords[0] - newSpaceCoords[0]) >= 0 &&
    Math.abs(oldSpaceCoords[1] - newSpaceCoords[1]) <= 1 &&
    Math.abs(oldSpaceCoords[1] - newSpaceCoords[1]) >= 0
  )
}

const isSpaceFree = (newSpace) => {
  return !newSpace.hasPlayer && !newSpace.hasBall
}

const isValidPlayerMove = (oldSpace, newSpace) => {
  return isSpaceNeighbor(oldSpace.coords, newSpace.coords) && isSpaceFree(newSpace)
}

router.put('/:gameId/movePlayer', function (req, res, next) {

  let updates = {}
  updates[`/spaces/${req.body.oldSpace.id}/hasPlayer`] = ''
  updates[`/spaces/${req.body.newSpace.id}/hasPlayer`] = req.body.oldSpace.hasPlayer


  //CHECK IF SPACES ARE NEIGHBORS
  if (isValidPlayerMove(req.body.oldSpace, req.body.newSpace)) {
    firebase.ref(`/${req.params.gameId}`).update(updates)
    .then(snap => res.sendStatus(200))
    .catch(err => next(err))
  } else {
    console.log('Not updated')
  }

})

router.put('/:gameId', function (req, res, next) {
  // console.log('REQ: ', req.body)

  // let updates = {}
  // updates[`/spaces/`]

  // firebase.ref(`/${req.params.gameId}`).once('value')
  // .then(snap => res.status(200).send(snap.val()))
  // .catch(err => next(err))
})

module.exports = router;
