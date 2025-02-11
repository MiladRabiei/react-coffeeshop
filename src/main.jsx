import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:6000
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={client}>
    <HashRouter>
      <App />
    </HashRouter>
    <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </StrictMode>,
);
