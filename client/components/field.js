import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../store'
import { markSpaces } from '../script'
import firebase from '../firebase'

import '../css/field.scss';


class Field extends Component {

  componentDidMount(){

  }

  componentWillReceiveProps(){
    const {state, spaces} = this.props

    if (state) {
      // markSpaces(spaces, state.selectedSpace)
    }
  }

  render() {
    const { spaces, handleClick, state } = this.props

    return (
      <div className="field">
      {
        spaces && spaces.map(space => {
          return (<div
            className="space"
            key={space.id}
            id={`${space.coords[0]}, ${space.coords[1]}`}
            onClick={() => {
              state &&
              handleClick(space)
            }}
          />)
        })
      }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    spaces: state.game.spaces,
    state: state.game.state,
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
      // const selectedDivs = document.getElementsByClassName('selected')
      // console.log(selectedDivs)
      // if (selectedDivs.length) {
      //   selectedDivs.forEach(div => {
      //     div.classList.remove('selected')
      //   })
      // }

      const selectedDivs = document.getElementsByClassName('selected')
      console.log(selectedDivs)
      if (selectedDivs.length) {
        Array.prototype.filter.call(selectedDivs, div => {
          div.classList.remove('selected')
        })
      }

      const spaceId = `${space.coords[0]}, ${space.coords[1]}`
      const spaceDiv = document.getElementById(spaceId)
      spaceDiv.classList.add('selected')

      firebase.ref(`/games/${gameId}/state/`).update({selectedSpace: space.id})
    },
    // markSpaces: (spaces, selectedSpace) => {
    //   spaces.filter(space => {
    //     if (space.id === selectedSpace) {
    //       const [x, y] = space.coords
    //       console.log(x)
    //       console.log(y)
    //       const spaceDiv = document.getElementById(`${x}, ${y}`)
    //       spaceDiv.classList.add('selected')
    //       console.log('ADDED?')
    //     }
    //   })
    // }
  }
}

export default connect(mapState, mapDispatch)(Field)
