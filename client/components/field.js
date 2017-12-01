import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Space } from './'
import firebase from '../firebase'

import '../css/field.scss';


class Field extends Component {

  componentDidMount(){
    const { getBoard } = this.props

    getBoard()
  }

  render () {
    // const { spaces } = this.props

    return (
      <div className="field">
      {
        console.log(this.props)
        // spaces.map((space, i) => {
        //   return (<Space key={i} id={[space.x, space.y]} />)
        // })
      }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    state: state,
    spaces: state.field.spaces
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const gameId = ownProps.match.params.gameId

  return {
    getBoard: () => {
      firebase.ref(`/games/${gameId}/`).once('value')
        .then(snap => {console.log(snap)})
    },
    updateBoard: () => {
      // firebase.ref(`/games/${gameId}/`).update()
    }
  }
}

export default connect(mapState, mapDispatch)(Field)
