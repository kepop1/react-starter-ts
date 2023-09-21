import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './navigation/Router'
import { AuthProvider } from './stores/auth'
import './index.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
