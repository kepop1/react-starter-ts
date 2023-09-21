import { getEnvVariable } from '@/lib'

const BASE_URL = getEnvVariable('API_URL')

export const LOGIN_URL = `${BASE_URL}/login`
export const REGISTER_URL = `${BASE_URL}/register`
export const FORGOT_PASSWORD_URL = `${BASE_URL}/forgot-password`

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
