import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const MarkdownSlide = (props) => {
  useEffect(() => {
    if (props.passed) {
      props.passFn(props.i)
      alert('passed 😎')
    }
  })
  // console.log('inside mdslide', props)
  return (<>
    {props.render(props)}
  </>
  )
}

MarkdownSlide.propTypes = {
  type: PropTypes.string,
  /*
   * Also inherits normal slide props generated
   * by the Slidedeck (parent component)
   */
  render: PropTypes.func,
  wooplet: PropTypes.bool,
  passed: PropTypes.bool,
  passFn: PropTypes.func, // function
  setSlide: PropTypes.func, // function
  i: PropTypes.number, // integer
  logTest: PropTypes.func,
  children: PropTypes.node, // component or list of components
  state: PropTypes.object // TODO: implement state persistence
}

export default MarkdownSlide
