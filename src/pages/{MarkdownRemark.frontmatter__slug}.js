/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Heading } from '@chakra-ui/react'
import Slidedeck from '../components/tuts/Slidedeck'
import MarkdownSlide from '../components/tuts/MarkdownSlide'

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

  const slides = html.split('<Slide>').map(html => html.replaceAll('</Slide>', ''))
  slides.forEach(slide => console.log(slide))

  return (
    <div className='tutorial-container'>
      <div className='tutorial'>
        <Heading mb={3} as='h1' size='xl'>{frontmatter.title}</Heading>
        <Heading mb={3} as='h2' size='lg'>{frontmatter.date}</Heading>
        <Slidedeck courseId={frontmatter.id}>
          {slides.map((slide, i) => {
            // const dialogue = getTagContents(slide, 'Dialogue').split('* ')

            // Only add info to state if we haven't aded this slide yet
            if (i > info.length) {
              const infoArray = getTagContents(slide, 'info').split('\n').map(str => {
                return str.trim()
              }).filter(str => str !== '')

              // infoArray: ['passed: true', ...]
              const thisInfo = {}
              infoArray.forEach(value => {
                const parts = value.split(': ')
                const val = Boolean(parts[1])
                console.log(parts[0], val)
                thisInfo[parts[0]] = val
              })
              setInfo([...info, thisInfo])
            }
            return <MarkdownSlide
              key={i}
              test='bruh'
              render={slideProps => {
                // slideProps.logTest()
                console.log('info from render', info[i]) // {}
                console.log('slideProps', slideProps)
                return <div>YOOOOO</div>
              }}/>
          })}
        </Slidedeck>
      </div>
    </div>
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
      }
    }
  }
`
