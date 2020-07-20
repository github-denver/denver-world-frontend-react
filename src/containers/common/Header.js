import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/common/Header'
import { logout } from '../../modules/user'

const Result = () => {
  const { user } = useSelector(({ user }) => {
    console.log('containers → [Header.js] → user: ', user)

    let result = null

    if (user.user !== null) {
      result = user.user.user2
    }

    console.log('containers → [Header.js] → result: ', result)

    return { user: result }
  })

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return <Header user={user} logout={onLogout} />
}

export default Result
