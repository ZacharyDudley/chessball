import axios from 'axios'
import history from '../history'

// INITIAL STATE

const defaultState = {
  id: '',
  spaces: []
}

// ACTION TYPES

const CREATE_GAME = 'CREATE_GAME'
const FIND_FIELD = 'FIND_FIELD'
const UPDATE_SCORE = 'UPDATE_SCORE'

// ACTION CREATORS

export const createGame = (id) => ({type: CREATE_GAME, id})
export const findField = (field) => ({type: FIND_FIELD, field})
export const updateScore = score => ({type: UPDATE_SCORE, score})

// THUNK

export const buildField = (width, height) => dispatch => {
  let midWidth = width / 2
  let midHeight = height / 2

  if (width % 2 !== 0) midWidth += 1
  if (height % 2 !== 0) midHeight += 1

  const home = {
    name: 'Home',
    guys: [
      {
        id: 10,
        name: 'Left Back',
        loc: `${Math.floor(width / 12)}, ${Math.floor(height / 3)}`
      },
      {
        id: 11,
        name: 'Right Back',
        loc: `${Math.floor(width / 12)}, ${Math.floor((height / 3) * 2) + 1}`
      },
      {
        id: 12,
        name: 'Midfielder',
        loc: `${Math.floor(width / 4)}, ${Math.floor(height / 2)}`
      },
      {
        id: 13,
        name: 'Left Forward',
        loc: `${Math.floor((width / 2) - 1)}, ${1}`
      },
      {
        id: 14,
        name: 'Striker',
        loc: `${Math.floor((width / 2) - 1)}, ${Math.floor(height / 2)}`
      },
      {
        id: 15,
        name: 'Right Forward',
        loc: `${Math.floor((width / 2) - 1)}, ${Math.floor((height / 3) * 2) + 1}`
      },
    ]
  }

  const away = {
    name: 'Away',
    guys: [
      {
        id: 20,
        name: 'Left Back',
        loc: `${width - Math.floor(width / 12)}, ${Math.floor(height / 3)}`
      },
      {
        id: 21,
        name: 'Right Back',
        loc: `${width - Math.floor(width / 12)}, ${Math.floor((height / 3) * 2) + 1}`
      },
      {
        id: 22,
        name: 'Midfielder',
        loc: `${width - Math.floor(width / 4)}, ${Math.floor(height / 2)}`
      },
      {
        id: 23,
        name: 'Left Forward',
        loc: `${width - Math.floor((width / 2) - 1)}, ${1}`
      },
      {
        id: 24,
        name: 'Striker',
        loc: `${width - Math.floor((width / 2) - 1)}, ${Math.floor(height / 2)}`
      },
      {
        id: 25,
        name: 'Right Forward',
        loc: `${width - Math.floor((width / 2) - 1)}, ${Math.floor((height / 3) * 2) + 1}`
      },
    ]
  }

  const teams = { home, away }
  const allPlayers = [...home.guys, ...away.guys]

  // const spaces = {}
  // let ballLocation

  // for (var heightIndex = 0; heightIndex <= height; heightIndex++) {
  //   for (var widthIndex = 0; widthIndex <= width; widthIndex++) {
  //     if (widthIndex === midWidth && heightIndex === midHeight) {
  //       ballLocation = `${widthIndex}, ${heightIndex}`

  //       spaces[`${widthIndex}, ${heightIndex}`] = {
  //         id: `${widthIndex}, ${heightIndex}`,
  //         hasBall: true,
  //         hasPlayer: ''
  //       }
  //     } else {
  //       let player = team.guys.filter(guy => {
  //         if (guy.loc === `${widthIndex}, ${heightIndex}`) {
  //           return guy
  //         }
  //       })

  //       if (player.length) {
  //         spaces[`${widthIndex}, ${heightIndex}`] = {
  //           id: `${widthIndex}, ${heightIndex}`,
  //           hasBall: false,
  //           hasPlayer: `${player[0].id}`
  //         }
  //       } else {
  //         spaces[`${widthIndex}, ${heightIndex}`] = {
  //           id: `${widthIndex}, ${heightIndex}`,
  //           hasBall: false,
  //           hasPlayer: ''
  //         }
  //       }
  //     }
  //   }
  // }

  const spaces = []
  let ballLocation
  var i = 0

  for (var h = 0; h <= height; h++) {
    for (var w = 0; w <= width; w++) {
      if (w === midWidth && h === midHeight) {
        ballLocation = i

        spaces.push({
          id: i++,
          coords: [w, h],
          hasBall: true,
          hasPlayer: ''
        })
      } else {
        // let player = allPlayers.filter(guy => {
        //   if (guy.loc === `${w}, ${h}`) {
        //     return guy
        //   }
        // })
        let player = allPlayers.filter(guy => {
          return guy.loc === `${w}, ${h}`
        })

        if (player.length) {
          spaces.push({
            id: i++,
            coords: [w, h],
            hasBall: false,
            hasPlayer: `${player[0].id}`
          })
        } else {
          spaces.push({
            id: i++,
            coords: [w, h],
            hasBall: false,
            hasPlayer: ''
          })
        }
      }
    }
  }

  axios.post(`/api/game/`, {spaces, ballLocation, teams})
  .then(res => dispatch(createGame(res.data)))
  .catch(err => console.error(`Creating game unsuccessful`, err));
}

export const getField = gameId => dispatch => {
  axios.get(`/api/game/${gameId}`)
  .then(res => dispatch(findField(res.data)))
  .catch(err => console.error(`Creating game unsuccessful`, err));
}

export const movePlayer = (gameId, oldSpace, newSpace) => dispatch => {
  axios.put(`/api/rules/${gameId}/movePlayer`, {oldSpace, newSpace})
  .then(res => dispatch(getField(gameId)))
  .catch(err => console.error(`Updating player ${playerId} unsuccessful`, err));
}

export const moveBall = (gameId, oldSpace, newSpace) => dispatch => {
  axios.put(`/api/rules/${gameId}/moveBall`, {oldSpace, newSpace})
  .then(res => dispatch(getField(gameId)))
  .catch(err => console.error(`Updating ball unsuccessful`, err));
}


export const countGoal = (gameId, teamId) => dispatch => {
  axios.put(`/api/game/${gameId}`, teamId)
  .then(res => dispatch(updateScore(res.data)))
  .catch(err => console.error(`Updating score for ${teamId} unsuccessful`, err));
}


// REDUCER

export default function (state = defaultState, action) {
  switch (action.type) {

    case CREATE_GAME:
      return Object.assign({}, state, {id: action.id})

    case FIND_FIELD:
      return Object.assign({}, state, action.field)

    case UPDATE_SCORE:
      return action.score

    default:
      return state
  }
}
