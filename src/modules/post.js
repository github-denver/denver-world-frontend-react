import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api/posts'

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createRequestActionTypes('post/READ_POST')

const UNLOAD_POST = 'post/UNLOAD_POST' // 포스트 페이지에서 벗어날 때 데이터를 비웁니다.

export const readPost = createAction(READ_POST, (number) => number)

export const unloadPost = createAction(UNLOAD_POST)

const readPostSaga = createRequestSaga(READ_POST, api.read)

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga)
}

const initialState = {
  post: null,
  error: null
}

const post = handleActions(
  {
    [UNLOAD_POST]: () => initialState,
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error
    })
  },
  initialState
)

export default post
