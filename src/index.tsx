import 'styles/swiper.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from 'app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
})
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
