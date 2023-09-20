import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTE_MAIN} element={<Main />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTE_WELCOME} element={<Welcome />} />
          <Route path={ROUTE_LOGIN} element={<Login />} />
          <Route path={ROUTE_REGISTER} element={<Register />} />
          <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
