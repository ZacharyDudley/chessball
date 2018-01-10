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

  clickedPlayerNeighborSpace(space) {
    // const spaceDiv = document.getElementById(space.id)
    // spaceDiv.classList.contains('ball')
    //   ? this.clickedBallSpace()
    //   : send data to move player route
  }

  clickedBallSpace() {
    // show ball neighbors
  }

  clickedBallNeighborSpace() {
    // send data to move ball route
  }

  getNeighbors(spaceCoords, action, distance = 1) {
    let [x, y] = spaceCoords

    const distanceOne = [
      document.querySelector(`[coords="${x - 1},${y - 1}"]`),
      document.querySelector(`[coords="${x},${y - 1}"]`),
      document.querySelector(`[coords="${x + 1},${y - 1}"]`),
      document.querySelector(`[coords="${x - 1},${y}"]`),
      document.querySelector(`[coords="${x + 1},${y}"]`),
      document.querySelector(`[coords="${x - 1},${y + 1}"]`),
      document.querySelector(`[coords="${x},${y + 1}"]`),
      document.querySelector(`[coords="${x + 1},${y + 1}"]`),
    ]

    const distanceTwo = [
      document.querySelector(`[coords="${x - 2},${y - 2}"]`),
      document.querySelector(`[coords="${x},${y - 2}"]`),
      document.querySelector(`[coords="${x + 2},${y - 2}"]`),
      document.querySelector(`[coords="${x - 2},${y}"]`),
      document.querySelector(`[coords="${x + 2},${y}"]`),
      document.querySelector(`[coords="${x - 2},${y + 2}"]`),
      document.querySelector(`[coords="${x},${y + 2}"]`),
      document.querySelector(`[coords="${x + 2},${y + 2}"]`),
    ]

    const distanceThree = [
      document.querySelector(`[coords="${x - 3},${y - 3}"]`),
      document.querySelector(`[coords="${x},${y - 3}"]`),
      document.querySelector(`[coords="${x + 3},${y - 3}"]`),
      document.querySelector(`[coords="${x - 3},${y}"]`),
      document.querySelector(`[coords="${x + 3},${y}"]`),
      document.querySelector(`[coords="${x - 3},${y + 3}"]`),
      document.querySelector(`[coords="${x},${y + 3}"]`),
      document.querySelector(`[coords="${x + 3},${y + 3}"]`),
    ]

    let neighbors

    if (distance === 1) {
      neighbors = distanceOne
    } else if (distance === 2) {
      neighbors = [...distanceOne, ...distanceTwo]
    } else if (distance === 3) {
      neighbors = [...distanceOne, ...distanceTwo, ...distanceThree]
    }

    if (action === 'add') {
      neighbors.forEach(neighborSpace => {
        if (neighborSpace && !neighborSpace.classList.contains('player')) {
          neighborSpace.classList.add('neighbor')
        }
      })
    } else if (action === 'remove') {
      // neighbors.forEach(neighborSpace => {
      //   if (neighborSpace) {
      //     neighborSpace.classList.remove('neighbor')
      //   }
      // })
      const allNeighbors = document.getElementsByClassName('neighbor')

      while (allNeighbors.length) {
        allNeighbors[0].classList.remove('neighbor')
      }
  }
  }

  handleClick(space) {
    const { selectedSpace } = this.state
    const selectedDivs = document.getElementsByClassName('selected')
    const spaceDiv = document.getElementById(space.id)
    const ballSpaceDiv = document.getElementById(this.props.ballLocationId)

    // switch (true) {
    //   case spaceDiv.classList.contains('player'):
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
    //   case spaceDiv.classList.contains('playerNeighbor'):
    //     //   this.props.playerAction(selectedSpace, space)
    //     console.log('PLAYER NEIGHBOR')
    //     break
    //   case spaceDiv.classList.contains('ball'):
    //     console.log('BALL')
    //     break
    //   case spaceDiv.classList.contains('ballNeighbor'):
    //     console.log('BALL NEIGHBOR')
    //     break
    //   case spaceDiv.classList.contains('selected'):
    //     this.setSpaceAndNeighbors('')
    //     break
    //   default:
    //     this.setSpaceAndNeighbors(space)
    //     this.highlightSpace(space, true)
    // }


    // this.setNeighbors(space.coords)


    // IF NEIGHBOR SPACE IS CLICKED
    if (spaceDiv.classList.contains('neighbor')) {
      if (spaceDiv.classList.contains('ball')) {
        this.getNeighbors(selectedSpace.coords, 'remove')
        this.setState({selectedSpace: space})
        this.getNeighbors(space.coords, 'add', 3)
      } else {
        this.getNeighbors(selectedSpace.coords, 'remove')
        this.props.playerAction(selectedSpace, space)
      }

      if (selectedSpace.id === this.props.ballLocationId) {
        this.getNeighbors(selectedSpace.coords, 'remove')
        this.props.ballAction(selectedSpace, space)
      }
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

    // HIGHLIGHT NEIGHBORS WHEN PLAYER SPACES ARE CLICKED
    if (spaceDiv.classList.contains('player')) {
      if (selectedSpace.id !== space.id) {
        if (selectedSpace) {
          this.getNeighbors(selectedSpace.coords, 'remove')
        }
        this.setState({selectedSpace: space})
        this.getNeighbors(space.coords, 'add')
      } else {
        this.setState({selectedSpace: ''})
        this.getNeighbors(space.coords, 'remove')
      }
    }

    if (spaceDiv.classList.contains('ball') && selectedSpace.id === this.props.ballLocationId) {
      this.setState({selectedSpace: ''})
      this.getNeighbors(space.coords, 'remove')
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
              // space.hasBall ? 'space ball'
              //   : space.hasPlayer ? 'space player' : 'space'
              space.hasBall ? 'space ball'
                : !space.hasPlayer ? 'space'
                : space.hasPlayer >= 20 ? 'space player away' : 'space player home'
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
