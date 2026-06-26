'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  // CRT scanlines = static texture (not a motion hazard).
  const [crtEnabled, setCrtEnabled] = useState(true)
  // Screen flicker = the animated opacity oscillation (the actual motion).
  const [flickerEnabled, setFlickerEnabled] = useState(true)
  const [bloomEnabled, setBloomEnabled] = useState(true)
  // Tracks the OS "reduce motion" preference so motion-heavy effects
  // (e.g. the matrix rain speed) can degrade gracefully.
  const [reducedMotion, setReducedMotion] = useState(false)

  // Resolve initial effect state. Precedence: saved setting -> OS
  // accessibility preference -> default-on. A saved choice always wins,
  // so users can opt back into effects even if their OS asks to reduce them.
  // Each effect maps to the preference that actually fits it: flicker ->
  // reduced-motion (it animates); bloom -> reduced-transparency / contrast
  // (it blurs/glows). Scanlines are static, so no preference disables them.
  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionMql.matches)
    const handleMotionChange = e => setReducedMotion(e.matches)
    motionMql.addEventListener('change', handleMotionChange)

    const savedCrt = localStorage.getItem('sys_crt_enabled')
    if (savedCrt !== null) {
      setCrtEnabled(savedCrt === 'true')
    }

    const savedFlicker = localStorage.getItem('sys_flicker_enabled')
    if (savedFlicker !== null) {
      setFlickerEnabled(savedFlicker === 'true')
    } else if (motionMql.matches) {
      setFlickerEnabled(false)
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

  const toggleFlicker = () => {
    setFlickerEnabled(prev => {
      const next = !prev
      localStorage.setItem('sys_flicker_enabled', String(next))
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
        flickerEnabled,
        bloomEnabled,
        reducedMotion,
        toggleCrt,
        toggleFlicker,
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
