import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import './i18n'

import { ThemeProvider } from './components/theme-provider.tsx'
import queryClient from './utils/queryClient.ts'
import App from './App.tsx'
import './index.css'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="Loading language">
      <Router>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </Router>
    </Suspense>
  </StrictMode>,
)
