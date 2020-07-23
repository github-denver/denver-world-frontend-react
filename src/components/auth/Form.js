import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../common/Button'

const Styled = {}

Styled.form = styled.div``

const message = {
  login: '로그인',
  register: '회원가입'
}

const Form = ({ type, form, onChange, onSubmit, error }) => {
  const result = message[type]
  // console.log('components → auth → [Form.js] → result: ', result)

  return (
    <Styled.form>
      <strong>{result}</strong>

      <form onSubmit={onSubmit}>
        <input type="text" name="id" autoComplete="id" placeholder="아이디" onChange={onChange} value={form.id} />
        {type === 'register' && <input type="text" name="name" autoComplete="name" placeholder="이름" onChange={onChange} value={form.name} />}
        <input type="password" name="password" autoComplete="password" placeholder="패스워드" onChange={onChange} value={form.password} />
        {type === 'register' && (
          <input type="password" name="confirm" autoComplete="password" placeholder="패스워드 확인" onChange={onChange} value={form.confirm} />
        )}

        {error && <p>{error}</p>}

        <Button type="submit">{result}</Button>
      </form>

      <footer>{type === 'login' ? <Link to="/register">회원가입</Link> : <Link to="/login">로그인</Link>}</footer>
    </Styled.form>
  )
}

export default Form
