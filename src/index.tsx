import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './navigation/Router'
import { AuthProvider } from './stores/auth'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)
