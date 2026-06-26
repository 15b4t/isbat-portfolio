'use client'

import { anomalyCharacters } from '@/data/constants'
import { useEffect, useRef } from 'react'
import { useSettings } from '@/context/SettingsContext'

const MatrixRain = () => {
  const { reducedMotion } = useSettings()
  // Animation speed (frames/sec). Halved when the user prefers reduced motion
  // so the effect persists but calms down rather than disappearing.
  const speed = reducedMotion ? 15 : 30

  const canvasRef = useRef(null)
  const animationFrameIdRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const characters = anomalyCharacters
    const fontSize = 13
    let columns = 0
    let rainDrops = []

    // --- Time-based animation variables ---
    let lastTime = 0
    const interval = 1000 / speed // Time in ms between each frame update

    const initialize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      rainDrops = Array(columns).fill(1)
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 2, 8, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00FF41'
      ctx.font = `${fontSize}px Fira Code`

      for (let i = 0; i < rainDrops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        )
        const x = i * fontSize
        const y = rainDrops[i] * fontSize
        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    // Animation loop
    const animate = timestamp => {
      const deltaTime = timestamp - lastTime

      // Only draw if enough time has passed since the last frame
      if (deltaTime > interval) {
        draw()
        lastTime = timestamp - (deltaTime % interval) // Adjust lastTime to prevent drift
      }

      animationFrameIdRef.current = window.requestAnimationFrame(animate)
    }

    // --- Start/stop so the loop never paints while the hero is scrolled
    // off-screen or the tab is backgrounded (saves battery). ---
    let isOnScreen = true
    let isPageVisible = !document.hidden

    const start = () => {
      if (animationFrameIdRef.current == null) {
        lastTime = 0
        animationFrameIdRef.current = window.requestAnimationFrame(animate)
      }
    }
    const stop = () => {
      if (animationFrameIdRef.current != null) {
        window.cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
    }
    const sync = () => (isOnScreen && isPageVisible ? start() : stop())

    initialize()
    sync()

    window.addEventListener('resize', initialize)

    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting
      sync()
    })
    observer.observe(canvas)

    const handleVisibility = () => {
      isPageVisible = !document.hidden
      sync()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', initialize)
      document.removeEventListener('visibilitychange', handleVisibility)
      observer.disconnect()
      stop()
    }
  }, [speed])

  return (
    <canvas
      ref={canvasRef}
      className='absolute top-0 left-0 w-full h-full z-[-1] opacity-70'
    />
  )
}

export default MatrixRain
