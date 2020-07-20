import React from 'react'
import Modal from '../common/Modal'

const Ask = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} title="포스트 삭제" description="포스트를 정말로 삭제하시겠습니까?" confirm="삭제" onConfirm={onConfirm} onCancel={onCancel} />
  )
}

export default Ask
