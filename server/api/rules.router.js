'use strict';
const firebase = require('../firebase')
const router = require('express').Router()

const isBallOriginValid = (spaceStart, ball) => {
  return spaceStart.type === 'ball' && spaceStart.id === ball.locationId
}

const isChosenSpaceFree = spaceEnd => {
  return spaceEnd.type === ''
}

const isValidDirection = (spaceStart, spaceEnd) => {
  const [ startX, startY ] = spaceStart.coords
  const [ endX, endY ] = spaceEnd.coords

  const deltaX = Math.abs(startX - endX)
  const deltaY = Math.abs(startY - endY)

  const possibilities = [
    [0, 3],
    [0, 2],
    [0, 1],
    [1, 1],
    [1, 0],
    [2, 2],
    [2, 0],
    [3, 3],
    [3, 0],
  ]

  return possibilities.includes([deltaX, deltaY])
}

const getDirection = (spaceStart, spaceEnd) => {
  const [ startX, startY ] = spaceStart.coords
  const [ endX, endY ] = spaceEnd.coords
  let dirX, dirY

  if (startX > endX) {
    dirX = 'left'
  } else if (startX < endX) {
    dirX = 'right'
  } else {
    dirX = 'center'
  }

  if (startY > endY) {
    dirY = 'up'
  } else if (startY < endY) {
    dirY = 'down'
  } else {
    dirY = 'center'
  }

  return [dirX, dirY].join('-')
}

const getPath = (spaceStart, dir, dist) => {
  let [ startX, startY ] = spaceStart.coords

  const direction = {
    'left-up':       [ -1, -1 ],
    'center-up':     [ 0, -1 ],
    'right-up':      [ 1, -1 ],
    'left-center':   [ -1, 0 ],
    'right-center':  [ 1, 0 ],
    'left-down':     [ -1, 1 ],
    'center-down':   [ 0, 1 ],
    'right-down':    [ 1, 1 ],
  }

  const rightDir = direction[dir]
  const spacesInPath = []

  for (var i = 0; i < dist; i++) {
    startX += rightDir[0]
    startY += rightDir[1]
    spacesInPath.push([startX, startY])
  }

  return spacesInPath
}

const isValidBallMove = (spaceStart, spaceEnd, ball) => {
  return isBallOriginValid(spaceStart, ball)
    && isValidDirection(spaceStart, spaceEnd)
    && isChosenSpaceFree(spaceEnd)
    // && isPathClear()
}

const isSpaceNeighbor = (oldSpaceCoords, newSpaceCoords) => {
  return (
    Math.abs(oldSpaceCoords[0] - newSpaceCoords[0]) <= 1 &&
    Math.abs(oldSpaceCoords[0] - newSpaceCoords[0]) >= 0 &&
    Math.abs(oldSpaceCoords[1] - newSpaceCoords[1]) <= 1 &&
    Math.abs(oldSpaceCoords[1] - newSpaceCoords[1]) >= 0
  )
}


const isValidMove = (oldSpace, newSpace) => {
  return isSpaceNeighbor(oldSpace.coords, newSpace.coords) && isChosenSpaceFree(newSpace)
}

router.put('/:gameId/movePlayer', function (req, res, next) {

  let updates = {}
  updates[`/spaces/${req.body.oldSpace.id}/type`] = ''
  updates[`/spaces/${req.body.oldSpace.id}/typeId`] = ''
  updates[`/spaces/${req.body.newSpace.id}/type`] = req.body.oldSpace.type
  updates[`/spaces/${req.body.newSpace.id}/typeId`] = req.body.oldSpace.typeId


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
  let oldSpace, newSpace, ball

  firebase.ref(`${req.params.gameId}`).once('value')
  .then(snap => {
    oldSpace = snap.val().spaces[`${req.body.oldSpace.id}`]
    newSpace = snap.val().spaces[`${req.body.newSpace.id}`]
    ball = snap.val().ball

    console.log('OLD', oldSpace)
    console.log('NEW', newSpace)
    console.log('BALL', ball)
  })

  let updates = {}
  updates[`/ball/locationId`] = req.body.newSpace.id
  updates[`/spaces/${req.body.oldSpace.id}/type`] = ''
  updates[`/spaces/${req.body.newSpace.id}/type`] = 'ball'

  // firebase.ref(`${req.params.gameId}/spaces`).transaction(spaces => {
  //   return (spaces[`${req.body.oldSpace.id}`], spaces[`${req.body.newSpace.id}`])
  // })
  // .then(snap => {
  //   console.log(snap)
  // })
  // .catch(err => next(err))

  // //CHECK IF SPACES ARE NEIGHBORS
  // if (isValidMove(req.body.oldSpace, req.body.newSpace)) {
  //   firebase.ref(`/${req.params.gameId}`).update(updates)
  //   .then(snap => {
  //     console.log('BALL SNAP DATA', res.data)
  //     res.sendStatus(200)
  //   })
  //   .catch(err => next(err))
  // } else {
  //   console.log('BALL not updated')
  // }
})

module.exports = router;
