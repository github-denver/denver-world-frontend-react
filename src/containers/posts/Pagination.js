import React from 'react'
import qs from 'qs'
import Pagination from '../../components/posts/Pagination'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Result = ({ location }) => {
  // console.log('containers → posts → [Pagination.js] → location: ', location)

  const { last, posts, loading } = useSelector(({ posts, loading }) => {
    // console.log('containers → posts → [Pagination.js] → posts: ', posts)

    let result = null
    // console.log('containers → posts → [Pagination.js] → posts.posts: ', posts.posts)
    if (posts.posts !== null) {
      result = posts.posts.list
      // console.log('containers → posts → [Pagination.js] → result: ', result)
    }

    return {
      last: posts.lastPage,
      posts: result,
      loading: loading['posts/LIST_POSTS']
    }
  })

  // 읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때
  if (loading || !posts) {
    // console.log('읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때')

    return null
  }

  // page가 없을 경우 1을 기본값으로 사용
  const { tag, username, page = 1 } = qs.parse(location.seatch, {
    ignoreQueryPrefix: true
  })
  // console.log('containers → posts → [Pagination.js] → tag: ', tag)
  // console.log('containers → posts → [Pagination.js] → username: ', username)
  // console.log('containers → posts → [Pagination.js] → page: ', page)

  return <Pagination tag={tag} username={username} page={parseInt(page, 10)} last={last} />
}

export default withRouter(Result)
