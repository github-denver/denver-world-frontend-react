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

    let result = null

    if (user.user !== null) {
      result = user.user.user2
    }

    let result2 = null
    console.log('containers → posts → [List.js] → posts.posts: ', posts.posts)
    if (posts.posts !== null) {
      result2 = posts.posts.list
      console.log('containers → posts → [List.js] → result2: ', result2)
    }

    return {
      posts: result2,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: result
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const { category, number, select, keyword } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    })

    console.log('containers → posts → [List.js] → location.search: ', location.search)

    dispatch(listPosts({ category, number, select, keyword }))
  }, [dispatch, location.search])

  return <List posts={posts} error={error} loading={loading} writeButton={user} />
}

export default withRouter(Result)
