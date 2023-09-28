import { getEnvVariable } from '@/lib'

const BASE_URL = getEnvVariable('API_URL')

export const LOGIN_URL = `${BASE_URL}/login`
export const REGISTER_URL = `${BASE_URL}/register`
export const FORGOT_PASSWORD_URL = `${BASE_URL}/forgot-password`
export const AUTHENTICATE_URL = `${BASE_URL}/authenticate`

export const AUTHENTICATED_ROUTE_URL = `${BASE_URL}/authenticated-route`
