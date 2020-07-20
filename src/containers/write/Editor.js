import React, { useEffect, useCallback } from 'react'
import Editor from '../../components/write/Editor'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, init } from '../../modules/write'

const Result = () => {
  const { title, body } = useSelector(({ write }) => {
    console.log('containers → write → [Editor.js] → write: ', write)

    return {
      title: write.title,
      body: write.body
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

  return <Editor title={title} body={body} onChangeField={onChangeField} />
}

export default Result
