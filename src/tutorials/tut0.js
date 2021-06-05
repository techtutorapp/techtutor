import React from 'react'
import { Button } from '@chakra-ui/button'
import Interactive from '../components/tuts/Interactive'
import { Heading } from '@chakra-ui/layout'

const Slide1 = <Interactive interact={props => {
  console.log(props)
  return <>
      <Heading as='h1' size='xl'>Just click on the button to move on!</Heading>
      <Button onClick={() => {
        props.setDialogue(props.i, props.dialogue + 1)
      }}>
        Bump dialogue +1
      </Button>
  </>
}}/>

const Slide2 = <Interactive interact={props => {
  return <>
    <div>This is also working! yay!</div>
    <Button onClick={() => props.setDialogue(props.i, props.dialogue + 1)}>Another thing</Button>
  </>
}}/>

const deck = [
  Slide1,
  Slide2
]

export default deck
