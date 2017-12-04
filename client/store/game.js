import axios from 'axios'
import history from '../history'
import firebase from '../firebase'

// ACTION TYPES

const CREATE_GAME = 'CREATE_GAME'
const UPDATE_SCORE = 'UPDATE_SCORE'

// INITIAL STATE

const defaultBoard = {}

// ACTION CREATORS

export const createGame = () => ({type: CREATE_GAME})
export const updateScore = score => ({type: UPDATE_SCORE, score})

// THUNK

// export const createGame = board => dispatch => {
//   firebase.ref('games').push(board)
//     // .then(snap => ownProps.history.push(`/field/${snap.key}`))
//     .then(snap => dispatch(setBoard(snap.value)))
//     .catch(err => console.error('ERROR CREATING BOARD' + err))
// }

// export const updateGame = (id) => dispatch => {
//   firebase.ref(id).on('value', snap => {
//     dispatch(updateBoard(snap.value))
//   })
// }

export const countGoal = (gameId, teamId) => dispatch => {
  axios.put(`/api/games/${gameId}`, teamId)
  .then(res => dispatch(updateScore(res.data)))
  .catch(err => console.error(`Updating score for ${teamId} unsuccessful`, err));
}

export const buildGame = () => dispatch => {
  axios.post(`/api/games/`)
  .then(res => dispatch(createGame(res.data)))
  .catch(err => console.error(`Creating game unsuccessful`, err));
}


// REDUCER

export default function (state = defaultBoard, action) {
  switch (action.type) {

    case CREATE_GAME:
      return state

    case UPDATE_SCORE:
      return action.score

    default:
      return state
  }
}
