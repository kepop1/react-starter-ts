import axios from 'axios'
import {
  createContext,
  useState,
  type SetStateAction,
  type Dispatch,
  useContext,
  type ReactNode,
  useEffect,
} from 'react'
import { LocalStorageKeys, type LocalStorageValues } from '../lib'
import { configureAxiosDefaults } from '../api/axiosDefaults'
import { AUTHENTICATED_ROUTE_URL } from '../api/config'

const setUserItemsInLocalStorage = (keys: LocalStorageValues) => {
  localStorage.setItem(LocalStorageKeys.authToken, keys.authToken)
  localStorage.setItem(LocalStorageKeys.refreshToken, keys.refreshToken)
  localStorage.setItem(LocalStorageKeys.email, keys.email)
}

const removeUserItemsInLocalStorage = () => {
  localStorage.removeItem(LocalStorageKeys.email)
  localStorage.removeItem(LocalStorageKeys.refreshToken)
  localStorage.removeItem(LocalStorageKeys.authToken)
}

type AuthStore = {
  loggedIn: boolean | null
  setLoggedIn: Dispatch<SetStateAction<boolean | null>>
  setUserItemsInLocalStorage: (keys: LocalStorageValues) => void
  resetAuthStore: () => void
}

const AuthContext = createContext<AuthStore>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

  configureAxiosDefaults(setLoggedIn)

  useEffect(() => {
    const triggerIsAuthenticated = async () => {
      try {
        const response = await axios.get(AUTHENTICATED_ROUTE_URL)

        if (response.data.success) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      } catch (error: any) {
        setLoggedIn(false)
      }
    }

    // This will trigger the refreshToken route inside of the configureAxiosDefaults
    if (loggedIn === null) {
      triggerIsAuthenticated()
    }
  }, [loggedIn])

  const resetAuthStore = () => {
    removeUserItemsInLocalStorage()
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        setUserItemsInLocalStorage,
        resetAuthStore,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
