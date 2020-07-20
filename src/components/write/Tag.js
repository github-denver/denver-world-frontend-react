import React, { useState, useCallback, useEffect } from 'react'

const Item = React.memo(({ tag, onRemove }) => <li onClick={() => onRemove(tag)}>#{tag}</li>)

const List = React.memo(({ tags, onRemove }) => {
  console.log('components → write → [Tag.js] → tags: ', tags)

  return (
    <ul>
      {tags.map((tag) => (
        <Item tag={tag} key={tag} onRemove={onRemove} />
      ))}
    </ul>
  )
})

const Tag = ({ t, onChangeTags }) => {
  const [input, setInput] = useState('')
  const [tags, setTags] = useState([])

  const insert = useCallback(
    (tag) => {
      if (!tag) return // 공백이라면 추가하지 않습니다.
      if (tags.includes(tag)) return // 존재한다면 추가하지 않습니다.

      const next = [...tags, tag]
      console.log('components → write → [Tag.js] → next: ', next)

      setTags([...tags, tag])

      onChangeTags(next)
    },
    [tags, onChangeTags]
  )

  const onRemove = useCallback(
    (tag) => {
      setTags(tags.filter((t) => t !== tag))
    },
    [tags]
  )

  const onChange = useCallback((event) => {
    setInput(event.target.value)
  }, [])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      console.log('components → write → [Tag.js] → input: ', input)

      insert(input.trim())

      setInput('')
    },
    [input, insert]
  )

  // tags 값이 변경될 때
  useEffect(() => {
    setTags(tags)
  }, [tags])

  return (
    <div>
      <strong>태그 목록</strong>

      <form onSubmit={onSubmit}>
        <input type="text" placeholder="태그를 입력해 주세요." value={input} onChange={onChange} />
        <button type="submit">추가</button>
      </form>

      <List tags={tags} onRemove={onRemove} />
    </div>
  )
}

export default Tag
