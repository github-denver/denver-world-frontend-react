import React, { useEffect, useCallback } from 'react'
import Editor from '../../components/write/Editor'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, init } from '../../modules/write'

const Result = () => {
  const { number, subject, content } = useSelector(({ write }) => {
    console.log('containers → write → [Editor.js] → write: ', write)

    return {
      number: write.number,
      subject: write.subject,
      content: write.content
    }
  })

  const dispatch = useDispatch()

  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch])

  // 언마운트 될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(init())
    }
  }, [dispatch])

  return <Editor number={number} subject={subject} content={content} onChangeField={onChangeField} />
}

export default Result
