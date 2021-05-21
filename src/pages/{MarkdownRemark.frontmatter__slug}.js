/* eslint-disable react/prop-types */
// import React, { useState } from 'react'
import React from 'react'
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
  // console.log('frontmatter', frontmatter)

  const slides = html.split('<Slide>').map(html => html.replaceAll('</Slide>', ''))
  slides.forEach(slide => console.log(slide))

  return (
    <div className='tutorial-container'>
      <div className='tutorial'>
        <Heading mb={3} as='h2' size='xl'>{frontmatter.title}</Heading>
        <h2>{frontmatter.date}</h2>
        <Slidedeck courseId={frontmatter.id}>
          {slides.map((slide, i) => {
            // const dialogue = getTagContents(slide, 'Dialogue').split('* ')

            /** Parsed info tag from each slide */
            const infoArray = getTagContents(slide, 'info').split('\n').map(str => str.trim()).filter(str => str !== '')
            // infoArray: ['passed: true', ]
            const info = {}
            infoArray.forEach(value => {
              const parts = value.split(': ')
              const val = Boolean(parts[1])
              console.log(parts[0], val)
              info[parts[0]] = val
            })
            console.log('info', info)
            console.log('keys', Object.keys(info))
            console.log('pass', info.pass)
            return <MarkdownSlide
            key={i}
            pass={info.pass}
            render={slideProps => {
              // slideProps.logTest()
              console.log('inside render', info)
              console.log('slideProps', slideProps)
              return <div>this is a TEST</div>
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
