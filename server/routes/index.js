const firebase = require('firebase')


const state = firebase.ref(`/games/${gameId}/`).on('value', snap => {
  console.log(snap.val())})

//CLIENT SENDS REQS HERE
//SERVER CHECKS LIGITIMACY OF MOVE
//SERVER SENDS UPDATE TO FB
//FB UPDATES SERVER

const gameState = {
  selectedSpace: 0,
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
