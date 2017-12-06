import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Space } from './'
import { setBoard } from '../store'
// import firebase from '../firebase'

import '../css/field.scss';


const Field = () => {

  const spaces = []
  var i = 0

  for (var h = 0; h <= 6; h++) {
    for (var w = 0; w <= 9; w++) {
      let space = {
        id: i++,
        coords: [w, h],
        hasBall: false,
        hasPlayer: ''
      }
      spaces.push(space)
    }
  }

  return (
    <div className="field">
    {
      // console.log(this.props)
      spaces.map(space => {
        return (<Space key={space.id} id={[space.x, space.y]} />)
      })
    }
    </div>
  )
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch, ownProps) => {
  const gameId = ownProps.match.params.gameId

  return {
    // getBoard: () => {
    //   firebase.ref(`/games/${gameId}/`).on('value', snap => {
    //     // dispatch(setBoard(snap.val()))
    //     console.log(snap.val())
    //   })
    // },
    // updateBoard: () => {
    //   // firebase.ref(`/games/${gameId}/`).update()
    // }
  }
}

export default connect(mapState, mapDispatch)(Field)
