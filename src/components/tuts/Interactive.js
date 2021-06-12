import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

function Interactive (props) {
  const { interact } = props
  return <Box {...{ interact, ...props }}>{props.interact(props)}</Box>
}

Interactive.propTypes = {
  interact: PropTypes.func
}

export default Interactive
