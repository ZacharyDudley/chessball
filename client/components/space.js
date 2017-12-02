import React from 'react'
import { connect } from 'react-redux'

import '../css/space.scss';

const Space = (props) => {

  const spaceHandler = () => {
    console.log(props)
  }

  return (
    <div className="space" onClick={spaceHandler} />
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Space);
