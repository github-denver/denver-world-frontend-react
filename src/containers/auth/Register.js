import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initializeForm, register } from '../../modules/auth'
import Form from '../../components/auth/Form'
// import { check } from '../../modules/user'
import { withRouter } from 'react-router-dom'
// import Cookies from 'js-cookie'

const Register = ({ history }) => {
  // console.log('containers → auth → [Register.js] → history: ', history)

  const [message, setMessage] = useState(null)

  // const { form, auth, error, user } = useSelector(({ auth, user }) => {
  const { form, auth, error } = useSelector(({ auth, user }) => {
    // console.log('containers → auth → [Register.js] → auth: ', auth)
    // console.log('containers → auth → [Register.js] → user: ', user)
    // console.log('')

    return {
      form: auth.register,
      auth: auth.auth,
      error: auth.error,
      user: user.user
    }
  })
  // console.log('containers → auth → [Register.js] → form: ', form)
  // console.log('containers → auth → [Register.js] → auth: ', auth)
  // console.log('containers → auth → [Register.js] → error: ', error)
  // console.log('containers → auth → [Register.js] → user: ', user)
  // console.log('')

  const dispatch = useDispatch()

  const onChange = (event) => {
    const { value, name } = event.target

    dispatch(
      changeField({
        form: 'register',
        key: name,
        value
      })
    )
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const { id, name, password, confirm } = form
    // console.log('containers → auth → [Register.js] → id: ', id)
    // console.log('containers → auth → [Register.js] → name: ', name)
    // console.log('containers → auth → [Register.js] → password: ', password)
    // console.log('containers → auth → [Register.js] → confirm: ', confirm)
    // console.log('')

    if ([id, name, password, confirm].includes('')) {
      setMessage('필수 정보를 입력해 주세요!')

      return
    }

    if (password !== confirm) {
      setMessage('패스워드가 일치하지 않아요!')

      // dispatch(changeField({ form: 'register', key: 'password', value: '' }))
      // dispatch(changeField({ form: 'register', key: 'confirm', value: '' }))

      return
    }

    dispatch(register({ id, name, password }))
  }

  useEffect(() => {
    dispatch(initializeForm('register'))
  }, [dispatch])

  useEffect(() => {
    if (error) {
      // console.error(error)
      // console.log('containers → auth → [Register.js] → error: ', error)

      if (error.response.status === 400) {
        setMessage('이미 가입된 아이디입니다!')

        return
      }

      setMessage('알 수 없는 에러가 발생하였습니다.')

      return
    }

    if (auth) {
      // alert('회원가입에 성공했어요!')

      // console.log('회원가입에 성공했어요!')
      // console.log('containers → auth → [Register.js] → auth: ', auth)
      // console.log('')

      // dispatch(check())

      history.push('/login')
    }
    // }, [auth, error, dispatch])
  }, [error, auth, history])

  /*
  useEffect(() => {
    if (user) {
      // console.log('containers → auth → [Register.js] → check API 성공')
      // console.log('containers → auth → [Register.js] → user: ', user)
      // console.log('')

      history.push('/')

      try {
        // localStorage.setItem('user', JSON.stringify(user))

        Cookies.set('accessToken', token)
      } catch (error) {
        console.error(error)
      }
    }
  }, [history, user])
  */

  return <Form type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={message} />
}

export default withRouter(Register)
