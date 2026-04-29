import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthContextProvider } from './contexts/AuthContext.jsx'
import PropTypes from 'prop-types'
import { Children } from 'react'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()
export function App({ children }) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
