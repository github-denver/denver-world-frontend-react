import React, { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'

const Editor = ({ title, body, onChangeField }) => {
  console.log('components → write → [Editor.js] → title: ', title)
  console.log('components → write → [Editor.js] → body: ', body)

  const quillElement = useRef(null)
  const quillInstance = useRef(null)

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      }
    })

    const quill = quillInstance.current

    quill.on('text-change', (delta, oldDelta, source) => {
      console.log('components → write → [Editor.js] → source: ', source)

      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML })
      }
    })
  }, [onChangeField])

  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return

    mounted.current = true

    quillInstance.current.root.innerHTML = body
  }, [body])

  const onChangeTitle = (event) => {
    onChangeField({ key: 'title', value: event.target.value })
  }

  return (
    <div>
      <input type="text" placeholder="제목" onChange={onChangeTitle} value={title} />

      <div ref={quillElement}></div>
    </div>
  )
}
export default Editor
