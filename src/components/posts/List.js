import React from 'react'
import Button from '../common/Button'
import Info from '../common/Info'
// import { Link } from 'react-router-dom'

const Item = ({ post }) => {
  // console.log('components → posts → [List.js] → post: ', post)

  return <Info post={post} />
}

const List = ({ posts, error, loading, user }) => {
  // console.log('components → posts → [List.js] → posts: ', posts)
  // console.log('components → posts → [List.js] → error: ', error)
  // console.log('components → posts → [List.js] → loading: ', loading)
  // console.log('components → posts → [List.js] → user: ', user)
  // console.log('')

  if (error) {
    if (error.response && error.response.status === 404) {
      // console.log('존재하지 않는 포스트입니다.')
      // console.log('')

      return <p>존재하지 않는 포스트입니다.</p>
    }

    // console.log('에러가 발생했어요!')
    // console.log('')

    return <p>에러가 발생했어요!</p>
  }

  // console.log('components → posts → [List.js] → loading: ', loading)
  // console.log('components → posts → [List.js] → !posts: ', !posts)
  // console.log('')

  // 읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때
  if (loading || !posts) {
    // console.log('읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때')
    // console.log('')

    return null
  }

  // 포스트 목록이 존재하지 않을 때
  if (!posts) {
    // console.log('포스트 목록이 존재하지 않을 때')
    // console.log('')

    return <p>목록이 존재하지 않습니다.</p>
  }

  return (
    <>
      {user && <Button to="/write">등록</Button>}

      <div>
        {posts.map((post) => (
          <Item post={post} key={post.number} />
        ))}
      </div>
    </>
  )
}

export default List
