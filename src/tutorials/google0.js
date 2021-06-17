/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import Interactive from '../components/tuts/Interactive'
import { SearchIcon } from '@chakra-ui/icons'
import RedBackpack from '../assets/Red_Backpack.png'
import RedBackpack2 from '../assets/Red_Backpack2.png'
import OutsideDog from '../assets/OutsideDog.jpg'
import YellowLab from '../assets/YellowLab.jpg'
import LighthouseDog from '../assets/LighthouseDog.jpg'
import {
  Box,
  Input,
  Heading,
  VStack,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  HStack
} from '@chakra-ui/react'

const Google = props => {
  const validateSearch = () => {
    if (value.match(props.validator)) {
      if (props.dialogue + 1 < props.dialogueArray.length) {
        props.setDialogue(props.i, props.dialogue + 1)
        if (props.onSuccess) {
          props.onSuccess()
        }
        if (!props.lastSlide) {
          props.setPass(props.i)
        }
      }
    // kinda sketchy rn-- don't have a way of detecting when we're out of dialogue
    // to iterate through. Will have to store dialogue in Slidedeck state somehow
    // which is not ideal but I think it's the only option.
    } else {
      onOpen()
    }
  }
  const initialFocus = useRef()
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleChange = (e) => setValue(e.target.value)
  return <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader bgColor='#e3e3e3' borderTopLeftRadius='md' borderTopRightRadius='md'>
            🤔 Hmm... not quite. Keep trying, you&apos;ve got this!
          </ModalHeader>
          <ModalFooter>
            <Button onClick={onClose} color='white' bgColor='#FF8562' _hover={{ backgroundColor: '#FFAD97' }}>
              Try Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack h='100%' w='100%' flexDir='column' alignItems='center' justifyContent='center'>
        <Heading as='h1' size='3xl' mb={3} fontFamily='Zilla Slab'>Woogle</Heading>
        <FormControl id='searchbar' display='flex' flexDir='column'>
          <Popover
            initialFocusRef={initialFocus}
            isOpen={value.length === 0 && props.popover}
            placement='left-start'>
            <PopoverTrigger>
              <InputGroup
                m='auto'
                fontSize='1.2rem'
                w='55%'>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color={focused ? 'blue.500' : 'blackAlpha.500'}/>
                </InputLeftElement>
                <Input
                  ref={initialFocus}
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
            </PopoverTrigger>
            <PopoverContent width='fit-content'>
              <PopoverArrow/>
              <PopoverBody>
                <strong>Type some keywords here!</strong>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button type='submit' w='fit-content' m='auto' mt='3' onClick={validateSearch}>Search</Button>
        </FormControl>
      </VStack>
  </>
}

const Slide1 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Google {...props} validator='alkjdflksdjf'/>
}}/>

const Slide2 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Google {...props} validator='alkjdflksdjf'/>
}}/>

const Slide3 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Google {...props} validator='rsldkjalskjaj'/>
}}/>

const Slide4 = <Interactive interact={props => {
  const [success, setSuccess] = useState(false)
  return <Box w='100%' h='100%' position='relative'>
    {
      success
        ? <Image
          zIndex='overlay'
          position='absolute'
          left='5%'
          bottom='5%'
          height='40%'
          src={RedBackpack2}/>
        : <Image
          zIndex='overlay'
          position='absolute'
          left='5%'
          bottom='5%'
          height='35%'
          src={RedBackpack}/>

    }

    <Google {...props} validator='red backpack' onSuccess={() => setSuccess(true)} popover/>
  </Box>
}}/>

const Slide5 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Google {...props} validator='rsldkjalskjaj'/>
}}/>

const Slide6 = <Interactive interact={props => {
  props.setPass(props.i)
  return <Google {...props} validator='rsldkjalskjaj'/>
}}/>

const Slide7 = <Interactive interact={props => {
  const [show, setShow] = useState(false)
  return <Box w='100%' h='100%' position='relative'>
    { show &&
        <HStack
          zIndex='overlay'
          position='absolute'
          bottom='2%'
          left='0'
          right='0'
          mx='auto'
          height='30%'
          w='fit-content'
          spacing={6}>
          <Image h='100%' src={YellowLab}/>
          <Image h='100%' src={OutsideDog}/>
          <Image h='100%' src={LighthouseDog}/>
      </HStack>
    }
    <Google {...props} validator='cute dogs' onSuccess={() => setShow(true)} popover/>
  </Box>
}}/>

const Slide8 = <Interactive interact={props => {
  return <Box w='100%' h='100%' position='relative'>
      <HStack
        zIndex='overlay'
        position='absolute'
        bottom='2%'
        left='0'
        right='0'
        mx='auto'
        height='30%'
        w='fit-content'
        spacing={6}>
        <Image h='100%' src={YellowLab}/>
        <Image h='100%' src={OutsideDog}/>
        <Image h='100%' src={LighthouseDog}/>
    </HStack>
    <Google {...props} validator='alfkjsldkfjslkdjf'/>
  </Box>
}}/>

const deck = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8
]

export default deck
