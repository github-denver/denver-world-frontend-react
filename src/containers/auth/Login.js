import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initializeForm, login } from '../../modules/auth'
import Form from '../../components/auth/Form'
import { check } from '../../modules/user'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = ({ history }) => {
  // console.log('containers → auth → [Login.js] → history: ', history)

  const [message, setMessage] = useState(null)

  const { form, token, error, user } = useSelector(({ auth, user }) => {
    // console.log('containers → auth → [Login.js] → auth: ', auth)
    // console.log('containers → auth → [Login.js] → user: ', user)
    // console.log('')

    let data = {}

    if (user.user !== null) {
      data.user = user.user.user2
    }

    // console.log('containers → auth → [Login.js] → auth.auth : ', auth.auth)
    // if (typeof auth.auth !== 'undefined') {
    if (typeof auth.auth !== 'undefined' && auth.auth !== null) {
      data.token = auth.auth.accessToken
      // console.log('containers → auth → [Login.js] → data.token: ', data.token)
    }

    return {
      form: auth.login,
      token: data.token,
      error: auth.error,
      user: data.user
    }
  })
  // console.log('containers → auth → [Login.js] → form: ', form)
  // console.log('containers → auth → [Login.js] → token: ', token)
  // console.log('containers → auth → [Login.js] → error: ', error)
  // console.log('containers → auth → [Login.js] → user: ', user)
  // console.log('')

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
    // console.log('')

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

    // console.log('containers → auth → [Login.js] → token: ', token)
    // console.log('containers → auth → [Login.js] → !token: ', !token)
    // console.log('containers → auth → [Login.js] → !!token: ', !!token)
    // console.log('')

    if (!!token) {
      // console.log('containers → auth → [Login.js] → 로그인에 성공했어요!')
      // console.log('containers → auth → [Login.js] → token: ', token)
      // console.log('containers → auth → [Login.js] → !token: ', !token)
      // console.log('containers → auth → [Login.js] → !!token: ', !!token)
      // console.log('')

      dispatch(check(token))
    }
  }, [token, error, dispatch])

  useEffect(() => {
    if (user) {
      // console.log('containers → auth → [Login.js] → check API 성공')
      // console.log('containers → auth → [Login.js] → user: ', user)
      // console.log('')

      history.push('/')

      try {
        const data = {
          user: {},
          user2: {
            id: user.id,
            name: user.name
          }
        }

        localStorage.setItem('user', JSON.stringify(data))

        Cookies.set('accessToken', token)
      } catch (error) {
        console.error(error)
      }
    }
  }, [history, token, user])

  return <Form type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={message} />
}

export default withRouter(Login)
