import { call, put } from 'redux-saga/effects'
import { startLoading, finishLoading } from '../modules/loading'

export const createRequestActionTypes = (type) => {
  // console.log('lib → [createRequestSaga.js] → type: ', type)

  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`

  return [type, SUCCESS, FAILURE]
}

export default function createRequestSaga(type, request) {
  // console.log('lib → [createRequestSaga.js] → type: ', type)

  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`

  return function* (action) {
    // console.log('lib → [createRequestSaga.js] → action: ', action)

    yield put(startLoading(type))

    try {
      const response = yield call(request, action.payload)
      // console.log('lib → [createRequestSaga.js] → response: ', response)

      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response
      })
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true
      })
    }

    yield put(finishLoading(type))
  }
}
