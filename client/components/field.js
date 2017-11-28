import React from 'react'
import {Space} from './'

import '../css/field.scss';


const Field = () => {
  const spaces = []
  var i=0

  for (var h = 0; h < 9; h++) {
    for (var w = 0; w < 12; w++) {
      spaces.push(<Space key={i++} x={w} y={h} />)
    }
  }

  return (
    <div className="field">{spaces}</div>
  )
}

export default Field
