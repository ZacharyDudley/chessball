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
    // console.log(this.props.state)
    getBoard()
  }

  componentWillReceiveProps(){

  }

  getNeighbors(space) {
    const [x, y] = space.coords

    const neighbors = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1]
    ]
  }

  handleClick(space) {
    const selectedDivs = document.getElementsByClassName('selected')
    const spaceDiv = document.getElementById(space.id)

    if (spaceDiv.classList.contains('player') && spaceDiv.classList.contains('selected')) {
      this.setState({selectedPlayerSpace: space})
    }

    // if (this.state.selectedPlayerSpace && )

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
            coords={`${space.coords[0]}, ${space.coords[1]}`}
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
