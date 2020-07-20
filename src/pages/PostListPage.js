import React from 'react'
import Header from '../containers/common/Header'
import List from '../containers/posts/List'
import Pagination from '../containers/posts/Pagination'

const PostListPage = () => {
  return (
    <div>
      <Header />
      <List />
      <Pagination />
    </div>
  )
}

export default PostListPage
