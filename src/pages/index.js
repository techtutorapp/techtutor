import React from 'react'
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  // Box,
  // IconButton,
  // Collapse,
  // Icon,
  // Link,
  // Popover,
  // PopoverTrigger,
  // PopoverContent,
  // useColorModeValue,
  // useDisclosure,
  useBreakpointValue
} from '@chakra-ui/react'
// import {
//   HamburgerIcon,
//   CloseIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
// } from '@chakra-ui/icons'

export default function SplitScreen () {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'orange.400',
                zIndex: -1
              }}>
              techtutor
            </Text>
            <br />{' '}
            <Text color={'orange.500'} as={'span'} fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}>
              Master the Essentials
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Techtutor is a student-made resource aimed at providing an equitable solution to internet education.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              bg={'orange.400'}
              color={'white'}
              _hover={{
                bg: 'orange.500'
              }}>
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://media.discordapp.net/attachments/310544972728238080/818550874510458900/robot_thang_1_bigg.png?width=528&height=683'
          }
        />
      </Flex>
    </Stack>
  )
}
