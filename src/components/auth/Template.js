import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Styled = {}

Styled.template = styled.div``

const Template = ({ children }) => {
  return (
    <Styled.template>
      <div className="outer">
        <div className="inner">
          <Link to="/">홈</Link>
        </div>
      </div>

      {children}
    </Styled.template>
  )
}

export default Template
