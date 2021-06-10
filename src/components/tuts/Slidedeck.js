import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Flex, HStack, Spacer } from '@chakra-ui/layout'
import { Button, Box } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import '../../css/tut.css'

const Slidedeck = (props) => {
  const [pass, setPass] = useState(-1)
  const indexes = []
  for (let i = 0; i < props.children.length; i++) {
    indexes.push(0)
  }
  const [dialogueIndexes, setDialogueIndex] = useState(indexes)

  /**
   * @param {number} i The index of the slide to query
   * @returns The current index of the dialogue for the slide
   */
  function dialogueIndex (i) {
    return dialogueIndexes[i]
  }

  /**
   * @param {number} i The index of the slide to update
   * @param {number} index The new index to move the dialogue to.
   */
  function setDialogue (i, index) {
    const temp = [...dialogueIndexes]
    temp[i] = index
    setDialogueIndex([...temp])
  }

  // Need to update the props we give each slide every time we update our state.
  // This makes the dialogue and slide unlocking propagate in the tutorial
  useEffect(() => {
    setSlides(React.Children.map(props.children, (child, i) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { setSlide: setSlide, i, dialogue: dialogueIndex(i), setDialogue, pass, setPass, nextSlide: () => shiftIndex(1) })
      }
      return child
    }))
  }, [dialogueIndexes, pass])

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

  // Create state with current index and the slides which may have been changed

  const [slides, setSlides] = useState(React.Children.map(props.children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setSlide: setSlide, i, dialogue: dialogueIndex(i), setDialogue, setPass, nextSlide: () => shiftIndex(1) })
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

  return <Flex flexDir='column' bgColor='#474953' h='100%' w='100%'>
    {slides[index]}
    <Box w='100%' py={1} pr={6}>
      <Button
        float='right'
        bgColor='#FF8462'
        color='white'
        disabled={index !== pass}
        fontSize='1.4rem'
        onClick={() => {
          shiftIndex(1)
        }}>
          <HStack>
            <p>Next</p>
            <Spacer/>
            <ArrowRightIcon/>
          </HStack>
        </Button>
    </Box>
  </Flex>
}

Slidedeck.propTypes = {
  children: PropTypes.node,
  courseId: PropTypes.string.isRequired // unique identifier for state management
}

export default Slidedeck
