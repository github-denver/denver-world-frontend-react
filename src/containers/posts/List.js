import React, { useEffect } from 'react'
import qs from 'qs'
import List from '../../components/posts/List'
import { useSelector, useDispatch } from 'react-redux'
import { listPosts } from '../../modules/posts'
import { withRouter } from 'react-router-dom'

const Result = ({ location }) => {
  console.log('containers → posts → [List.js] → location: ', location)

  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => {
    console.log('containers → posts → [List.js] → posts: ', posts)
    console.log('containers → posts → [List.js] → user: ', user)

    let data = {}

    if (posts.posts !== null) {
      data.posts = posts.posts.list
    }

    if (user.user !== null) {
      data.user = user.user.user2
    }

    return {
      posts: data.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: data.user
    }
  })

  console.log('containers → posts → [List.js] → posts: ', posts)
  console.log('containers → posts → [List.js] → user: ', user)

  const dispatch = useDispatch()

  useEffect(() => {
    const { category, number, select, keyword } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    })

    console.log('containers → posts → [List.js] → location.search: ', location.search)

    dispatch(listPosts({ category, number, select, keyword }))
  }, [dispatch, location.search])

  return <List posts={posts} error={error} loading={loading} user={user} />
}

export default withRouter(Result)
