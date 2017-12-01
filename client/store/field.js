import history from '../history'
import firebase from '../firebase'

// ACTION TYPES

const GET_BOARD = 'GET_BOARD'
const UPDATE_BOARD = 'UPDATE_BOARD'

// INITIAL STATE

const defaultBoard = {}

// ACTION CREATORS

const getBoard = id => ({type: GET_BOARD, id})
const updateBoard = board => ({type: UPDATE_BOARD, board})

// THUNK

export function setField (field) {
  firebase.ref('games').push(field)
    .then(snap => console.log(snap.value))
}

export function getField (id) {
  firebase.ref(id).on('value', snap => {
    console.log(snap.value)
  })
}

// REDUCER

export default function (state = defaultBoard, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.id
    case UPDATE_BOARD:
      return action.board
    default:
      return state
  }
}
