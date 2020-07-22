import React from 'react'
import qs from 'qs'
import Button from '../common/Button'

const queryString = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page })

  return username ? `/${username}?${query}` : `/${query}`
}

const Pagination = ({ page, last, username, tag }) => {
  // console.log('components → posts → [Pagination.js] → page: ', page)
  // console.log('components → posts → [Pagination.js] → last: ', last)
  // console.log('components → posts → [Pagination.js] → username: ', username)
  // console.log('components → posts → [Pagination.js] → tag: ', tag)

  return (
    <>
      <Button disabled={page === 1} to={page === 1 ? undefined : queryString({ username, tag, page: page - 1 })}>
        이전
      </Button>
      <ul>
        <li>{page}</li>
      </ul>
      <Button disabled={page === last} to={page === last ? undefined : queryString({ username, tag, page: page + 1 })}>
        다음
      </Button>
    </>
  )
}

export default Pagination
