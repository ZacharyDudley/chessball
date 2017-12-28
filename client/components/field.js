import React, { Component } from 'react'
import { connect } from 'react-redux'
// import firebase from '../../server/firebase'
import { getField, movePlayer } from '../store'

import '../css/field.scss';


class Field extends Component {
  constructor() {
    super()
    this.state = {
      selectedSpace: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.getNeighbors = this.getNeighbors.bind(this)
  }

  componentDidMount(){
    const { getBoard } = this.props
    getBoard()
  }

  getNeighbors(spaceId, action) {
    let [x, y] = spaceId.split(', ')
    x = +x
    y = +y

    const neighbors = [
      document.getElementById(`${x - 1}, ${y - 1}`) || undefined,
      document.getElementById(`${x}, ${y - 1}`) || undefined,
      document.getElementById(`${x + 1}, ${y - 1}`) || undefined,
      document.getElementById(`${x - 1}, ${y}`) || undefined,
      document.getElementById(`${x + 1}, ${y}`) || undefined,
      document.getElementById(`${x - 1}, ${y + 1}`) || undefined,
      document.getElementById(`${x}, ${y + 1}`) || undefined,
      document.getElementById(`${x + 1}, ${y + 1}`) || undefined,
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

    // IF NEIGHBOR SPACE IS CLICKED
    if (spaceDiv.classList.contains('neighbor')) {
      console.log('neighbor')
      this.props.playerAction(selectedSpace.hasPlayer, selectedSpace, space)
    }

    // PLACE SELECTED CURSOR ON SPACE
    if (spaceDiv.classList.contains('selected')) {
      spaceDiv.classList.remove('selected')
    } else {
      while (selectedDivs.length) {
        selectedDivs[0].classList.remove('selected')
      }
      if (selectedSpace) {
        this.getNeighbors(selectedSpace.id, 'remove')
      }
      spaceDiv.classList.add('selected')
    }

    // HIGHLIGHT NEIGHBORS WHEN PLAYER SPACES ARE CLICKED
    if (spaceDiv.classList.contains('player')) {
      if (selectedSpace.id !== space.id) {
        if (selectedSpace) {
          this.getNeighbors(selectedSpace.id, 'remove')
        }
        this.setState({selectedSpace: space})
        this.getNeighbors(space.id, 'add')
      } else {
        this.getNeighbors(space.id, 'remove')
      }
    }



    if (spaceDiv.classList.contains('ball')) {
      console.log('BALL')
    }

    //IF PLAYER SPACE
      //SET STATE
    //IF NEIGHBOR SPACE
      //MOVE PLAYER
    //IF NEIGHBOR SPACE AND BALL
      //HIGHLIGHT BALL OPTIONS
    //IF BALL NEIGHBOR
      //MOVE BALL

  }


  render() {
    const { spaces } = this.props

    return (
      <div className="field">
      {
        spaces && spaces.map(space => {
          return (<div
            className={
              space.hasBall ? 'space ball' :
                space.hasPlayer ? 'space player' : 'space'
            }
            key={space.id}
            id={space.id}
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
    playerAction: (player, oldSpace, newSpace) => {
      dispatch(movePlayer(gameId, player, oldSpace, newSpace))
    }
    // handleClick: (space) => {
    //   const selectedDivs = document.getElementsByClassName('selected')
    //   const spaceDiv = document.getElementById(space.id)

    //   if (spaceDiv.classList.contains('player') && spaceDiv.classList.contains('selected')) {
    //     // this.setState({selectedPlayerSpace: space})
    //     console.log(this.state.selectedPlayerSpace)
    //   }

    //   // if (selectedDivs.length) {
    //   //   Array.prototype.filter.call(selectedDivs, div => {
    //   //     div.classList.remove('selected')
    //   //   })
    //   // }

    //   while (selectedDivs.length) {
    //     selectedDivs[0].classList.remove('selected')
    //   }

    //   if (spaceDiv.classList.contains('selected')) {
    //     console.log('CLICKED')
    //     spaceDiv.classList.remove('selected')
    //   }

    //   spaceDiv.classList.add('selected')

    // },
  }
}

export default connect(mapState, mapDispatch)(Field)
