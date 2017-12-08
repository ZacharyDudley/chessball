import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../../server/firebase'
import { getField, buildTeam } from '../store'

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
        spaces && spaces.map(space => {
          return (<div
            className={space.hasBall ? 'space ball' : 'space' }
            key={space.id}
            id={space.id}
            coords={`${space.coords[0]}, ${space.coords[1]}`}
            onClick={() => {
              handleClick(space)
            }
          }
          />)
        })
      }
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    gameId: state.field.id,
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
    makeTeams: () => {
      dispatch(buildTeam(gameId))
    },
    handleClick: (space) => {
      const selectedDivs = document.getElementsByClassName('selected')
      if (selectedDivs.length) {
        Array.prototype.filter.call(selectedDivs, div => {
          div.classList.remove('selected')
        })
      }

      const spaceDiv = document.getElementById(space.id)
      spaceDiv.classList.add('selected')
    },
  }
}

export default connect(mapState, mapDispatch)(Field)
