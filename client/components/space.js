import React from 'react'
import { connect } from 'react-redux'

import '../css/space.scss';

const Space = (props) => {
  const { containsBall } = props

  const spaceHandler = () => {
    // if (containsBall) {
    //   console.log(props)
    // }
  }

  return (
    <div className="space" /*onClick={spaceHandler}*/ />
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    containsBall: state.game.state.hasBall
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Space);
