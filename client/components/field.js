import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../../server/firebase'
import { getField } from '../store'

import '../css/field.scss';


class Field extends Component {
  constructor() {
    super()
    this.state = {
      selectedPlayerSpace: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.getNeighbors = this.getNeighbors.bind(this)
  }

  componentDidMount(){
    const { getBoard } = this.props
    getBoard()
  }

  componentWillReceiveProps(){

  }

  getNeighbors(space) {
    let [x, y] = space.id.split(', ')
    x = +x
    y = +y

    return [
      document.getElementById(`${x - 1}, ${y - 1}`) || undefined,
      document.getElementById(`${x}, ${y - 1}`) || undefined,
      document.getElementById(`${x + 1}, ${y - 1}`) || undefined,
      document.getElementById(`${x - 1}, ${y}`) || undefined,
      document.getElementById(`${x + 1}, ${y}`) || undefined,
      document.getElementById(`${x - 1}, ${y + 1}`) || undefined,
      document.getElementById(`${x}, ${y + 1}`) || undefined,
      document.getElementById(`${x + 1}, ${y + 1}`) || undefined,
    ]
  }

  handleClick(space) {
    const selectedDivs = document.getElementsByClassName('selected')
    const spaceDiv = document.getElementById(space.id)

    if (spaceDiv.classList.contains('player')) {
      this.setState({selectedPlayerSpace: space})
    }

    if (spaceDiv.classList.contains('player') && this.state.selectedPlayerSpace.id !== space.id) {
      console.log('new neighbors')
    }

    if (this.state.selectedPlayerSpace.id === space.id) {
      const neighbors = this.getNeighbors(space)
      neighbors.forEach(neighborSpace => {
        neighborSpace.classList.add('neighbor')
      })
    }




    // if (selectedDivs.length) {
    //   Array.prototype.filter.call(selectedDivs, div => {
    //     div.classList.remove('selected')
    //   })
    // }

    while (selectedDivs.length) {
      selectedDivs[0].classList.remove('selected')
    }

    if (spaceDiv.classList.contains('selected')) {
      console.log('CLICKED')
      spaceDiv.classList.remove('selected')
    }

    spaceDiv.classList.add('selected')
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

  // firebase.ref(`/${gameId}/`).on('value', snap => {
  //   console.log(snap.val())
  //   // dispatch(updateBoard(snap.val()))
  // })

    return {
    getBoard: () => {
      dispatch(getField(gameId))
    },
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
    movePlayer: (oldSpace, newSpace) => {

    }
  }
}

export default connect(mapState, mapDispatch)(Field)
