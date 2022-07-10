/* eslint-disable @typescript-eslint/no-explicit-any */
// https://testing-library.com/docs/react-testing-library/setup
import React, { ReactNode, ReactElement } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { AuthProvider } from '../../stores/auth'

type AllTheProvidersProps = {
  children: ReactNode
}

// Types from the render() method types from @testing-library/react-native
type component = ReactElement<any, string | React.JSXElementConstructor<any>>
type options = Omit<RenderOptions, 'wrapper'> | undefined

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>
}

// Could this be split into a simple render and a wrapped render for unit vs integration ?
const customRender = (component: component, options?: options): RenderResult =>
  render(component, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
