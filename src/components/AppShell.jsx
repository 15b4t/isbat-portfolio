'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import { SettingsProvider, useSettings } from '@/context/SettingsContext'
import SettingsPanel from '@/components/SettingsPanel'

// Holds all the client-only concerns that used to live in the root layout:
// the first-visit/loader gating and the CRT/flicker/bloom effect classes.
// These classes sit on a wrapper div (not <body>) so the server component
// layout can own <body>; the CSS uses descendant selectors, so behavior is
// unchanged.
function ShellInner({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(null)
  const { crtEnabled, flickerEnabled, bloomEnabled } = useSettings()

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    setIsFirstVisit(!hasVisited)
  }, [])

  const handleLoadingComplete = () => {
    localStorage.setItem('hasVisited', 'true')
    setIsLoading(false)
  }

  const effectClasses = [
    crtEnabled ? 'crt-active' : '',
    flickerEnabled ? 'flicker-active' : '',
    bloomEnabled ? 'bloom-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={effectClasses}>
      <div className='crt-effect'>
        {isFirstVisit === null ? (
          <div className='w-full h-dvh' />
        ) : isLoading ? (
          <Loader
            isFirstVisit={isFirstVisit}
            onLoadingComplete={handleLoadingComplete}
          />
        ) : (
          <div className='crt-text'>
            <Navbar />
            {children}
            <SettingsPanel />
          </div>
        )}
      </div>
    </div>
  )
}

export default function AppShell({ children }) {
  return (
    <SettingsProvider>
      <ShellInner>{children}</ShellInner>
    </SettingsProvider>
  )
}
