import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import { Button, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'

import Slidedeck from '../../Slidedeck'
import Slide from '../../Slide'

/* HOW TO USE SLIDE PROPS & SLIDE UTILITY FUNCTIONS
 *
 * The props specified in this object will automatically be populated by
 * the Slidedeck parent component. They are accessible by any child of the
 * Slidedeck, as such there should be no top-level components in Slidedeck
 * that are not slides!
 *
 * Call props#passFn(props.i) when the slide is complete and the user can move on.
 *
 * If you need to change a slide (e.g. dynamically generate next slide based on input)
 * use props#setSlide(targetIndex, newSlideComponent)
 */

const SlideProps = {
  passFn: PropTypes.func, // function
  setSlide: PropTypes.func, // function
  i: PropTypes.number, // integer
  children: PropTypes.node // component or list of components
}

const Deck = (props) => <>
  <Slidedeck courseId='test0'>
    <Slide1 />
    <Slide>
      {p => { p.passFn(p.i) }}
      The second slide which was not previously accessible
    </Slide>
    <Slide>
      Third slide
    </Slide>
  </Slidedeck>
</>

const Slide1 = (props) => {
  const [value, setValue] = useState('')
  return <Slide>
    <Heading mb={3} as='h2' size='xl'>Type something in this box then press enter</Heading>
    <Formik
      initialValues={{ text: value }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          props.passFn(props.i)
          setValue(values.text)
          alert('You passed this slide!')
        }, 500)
      }}>
        {
          p => (
            <Form>
              <Field name='text'>
                {({ field, form }) => (
                  <FormControl id='text' isRequired>
                  <FormLabel>Right here</FormLabel>
                  <Input
                    {...field}
                    placeholder='Example input'
                    size='md'
                  />
                  <FormHelperText>Then click submit</FormHelperText>
                </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
              >
                Submit
              </Button>
            </Form>
          )
        }
    </Formik>
  </Slide>
}

Slide1.propTypes = SlideProps

export default Deck
