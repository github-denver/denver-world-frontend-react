import React from 'react'
// import qs from 'qs'
import Button from '../common/Button'
// import { Link } from 'react-router-dom'

const queryString = ({ service, number }) => {
  // const query = qs.stringify({ tag, page })

  return `/${service}/list/${number}`
}

const Pagination = ({ tag, username, pagination }) => {
  // console.log('components → posts → [Pagination.js] → tag: ', tag)
  // console.log('components → posts → [Pagination.js] → username: ', username)
  // console.log('components → posts → [Pagination.js] → pagination: ', pagination)

  const list = []

  for (let i = pagination.start; i <= pagination.end; i++) {
    list.push(
      <Button to={queryString({ service: 'game', number: i })} key={i}>
        {i}
      </Button>
    )
  }

  // console.log('components → posts → [Pagination.js] → list: ', list)

  return (
    <>
      {list.length !== 0 && (
        <>
          <Button
            disabled={pagination.current === 1}
            to={pagination.current === 1 ? undefined : queryString({ service: 'game', number: pagination.current - 1 })}>
            이전
          </Button>

          <ul>
            <li>{list}</li>
          </ul>

          <Button
            disabled={pagination.current === pagination.end}
            to={pagination.current === pagination.end ? undefined : queryString({ service: 'game', number: pagination.current + 1 })}>
            다음
          </Button>
        </>
      )}
    </>
  )
}

export default Pagination
