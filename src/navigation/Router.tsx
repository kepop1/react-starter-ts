import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from '../pages/loggedIn/main/Main'
import { Login } from '../pages/loggedOut/login/Login'
import { Register } from '../pages/loggedOut/register/Register'
import { Welcome } from '../pages/loggedOut/welcome/Welcome'
import { ForgotPassword } from '../pages/loggedOut/forgotPassword/ForgotPassword'
import { NotFound } from '../pages/notFound/NotFound'
import { AppLayout } from './AppLayout'
import { AuthLayout } from './AuthLayout'
import {
  ROUTE_WELCOME,
  ROUTE_REGISTER,
  ROUTE_LOGIN,
  ROUTE_MAIN,
  ROUTE_FORGOT_PASSWORD,
} from './constants'

export const Router = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: ROUTE_MAIN,
          element: <Main />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: ROUTE_WELCOME,
          element: <Welcome />,
        },
        {
          path: ROUTE_LOGIN,
          element: <Login />,
        },
        {
          path: ROUTE_REGISTER,
          element: <Register />,
        },
        {
          path: ROUTE_FORGOT_PASSWORD,
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])

  return <RouterProvider router={router} />
}
