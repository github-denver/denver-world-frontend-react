import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api/auth'

const TEMP_SET_USER = 'user/TEMP_SET_USER' // 새로 고침 이후 임시 로그인 처리

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('auth/CHECK') // 회원정보 확인

export const tempSetUser = createAction(TEMP_SET_USER, (user) => {
  console.log('modules → [user.js] → user: ', user)

  return user
})

const LOGOUT = 'user/LOGOUT'

export const check = createAction(CHECK)

export const logout = createAction(LOGOUT)

const checkSaga = createRequestSaga(CHECK, api.check)

function checkFailureSaga() {
  console.log('modules → [user.js] → function checkFailureSaga() { .. }')

  try {
    console.log("modules → [user.js] → function checkFailureSaga() { .. } → localStorage.getItem('user'): ", localStorage.getItem('user'))

    localStorage.removeItem('user')
  } catch (error) {
    console.error(error)
  }
}

function* logoutSaga() {
  console.log('modules → [user.js] → function logoutSaga() { .. }')

  try {
    yield call(api.logout)

    localStorage.removeItem('user')

    console.log("modules → [user.js] → function logoutSaga() { .. } → localStorage.getItem('user'): ", localStorage.getItem('user'))
  } catch (error) {
    console.error(error)
  }
}

export function* userSaga() {
  console.log('modules → [user.js] → export function* userSaga() { .. }')
  yield takeLatest(CHECK, checkSaga)
  yield takeLatest(CHECK_FAILURE, checkFailureSaga)
  yield takeLatest(LOGOUT, logoutSaga)
}

const initialState = {
  user: null,
  error: null
}

const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => {
      return {
        ...state,
        user
      }
    },
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null
    })
  },
  initialState
)

export default user
