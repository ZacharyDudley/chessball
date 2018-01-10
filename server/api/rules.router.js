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

const isValidMove = (oldSpace, newSpace) => {
  return isSpaceNeighbor(oldSpace.coords, newSpace.coords) && isSpaceFree(newSpace)
}

router.put('/:gameId/movePlayer', function (req, res, next) {

  let updates = {}
  updates[`/spaces/${req.body.oldSpace.id}/hasPlayer`] = ''
  updates[`/spaces/${req.body.newSpace.id}/hasPlayer`] = req.body.oldSpace.hasPlayer


  //CHECK IF SPACES ARE NEIGHBORS
  if (isValidMove(req.body.oldSpace, req.body.newSpace)) {
    firebase.ref(`/${req.params.gameId}`).update(updates)
    .then(snap => res.sendStatus(200))
    .catch(err => next(err))
  } else {
    console.log('PLAYER not updated')
  }

})

router.put('/:gameId/moveBall', function (req, res, next) {

  let updates = {}
  updates[`/ball/locationId`] = req.body.newSpace.id
  updates[`/spaces/${req.body.oldSpace.id}/hasBall`] = false
  updates[`/spaces/${req.body.newSpace.id}/hasBall`] = true


  //CHECK IF SPACES ARE NEIGHBORS
  if (isValidMove(req.body.oldSpace, req.body.newSpace)) {
    firebase.ref(`/${req.params.gameId}`).update(updates)
    .then(snap => {
      console.log('BALL SNAP DATA', res.data)
      res.sendStatus(200)
    })
    .catch(err => next(err))
  } else {
    console.log('BALL not updated')
  }
})

module.exports = router;
