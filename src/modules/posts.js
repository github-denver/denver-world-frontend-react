import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api/posts'

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] = createRequestActionTypes('post/LIST_POSTS')

export const listPosts = createAction(LIST_POSTS, ({ category, number, select, keyword }) => ({ category, number, select, keyword }))

const listPostsSaga = createRequestSaga(LIST_POSTS, api.list)

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga)
}

const initialState = {
  posts: null,
  error: null,
  pagination: null
}

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => {
      console.log('modules → [posts.js] → response: ', response)

      const { pagination } = response.data
      console.log('modules → [posts.js] → pagination: ', pagination)

      return {
        ...state,
        posts,
        pagination: pagination
      }
    },
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error
    })
  },
  initialState
)

export default posts
