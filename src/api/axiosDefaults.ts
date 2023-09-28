import type { Dispatch, SetStateAction } from 'react'
import axios, {
  type AxiosRequestConfig,
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { LocalStorageKeys } from '@/lib/helpers/constants'
import { AUTHENTICATE_URL } from './config'

type SetLoggedInType = Dispatch<SetStateAction<boolean | null>>

const onRequest = async (
  config: InternalAxiosRequestConfig<unknown>,
): Promise<InternalAxiosRequestConfig<unknown>> => {
  const authToken = localStorage.getItem(LocalStorageKeys.authToken)

  if (authToken && config?.headers) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

// Any status codes that falls outside the range of 2xx cause this function to trigger
const onResponseError =
  (setLoggedIn: SetLoggedInType) =>
  async (error: AxiosError): Promise<AxiosError | AxiosResponse> => {
    if (error?.response?.status === 401) {
      try {
        const refreshToken = await localStorage.getItem(
          LocalStorageKeys.refreshToken,
        )

        if (refreshToken) {
          const response = await axios.post(AUTHENTICATE_URL, { refreshToken })

          if (response.data.success) {
            const authToken = response.data.authToken

            localStorage.setItem(LocalStorageKeys.authToken, authToken)

            // Note: Hack: Fixes the conflict between AxiosRequestConfig vs InternalAxiosRequestConfig
            const interceptedRequest = error.config as AxiosRequestConfig<any>

            // setLoggedIn(true) will happen from the IS-AUTHENTICATED call in the useEffect
            return Promise.resolve(axios.request(interceptedRequest))
          } else {
            setLoggedIn(false)
            return Promise.reject(error)
          }
        } else {
          setLoggedIn(false)
          return Promise.reject(error)
        }
      } catch (refreshTokenRequestError) {
        setLoggedIn(false)
        return Promise.reject(refreshTokenRequestError)
      }
    } else {
      return Promise.reject(error)
    }
  }

export const configureAxiosDefaults = (setLoggedIn: SetLoggedInType) => {
  axios.defaults.timeout = 60000
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.interceptors.request.use(onRequest, onRequestError)
  axios.interceptors.response.use(onResponse, onResponseError(setLoggedIn))
}
