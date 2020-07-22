import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initializeForm, login } from '../../modules/auth'
import Form from '../../components/auth/Form'
import { check } from '../../modules/user'
import { withRouter } from 'react-router-dom'

const Login = ({ history }) => {
  // console.log('containers → auth → [Login.js] → history: ', history)

  const [message, setMessage] = useState(null)

  const { form, auth, error, user } = useSelector(({ auth, user }) => {
    let result = null

    if (user.user !== null) {
      result = user.user.user2
    }

    return {
      form: auth.login,
      auth: auth.auth,
      error: auth.error,
      user: result
    }
  })
  // console.log('containers → auth → [Login.js] → form: ', form)
  // console.log('containers → auth → [Login.js] → auth: ', auth)
  // console.log('containers → auth → [Login.js] → error: ', error)
  // console.log('containers → auth → [Login.js] → user: ', user)

  const dispatch = useDispatch()

  const onChange = (event) => {
    const { value, name } = event.target

    dispatch(
      changeField({
        form: 'login',
        key: name,
        value
      })
    )
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const { id, password } = form
    // console.log('containers → auth → [Login.js] → id: ', id)
    // console.log('containers → auth → [Login.js] → password: ', password)

    dispatch(login({ id, password }))
  }

  useEffect(() => {
    dispatch(initializeForm('login'))
  }, [dispatch])

  useEffect(() => {
    if (error) {
      console.error(error)

      setMessage('로그인에 실패했어요!')

      return
    }

    if (auth) {
      // console.log('containers → auth → [Login.js] → 로그인에 성공했어요!')
      // console.log('containers → auth → [Login.js] → auth: ', auth)

      dispatch(check())
    }
  }, [auth, error, dispatch])

  useEffect(() => {
    if (user) {
      // console.log('containers → auth → [Login.js] → check API 성공')
      // console.log('containers → auth → [Login.js] → user: ', user)

      history.push('/')

      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch (error) {
        console.error(error)
      }
    }
  }, [history, user])

  return <Form type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={message} />
}

export default withRouter(Login)
