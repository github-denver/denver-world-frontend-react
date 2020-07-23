import client from './client'

export const login = ({ id, password }) => client.post('/api/login', { id, password })

export const register = ({ id, name, password }) => client.post('/api/register', { id, name, password })

export const check = (token) => {
  // console.log('lib → api → [auth.js] → token: ', token)

  return client.get('/api/me', {
    params: {
      accessToken: token
    }
  })
}

export const logout = () => client.get('/api/logout')
