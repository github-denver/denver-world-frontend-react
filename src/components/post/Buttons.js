import React, { useState } from 'react'
import Ask from './Ask'

const Buttons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false)

  const onRemoveClick = () => {
    setModal(true)
  }

  const onCancel = () => {
    setModal(false)
  }

  const onConfirm = () => {
    setModal(false)

    onRemove()
  }

  return (
    <>
      <button type="button" onClick={onEdit}>
        수정
      </button>
      <button type="button" onClick={onRemoveClick}>
        삭제
      </button>

      <Ask visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  )
}

export default Buttons
