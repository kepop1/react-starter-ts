import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../stores/auth'
import { ROUTE_MAIN } from './constants'

export const AuthLayout = () => {
  const { loggedIn } = useAuth()

  if (loggedIn === null) {
    return <div>Loading Auth ...</div>
  }

  if (loggedIn) {
    return <Navigate to={ROUTE_MAIN} />
  }

  // Could wrap this with a Nav Bar or any other layout related code.
  return <Outlet />
}
