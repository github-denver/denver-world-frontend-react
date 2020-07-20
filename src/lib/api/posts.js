import qs from 'qs'
import client from './client'

export const write = ({ title, body, tags }) => client.post('/api/board/game/write', { title, body, tags })

export const read = (number) => client.get(`/api/board/game/view/${number}`)

export const list = ({ category, number, select, keyword }) => {
  const queryString = qs.stringify({
    select,
    keyword
  })

  console.log('lib → api → [posts.js] → queryString: ', queryString)

  return client.get(`/api/board/game/list/${number}?${queryString}`)
}

export const update = ({ id, title, body, tags }) => {
  return client.post(`/api/board/game/list/`, {
    title,
    body,
    tags
  })
}

export const remove = (number) => {
  return client.post(`/api/board/game/delete/${number}`)
}
