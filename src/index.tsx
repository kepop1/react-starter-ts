import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  MantineProvider,
  createTheme,
  mergeMantineTheme,
  DEFAULT_THEME,
} from '@mantine/core'
import { Router } from './navigation/Router'
import { AuthProvider } from './stores/auth'
import './index.scss'
import '@mantine/core/styles.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

/*
  Strict Mode in development will automatically double fire effects / state, for impure functions and mount twice
  https://github.com/facebook/react/issues/12856#issuecomment-390206425, https://github.com/facebook/react/issues/12856#issuecomment-1454190525
  this means we have a double call when the auth store initialises
*/
const themeOverride = createTheme({
  fontFamily: 'Poppins, sans-serif',
  headings: {
    fontFamily: 'Poppins-Bold',
  },
  // Makes Mantine work with the root unit adjustment - https://mantine.dev/styles/rem/#rem-units-scaling
  scale: 1.6,
})

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride)

root.render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
)
