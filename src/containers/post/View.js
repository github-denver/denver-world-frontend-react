import React, { useEffect } from 'react'
import View from '../../components/post/View'
import { useSelector, useDispatch } from 'react-redux'
import { readPost, unloadPost } from '../../modules/post'
import { withRouter } from 'react-router-dom'
import Buttons from '../../components/post/Buttons'
import { setOriginalPost } from '../../modules/write'
import { remove } from '../../lib/api/posts'

const Result = ({ match, history }) => {
  console.log('containers → post → [View.js] → match: ', match)
  console.log('containers → post → [View.js] → history: ', history)

  const { number } = match.params

  const { post, error, loading, user } = useSelector(({ post, loading, user }) => {
    console.log('containers → post → [View.js] → post: ', post)

    let result = null

    if (user.user !== null) {
      result = user.user.user2
    }

    return {
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: result
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readPost(number))

    // 언마운트 될 때 초기화
    return () => {
      dispatch(unloadPost())
    }
  }, [dispatch, number])

  const onEdit = () => {
    dispatch(setOriginalPost(post))

    history.push('/write')
  }

  const onRemove = async () => {
    try {
      await remove(number)

      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const ownPost = (user && user.number) === (post && post.user.number)

  return <View post={post} error={error} loading={loading} buttons={ownPost && <Buttons onEdit={onEdit} onRemove={onRemove} />} />
}

export default withRouter(Result)
