import React, { Suspense } from 'react'
// import logo from './logo.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from '../require-auth'
import { useCommunity, useInitialized } from '@/hooks'
import { Pages } from '../../pages'
import { QueryClientProvider } from 'react-query'
import { globalClient } from '@/services/query'

import styles from './app.component.sass'
import { config } from '@/config'

export function App() {
  const isInitialized = useInitialized()

  if (!isInitialized) {
    return <div className={styles.loading}>Loading...</div>
  }
  return (
    <QueryClientProvider client={globalClient}>
      <Wrapper />
    </QueryClientProvider>
  )
}

const Wrapper = React.memo(() => {
  return (
    <RequireAuth>
      <div className={styles.app}>
        <Suspense>
          <BrowserRouter basename={config.homepage}>
            <Routes>
              <Route path="/">
                <Route element={<Pages.Search />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </RequireAuth>
  )
})
