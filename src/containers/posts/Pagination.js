import React from 'react'
import qs from 'qs'
import Pagination from '../../components/posts/Pagination'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Result = ({ location }) => {
  // console.log('containers → posts → [Pagination.js] → location: ', location)

  const { posts, loading, pagination } = useSelector(({ posts, loading }) => {
    // console.log('containers → posts → [Pagination.js] → posts: ', posts)

    let result = null
    // console.log('containers → posts → [Pagination.js] → posts.posts: ', posts.posts)

    if (posts.posts !== null) {
      result = posts.posts.list
      // console.log('containers → posts → [Pagination.js] → result: ', result)
    }

    return {
      posts: result,
      loading: loading['posts/LIST_POSTS'],
      pagination: posts.pagination
    }
  })
  // console.log('containers → posts → [Pagination.js] → pagination: ', pagination)
  // console.log('containers → posts → [Pagination.js] → posts: ', posts)
  // console.log('containers → posts → [Pagination.js] → loading: ', loading)

  // console.log('containers → posts → [Pagination.js] → !posts: ', !posts)
  // 읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때
  if (loading || !posts) {
    // console.log('읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때')
    // console.log('')

    return null
  }

  // page가 없을 경우 1을 기본값으로 사용
  // const { tag, username, page = 1 } = qs.parse(location.seatch, { ignoreQueryPrefix: true })
  const { tag, username } = qs.parse(location.seatch, { ignoreQueryPrefix: true })
  // console.log('containers → posts → [Pagination.js] → tag: ', tag)
  // console.log('containers → posts → [Pagination.js] → username: ', username)
  // console.log('containers → posts → [Pagination.js] → page: ', page)

  return <Pagination tag={tag} username={username} pagination={pagination} />
}

export default withRouter(Result)
