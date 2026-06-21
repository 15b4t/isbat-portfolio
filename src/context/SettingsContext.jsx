'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [crtEnabled, setCrtEnabled] = useState(true)
  const [bloomEnabled, setBloomEnabled] = useState(true)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedCrt = localStorage.getItem('sys_crt_enabled')
    const savedBloom = localStorage.getItem('sys_bloom_enabled')

    if (savedCrt !== null) setCrtEnabled(savedCrt === 'true')
    if (savedBloom !== null) setBloomEnabled(savedBloom === 'true')
  }, [])

  const toggleCrt = () => {
    setCrtEnabled(prev => {
      const next = !prev
      localStorage.setItem('sys_crt_enabled', String(next))
      return next
    })
  }

  const toggleBloom = () => {
    setBloomEnabled(prev => {
      const next = !prev
      localStorage.setItem('sys_bloom_enabled', String(next))
      return next
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        crtEnabled,
        bloomEnabled,
        toggleCrt,
        toggleBloom,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
