import React from 'react'

import '../css/space.scss';

const Space = (props) => {
  const spaceHandler = () => {
    console.log(props)
  }

  return (
    <div className="space" onClick={spaceHandler} />
  )
}

export default Space
