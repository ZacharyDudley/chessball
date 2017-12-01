import React from 'react'
import { connect } from 'react-redux'
import firebase from '../firebase'

import Space from './'

const Stadium = props => {
  const { createGame } = props

    return (
      <button onClick={createGame}>CREATE</button>
    )
  }

const mapState = (state) => {
  return {
    state: state
  }
}

const mapDispatch = (dispatch, ownProps) => {

  return {
    createGame(){
      const spaces = {}
      var i=0

      for (var h = 0; h <= 9; h++) {
        for (var w = 0; w <= 12; w++) {
          // spaces.push(<Space key={i++} x={w} y={h} />)
          spaces[i++] = {
            coords: [w, h],
            hasBall: false,
            hasPlayer: ''
          }
        }
      }

      const field = { spaces /*, players, state*/ }

      firebase.ref('games').push(field)
        .then(snap => ownProps.history.push(`/field/${snap.key}`))
    }
  }
}

export default connect(mapState, mapDispatch)(Stadium)
