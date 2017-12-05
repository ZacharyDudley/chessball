import axios from 'axios'
import history from '../history'
// import firebase from '../firebase'

// ACTION TYPES

const UPDATE_BALL = 'UPDATE_BALL'
const UPDATE_PLAYER = 'UPDATE_PLAYER'

// INITIAL STATE

const defaultSpace = {
  // ballIsAt: ''
}

// ACTION CREATORS

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
  axios.put(`/api/games/${gameId}/${playerId}`, newSpace)
  .then(res => dispatch(updatePlayer(res.data)))
  .catch(err => console.error(`Updating player ${playerId} unsuccessful`, err));
}

// REDUCER

export default function (state = defaultSpace, action) {
  switch (action.type) {

    case UPDATE_BALL:
      return action.space

    case UPDATE_PLAYER:
      return action.player

    default:
      return state
  }
}
