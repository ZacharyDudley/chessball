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

  // createGame(event) {
  //   let movesPerTurn = event.target.movesPerTurn || 3
  //   let sizeW = 20
  //   let sizeH = 12

  //   this.props.handleCreateGame(sizeW, sizeH, movesPerTurn)
  // }

  render () {
    const { handleCreateGame } = this.props
    let sizeW = 20
    let sizeH = 12
    // let movesPerTurn = 5
    let movesPerTurn = [4, 3, 2, 1]

    return (
      <div>
      {
        // <form onSubmit={(event) => handleCreateGame()}>
        //   <label>Moves Per Turn</label>
        //   <input name="movesPerTurn" type="number" defaultValue="3" />
        //     <button type="submit" value="Create Game" />
        //     </form>
          }
          <button onClick={() => handleCreateGame(sizeW, sizeH, movesPerTurn)}>CREATE</button>
      </div>
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
    handleCreateGame: (sizeW, sizeH, movesPerTurn) => {
      dispatch(buildField(sizeW, sizeH, movesPerTurn))
    },
    teams: (gameId, teamSize) => {
      dispatch(buildTeam(gameId, teamSize))
    }
  }
}

export default connect(mapState, mapDispatch)(Stadium)
