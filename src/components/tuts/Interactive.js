import React from 'react'
import PropTypes from 'prop-types'

function Interactive (props) {
  return <>{props.interact(props)}</>
}

Interactive.propTypes = {
  interact: PropTypes.func
}

export default Interactive
