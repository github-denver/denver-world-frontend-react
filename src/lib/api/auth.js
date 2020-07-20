import client from './client'

export const login = ({ id, password }) => client.post('/api/login', { id, password })

export const register = ({ id, password }) => client.post('/api/register', { id, password })

export const check = () => client.get('/api/me')

export const logout = () => client.get('/api/logout')
