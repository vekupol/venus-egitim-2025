import React from 'react'
import Exercises from '../../../../../../components/lessons/Exercises'
import sorular from "./Test1.json"
import { Container } from '../../../../style/DerslerStyle'

function Test201() {
  return (
    <Container>
      <Exercises sorular={sorular}/>
    </Container>
  )
}

export default Test201

