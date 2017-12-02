import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../store'
import { markSpaces } from '../script'
import firebase from '../firebase'

import '../css/field.scss';


class Field extends Component {

  componentDidMount(){
    const {getBoard, spaces} = this.props
    // getBoard()
    // markSpaces(spaces)
  }

  componentWillReceiveProps(){
    markSpaces(this.props.spaces)
  }

  render() {
    const { spaces, handleClick } = this.props

    return (
      <div className="field">
      {
        spaces && spaces.map(space => {
          return (<div className="space" key={space.id} id={`${space.coords[0]}, ${space.coords[1]}`} onClick={() => handleClick(space)} />)
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

  firebase.ref(`/games/${gameId}/`).on('value', snap => {
    dispatch(updateBoard(snap.val()))})

    return {
    // getBoard: () => {
    //   firebase.ref(`/games/${gameId}/`).on('value', snap => {
    //     dispatch(updateBoard(snap.val()))
    //   })
    // },
    handleClick: (space) => {
      console.log('CLICK:', space)
      firebase.ref(`/games/${gameId}/state/`).update({selectedSpace: space.id})
    }
  }
}

export default connect(mapState, mapDispatch)(Field)
