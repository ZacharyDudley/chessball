import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../../server/firebase'
import { getField } from '../store'

import '../css/field.scss';


class Field extends Component {

  componentDidMount(){
    this.props.getBoard()
  }

  render() {
    const { spaces, handleClick } = this.props

    return (
      <div className="field">
      {
        // console.log(spaces)
        spaces && spaces.map(space => {
          return (<div
            className="space"
            key={space.id}
            id={`${space.coords[0]}, ${space.coords[1]}`}
            onClick={() => {
              handleClick(space)
            }}
          />)
        })
      }
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    gameId: ownProps.match.params.gameId,
    spaces: state.field.spaces,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const gameId = ownProps.match.params.gameId

  // firebase.ref(`/${gameId}/`).on('value', snap => {
  //   console.log(snap.val())
  //   // dispatch(updateBoard(snap.val()))
  // })

    return {
    getBoard: () => {
      dispatch(getField(gameId))
    },
    handleClick: (space) => {
      const selectedDivs = document.getElementsByClassName('selected')
      if (selectedDivs.length) {
        Array.prototype.filter.call(selectedDivs, div => {
          div.classList.remove('selected')
        })
      }

      const spaceId = `${space.coords[0]}, ${space.coords[1]}`
      const spaceDiv = document.getElementById(spaceId)
      spaceDiv.classList.add('selected')

      // firebase.ref(`/games/${gameId}/state/`).update({selectedSpace: space.id})
    },
  }
}

export default connect(mapState, mapDispatch)(Field)
