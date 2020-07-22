import React from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import { Link } from 'react-router-dom'

const Styled = {}

Styled.button = styled.button`
  /*
  padding: 0;
  border: 0 none;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  background-color: ${palette.gray[8]};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${palette.gray[6]};
  }
  */
`

Styled.link = styled(Link)`
  ${Styled.button}
`

const Button = (props) => {
  // console.log('components → common → [Button.js] → props: ', props)

  return props.to ? <Styled.link {...props} /> : <Styled.button {...props} />
}

export default Button
