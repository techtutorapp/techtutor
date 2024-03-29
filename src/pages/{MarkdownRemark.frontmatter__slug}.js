/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { Box, Text, AspectRatio, Flex, VStack } from '@chakra-ui/react'
import Slidedeck from '../components/tuts/Slidedeck'
import MarkdownSlide from '../components/tuts/MarkdownSlide'
import Wooplet from '../svg/Wooplet'
import Typewriter from '../components/tuts/util/Typewriter'

/**
 * Gets the contents of a specified tag from an HTML string
 * @param {string} string html style string to parse
 * @param {string} tag name of the tag to look for
 * @param {number} start only search after this index
 */
function getTagContents (string, tag, start = 0) {
  const startIndex = string.indexOf(`<${tag}>`, start)
  const endIndex = string.indexOf(`</${tag}>`, start)
  const tagLength = `<${tag}>`.length
  const contents = string.substring(startIndex + tagLength, endIndex)
  return contents
}

export default function Template ({
  data,
  navigation // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  // const [info, setInfo] = useState([])
  const [interactives, setInteractives] = useState([])
  const [dialogue, setDialogue] = useState([])

  const slides = html.split('<Slide>').map(content => content.replace(/<\/Slide>/g, '')).filter(slide => slide.length > 0)

  if (interactives.length === 0) {
    const { default: activities } = require(`../tutorials/${frontmatter.interact}.js`)
    setInteractives([...activities])
  }

  useEffect(() => {
    if (window) {
      const alertUser = e => e.preventDefault()
      window.addEventListener('beforeunload', alertUser)
      return () => window.removeEventListener('beforeunload', alertUser)
    }
  })

  return (
    <AspectRatio
      key={interactives.toString()}
      className='tutorial-container'
      w='100%'
      ratio={21 / 10.5}
      overflow='hidden'
      height='fit-content'
    >
      <Slidedeck courseId={frontmatter.id}>
        {slides.map((slide, i) => {
          const scriptArr = getTagContents(slide, 'Dialogue').split('* ').map(s => s.trim()).filter(str => str !== '')

          if (dialogue.length === 0 || dialogue.length < i) {
            setDialogue(dialogue => [...dialogue, [...scriptArr]])
          }

          // Renders in the content container to the right
          return <MarkdownSlide
            key={i}
            test='bruh'
            render={slideProps => {
              const props = { ...slideProps }
              return (
                <VStack bgColor='#474953' h='85%' w='100%'>
                  <Flex w='100%' h='100%' p={5}>
                    <Box flex={5}>
                      <Flex flexDir='column' h='100%'>
                        <Wooplet/>
                        <Box
                          w='90%'
                          maxH='100%'
                          flex={5}
                          m='auto'
                          bgColor='blackAlpha.600'
                          borderRadius='10'
                        >
                          <Text as='div' color='white' fontSize='2xl' p={5} float='left'>
                          {
                            dialogue[i][props.dialogue] &&
                            <Typewriter words={[dialogue[i][props.dialogue]]}></Typewriter>
                          }
                        </Text>
                      </Box>
                      </Flex>
                    </Box>
                    <Box id='interactive-container' flex={7} h='100%' borderRadius={10} bgColor='white'>
                      <Flex w='100%' h='6%' borderTopRadius={10}>
                          <Box flex={3} bgColor='#FF8462' borderTopLeftRadius={10}></Box>
                          <Box flex={12} bgColor='#E4E4E4' borderTopRadius={10}></Box>
                      </Flex>
                      <Box w='100%' h='94%'>
                      {
                          (() => {
                            const updateDialogue = (i, index) => {
                              props.setDialogue(i, index)
                            }

                            // Gives the interactive component access to all current props
                            if (props.children) {
                              const children = React.Children.map([props.children], (child, i) => {
                                if (React.isValidElement(child)) {
                                  return React.cloneElement(child, {
                                    ...props,
                                    setDialogue: updateDialogue,
                                    dialogueArray: dialogue[props.i]
                                  })
                                }
                                return child
                              })
                              const childProps = children[0].props // Extract newly generated props from child
                              const { interact: renderInteractive } = childProps // Find render method from props
                              return renderInteractive(children[0].props) // Call render method with props
                            }
                          })()
                        }
                      </Box>
                    </Box>
                  </Flex>
                </VStack>)
            }}>
              {
                interactives[i] !== undefined && interactives[i]
              }
          </MarkdownSlide>
        })}
      </Slidedeck>
    </AspectRatio>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        id
        interact
      }
    }
  }
`
