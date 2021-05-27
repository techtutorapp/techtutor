import React from 'react'
import PropTypes from 'prop-types'

const Wooplet = (props) => {
  if (props.type === 'standard') {
    return <img src='./standard.svg'></img>
  }
  return <></>
}

Wooplet.propTypes = {
  type: PropTypes.oneOf(['standard'])
}

export default Wooplet
