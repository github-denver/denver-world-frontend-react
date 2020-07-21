import React from 'react'
import Info from '../common/Info'

const View = ({ post, error, loading, buttons }) => {
  console.log('components → post → [View.js] → post: ', post)

  if (error) {
    if (error.response && error.response.status === 404) {
      console.log('존재하지 않는 포스트입니다.')

      return <p>존재하지 않는 포스트입니다.</p>
    }

    console.log('에러가 발생했어요!')

    return <p>에러가 발생했어요!</p>
  }

  // 읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때
  if (loading || !post) {
    console.log('읽어들이는 중이거나 아직 포스트 데이터가 존재하지 않을 때')

    return null
  }

  console.log('components → post → [View.js] → !post: ', !post)
  // 포스트 내용이 존재하지 않을 때
  if (!post) {
    console.log('포스트 내용이 존재하지 않을 때')

    return <p>내용이 존재하지 않습니다.</p>
  }

  return (
    <>
      <Info post={post} />

      {buttons}
    </>
  )
}

export default View
