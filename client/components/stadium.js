import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buildField, buildTeams } from '../store'

class Stadium extends Component {

  componentDidUpdate() {
    // console.log(this.props)
    if (this.props.gameId) {
      this.props.history.push(`/${this.props.gameId}`)
    }
  }

  render () {
    const { handleCreateGame } = this.props

    // const state = {
    //   ballIsAt: 0,
    //   currentTeam: 1,
    //   p1Moves: 0,
    //   p2Moves: 0,
    //   p1Goals: 0,
    //   p2Goals: 0,
    //   p1Shots: 0,
    //   p2Shots: 0,
    //   p1Saves: 0,
    //   p2Saves: 0,
    // }

    const teamA = {
      id: '',
      name: '',
      guys: []
    }

    const teamB = {
      id: '',
      name: '',
      guys: []
    }

    const teams = { teamA, teamB }

    let sizeW = 12
    let sizeH = 7

    return (
      <button onClick={() => handleCreateGame(sizeW, sizeH, teams)}>CREATE</button>
    )
  }
}

const mapState = (state) => {
  return {
    gameId: state.field
  }
}

const mapDispatch = (dispatch, ownProps) => {
  // const { gameId } = ownProps
  return {
    handleCreateGame: (sizeW, sizeH, teams) => {
      dispatch(buildTeams(teams))
      dispatch(buildField(sizeW, sizeH))
      // console.log(ownProps)
      // ownProps.history.push(`/field/${this.props.gameId}`)
    }
    // buildGame(){
    //   const spaces = []
    //   var i = 0

    //   for (var h = 0; h <= 7; h++) {
    //     for (var w = 0; w <= 12; w++) {
    //       spaces.push({
    //         id: i++,
    //         coords: [w, h],
    //         hasBall: false,
    //         hasPlayer: ''
    //       })
    //     }
    //   }

    //   const state = {
    //     selectedSpace: 0,
    //     currentTeam: 1,
    //     p1Moves: 0,
    //     p2Moves: 0,
    //     p1Goals: 0,
    //     p2Goals: 0,
    //     p1Shots: 0,
    //     p2Shots: 0,
    //     p1Saves: 0,
    //     p2Saves: 0,
    //   }

    //   const teams = {
    //     teamBlue: {
    //       name: 'blue',
    //       guys: {
    //         forwardRight: {
    //           coords: [],
    //         },
    //         forwardLeft: {
    //           coords: []
    //         },
    //         forwardCenter: {
    //           coords: [3, 4]
    //         },
    //         midfield: {
    //           coords: [3, 3]
    //         },
    //         defenseRight: {
    //           coords: []
    //         },
    //         defenseLeft: {
    //           coords: []
    //         },
    //         goalie: {
    //           coords: []
    //         }
    //       }
    //     },
    //     teamRed: {
    //       name: 'red',
    //       guys: {
    //         forwardRight: {
    //           coords: [],
    //         },
    //         forwardLeft: {
    //           coords: []
    //         },
    //         forwardCenter: {
    //           coords: [7, 3]
    //         },
    //         midfield: {
    //           coords: [8, 4]
    //         },
    //         defenseRight: {
    //           coords: [10, 6]
    //         },
    //         defenseLeft: {
    //           coords: [10, 1]
    //         },
    //         goalie: {
    //           coords: []
    //         }
    //       }
    //     }
    //   }

    //   const field = { spaces, state, teams }

    //   firebase.ref('games').push(field)
    //     .then(snap => ownProps.history.push(`/field/${snap.key}`))
    // }
  }
}

export default connect(mapState, mapDispatch)(Stadium)
