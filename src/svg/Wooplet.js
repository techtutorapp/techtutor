import React from 'react'
import PropTypes from 'prop-types'
import standard from './standard.svg'

const Wooplet = (props) => {
  if (props.type === 'standard') {
    return standard
  }
  return <></>
}

Wooplet.propTypes = {
  type: PropTypes.oneOf(['standard'])
}

export default Wooplet
