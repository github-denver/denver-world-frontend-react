import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Header = ({ user, logout }) => {
  console.log('components → common → [Header.js] → user: ', user)

  return (
    <header>
      <h1>
        <Link to="/">홈페이지</Link>
      </h1>

      <ul>
        {user ? (
          <li>
            <span>{user.name}</span>
            <Button onClick={logout}>로그아웃</Button>
          </li>
        ) : (
          <li>
            <Button to="/login">로그인</Button>
          </li>
        )}
      </ul>
    </header>
  )
}

export default Header
