'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [crtEnabled, setCrtEnabled] = useState(true)
  const [bloomEnabled, setBloomEnabled] = useState(true)
  // Tracks the OS "reduce motion" preference so motion-heavy effects
  // (e.g. the matrix rain speed) can degrade gracefully.
  const [reducedMotion, setReducedMotion] = useState(false)

  // Resolve initial effect state. Precedence: saved setting -> OS
  // accessibility preference -> default-on. A saved choice always wins,
  // so users can opt back into effects even if their OS asks to reduce them.
  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionMql.matches)
    const handleMotionChange = e => setReducedMotion(e.matches)
    motionMql.addEventListener('change', handleMotionChange)

    const savedCrt = localStorage.getItem('sys_crt_enabled')
    if (savedCrt !== null) {
      setCrtEnabled(savedCrt === 'true')
    } else if (motionMql.matches) {
      setCrtEnabled(false)
    }

    const savedBloom = localStorage.getItem('sys_bloom_enabled')
    if (savedBloom !== null) {
      setBloomEnabled(savedBloom === 'true')
    } else if (
      window.matchMedia('(prefers-reduced-transparency: reduce)').matches ||
      window.matchMedia('(prefers-contrast: more)').matches
    ) {
      setBloomEnabled(false)
    }

    return () => motionMql.removeEventListener('change', handleMotionChange)
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
        reducedMotion,
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
