import axios from 'axios'
import history from '../history'

// INITIAL STATE

const defaultState = {
  // teamA: {},
  // teamB: {}
}

// ACTION TYPES

const CREATE_TEAM = 'CREATE_TEAM'
const GET_PLAYER = 'GET_PLAYER'
const MOVE_PLAYER = 'MOVE_PLAYER'

// ACTION CREATORS

export const createTeam = () => ({type: CREATE_TEAM})
export const getPlayer = id => ({type: GET_PLAYER, id})
// export const movePlayer = (id, moveTo) => ({type: MOVE_PLAYER, id, moveTo})

// THUNK

export const buildTeam = (gameId, team) => dispatch => {
  axios.post(`/api/teams`, team)
  .then(res => {
    console.log(res.data)
    dispatch(createTeam(res.data))
  })
  .catch(err => console.error(`Creating game unsuccessful`, err));
}

// export const getField = gameId => dispatch => {
//   axios.get(`/api/games/${gameId}`)
//   .then(res => dispatch(updateField(res.data)))
//   .catch(err => console.error(`Creating game unsuccessful`, err));
// }

// export const countGoal = (gameId, teamId) => dispatch => {
//   axios.put(`/api/games/${gameId}`, teamId)
//   .then(res => dispatch(updateScore(res.data)))
//   .catch(err => console.error(`Updating score for ${teamId} unsuccessful`, err));
// }


// REDUCER

export default function (state = defaultState, action) {
  switch (action.type) {

    case CREATE_TEAM:
      // return Object.assign({}, state, action.id)
      return action.id

    case GET_PLAYER:
      // return Object.assign({}, state, action.field)
      return action.id

    // case MOVE_PLAYER:
    //   return action.score

    default:
      return state
  }
}
