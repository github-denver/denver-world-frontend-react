import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api/posts'

const INITIALIZE = 'write/INITIALIZE' // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD' // 특정 key 값 변경

const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST')

const ORIGINAL_POST = 'write/ORIGINAL_POST'

const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST')

export const init = createAction(INITIALIZE)

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value
}))

export const writePost = createAction(WRITE_POST, ({ category, subject, content, thumbnail }) => {
  // console.log('modules → [write.js] → category: ', category)
  // console.log('modules → [write.js] → subject: ', subject)
  // console.log('modules → [write.js] → content: ', content)
  // console.log('modules → [write.js] → thumbnail: ', thumbnail)

  return { category, subject, content, thumbnail }
})

export const originalPost = createAction(ORIGINAL_POST, (post) => post)

export const updatePost = createAction(UPDATE_POST, ({ number, owner, category, subject, content, tags }) => {
  // console.log('modules → [write.js] → number: ', number)
  // console.log('modules → [write.js] → owner: ', owner)
  // console.log('modules → [write.js] → category: ', category)
  // console.log('modules → [write.js] → subject: ', subject)
  // console.log('modules → [write.js] → content: ', content)
  // console.log('modules → [write.js] → tags: ', tags)

  return { number, owner, category, subject, content, tags }
})

const writePostSaga = createRequestSaga(WRITE_POST, api.write)

const updatePostSaga = createRequestSaga(UPDATE_POST, api.update)

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga)
  yield takeLatest(UPDATE_POST, updatePostSaga)
}

const initialState = {
  number: null,
  owner: null,
  subject: '',
  content: '',
  tags: [],
  post: null
}

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 변경
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value // 특정 key 값 업데이트
    }),
    [WRITE_POST]: (state, { payload: post }) => ({
      ...state,

      // 초기화
      post: null,
      error: null
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      error: null
    }),
    [WRITE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error
    }),
    [ORIGINAL_POST]: (state, { payload: post }) => {
      // console.log('modules → [write.js] → post: ', post)

      return {
        ...state,
        number: post.number,
        owner: post.id,
        subject: post.subject,
        content: post.content
      }
    },
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      error: null
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error
    })
  },
  initialState
)

export default write
