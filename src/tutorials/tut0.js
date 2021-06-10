/* eslint-disable react/prop-types */
import React from 'react'
import Interactive from '../components/tuts/Interactive'
import { Input, Heading, VStack, Button } from '@chakra-ui/react'

const Google = props => {
  const [value, setValue] = React.useState('')
  const handleChange = (e) => setValue(e.target.value)
  return <>
      <VStack h='100%' w='100%' flexDir='column' alignItems='center' justifyContent='center'>
        <Heading as='h1' size='3xl' mb={3} fontFamily='Zilla Slab'>Woogle</Heading>
        <Input
          m='auto'
          fontSize='1.2rem'
          w='55%'
          value={value}
          onChange={handleChange}
          placeholder='Search Woogle or type a URL'
          borderRadius={20}
          size="md"
        />
        <Button onClick={() => {
          if (value.match(props.validator) && props.dialogue + 1 < props.dialogueArray.length) {
            // kinda sketchy rn-- don't have a way of detecting when we're out of dialogue
            // to iterate through. Will have to store dialogue in Slidedeck state somehow
            // which is not ideal but I think it's the only option.
            props.setDialogue(props.i, props.dialogue + 1)
            if (!props.lastSlide) {
              props.setPass(props.i)
            }
          } else {
            alert('Hmm... something isn\'t right. Try again?')
          }
        }}>Search</Button>
      </VStack>
  </>
}

const Slide1 = <Interactive interact={props => {
  return <Google {...props} validator='bruh'></Google>
}}/>

const Slide2 = <Interactive interact={props => {
  return <Google {...props} validator='hello' lastSlide></Google>
}}/>

const deck = [
  Slide1,
  Slide2
]

export default deck
