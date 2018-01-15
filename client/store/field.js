import axios from 'axios'
import history from '../history'

// INITIAL STATE

const defaultState = {
  id: '',
  axisLengthX: '',
  axisLengthY: '',
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

export const buildField = (width, height, movesPerTurn) => dispatch => {
  let axisLengthX = width
  let axisLengthY = height
  let midWidth = width / 2
  let midHeight = height / 2

  if (width % 2 !== 0) midWidth += 1
  if (height % 2 !== 0) midHeight += 1

  const home = {
    name: 'Home',
    goals: 0,
    guys: [
      {
        id: 10,
        team: 'home',
        name: 'Left Back',
        loc: `${Math.floor(width / 12) + 1}, ${Math.floor(height / 3) - 1}`
      },
      {
        id: 11,
        team: 'home',
        name: 'Right Back',
        loc: `${Math.floor(width / 12) + 1}, ${Math.floor((height / 3) * 2) + 1}`
      },
      {
        id: 12,
        team: 'home',
        name: 'Midfielder',
        loc: `${Math.floor(width / 4)}, ${Math.floor(height / 2)}`
      },
      {
        id: 13,
        team: 'home',
        name: 'Left Forward',
        loc: `${Math.floor((width / 2) - 1)}, ${1}`
      },
      {
        id: 14,
        team: 'home',
        name: 'Striker',
        loc: `${Math.floor((width / 2) - 1)}, ${Math.floor(height / 2)}`
      },
      {
        id: 15,
        team: 'home',
        name: 'Right Forward',
        loc: `${Math.floor((width / 2) - 1)}, ${Math.floor((height / 3) * 2) + 1}`
      },
    ]
  }

  const away = {
    name: 'Away',
    goals: 0,
    guys: [
      {
        id: 20,
        team: 'away',
        name: 'Left Back',
        loc: `${width - Math.floor(width / 12) - 1}, ${Math.floor(height / 3) - 1}`
      },
      {
        id: 21,
        team: 'away',
        name: 'Right Back',
        loc: `${width - Math.floor(width / 12) - 1}, ${Math.floor((height / 3) * 2) + 1}`
      },
      {
        id: 22,
        team: 'away',
        name: 'Midfielder',
        loc: `${width - Math.floor(width / 4) + 2}, ${Math.floor(height / 2)}`
      },
      {
        id: 23,
        team: 'away',
        name: 'Left Forward',
        loc: `${width - Math.floor((width / 2) - 1)}, ${1}`
      },
      {
        id: 24,
        team: 'away',
        name: 'Striker',
        loc: `${width - Math.floor((width / 4)) - 1}, ${Math.floor(height / 2)}`
      },
      {
        id: 25,
        team: 'away',
        name: 'Right Forward',
        loc: `${width - Math.floor((width / 2) - 1)}, ${Math.floor((height / 3) * 2) + 1}`
      },
    ]
  }

  const state = {
    isHomeTurn: true,
    movesPerTurn: movesPerTurn,
    movesLeft: movesPerTurn,
  }

  const teams = { home, away }
  const allPlayers = [...home.guys, ...away.guys]

  const spaces = []
  let ball = {
    locationId: '',
    coords: [],
    velocity: 0,
    direction: '',
  }
  var i = 0

  for (var h = 0; h <= height; h++) {
    for (var w = 0; w <= width; w++) {
      if (w === midWidth && h === midHeight) {
        ball.locationId = i
        ball.coords = [w, h]

        spaces.push({
          id: i++,
          coords: [w, h],
          type: 'ball',
          typeId: '',
          line: ''
        })
      } else {
        let player = allPlayers.filter(guy => {
          return guy.loc === `${w}, ${h}`
        })

        if (player.length) {
          spaces.push({
            id: i++,
            coords: [w, h],
            type: `${player[0].team}`,
            typeId: `${player[0].id}`,
            line: ''
          })
        } else {
          spaces.push({
            id: i++,
            coords: [w, h],
            type: '',
            typeId: '',
            line: ''
          })
        }
      }
    }
  }

  axios.post(`/api/game/`, {spaces, state, ball, teams, axisLengthX, axisLengthY})
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
  .catch(err => console.error(`Updating player unsuccessful`, err));
}

export const moveBall = (gameId, spaceStartId, spaceEndId, spacesPathIds) => dispatch => {
  axios.put(`/api/rules/${gameId}/moveBall`, {spaceStartId, spaceEndId, spacesPathIds})
  .then(res => dispatch(getField(gameId)))
  .catch(err => console.error(`Updating ball unsuccessful`, err));
}

export const takeTurn = (gameId, ballOrPlayer, spaceStartId, spaceEndId, spacesPathIds) => dispatch => {
  if (ballOrPlayer === 'ball') {
    axios.put(`/api/rules/${gameId}/moveBall`, {spaceStartId, spaceEndId, spacesPathIds})
    .then(res => dispatch(getField(gameId)))
    .catch(err => console.error(`Updating ball unsuccessful`, err));
  } else if (ballOrPlayer === 'player') {
    axios.put(`/api/rules/${gameId}/movePlayer`, {spaceStartId, spaceEndId})
    .then(res => dispatch(getField(gameId)))
    .catch(err => console.error(`Updating player unsuccessful`, err));
  }
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
