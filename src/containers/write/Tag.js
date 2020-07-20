import React from 'react'
import Tag from '../../components/write/Tag'
import { useSelector, useDispatch } from 'react-redux'
import { changeField } from '../../modules/write'

const Result = () => {
  const tags = useSelector((state) => {
    console.log('containers → write → [Tag.js] → state: ', state)

    return state.write.tags
  })

  const dispatch = useDispatch()

  const onChangeTags = (tag) => {
    console.log('containers → write → [Tag.js] → tag: ', tag)

    dispatch(changeField({ key: 'tags', value: tag }))
  }

  return <Tag tags={tags} onChangeTags={onChangeTags} />
}

export default Result
