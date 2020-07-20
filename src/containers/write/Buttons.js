import React, { useEffect } from 'react'
import Buttons from '../../components/write/Buttons'
import { useSelector, useDispatch } from 'react-redux'
import { writePost, updatePost } from '../../modules/write'
import { withRouter } from 'react-router-dom'

const Result = ({ history }) => {
  const { title, body, tags, post, error, originalPostId } = useSelector(({ write }) => {
    console.log('containers → write → [Buttons.js] → write: ', write)

    return {
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      error: write.error,
      originalPostId: write.originalPostId
    }
  })

  const dispatch = useDispatch()

  // 포스트 등록
  const onPublish = () => {
    if (originalPostId) {
      dispatch(
        updatePost({
          title,
          body,
          tags,
          id: originalPostId
        })
      )
    }

    dispatch(
      writePost({
        title,
        body,
        tags
      })
    )
  }

  // 취소
  const onCancel = () => {
    history.goBack()
  }

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      console.log('containers → write → [Buttons.js] → post: ', post)

      // const { _id, user } = post

      // history.push(`/@${user.username}/${_id}`)
    }

    if (error) {
      console.error(error)
    }
  }, [history, post, error])
  return <Buttons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId} />
}

export default withRouter(Result)
