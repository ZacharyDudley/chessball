import history from '../history'
import firebase from '../firebase'

// ACTION TYPES

const GET_SPACE = 'GET_SPACE'
const UPDATE_SPACE = 'UPDATE_SPACE'

// INITIAL STATE

const defaultSpace = {}

// ACTION CREATORS

const getSpace = id => ({type: GET_SPACE, id})
const updateSpace = space => ({type: UPDATE_SPACE, space})

// THUNK

export function setSpace (field) {
  firebase.ref('games').push(field)
    .then(snap => console.log(snap.value))
}

export function findSpace (id) {
  firebase.ref(id).on('value', snap => {
    console.log(snap.value)
  })
}

// REDUCER

export default function (state = defaultSpace, action) {
  switch (action.type) {
    case GET_SPACE:
      return action.id
    case UPDATE_SPACE:
      return action.space
    default:
      return state
  }
}
