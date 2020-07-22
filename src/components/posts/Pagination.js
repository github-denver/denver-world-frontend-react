import React from 'react'
// import qs from 'qs'
import Button from '../common/Button'

const queryString = ({ service, number }) => {
  // const query = qs.stringify({ tag, page })

  return `/${service}/list/${number}`
}

const Pagination = ({ tag, username, pagination }) => {
  console.log('components → posts → [Pagination.js] → tag: ', tag)
  console.log('components → posts → [Pagination.js] → username: ', username)
  console.log('components → posts → [Pagination.js] → pagination: ', pagination)

  return (
    <>
      <Button disabled={pagination.current === 1} to={pagination.current === 1 ? undefined : queryString({ service: 'game', number: pagination.current - 1 })}>
        이전
      </Button>
      <ul>
        <li>{pagination.current}</li>
      </ul>
      <Button
        disabled={pagination.current === pagination.end}
        to={pagination.current === pagination.end ? undefined : queryString({ service: 'game', number: pagination.current + 1 })}>
        다음
      </Button>
    </>
  )
}

export default Pagination
