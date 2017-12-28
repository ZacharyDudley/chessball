import axios from 'axios'
import history from '../history'
// import firebase from '../firebase'

// ACTION TYPES

const GET_BALL = 'GET_BALL'
const UPDATE_BALL = 'UPDATE_BALL'
const UPDATE_PLAYER = 'UPDATE_PLAYER'

// INITIAL STATE

const defaultSpace = {
  currentTeam: 1,
  p1Moves: 0,
  p2Moves: 0,
  p1Goals: 0,
  p2Goals: 0,
  p1Shots: 0,
  p2Shots: 0,
  p1Saves: 0,
  p2Saves: 0,
}

// ACTION CREATORS

const getBall = id => ({type: GET_BALL, id})
const updateBall = space => ({type: UPDATE_BALL, space})
const updatePlayer = player => ({type: UPDATE_PLAYER, player})

// THUNK

// export function setSpace (field) {
//   firebase.ref('games').push(field)
//     .then(snap => console.log(snap.value))
// }

export const moveBall = (gameId, oldSpace, newSpace) => dispatch => {
  axios.put(`/api/games/${gameId}`, newSpace)
  .then(res => dispatch(updateBall(res.data)))
  .catch(err => console.error(`Updating ball at ${oldSpace} unsuccessful`, err));
}

export const movePlayer = (gameId, playerId, oldSpace, newSpace) => dispatch => {
  axios.put(`/api/rules/${gameId}`, newSpace)
  .then(res => {
    console.log('STORE', res)
    // dispatch(updatePlayer(res.data))
  })
  .catch(err => console.error(`Updating player ${playerId} unsuccessful`, err));
}

// REDUCER

export default function (state = defaultSpace, action) {
  switch (action.type) {

    case GET_BALL:
      return Object.assign({}, state, {ballIsAt: action.id})

    case UPDATE_BALL:
      return Object.assign({}, state, {ballIsAt: action.id})

    case UPDATE_PLAYER:
      return action.player

    default:
      return state
  }
}


