'use strict';
const firebase = require('../firebase')
const router = require('express').Router()

const isBallOriginValid = (spaceStart, ball) => {
  return spaceStart.type === 'ball' && spaceStart.id === ball.locationId
}

const isChosenSpaceFree = spaceEnd => {
  return spaceEnd.type === ''
}

const isDirectionValid = (spaceStart, spaceEnd) => {
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

const isValidBallMove = (spaceStart, spaceEnd, ball) => {
  return isBallOriginValid(spaceStart, ball)
    && isDirectionValid(spaceStart, spaceEnd)
    && isChosenSpaceFree(spaceEnd)
}

// const getDirection = (spaceStart, spaceEnd) => {
//   const [ startX, startY ] = spaceStart.coords
//   const [ endX, endY ] = spaceEnd.coords
//   let dirX, dirY

//   if (startX > endX) {
//     dirX = 'left'
//   } else if (startX < endX) {
//     dirX = 'right'
//   } else {
//     dirX = 'center'
//   }

//   if (startY > endY) {
//     dirY = 'up'
//   } else if (startY < endY) {
//     dirY = 'down'
//   } else {
//     dirY = 'center'
//   }

//   return [dirX, dirY].join('-')
// }

// const getPath = (spaceStart, dir, dist) => {
//   let [ startX, startY ] = spaceStart.coords

//   const direction = {
//     'left-up':       [ -1, -1 ],
//     'center-up':     [ 0, -1 ],
//     'right-up':      [ 1, -1 ],
//     'left-center':   [ -1, 0 ],
//     'right-center':  [ 1, 0 ],
//     'left-down':     [ -1, 1 ],
//     'center-down':   [ 0, 1 ],
//     'right-down':    [ 1, 1 ],
//   }

//   const rightDir = direction[dir]
//   const spacesInPath = []

//   for (var i = 0; i < dist; i++) {
//     startX += rightDir[0]
//     startY += rightDir[1]
//     spacesInPath.push([startX, startY])
//   }

//   return spacesInPath
// }

const isSpaceNeighbor = (oldSpaceCoords, newSpaceCoords) => {
  return (
    Math.abs(oldSpaceCoords[0] - newSpaceCoords[0]) <= 1 &&
    Math.abs(oldSpaceCoords[0] - newSpaceCoords[0]) >= 0 &&
    Math.abs(oldSpaceCoords[1] - newSpaceCoords[1]) <= 1 &&
    Math.abs(oldSpaceCoords[1] - newSpaceCoords[1]) >= 0
  )
}


const isValidPlayerMove = (oldSpace, newSpace) => {
  return isSpaceNeighbor(oldSpace.coords, newSpace.coords) && isChosenSpaceFree(newSpace)
}

/*  ***  PLAYER MOVEMENT ***  */
router.put('/:gameId/movePlayer', function (req, res, next) {

  let updates = {}
  updates[`/spaces/${req.body.oldSpace.id}/type`] = ''
  updates[`/spaces/${req.body.oldSpace.id}/typeId`] = ''
  updates[`/spaces/${req.body.newSpace.id}/type`] = req.body.oldSpace.type
  updates[`/spaces/${req.body.newSpace.id}/typeId`] = req.body.oldSpace.typeId


  //CHECK IF SPACES ARE NEIGHBORS
  if (isValidPlayerMove(req.body.oldSpace, req.body.newSpace)) {
    firebase.ref(`/${req.params.gameId}`).update(updates)
    .then(snap => res.sendStatus(200))
    .catch(err => next(err))
  } else {
    console.log('PLAYER not updated')
  }

})


/*  ***  BALL MOVEMENT ***  */
router.put('/:gameId/moveBall', function (req, res, next) {

  let updates = {}
  const game = firebase.ref(`${req.params.gameId}`)

  game.once('value')
  .then(snap => {
    const spaceStart = snap.val().spaces[`${req.body.spaceStartId}`]
    const ball = snap.val().ball
    let spacesInPath = req.body.spacesPathIds.map(space => {
      return snap.val().spaces[space]
    });

    for (var i = 0; i < spacesInPath.length; i++) {
      if (spacesInPath[i].type) {
        console.log('BLOCKED HERE: ', spacesInPath[i])
        break
      }
      console.log('OKAY: ', spacesInPath[i])
    }
    const spaceEnd = spacesInPath[i - 1]

    console.log('END GOAL: ', snap.val().spaces[`${req.body.spaceEndId}`])
    console.log('BLOCK: ', spaceEnd)

    updates[`/ball/locationId`] = spaceEnd.id
    updates[`/ball/coords`] = spaceEnd.coords
    updates[`/spaces/${req.body.spaceStartId}/type`] = ''
    updates[`/spaces/${spaceEnd.id}/type`] = 'ball'

    return updates
  })
  .then(newData => {
    game.update(newData)
    .then(snap => res.sendStatus(200))
    .catch(err => next(err))
  })

// firebase.ref(`${req.params.gameId}`).once('value')
  // .then(snap => {
  //   const spaceStart = snap.val().spaces[`${req.body.spaceStartId}`]
  //   const ball = snap.val().ball
  //   let spacesInPath = req.body.spacesPathIds.map(space => {
  //     return snap.val().spaces[space]
  //   });

  //   for (var i = 0; i < spacesInPath.length; i++) {
  //     if (spacesInPath[i].type) {
  //       console.log('BLOCKED HERE: ', spacesInPath[i])
  //       break
  //     }
  //     console.log('OKAY: ', spacesInPath[i])
  //   }
  //   const spaceEnd = spacesInPath[i - 1]

  //   console.log('END GOAL: ', snap.val().spaces[`${req.body.spaceEndId}`])
  //   console.log('BLOCK: ', spaceEnd)

  //   let updates = {}
  //   updates[`/ball/locationId`] = spaceEnd.id
  //   updates[`/spaces/${req.body.spaceStartId}/type`] = ''
  //   updates[`/spaces/${spaceEnd.id}/type`] = 'ball'

  //   return updates
  // })









  // firebase.ref(`${req.params.gameId}/spaces`).transaction(spaces => {
  //   return (spaces[`${req.body.spaceStart.id}`], spaces[`${req.body.spaceEnd.id}`])
  // })
  // .then(snap => {
  //   console.log(snap)
  // })
  // .catch(err => next(err))

  // //CHECK IF SPACES ARE NEIGHBORS
  // if (isValidMove(req.body.spaceStart, req.body.spaceEnd)) {
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
