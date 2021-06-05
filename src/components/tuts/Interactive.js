import React from 'react'
import PropTypes from 'prop-types'

function Interactive (props) {
  console.log(props)
  // return <>{props.render(props)}</>
  return <>hi</>
}

Interactive.propTypes = {
  interact: PropTypes.func
}

export default Interactive
