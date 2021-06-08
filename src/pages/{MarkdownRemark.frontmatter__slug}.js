/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { Box, Text, Button, AspectRatio, Flex, HStack, VStack, Spacer } from '@chakra-ui/react'
import Slidedeck from '../components/tuts/Slidedeck'
import MarkdownSlide from '../components/tuts/MarkdownSlide'
import Wooplet from '../svg/Wooplet'
import Typewriter from '../components/tuts/util/Typewriter'
import { ArrowRightIcon } from '@chakra-ui/icons'

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
  const { markdownRemark } = data // data.markdownRemark holds md file data
  const { frontmatter, html } = markdownRemark
  const [info, setInfo] = useState([])
  const [interactives, setInteractives] = useState([])
  const [dialogue, setDialogue] = useState([])

  const slides = html.split('<Slide>').map(content => content.replaceAll('</Slide>', '')).filter(slide => slide.length > 0)

  const [indexes, setIndexes] = useState(slides.map(n => 0));

  (async () => {
    const { default: activities } = await import(`../tutorials/${frontmatter.interact}`)
    if (interactives.length === 0) {
      setInteractives([...activities])
    }
  })()

  useEffect(() => {
    if (window) {
      const alertUser = e => e.preventDefault()
      window.addEventListener('beforeunload', alertUser)
      return () => window.removeEventListener('beforeunload', alertUser)
    }
  },
  [window])

  return (
    <AspectRatio
      key={interactives.toString() + indexes.toString()}
      className='tutorial-container'
      h='100%'
      ratio={21 / 10}
      overflow='hidden'
    >
      <Slidedeck courseId={frontmatter.id}>
        {slides.map((slide, i) => {
          const scriptArr = getTagContents(slide, 'Dialogue').split('* ').map(s => s.trim()).filter(str => str !== '')

          if (dialogue.length === 0 || dialogue.length < i) {
            setDialogue(dialogue => [...dialogue, [...scriptArr]])
            setIndexes(indexes => [...indexes, 0])
          }

          // Only add info to state if we haven't aded this slide yet
          if (info.length === 0 || i - 1 === info.length) {
            const infoArray = getTagContents(slide, 'info').split('\n').map(str => {
              return str.trim()
            }).filter(str => str !== '')

            // infoArray: ['passed: true', ...]
            const thisInfo = {}
            infoArray.forEach(value => {
              const parts = value.split(': ')
              const val = Boolean(parts[1])
              thisInfo[parts[0]] = val
            })
            setInfo([...info, thisInfo])
          }

          // Renders in the content container to the right
          return <MarkdownSlide
            key={i}
            test='bruh'
            render={slideProps => {
              const props = { ...slideProps, ...info[i] }
              return (
                <VStack bgColor='#474953' h='100%' w='100%'>
                  <Flex w='100%' h='90%' p={5}>
                    <Box flex={5}>
                      <Flex flexDir='column' h='100%'>
                        <Wooplet flex={7} w='35%' m='auto'/>
                        <Box
                          w='90%'
                          flex={5}
                          m='auto'
                          bgColor='blackAlpha.600'
                          borderRadius='10'
                        >
                          <Text as='div' color='white' fontSize='2xl' p={5} float='left'>
                          {
                            dialogue[i][indexes[i]] &&
                            <Typewriter words={[dialogue[i][indexes[i]]]}></Typewriter>
                          }
                          {
                            indexes[i] === dialogue[i].length - 1 &&
                            <Button
                              onClick={() => {
                                console.log('propi', props.i)
                                props.passFn(props.i)
                              }}
                              color='black'>
                                Unlock
                              </Button>
                          }
                        </Text>
                      </Box>
                      </Flex>
                    </Box>
                    <Box id='interactive-container' flex={7} borderRadius={10} bgColor='white'>
                      <Flex w='100%' h='6%' borderTopRadius={10}>
                          <Box flex={3} bgColor='#FF8462' borderTopLeftRadius={10}></Box>
                          <Box flex={12} bgColor='#E4E4E4' borderTopRadius={10}></Box>
                      </Flex>
                      <Box w='100%' h='100%' p={3}>
                      {
                          (() => {
                            const updateDialogue = (i, index) => {
                              const temp = [...indexes]
                              temp[i] = index
                              slideProps.setDialogue(i, index)
                              setIndexes([...temp])
                            }

                            // Gives the interactive component access to all current props
                            if (props.children) {
                              const children = React.Children.map([props.children], (child, i) => {
                                if (React.isValidElement(child)) {
                                  return React.cloneElement(child, { ...props, setDialogue: updateDialogue })
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
                  <Box w='100%' pr={5} pb='2'>
                    <Button
                      float='right'
                      bgColor='#FF8462'
                      color='white'
                      // disabled={!(props.i < props.passed)}
                      onClick={() => {
                        props.nextSlide()
                      }}>
                        <HStack>
                          <p>Next</p>
                          <Spacer/>
                          <ArrowRightIcon/>
                        </HStack>
                      </Button>
                  </Box>
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
