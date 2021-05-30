import React from 'react'
import PropTypes from 'prop-types'
import standard from './standard.svg' // tells webpack JS will reference file

// console.log(standard)

const Wooplet = (props) => {
  if (props.type === 'standard') {
    return <img
      src={standard}
      height={props.h ?? '100%'}
      width={props.w ?? '100%'}
      alt='Wooplet Avatar'
    />
  }
  return <img
    src={standard}
    height={props.h ?? '100%'}
    width={props.w ?? '100%'}
    alt='Wooplet Avatar'
  />
}

Wooplet.propTypes = {
  type: PropTypes.oneOf(['standard']),
  h: PropTypes.string,
  w: PropTypes.string
}

export default Wooplet
