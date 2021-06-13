import React from 'react'
import PropTypes from 'prop-types'
import { StaticImage } from 'gatsby-plugin-image'
import { Box } from '@chakra-ui/react'

// console.log(standard)

const Wooplet = (props) => {
  if (props.type === 'standard') {
    return <Box flex={6} w='35%' m='auto'>
        <StaticImage
          placeholder='tracedSVG'
          src='./standard.svg'
          alt='Wooplet Avatar'
        />
      </Box>
  }
  return <Box flex={6} w='35%' m='auto'>
      <StaticImage
        placeholder='tracedSVG'
        src='./standard.svg'
        alt='Wooplet Avatar'
      />
    </Box>
}

Wooplet.propTypes = {
  type: PropTypes.oneOf(['standard']),
  h: PropTypes.string,
  w: PropTypes.string
}

export default Wooplet
