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
  className: String,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
}

export default Slide
