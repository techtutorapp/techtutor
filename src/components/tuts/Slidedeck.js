import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonGroup, Grid, IconButton, GridItem } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { css } from '@emotion/react'
import { withResizeDetector } from 'react-resize-detector'
import ChromeLg from '../../svg/ChromeLg'
// import ChromeMed from '../svg/ChromeMed'

const window = css`
  border-radius: 0 0 10px 10px;
`

// Supposed to handle responsive header reandering but not working yet lol
// const AdaptiveHeader = ({ width }) => {
// useEffect(() => {
//   let chrome = <ChromeLg />
//   if (width >= 768) {
//     chrome = <ChromeLg />
//   } else if (width >= 480) {
//     chrome = <ChromeMed />
//   } else {
//     chrome = <ChromeMed />
//   }
//   return chrome
// })
// const AdaptiveHeader = () => {
//   return <ChromeLg />
// }

// const ChromeWithDetector = withResizeDetector(AdaptiveHeader)

const Slidedeck = (props) => {
  const containerRef = useRef()

  // Represents the largest index reached
  const [passed, setPassed] = useState(0)

  /**
   * Marks a slide as completed and able to be advanced
   * @param {number} i index of slide to be marked as complete
   */
  const passIndex = (i) => {
    if (i >= passed) {
      setPassed(i + 1)
    }
  }

  // Create state with current index and the slides which may have been changed
  const [slides, setSlides] = useState(React.Children.map(props.children, (child, i) => {
    /**
     * Updates a component in the slides array.
     * @param {number} index Index of the target slide
     * @param {React.Component} slide the new slides
     */
    const setSlide = (index, slide) => {
      const clone = [...slides]
      clone[index] = slide
      setSlides(clone)
    }

    if (React.isValidElement(child)) {
      return React.cloneElement(child, { passFn: passIndex, setSlide: setSlide, i, logTest: () => console.log('TEST SUCCEEDED') })
    }
    return child
  }))

  // Current slide index
  const [index, setIndex] = useState(0)

  /**
   * Moves index in slides array by n steps.
   * @param {number} n Step amount (1 for forward, -1 for backward)
   */
  const shiftIndex = (n) => {
    const i = index
    if (i + n >= 0 && i + n < slides.length) {
      setIndex(index + n)
    }
  }

  return <>
    <Grid
      h='100%'
      templateRows='repeat(2, 1fr)'
      gap={2}
    >
      <GridItem
        mx='auto'
        bg='#DEE1E6'
        ref={containerRef}
        height='100%'
        width='100%'
      >
        <Box p='3' css={window} bg='#ffffff' height='90vh'>
          {slides[index]}
        </Box>
      </GridItem>
      {/* <GridItem mx='auto' p='3' align='right' width='80%'>
        {/* <ButtonGroup>
          <IconButton
            aria-label='Go back a slide'
            icon={<ArrowBackIcon/>}
            disabled={index === 0}
            onClick={() => { shiftIndex(-1) }}>
          </IconButton>
          <IconButton
            aria-label='Advance slide'
            colorScheme='teal'
            icon={<ArrowForwardIcon/>}
            disabled={!(index < passed)}
            onClick={() => { shiftIndex(1) }}>
          </IconButton>
        </ButtonGroup> */}
      {/* </GridItem>  */}
    </Grid>
  </>
}

Slidedeck.propTypes = {
  children: PropTypes.node,
  courseId: PropTypes.string.isRequired // unique identifier for state management
}

export default Slidedeck
