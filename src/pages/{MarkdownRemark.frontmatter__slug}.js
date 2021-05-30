/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Box, Grid, GridItem, Center, Text } from '@chakra-ui/react'
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
  data // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds md file data
  const { frontmatter, html } = markdownRemark
  const [info, setInfo] = useState([])
  const [interactives, setInteractives] = useState([])
  const [dialogue, setDialogue] = useState([])

  const slides = html.split('<Slide>').map(html => html.replaceAll('</Slide>', '')).filter(slide => slide.length > 0)

  return (
    <Box key={interactives.toString()} className='tutorial-container' w='100%' h='100vh' p={3} overflow='hidden'>
      <Box className='tutorial' w='100%' h='100%' m='auto'>
        <Slidedeck courseId={frontmatter.id}>
          {slides.map((slide, i) => {
            const scriptArr = getTagContents(slide, 'Dialogue').split('* ').map(s => s.trim()).filter(str => str !== '')

            if (dialogue.length === 0 || i - 1 === dialogue.length) {
              setDialogue([...dialogue, [...scriptArr]])
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
                // console.log(parts[0], val)
                thisInfo[parts[0]] = val
              })
              setInfo([...info, thisInfo])
            }

            (async () => {
              const { default: activities } = await import(`../tutorials/${frontmatter.interact}`)
              if (interactives.length === 0) {
                setInteractives([...activities])
              }
            })()

            console.log('after loading components ', interactives)

            // Renders in the content container to the right
            return <MarkdownSlide
              key={i}
              test='bruh'
              render={slideProps => {
                const props = { ...slideProps, ...info[i] }
                return (
                  <Box h='100vh'>
                    <Grid
                      h='100%'
                      templateColumns='repeat(12, 1fr)'>
                      <GridItem colSpan={[6, 5, 5, 5]} bg='#13b09d' d='flex' overflow='hidden'>
                        <Box alignSelf='flex-end' mx='auto' maxW='70%'>
                          <Wooplet type='standard'/>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={[6, 7, 7, 7]} bg='#96cf55'>
                        <Box id='interactive-container'>
                          {
                            interactives[0]
                          }
                        </Box>
                      </GridItem>
                    </Grid>
                    <Center>
                      <Box
                        w='40%'
                        h='15%'
                        bgColor='blackAlpha.700'
                        position='absolute'
                        bottom='8'
                        borderRadius='20'
                        >
                          <Text as='div' color='white' fontSize='4xl' p={5} textAlign='left'>
                              {(() => {
                                return <Typewriter words={[dialogue[i][0]]}></Typewriter>
                              })()}
                          </Text>
                      </Box>
                    </Center>
                  </Box>
                )
              }}/>
          })}
        </Slidedeck>
      </Box>
    </Box>
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
