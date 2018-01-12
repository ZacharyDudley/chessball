import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buildField, buildTeam } from '../store'

class Stadium extends Component {

  componentDidUpdate() {
    if (this.props.gameId) {
      // this.props.teams(this.props.gameId, 6)
      this.props.history.push(`/game/${this.props.gameId}`)
    }
  }

  render () {
    const { handleCreateGame } = this.props

    let sizeW = 20
    let sizeH = 12

    return (
      <button onClick={() => handleCreateGame(sizeW, sizeH)}>CREATE</button>
    )
  }
}

const mapState = (state) => {
  return {
    gameId: state.field.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  // const { gameId } = ownProps

  return {
    handleCreateGame: (sizeW, sizeH) => {
      dispatch(buildField(sizeW, sizeH))
    },
    teams: (gameId, teamSize) => {
      dispatch(buildTeam(gameId, teamSize))
    }
  }
}

export default connect(mapState, mapDispatch)(Stadium)
