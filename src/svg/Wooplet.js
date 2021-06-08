import React from 'react'
import PropTypes from 'prop-types'
import standard from './standard.svg' // tells webpack JS will reference file
import { Image } from '@chakra-ui/image'

// console.log(standard)

const Wooplet = (props) => {
  if (props.type === 'standard') {
    return <Image
      src={standard}
      {...props}
      alt='Wooplet Avatar'
    />
  }
  return <Image
    src={standard}
    {...props}
    alt='Wooplet Avatar'
  />
}

Wooplet.propTypes = {
  type: PropTypes.oneOf(['standard']),
  h: PropTypes.string,
  w: PropTypes.string
}

export default Wooplet
