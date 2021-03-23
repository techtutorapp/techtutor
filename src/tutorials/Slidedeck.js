import React from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonGroup, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { css } from '@emotion/react'

const window = css`
  border-radius: 10px;
`

class Slidedeck extends React.Component {
  constructor (props) {
    super()
    this.state = {
      index: 0,
      slides: React.Children.toArray(props.children)
    }

    this.shiftIndex = this.shiftIndex.bind(this)
  }

  shiftIndex (n) {
    const i = this.state.index
    if (i + n >= 0 && i + n < this.state.slides.length) {
      this.setState({ index: this.state.index + n })
    }
  }

  render () {
    return <>
    <Box p='3' css={window} bg='#f3f4f5' minH='300px' ratio={4 / 3}>
      {this.state.slides[this.state.index]}
    </Box>
    <Box p='3' align='right'>
      <ButtonGroup>
        <IconButton aria-label='Go back a slide' icon={<ArrowBackIcon/>} onClick={() => { this.shiftIndex(-1) }}></IconButton>
        <IconButton aria-label='Advance slide' icon={<ArrowForwardIcon/>} onClick={() => { this.shiftIndex(1) }}></IconButton>
      </ButtonGroup>
    </Box>
    </>
  }
}

Slidedeck.propTypes = {
  children: React.node,
  courseId: PropTypes.string.isRequired // unique identifier for state management
}

export default Slidedeck
