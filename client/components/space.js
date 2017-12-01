import React from 'react'
import { connect } from 'react-redux'

import '../css/space.scss';

const Space = (props) => {
  const { state } = props

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
    state: state
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Space);
