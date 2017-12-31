import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getField, movePlayer } from '../store'

import '../css/field.scss';


class Field extends Component {
  constructor() {
    super()
    this.state = {
      selectedSpace: '',
      neighborsOfSelected: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.getNeighbors = this.getNeighbors.bind(this)
    this.setNeighbors = this.setNeighbors.bind(this)
    this.setSelectedSpace = this.setSelectedSpace.bind(this)
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

  setSelectedSpace(space) {
    this.setState({selectedSpace: space})
    this.setNeighbors(space.coords)
  }

  clickedPlayerSpace(space) {
    this.state.selectedSpace.id === space.id
      ? this.setSelectedSpace('')
      : (
          this.setSelectedSpace(space)
          // ,
          // this.highlightNeighbors(space)
        )
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

  getNeighbors(spaceCoords, action) {
    let [x, y] = spaceCoords

    const neighbors = [
      document.querySelector(`[coords="${x - 1},${y - 1}"]`),
      document.querySelector(`[coords="${x},${y - 1}"]`),
      document.querySelector(`[coords="${x + 1},${y - 1}"]`),
      document.querySelector(`[coords="${x - 1},${y}"]`),
      document.querySelector(`[coords="${x + 1},${y}"]`),
      document.querySelector(`[coords="${x - 1},${y + 1}"]`),
      document.querySelector(`[coords="${x},${y + 1}"]`),
      document.querySelector(`[coords="${x + 1},${y + 1}"]`),
    ]

    if (action === 'add') {
      neighbors.forEach(neighborSpace => {
        neighborSpace.classList.add('neighbor')
      })
    } else if (action === 'remove') {
      neighbors.forEach(neighborSpace => {
        neighborSpace.classList.remove('neighbor')
      })
    }
  }

  handleClick(space) {
    const { selectedSpace } = this.state
    const selectedDivs = document.getElementsByClassName('selected')
    const spaceDiv = document.getElementById(space.id)

    this.setNeighbors(space.coords)

    // IF NEIGHBOR SPACE IS CLICKED
    if (spaceDiv.classList.contains('neighbor')) {
      console.log('neighbor')
      this.props.playerAction(selectedSpace, space)
    }

    // PLACE SELECTED CURSOR ON SPACE
    if (spaceDiv.classList.contains('selected')) {
      spaceDiv.classList.remove('selected')
    } else {
      while (selectedDivs.length) {
        selectedDivs[0].classList.remove('selected')
      }
      if (selectedSpace) {
        this.getNeighbors(selectedSpace.coords, 'remove')
      }
      spaceDiv.classList.add('selected')
    }

    // HIGHLIGHT NEIGHBORS WHEN PLAYER SPACES ARE CLICKED
    if (spaceDiv.classList.contains('player')) {
      if (selectedSpace.id !== space.id) {
        if (selectedSpace) {
          this.getNeighbors(selectedSpace.coords, 'remove')
        }
        this.setState({selectedSpace: space})
        this.getNeighbors(space.coords, 'add')
      } else {
        this.getNeighbors(space.coords, 'remove')
      }
    }



    if (spaceDiv.classList.contains('ball')) {
      console.log('BALL')
    }

    // switch(clickedSpaceContains) {
    //   case 'selected':
    //     this.state.selectedSpace.id === space.id
    //       ? this.setSelectedSpace('')
    //       : this.setSelectedSpace(space)
    //     return
    //   case 'player':
    //     return
    //   case 'playerNeighbor':
    //     return
    //   case 'ball':
    //     return
    //   case 'ballNeighbor':
    //     return
    //   default:
    //     return
    // }
  }


  render() {
    const { spaces } = this.props
console.log(this.state)
    return (
      <div className="field">
      {
        spaces && spaces.map(space => {
          return (<div
            className={
              space.hasBall ? 'space ball'
                : space.hasPlayer ? 'space player' : 'space'
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
    }
  }
}

export default connect(mapState, mapDispatch)(Field)
