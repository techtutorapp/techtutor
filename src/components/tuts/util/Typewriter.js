import { Text } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '@fontsource/pt-sans'

function Typewriter ({ words }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (index === words.length) return
    if (
      subIndex === words[index].length + 1 &&
      index !== words.length - 1 &&
      !reverse
    ) {
      setReverse(true)
      return
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => prev + 1)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, 70)

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse])

  return (
    <Text fontFamily='PT Sans'>{words[index].substring(0, subIndex)}</Text>
  )
}

Typewriter.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string)
}

export default Typewriter
