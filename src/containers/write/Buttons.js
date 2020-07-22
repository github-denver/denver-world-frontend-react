import React, { useEffect } from 'react'
import Buttons from '../../components/write/Buttons'
import { useSelector, useDispatch } from 'react-redux'
import { writePost, updatePost } from '../../modules/write'
import { withRouter } from 'react-router-dom'

const Result = ({ history }) => {
  const { owner, number, subject, content, tags, post, error } = useSelector(({ write }) => {
    console.log('containers → write → [Buttons.js] → write: ', write)

    return {
      number: write.number,
      owner: write.owner,
      subject: write.subject,
      content: write.content,
      tags: write.tags,
      post: write.post,
      error: write.error
    }
  })

  const dispatch = useDispatch()

  // 포스트 수정/등록
  const onPublish = () => {
    if (owner) {
      alert('포스트를 수정합니다.')

      dispatch(
        updatePost({
          number: number,
          subject,
          content,
          tags
        })
      )

      return
    }

    alert('포스트를 등록합니다.')

    dispatch(
      writePost({
        subject,
        content,
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

      const { number, service } = post

      history.push(`/${service}/view/${number}`)
    }

    if (error) {
      console.error(error)
    }
  }, [history, post, error])
  return <Buttons onPublish={onPublish} onCancel={onCancel} isEdit={!!owner} />
}

export default withRouter(Result)
