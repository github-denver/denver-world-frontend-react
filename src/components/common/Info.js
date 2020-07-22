import React from 'react'
import { Link } from 'react-router-dom'

const Info = ({ post }) => {
  // console.log('components → common → [Info.js] → post: ', post)

  const { number, id, name, category, subject, content, files, thumbnail, upload2, address, count, regdate } = post

  return (
    <ul>
      <li>
        number: <Link to={`/${category}/view/${number}`}>{number}</Link>
      </li>
      <li>
        id: <span>{id}</span>
      </li>
      <li>
        name: <span>{name}</span>
      </li>
      <li>
        category: <span>{category}</span>
      </li>
      <li>
        subject: <span>{subject}</span>
      </li>
      <li>
        content: <span dangerouslySetInnerHTML={{ __html: content }}></span>
      </li>
      <li>
        files: <span>{files}</span>
      </li>
      <li>
        thumbnail: <span>{thumbnail}</span>
      </li>
      <li>
        upload2: <span>{upload2}</span>
      </li>
      <li>
        address: <span>{address}</span>
      </li>
      <li>
        count: <span>{count}</span>
      </li>
      <li>
        regdate: <span>{new Date(regdate).toLocaleDateString()}</span>
      </li>
    </ul>
  )
}

export default Info
