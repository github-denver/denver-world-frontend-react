import React from 'react'
import AuthTemplate from '../components/auth/Template'
import Login from '../containers/auth/Login'

const LoginPage = () => {
  return (
    <div>
      <AuthTemplate>
        <Login />
      </AuthTemplate>
    </div>
  )
}

export default LoginPage
