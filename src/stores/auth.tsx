import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  ReactNode,
} from 'react'

type AuthStore = {
  authToken: string
  setAuthToken: Dispatch<SetStateAction<string>>
}

const AuthContext = createContext<AuthStore>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState('')

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
