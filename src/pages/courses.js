import React from 'react'
import { Box, Image, Grid, Heading } from '@chakra-ui/react'
import { courses } from './index'
import { Link } from 'gatsby'

const Courses = (props) => {
  return (
    <Box w='100%' h='100vh' bgColor='white'>
      <Grid
        p={10}
        templateColumns='repeat(4, 1fr)'
        templateRows='repeat(2, 1fr)'
        gap={8}>
          {
            courses.map((course, i) => {
              console.log(`../assets/${course.image}`)
              return (
                <Link key={i} href={course.href}>
                    <Box p='5' maxW='320px' borderWidth='1px' borderRadius='lg' _hover={{ boxShadow: '0px 0px 5px 1px #FFB7A3' }}>
                    <Image
                      borderRadius='md'
                      border='lightgray 1px solid'
                      fallbackSrc='https://via.placeholder.com/320x220?text=Course+coming+soon!'
                      src={course.image}
                      mb={4}/>
                    <Heading as='h1' size='md' mb={1}>{course.label}</Heading>
                    <Box as='p'>{course.subLabel}</Box>
                  </Box>
                </Link>
              )
            })
          }
      </Grid>
    </Box>
  )
}

export default Courses
