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
  const searchVar = [1, 1]
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

  return !!possibilities.find(coord => {
    return coord[0] === deltaX && coord[1] === deltaY
  })
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

const isActiveTeamPlayer = (spaceStart, homeActive) => {
  return (homeActive && spaceStart.type === 'home') || (!homeActive && spaceStart.type === 'away')
}

const isValidPlayerMove = (oldSpace, newSpace, homeActive) => {
  return isActiveTeamPlayer(oldSpace, homeActive) && isSpaceNeighbor(oldSpace.coords, newSpace.coords) && isChosenSpaceFree(newSpace)
}

let updates = {}

/*  ***  TURN CHECK ***  */
router.use('/:gameId', function (req, res, next) {
  const game = firebase.ref(`${req.params.gameId}`)

  game.once('value')
  .then(snap => {
    const homeActive = snap.val().state.isHomeTurn
    const movesLeft = snap.val().state.movesLeft
    const movesPerTurn = snap.val().state.movesPerTurn

    if (!movesPerTurn.length) {
      updates['/state/movesPerTurn'] = [4, 3, 2, 1]
      updates['/state/isHomeTurn'] = !homeActive
    }
    // if (movesLeft > 1) {
    //   updates['/state/movesLeft'] = movesLeft - 1
    // } else {
    //   updates['/state/movesLeft'] = movesPerTurn
    //   updates['/state/isHomeTurn'] = !homeActive
    // }

    return updates
  })
  .catch(err => next(err))

  next()
})

/*  ***  PLAYER MOVEMENT ***  */
router.put('/:gameId/movePlayer', function (req, res, next) {
  const game = firebase.ref(`${req.params.gameId}`)

  game.once('value')
  .then(snap => {
    const homeActive = snap.val().state.isHomeTurn
    const spaceStart = snap.val().spaces[`${req.body.spaceStartId}`]
    let spaceEnd = snap.val().spaces[`${req.body.spaceEndId}`]

    if (isValidPlayerMove(spaceStart, spaceEnd, homeActive)) {
      updates[`/spaces/${req.body.spaceEndId}/type`] = spaceStart.type
      updates[`/spaces/${req.body.spaceEndId}/typeId`] = spaceStart.typeId
      updates[`/spaces/${req.body.spaceStartId}/type`] = ''
      updates[`/spaces/${req.body.spaceStartId}/typeId`] = ''

      return updates
    }
  })
  .then(newData => {
    game.update(newData)
    .then(snap => res.sendStatus(200))
    .catch(err => next(err))
  })
  .catch(err => next(err))
})


/*  ***  BALL MOVEMENT ***  */
router.put('/:gameId/moveBall', function (req, res, next) {
  const game = firebase.ref(`${req.params.gameId}`)

  game.once('value')
  .then(snap => {
    const spaceStart = snap.val().spaces[`${req.body.spaceStartId}`]
    let spaceEnd = snap.val().spaces[`${req.body.spaceEndId}`]
    const ball = snap.val().ball
    let spacesInPath = req.body.spacesPathIds.map(space => {
      return snap.val().spaces[space]
    });

    if (isValidBallMove(spaceStart, spaceEnd, ball)) {
      for (var i = 0; i < spacesInPath.length; i++) {
        if (spacesInPath[i].type) {
          break
        }
      }
      spaceEnd = spacesInPath[i - 1]

      updates[`/ball/locationId`] = spaceEnd.id
      updates[`/ball/coords`] = spaceEnd.coords
      updates[`/spaces/${req.body.spaceStartId}/type`] = ''
      updates[`/spaces/${spaceEnd.id}/type`] = 'ball'

      return updates
    } else {
      console.log('INVALID MOVE')
    }
  })
  .then(newData => {
    game.update(newData)
    .then(snap => res.sendStatus(200))
    .catch(err => next(err))
  })
  .catch(err => next(err))
})

module.exports = router;
