import React from 'react'
import Exercises from '../../../../../../components/lessons/Exercises'
import sorular from "./Test101.json"
import { Container } from '../../../../style/DerslerStyle'

function Test101() {
  return (
    <Container>
      <Exercises sorular={sorular}/>
    </Container>
  )
}

export default Test101

