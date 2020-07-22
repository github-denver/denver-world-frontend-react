import qs from 'qs'
import client from './client'

export const write = ({ category, subject, content, thumbnail }) => {
  console.log('lib → api → [posts.js] → category: ', category)
  console.log('lib → api → [posts.js] → subject: ', subject)
  console.log('lib → api → [posts.js] → content: ', content)
  console.log('lib → api → [posts.js] → thumbnail: ', thumbnail)

  const formData = new FormData()
  formData.append('category', category)
  formData.append('subject', subject)
  formData.append('content', content)
  formData.append('thumbnail', thumbnail)

  return client.post('/api/board/game/write', formData)
}

export const read = (number) => {
  console.log('lib → api → [posts.js] → number: ', number)

  return client.get(`/api/board/game/view/${number}`)
}

export const list = ({ category, number, select, keyword }) => {
  console.log('lib → api → [posts.js] → category: ', category)
  console.log('lib → api → [posts.js] → number: ', number)
  console.log('lib → api → [posts.js] → select: ', select)
  console.log('lib → api → [posts.js] → keyword: ', keyword)

  const queryString = qs.stringify({
    select,
    keyword
  })

  console.log('lib → api → [posts.js] → queryString: ', queryString)

  return client.get(`/api/board/game/list/${number}?${queryString}`)
}

export const update = ({ number, category, subject, content, thumbnail }) => {
  console.log('lib → api → [posts.js] → number: ', number)
  console.log('lib → api → [posts.js] → category: ', category)
  console.log('lib → api → [posts.js] → subject: ', subject)
  console.log('lib → api → [posts.js] → content: ', content)
  console.log('lib → api → [posts.js] → thumbnail: ', thumbnail)

  const formData = new FormData()
  formData.append('number', number)
  formData.append('category', category)
  formData.append('subject', subject)
  formData.append('content', content)
  formData.append('thumbnail', thumbnail)

  return client.post(`/api/board/game/modify/${number}`, formData)
}

export const remove = (number) => {
  console.log('lib → api → [posts.js] → number: ', number)

  return client.get(`/api/board/game/delete/${number}`)
}
