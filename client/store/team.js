// import axios from 'axios'
// import history from '../history'

// // INITIAL STATE

// const defaultState = {
//   // id: '',
//   // guys: []
// }

// // ACTION TYPES

// const CREATE_TEAM = 'CREATE_TEAM'
// const UPDATE_TEAM = 'UPDATE_TEAM'
// const MOVE_PLAYER = 'MOVE_PLAYER'

// // ACTION CREATORS

// export const createTeam = id => ({type: CREATE_TEAM, id})
// export const updateTeam = team => ({type: UPDATE_TEAM, team})
// // export const movePlayer = (id, moveTo) => ({type: MOVE_PLAYER, id, moveTo})

// // THUNK

// export const buildTeam = (gameId, teamSize) => dispatch => {
//   // let i = 0
//   // const guys = []
//   // while (i < teamSize) {
//   //   guys.push({
//   //     id: i,
//   //     loc: ''
//   //   })
//   //   i++
//   // }
//   // const team = {
//   //   name: '',
//   //   guys
//   // }

//   // const team = {
//   //   name: 'Home',
//   //   guys: [
//   //     {
//   //       id: 0,
//   //       name: 'Left Back',
//   //       loc: `${x / 12}, ${y / 3}`
//   //     },
//   //     {
//   //       id: 1,
//   //       name: 'Right Back',
//   //       loc: `${x / 12}, ${(y / 3) * 2}`
//   //     },
//   //     {
//   //       id: 2,
//   //       name: 'Midfielder',
//   //       loc: `${x / 4}, ${y / 2}`
//   //     },
//   //     {
//   //       id: 3,
//   //       name: 'Left Forward',
//   //       loc: `${(x / 2) - 1}, ${1}`
//   //     },
//   //     {
//   //       id: 4,
//   //       name: 'Striker',
//   //       loc: `${(x / 2) - 1}, ${y / 2}`
//   //     },
//   //     {
//   //       id: 5,
//   //       name: 'Right Forward',
//   //       loc: `${(x / 2) - 1}, ${(y / 3) * 2}`
//   //     },
//   //   ]
//   // }

//   axios.post(`/api/team/${gameId}`, team)
//   .then(res => dispatch(createTeam(res.data)))
//   .catch(err => console.error(`Creating game unsuccessful`, err));
// }

// export const getTeam = (gameId, teamId) => dispatch => {
//   axios.get(`/api/team/${gameId}/${teamId}`)
//   .then(res => dispatch(updateTeam(res.data)))
//   .catch(err => console.error(`Creating game unsuccessful`, err));
// }

// // export const countGoal = (gameId, teamId) => dispatch => {
// //   axios.put(`/api/games/${gameId}`, teamId)
// //   .then(res => dispatch(updateScore(res.data)))
// //   .catch(err => console.error(`Updating score for ${teamId} unsuccessful`, err));
// // }


// // REDUCER

// export default function (state = defaultState, action) {
//   switch (action.type) {

//     case CREATE_TEAM:
//       return Object.assign({}, state, {id: action.id})

//     case UPDATE_TEAM:
//       return Object.assign({}, state, action.team)

//     // case MOVE_PLAYER:
//     //   return action.score

//     default:
//       return state
//   }
// }
