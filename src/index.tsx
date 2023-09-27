import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './navigation/Router'
import { AuthProvider } from './stores/auth'
import './index.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)

/*
  Strict Mode in development will automatically double fire effects / state, for impure functions and mount twice
  https://github.com/facebook/react/issues/12856#issuecomment-390206425, https://github.com/facebook/react/issues/12856#issuecomment-1454190525
  this means we have a double call when the auth store initialises
*/
root.render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
