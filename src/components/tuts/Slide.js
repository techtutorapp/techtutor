import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

function Slide (props) {
  return (
    <Box className={`slide ${props.className}`}>
      {props.children}
    </Box>
  )
}

Slide.propTypes = {
  className: PropTypes.string,
  passFn: PropTypes.func, // function
  setSlide: PropTypes.func, // function
  i: PropTypes.number, // integer
  children: PropTypes.node, // component or list of components
  logTest: PropTypes.func
}

export default Slide
