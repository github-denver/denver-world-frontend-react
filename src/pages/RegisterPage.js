import React from 'react'
import AuthTemplate from '../components/auth/Template'
import Register from '../containers/auth/Register'

const RegisterPage = () => {
  return (
    <div>
      <AuthTemplate>
        <Register />
      </AuthTemplate>
    </div>
  )
}

export default RegisterPage
