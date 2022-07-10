import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../stores/auth'
import { ROUTE_WELCOME } from './constants'

export const AppLayout = () => {
  const { authToken } = useAuth()

  if (!authToken) {
    return <Navigate to={ROUTE_WELCOME} />
  }

  // Could wrap this with a Nav Bar or any other layout related code.
  return <Outlet />
}
