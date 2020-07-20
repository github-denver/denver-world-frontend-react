import React from 'react'
import Button from '../common/Button'

const Buttons = ({ onCancel, onPublish, isEdit }) => {
  return (
    <>
      <Button type="button" onClick={onPublish}>
        {isEdit ? '수정' : '등록'}
      </Button>
      <Button type="button" onClick={onCancel}>
        취소
      </Button>
    </>
  )
}

export default Buttons
