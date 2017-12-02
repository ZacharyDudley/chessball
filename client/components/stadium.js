import React from 'react'
import { connect } from 'react-redux'
import firebase from '../firebase'

const Stadium = props => {
  const { buildGame } = props

    return (
      <button onClick={buildGame}>CREATE</button>
    )
  }

const mapState = (state) => {
  return {
    // state: state
  }
}

const mapDispatch = (dispatch, ownProps) => {

  return {
    buildGame(){
      const spaces = []
      var i = 0

      for (var h = 0; h <= 7; h++) {
        for (var w = 0; w <= 12; w++) {
          spaces.push({
            id: i++,
            coords: [w, h],
            hasBall: false,
            hasPlayer: ''
          })
        }
      }

      const state = {
        selectedSpace: 0,
        currentPlayer: 1,
        p1Moves: 0,
        p2Moves: 0,
        p1Goals: 0,
        p2Goals: 0,
        p1Shots: 0,
        p2Shots: 0,
        p1Saves: 0,
        p2Saves: 0,
      }

      const field = { spaces, state }

      firebase.ref('games').push(field)
        .then(snap => ownProps.history.push(`/field/${snap.key}`))
    }
  }
}

export default connect(mapState, mapDispatch)(Stadium)
