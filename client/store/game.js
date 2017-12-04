import history from '../history'
import firebase from '../firebase'

// ACTION TYPES

// const GET_BOARD = 'GET_BOARD'
const SET_SPACE = 'SET_SPACE'
const UPDATE_BOARD = 'UPDATE_BOARD'

// INITIAL STATE

const defaultBoard = {}

// ACTION CREATORS

// const getBoard = id => ({type: GET_BOARD, id})
export const setSpace = space => ({type: SET_SPACE, space})
export const updateBoard = board => ({type: UPDATE_BOARD, board})

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

// REDUCER

export default function (state = defaultBoard, action) {
  switch (action.type) {
    // case GET_BOARD:
    //   return action.id
    case SET_SPACE:
      return action.board
    case UPDATE_BOARD:
      return action.board
    default:
      return state
  }
}
