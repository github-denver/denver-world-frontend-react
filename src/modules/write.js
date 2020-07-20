import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api/posts'

const INITIALIZE = 'write/INITIALIZE' // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD' // 특정 key 값 변경

const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST')

const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST'

const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST')

export const init = createAction(INITIALIZE)

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value
}))

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({ title, body, tags }))

export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post)

export const updatePost = createAction(UPDATE_POST, ({ id, title, body, tags }) => {
  return {
    id,
    title,
    body,
    tags
  }
})

const writePostSaga = createRequestSaga(WRITE_POST, api.write)

const updatePostSaga = createRequestSaga(UPDATE_POST, api.update)

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga)
  yield takeLatest(UPDATE_POST, updatePostSaga)
}

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  setOriginalPost: null
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
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post.number
    }),
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
