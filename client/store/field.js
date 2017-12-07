import axios from 'axios'
import history from '../history'

// INITIAL STATE

const defaultState = {
  id: '',
  spaces: []
}

// ACTION TYPES

const CREATE_GAME = 'CREATE_GAME'
const UPDATE_FIELD = 'UPDATE_FIELD'
const UPDATE_SCORE = 'UPDATE_SCORE'

// ACTION CREATORS

export const createGame = id => ({type: CREATE_GAME, id})
export const updateField = field => ({type: UPDATE_FIELD, field})
export const updateScore = score => ({type: UPDATE_SCORE, score})

// THUNK

export const buildField = (width, height) => dispatch => {

  const spaces = []
  var i = 0

  for (var h = 0; h <= height; h++) {
    for (var w = 0; w <= width; w++) {
      spaces.push({
        id: i++,
        coords: [w, h],
        hasBall: false,
        hasPlayer: ''
      })
    }
  }

  axios.post(`/api/games/`, spaces)
  .then(res => dispatch(createGame(res.data)))
  .catch(err => console.error(`Creating game unsuccessful`, err));
}

export const getField = gameId => dispatch => {
  axios.get(`/api/games/${gameId}`)
  .then(res => dispatch(updateField(res.data)))
  .catch(err => console.error(`Creating game unsuccessful`, err));
}

export const countGoal = (gameId, teamId) => dispatch => {
  axios.put(`/api/games/${gameId}`, teamId)
  .then(res => dispatch(updateScore(res.data)))
  .catch(err => console.error(`Updating score for ${teamId} unsuccessful`, err));
}


// REDUCER

export default function (state = defaultState, action) {
  switch (action.type) {

    case CREATE_GAME:
      return Object.assign({}, state, {id: action.id})

    case UPDATE_FIELD:
      return Object.assign({}, state, {spaces: action.field})

    case UPDATE_SCORE:
      return action.score

    default:
      return state
  }
}
