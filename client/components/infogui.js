import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/infoGui.scss';

const COMPONENT = (props) => {

  return (
    <div className="gui-wrapper">

      <div className="time">
        <h2>00:00</h2>
      </div>

      <div className="players">
        <div className="playerInfo">
          <h1>HOME</h1>
          <div className="color home" />
          <h2>0</h2>
        </div>

        <div className="playerInfo">
          <h1>AWAY</h1>
          <div className="color away" />
          <h2>0</h2>
        </div>
      </div>

    </div>
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

export default connect(mapState, mapDispatch)(COMPONENT);

/**
 * PROP TYPES
 */
COMPONENT.propTypes = {

}
