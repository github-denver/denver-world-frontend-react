import React, { useEffect } from 'react'
import View from '../../components/post/View'
import { useSelector, useDispatch } from 'react-redux'
import { readPost, unloadPost } from '../../modules/post'
import { withRouter } from 'react-router-dom'
import Buttons from '../../components/post/Buttons'
import { originalPost } from '../../modules/write'
import { remove } from '../../lib/api/posts'

const Result = ({ match, history }) => {
  console.log('containers → post → [View.js] → match: ', match)
  console.log('containers → post → [View.js] → history: ', history)

  const { number } = match.params
  console.log('containers → post → [View.js] → number: ', number)

  const { post, error, loading, user } = useSelector(({ post, loading, user }) => {
    console.log('containers → post → [View.js] → post: ', post)
    console.log('containers → post → [View.js] → user: ', user)

    let data = {}

    if (post.post !== null) {
      data.post = post.post.result[0]
    }

    if (user.user !== null) {
      data.user = user.user.user2
    }

    return {
      post: data.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: data.user
    }
  })

  console.log('containers → post → [View.js] → post: ', post)
  console.log('containers → post → [View.js] → user: ', user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readPost(number))

    // 언마운트 될 때 초기화
    return () => {
      dispatch(unloadPost())
    }
  }, [dispatch, number])

  const onEdit = () => {
    dispatch(originalPost(post))

    history.push('/write')
  }

  const onRemove = async () => {
    try {
      console.log('containers → post → [View.js] → number: ', number)

      await remove(number)

      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const owner = (post && post.id) === (user && user.id)
  console.log('containers → post → [View.js] → owner: ', owner)

  return <View post={post} error={error} loading={loading} buttons={owner && <Buttons onEdit={onEdit} onRemove={onRemove} />} />
}

export default withRouter(Result)
