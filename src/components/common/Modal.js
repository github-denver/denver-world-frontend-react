import React from 'react'
import Button from './Button'

const Modal = ({ visible, title, description, confirm = '확인', cancel = '취소', onConfirm, onCancel }) => {
  if (!visible) {
    return null
  }

  return (
    <>
      <ul>
        <li>{title}</li>
        <li>{description}</li>
        <li>
          <Button onClick={onCancel}>{cancel}</Button>
          <Button onClick={onConfirm}>{confirm}</Button>
        </li>
      </ul>
    </>
  )
}

export default Modal
