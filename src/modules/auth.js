import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api/auth'
import Cookies from 'js-cookie'

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIAL_FORM = 'auth/INITIAL_FORM'

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN')
const LOGOUT = 'authorization/LOGOUT'
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER')

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form, // login, register
  key, // id, name, password, confirm
  value
}))

export const initializeForm = createAction(INITIAL_FORM, (form) => form) // login, register

export const login = createAction(LOGIN, ({ id, password }) => ({ id, password }))
export const logout2 = createAction(LOGOUT)
export const register = createAction(REGISTER, ({ id, name, password }) => ({ id, name, password }))

const loginSaga = createRequestSaga(LOGIN, api.login)
const registerSaga = createRequestSaga(REGISTER, api.register)

function* logoutSaga() {
  // console.log('modules → [auth.js] → function logoutSaga() { .. }')

  try {
    yield call(api.logout)

    localStorage.removeItem('user')

    Cookies.remove('accessToken')

    // console.log("modules → [auth.js] → function logoutSaga() { .. } → localStorage.getItem('user'): ", localStorage.getItem('user'))
  } catch (error) {
    console.error(error)
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga)
  yield takeLatest(LOGOUT, logoutSaga)
  yield takeLatest(REGISTER, registerSaga)
}

const initialState = {
  login: {
    id: '',
    password: ''
  },
  register: {
    id: '',
    name: '',
    password: '',
    confirm: ''
  },
  token: null,
  error: null
}

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => {
      return produce(state, (draft) => {
        draft[form][key] = value // 예를 들어, state.register.id 변경
      })
    },
    [INITIAL_FORM]: (state, { payload: form }) => {
      // console.log('modules → [auth.js] → state: ', state)
      // console.log('modules → [auth.js] → form: ', form)
      // console.log('modules → [auth.js] → initialState[form]: ', initialState[form])

      return {
        ...state,
        [form]: initialState[form],
        error: null
      }
    },
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      error: null
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error
    }),
    [LOGOUT]: (state, { payload: form }) => {
      // console.log('modules → [auth.js] → function logoutSaga() { .. } → form: ', form)

      return {
        ...state,
        [form]: initialState[form],
        auth: null,
        error: null
      }
    },
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      error: null
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error
    })
  },
  initialState
)

export default auth
