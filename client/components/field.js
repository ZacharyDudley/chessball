import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Space } from './'
import { updateBoard } from '../store'
import firebase from '../firebase'

import '../css/field.scss';


class Field extends Component {

  componentDidMount(){
    const {getBoard, spaces} = this.props
    getBoard()
    markSpaces(spaces)
  }

  render() {
    const { spaces, handleClick } = this.props

    return (
      <div className="field">
      {
        spaces && spaces.map(space => {
          return (<div className="space" key={space.id} space={space} onClick={() => handleClick(space)} />)
        })
      }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    spaces: state.game.spaces,
    state: state.game.state
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const gameId = ownProps.match.params.gameId
  // updateGame(dispatch)
  return {
    getBoard: () => {
      firebase.ref(`/games/${gameId}/`).on('value', snap => {
        dispatch(updateBoard(snap.val()))
      })
    },
    handleClick: (space) => {
      // if (!space.hasBall) {
        firebase.ref(`/games/${gameId}/state/`).update({selectedSpace: space.id})
        console.log(space)
      // }
    }
  }
}

export default connect(mapState, mapDispatch)(Field)
