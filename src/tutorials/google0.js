/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Interactive from '../components/tuts/Interactive'
import { SearchIcon } from '@chakra-ui/icons'
import RedBackpack from '../assets/Red_Backpack.png'
import {
  Box,
  Input,
  Heading,
  VStack,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  Image
} from '@chakra-ui/react'

const Google = props => {
  const validateSearch = () => {
    if (value.match(props.validator)) {
      if (props.dialogue + 1 < props.dialogueArray.length) {
        props.setDialogue(props.i, props.dialogue + 1)
        if (!props.lastSlide) {
          props.setPass(props.i)
        }
      }
    // kinda sketchy rn-- don't have a way of detecting when we're out of dialogue
    // to iterate through. Will have to store dialogue in Slidedeck state somehow
    // which is not ideal but I think it's the only option.
    } else {
      alert('Hmm... something isn\'t right. Try again?')
    }
  }

  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const handleChange = (e) => setValue(e.target.value)
  return <>
      <VStack h='100%' w='100%' flexDir='column' alignItems='center' justifyContent='center'>
        <Heading as='h1' size='3xl' mb={3} fontFamily='Zilla Slab'>Woogle</Heading>
        <FormControl id='searchbar' display='flex' flexDir='column'>
          <InputGroup
            m='auto'
            fontSize='1.2rem'
            w='55%'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color={focused ? 'blue.500' : 'blackAlpha.500'}/>
            </InputLeftElement>
            <Input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyUp={({ key }) => {
              if (key === 'Enter') {
                validateSearch()
              }
            }}
            borderRadius={20}
            value={value}
            onChange={handleChange}
            placeholder='Search Woogle or type a URL'
            size='md'
          />
          </InputGroup>
          <Button type='submit' w='fit-content' m='auto' mt='3' onClick={validateSearch}>Search</Button>

        </FormControl>
        </VStack>
  </>
}

const Slide1 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Heading as='h1' size='xl'>Click next to move on.</Heading>
}}/>

const Slide2 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Google {...props} validator='red backpack'/>
}}/>

const Slide3 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Google {...props} validator='red backpack'/>
}}/>

const Slide4 = <Interactive position='relative' interact={props => {
  return <Box w='100%' h='100%'>
      <Image
        zIndex='overlay'
        position='absolute'
        left='20%'
        top='40%'
        height='180'
        width='180px'
        src={RedBackpack}/>
      <Google {...props} validator='red backpack'/>
    </Box>
}}/>

const deck = [
  Slide1,
  Slide2,
  Slide3,
  Slide4
]

export default deck
