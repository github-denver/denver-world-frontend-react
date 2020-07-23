import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer, { rootSaga } from './modules'
import createSagaMiddleware from 'redux-saga'
import { tempSetUser, check } from './modules/user'
import Cookies from 'js-cookie'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

function user() {
  try {
    const user = localStorage.getItem('user')
    // console.log('[index.js] → user: ', user)
    // console.log('')

    const token = Cookies.get('accessToken')
    // console.log('[index.js] → token: ', token)
    // console.log('[index.js] → !token: ', !token)
    // console.log("[index.js] → typeof token !== 'undefined': ", typeof token !== 'undefined')
    // console.log('')

    // if (!token) return
    if (typeof token === 'undefined') return

    // console.log('[index.js] → check(token) 실행')
    // console.log('')

    store.dispatch(tempSetUser(user))
    store.dispatch(check(token))
  } catch (error) {
    console.error(error)
  }
}

sagaMiddleware.run(rootSaga)

user()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
