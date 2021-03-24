import { Container } from '@chakra-ui/layout'
import React from 'react'
import Tutorial from '../tutorials/store/Tutorial1/deck'

const Test = props => {
  return (
    <Container maxW='container.md' pt='5'>
      <Tutorial/>
    </Container>
  )
}

export default Test
