import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Space } from './'
import { updateBoard } from '../store'
import firebase from '../firebase'

import '../css/field.scss';


class Field extends Component {

  componentDidMount(){
    this.props.getBoard()
  }

  render() {
    const { spaces } = this.props

    return (
      <div className="field">
      {
        spaces && spaces.map(space => {
          return (<Space key={space.id} space={space} />)
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
    }
  }
}

export default connect(mapState, mapDispatch)(Field)
