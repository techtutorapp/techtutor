import React from 'react'
import Slidedeck from '../../Slidedeck'
import Slide from '../../Slide'
import { css } from '@emotion/react'

const h1css = css`
  font-size: 1.4rem;
  font-weight: 600;
  padding-bottom: 0.5rem
`

const Deck = (props) => {
  return <>
    <Slidedeck courseId='test0'>
      <Slide>
        bruh
      </Slide>
      <Slide>
        anotha one
      </Slide>
      <Slide>
        slide numba 3
      </Slide>
      <Slide>
        <h1 css={h1css}>ooo we got headings</h1>
        <p>slide 4 btw</p>
      </Slide>
    </Slidedeck>
  </>
}

export default Deck
