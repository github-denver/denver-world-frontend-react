import React, { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'

const Editor = ({ number, subject, content, onChangeField }) => {
  // console.log('components → write → [Editor.js] → number: ', number)
  // console.log('components → write → [Editor.js] → subject: ', subject)
  // console.log('components → write → [Editor.js] → content: ', content)

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
      // console.log('components → write → [Editor.js] → source: ', source)

      if (source === 'user') {
        onChangeField({ key: 'content', value: quill.root.innerHTML })
      }
    })
  }, [onChangeField])

  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return

    mounted.current = true

    quillInstance.current.root.innerHTML = content
  }, [content])

  const onChangeSubject = (event) => {
    onChangeField({ key: 'subject', value: event.target.value })
  }

  return (
    <div>
      <input type="text" placeholder="제목" onChange={onChangeSubject} value={subject} />

      <div ref={quillElement}></div>
    </div>
  )
}
export default Editor
