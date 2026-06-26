import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { SettingsProvider, useSettings } from '@/context/SettingsContext'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const REDUCED_TRANSPARENCY = '(prefers-reduced-transparency: reduce)'
const CONTRAST_MORE = '(prefers-contrast: more)'

// Override window.matchMedia so the given media queries report matches: true.
function setMatchMedia(matching = []) {
  const matchSet = new Set(matching)
  window.matchMedia = vi.fn(query => ({
    matches: matchSet.has(query),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

const wrapper = ({ children }) => <SettingsProvider>{children}</SettingsProvider>
const render = () => renderHook(() => useSettings(), { wrapper })

beforeEach(() => {
  localStorage.clear()
  setMatchMedia([])
})

describe('SettingsContext precedence', () => {
  it('defaults all effects on with no saved value and no OS preference', () => {
    const { result } = render()
    expect(result.current.crtEnabled).toBe(true)
    expect(result.current.flickerEnabled).toBe(true)
    expect(result.current.bloomEnabled).toBe(true)
    expect(result.current.reducedMotion).toBe(false)
  })

  it('reduced-motion disables flicker only (scanlines + bloom stay on)', () => {
    setMatchMedia([REDUCED_MOTION])
    const { result } = render()
    expect(result.current.flickerEnabled).toBe(false)
    expect(result.current.crtEnabled).toBe(true)
    expect(result.current.bloomEnabled).toBe(true)
    expect(result.current.reducedMotion).toBe(true)
  })

  it('reduced-transparency disables bloom only', () => {
    setMatchMedia([REDUCED_TRANSPARENCY])
    const { result } = render()
    expect(result.current.bloomEnabled).toBe(false)
    expect(result.current.crtEnabled).toBe(true)
    expect(result.current.flickerEnabled).toBe(true)
  })

  it('contrast:more disables bloom only', () => {
    setMatchMedia([CONTRAST_MORE])
    const { result } = render()
    expect(result.current.bloomEnabled).toBe(false)
    expect(result.current.flickerEnabled).toBe(true)
  })

  it('a saved setting wins over the OS preference', () => {
    // User re-enabled flicker despite reduced-motion; opted bloom on despite contrast.
    localStorage.setItem('sys_flicker_enabled', 'true')
    localStorage.setItem('sys_bloom_enabled', 'true')
    localStorage.setItem('sys_crt_enabled', 'false')
    setMatchMedia([REDUCED_MOTION, CONTRAST_MORE])
    const { result } = render()
    expect(result.current.flickerEnabled).toBe(true) // saved wins over reduced-motion
    expect(result.current.bloomEnabled).toBe(true) // saved wins over contrast
    expect(result.current.crtEnabled).toBe(false) // saved off, no preference forces it on
  })
})

describe('SettingsContext toggles', () => {
  it('persists each toggle to its localStorage key', () => {
    const { result } = render()

    act(() => result.current.toggleFlicker())
    expect(result.current.flickerEnabled).toBe(false)
    expect(localStorage.getItem('sys_flicker_enabled')).toBe('false')

    act(() => result.current.toggleCrt())
    expect(localStorage.getItem('sys_crt_enabled')).toBe('false')

    act(() => result.current.toggleBloom())
    expect(localStorage.getItem('sys_bloom_enabled')).toBe('false')

    // toggling back flips the stored value
    act(() => result.current.toggleFlicker())
    expect(result.current.flickerEnabled).toBe(true)
    expect(localStorage.getItem('sys_flicker_enabled')).toBe('true')
  })
})
