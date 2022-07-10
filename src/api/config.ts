const BASE_URL = 'http://localhost:4000'

export const LOGIN_URL = `${BASE_URL}/login`
export const REGISTER_URL = `${BASE_URL}/register`

type Headers = {
  Accept: string
  'Content-Type': string
  Authorization?: string
}

export const getRequestHeaders = (authToken?: string): Headers => {
  const headers: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (authToken) headers.Authorization = `Bearer ${authToken}`

  return headers
}
