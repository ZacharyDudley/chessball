import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getField, movePlayer, moveBall } from '../store'

import '../css/field.scss';


class Field extends Component {
  constructor() {
    super()
    this.state = {
      selectedSpace: '',
      neighborsOfSelected: [],
      showNeighbors: false,
      ball: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.highlightNeighbors = this.highlightNeighbors.bind(this)
    this.highlightSpace = this.highlightSpace.bind(this)
    this.setNeighbors = this.setNeighbors.bind(this)
    this.setSpaceAndNeighbors = this.setSpaceAndNeighbors.bind(this)
    this.clickedPlayerSpace = this.clickedPlayerSpace.bind(this)
  }

  componentDidMount(){
    const { getBoard } = this.props
    getBoard()
  }

  setNeighbors(spaceCoords) {
    let [x, y] = spaceCoords

    this.setState({
      neighborsOfSelected: [
        document.querySelector(`[coords="${x - 1},${y - 1}"]`),
        document.querySelector(`[coords="${x},${y - 1}"]`),
        document.querySelector(`[coords="${x + 1},${y - 1}"]`),
        document.querySelector(`[coords="${x - 1},${y}"]`),
        document.querySelector(`[coords="${x + 1},${y}"]`),
        document.querySelector(`[coords="${x - 1},${y + 1}"]`),
        document.querySelector(`[coords="${x},${y + 1}"]`),
        document.querySelector(`[coords="${x + 1},${y + 1}"]`),
      ]
    })
  }

  highlightNeighbors(showDisplay) {
    this.state.neighborsOfSelected.forEach(neighborSpace => {
      if (neighborSpace) {
        if (showDisplay) {
          neighborSpace.classList.add('neighbor')
        } else {
          neighborSpace.classList.remove('neighbor')
        }
      }
    })
  }

  highlightSpace(space, showDisplay) {
    const spaceDiv = document.getElementById(space.id)

    // if (spaceDiv.classList.contains('selected')) {
    //   spaceDiv.classList.remove('selected')
    // } else {
    //   // if (selectedSpace) {
    //   //   this.getNeighbors(selectedSpace.coords, 'remove')
    //   // }
    //   spaceDiv.classList.add('selected')
    // }

    if (showDisplay) {
      spaceDiv.classList.add('selected')
    } else {
      spaceDiv.classList.remove('selected')
    }
  }

  setSpaceAndNeighbors(space) {
    const selectedDivs = document.getElementsByClassName('selected')
    const neighborDivs = document.getElementsByClassName('neighbor')

    while (selectedDivs.length) {
      selectedDivs[0].classList.remove('selected')
    }
    while (neighborDivs.length) {
      neighborDivs[0].classList.remove('neighbor')
    }

    if (space) {
      this.setState({selectedSpace: space})
      this.setNeighbors(space.coords)
    } else {
      this.setState({selectedSpace: ''})
      this.setState({neighborsOfSelected: []})
    }
  }

  clickedPlayerSpace(space) {
    console.log('BEFORE state', this.state.selectedSpace.id)
    console.log('BEFORE space', space.id)
    if (this.state.selectedSpace.id !== space.id) {
      // this.setSpaceAndNeighbors(space)
      this.setState({selectedSpace: space})
      this.setNeighbors(space.coords)

      this.highlightNeighbors(true)
      console.log('SET state', this.state.selectedSpace)
      console.log('SET space', space)
    } else {
      this.setSpaceAndNeighbors('')
      console.log('RESET state', this.state.selectedSpace.id)
      console.log('RESET space', space.id)
    }
    console.log('AFTER state', this.state.selectedSpace.id)
    console.log('AFTER space', space.id)

    //   if (selectedSpace.id !== space.id) {
    //     if (selectedSpace) {
    //       this.getNeighbors(selectedSpace.coords, 'remove')
    //     }
    //     this.setState({selectedSpace: space})
    //     this.getNeighbors(space.coords, 'add')
    //   } else {
    //     this.getNeighbors(space.coords, 'remove')
    //   }

  }

  clearHighlightedNeighbors() {
    const allNeighbors = document.getElementsByClassName('neighbor')

    while (allNeighbors.length) {
      allNeighbors[0].classList.remove('neighbor')
    }
  }

  getValidNeighbors(spaceCoords, distance) {
    let [x, y] = spaceCoords
    let validNeighborDivs = []
    let neighborsToCheck = []

    let everything = [
      [
        'leftUp',       // [x-, y-]
        'centerUp',     // [x , y-]
        'rightUp',      // [x+, y-]
        'leftCenter',   // [x-, y]
        'rightCenter',  // [x+, y]
        'leftDown',     // [x-, y+]
        'centerDown',   // [x , y+]
        'rightDown',    // [x+, y+]
      ], [
        `[coords="${x - 1},${y - 1}"]`,
        `[coords="${x},${y - 1}"]`,
        `[coords="${x + 1},${y - 1}"]`,
        `[coords="${x - 1},${y}"]`,
        `[coords="${x + 1},${y}"]`,
        `[coords="${x - 1},${y + 1}"]`,
        `[coords="${x},${y + 1}"]`,
        `[coords="${x + 1},${y + 1}"]`
      ], [
        `[coords="${x - 2},${y - 2}"]`,
        `[coords="${x},${y - 2}"]`,
        `[coords="${x + 2},${y - 2}"]`,
        `[coords="${x - 2},${y}"]`,
        `[coords="${x + 2},${y}"]`,
        `[coords="${x - 2},${y + 2}"]`,
        `[coords="${x},${y + 2}"]`,
        `[coords="${x + 2},${y + 2}"]`
      ], [
        `[coords="${x - 3},${y - 3}"]`,
        `[coords="${x},${y - 3}"]`,
        `[coords="${x + 3},${y - 3}"]`,
        `[coords="${x - 3},${y}"]`,
        `[coords="${x + 3},${y}"]`,
        `[coords="${x - 3},${y + 3}"]`,
        `[coords="${x},${y + 3}"]`,
        `[coords="${x + 3},${y + 3}"]`
      ]
    ]

    if (distance === 1) {
      neighborsToCheck = [everything[0], everything[1]]
    } else if (distance === 2) {
      neighborsToCheck = [everything[0], everything[1], everything[2]]
    } else {
      neighborsToCheck = everything
    }


    for (var distanceIndex = 1; distanceIndex < neighborsToCheck.length; distanceIndex++) {
      for (var directionIndex = 0; directionIndex < neighborsToCheck[0].length; directionIndex++) {
        let neighborDiv = document.querySelector(neighborsToCheck[distanceIndex][directionIndex])
        let blockingDiv = document.querySelector(neighborsToCheck[distanceIndex - 1][directionIndex])

        if (neighborDiv && !neighborDiv.classList.contains('home') && !neighborDiv.classList.contains('away')) {
          if (distanceIndex < 2 || validNeighborDivs.includes(blockingDiv)) {
            validNeighborDivs.push(neighborDiv)
          }
        }
      }
    }

      validNeighborDivs.forEach(neighborSpace => {
          neighborSpace.classList.add('neighbor')
      })
  }

  handleClick(space) {
    const { selectedSpace } = this.state
    const selectedDivs = document.getElementsByClassName('selected')
    const spaceDiv = document.getElementById(space.id)
    const ballSpaceDiv = document.getElementById(this.props.ball.locationId)

    // switch (space.type) {
    //   case 'ball':
    //     // this.clickedPlayerSpace(space)
    //     if (this.state.selectedSpace.id !== space.id) {
    //       this.setState({selectedSpace: space})
    //       this.setNeighbors(space.coords)
    //       this.highlightNeighbors(true)
    //       // console.log('SET state', this.state.selectedSpace)
    //       // console.log('SET space', space)
    //     } else {
    //       this.setSpaceAndNeighbors('')
    //       // console.log('RESET state', this.state.selectedSpace.id)
    //       // console.log('RESET space', space.id)
    //     }
    //     break
    //   case 'home' || 'away':
    //     //   this.props.playerAction(selectedSpace, space)
    //     console.log('PLAYER NEIGHBOR')
    //     break
          // case spaceDiv.classList.contains('ball'):
          //   console.log('BALL')
          //   break
          // case spaceDiv.classList.contains('ballNeighbor'):
          //   console.log('BALL NEIGHBOR')
          //   break
          // case spaceDiv.classList.contains('selected'):
          //   this.setSpaceAndNeighbors('')
          //   break
    //   default:
    //     this.setSpaceAndNeighbors(space)
    //     this.highlightSpace(space, true)
    // }


    // this.setNeighbors(space.coords)


    // IF NEIGHBOR SPACE IS CLICKED
    if (spaceDiv.classList.contains('neighbor')) {

      /* -------------- MOVE BALL --------------- */
      if (selectedSpace.id === this.props.ball.locationId) {
        this.clearHighlightedNeighbors()
        this.props.ballAction(selectedSpace, space)
      }

      if (spaceDiv.classList.contains('ball')) {
        // this.getNeighbors(selectedSpace.coords, 'remove')
        this.clearHighlightedNeighbors()
        this.setState({selectedSpace: space})
        // this.getNeighbors(space.coords, 'add', 3)
        this.getValidNeighbors(space.coords, 3)
      }
      // else {
        // this.getNeighbors(selectedSpace.coords, 'remove')
// this.clearHighlightedNeighbors()
// this.props.playerAction(selectedSpace, space)
      // }

    }

    // PLACE SELECTED CURSOR ON SPACE
    // if (spaceDiv.classList.contains('selected')) {
    //   spaceDiv.classList.remove('selected')
    // } else {
    //   while (selectedDivs.length) {
    //     selectedDivs[0].classList.remove('selected')
    //   }
    //   if (selectedSpace) {
    //     this.getNeighbors(selectedSpace.coords, 'remove')
    //   }
    //   spaceDiv.classList.add('selected')
    // }

/*  CLICK ON PLAYER  */
    // if (spaceDiv.classList.contains('player')) {
    //   if (selectedSpace.id !== space.id) {
    //     if (selectedSpace) {
    //       // this.getNeighbors(selectedSpace.coords, 'remove')
    //       this.clearHighlightedNeighbors()
    //     }
    //     this.setState({selectedSpace: space})
    //     // this.getNeighbors(space.coords, 'add')
    //     this.getValidNeighbors(space.coords, 1)
    //   } else {
    //     this.setState({selectedSpace: ''})
    //     // this.getNeighbors(space.coords, 'remove')
    //     this.clearHighlightedNeighbors()
    //   }
    // }
    if (space.type === 'home' || space.type === 'away') {
      if (selectedSpace.id !== space.id) {
        if (selectedSpace) this.clearHighlightedNeighbors()
        this.setState({selectedSpace: space})
        this.getValidNeighbors(space.coords, 1)
      } else {
        this.setState({selectedSpace: ''})
        this.clearHighlightedNeighbors()
      }
    }

/*  CLICK ON BALL  */
    // if (spaceDiv.classList.contains('ball') && selectedSpace.id === this.props.ball.locationId) {
    //   this.setState({selectedSpace: ''})
    //   // this.getNeighbors(space.coords, 'remove')
    //   this.clearHighlightedNeighbors()
    // }
    if (space.type === 'ball' && selectedSpace.id === this.props.ball.locationId) {
      this.setState({selectedSpace: ''})
      // this.getNeighbors(space.coords, 'remove')
      this.clearHighlightedNeighbors()
    }

  }


  render() {
    const { spaces } = this.props

    return (
      <div className="field">
      {
        spaces && spaces.map(space => {
          return (<div
            className={
              `space ${space.line ? 'line' : ''} ${space.type}`
              // space.type === 'ball' ? 'space ball'
              //   : space.type === 'home' ? 'space home'
              //   : space.type === 'away' ? 'space away'
              //   : 'space'
            }
            key={space.id}
            id={space.id}
            coords={space.coords}
            onClick={() => {
              this.handleClick(space)
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
    // ballLocationId: state.field.ball.locationId,
    ball: state.field.ball,
    teamId: state.team
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const gameId = ownProps.match.params.gameId

    return {
    getBoard: () => {
      dispatch(getField(gameId))
    },
    playerAction: (oldSpace, newSpace) => {
      dispatch(movePlayer(gameId, oldSpace, newSpace))
    },
    ballAction: (oldSpace, newSpace) => {
      dispatch(moveBall(gameId, oldSpace, newSpace))
    }
  }
}

export default connect(mapState, mapDispatch)(Field)
