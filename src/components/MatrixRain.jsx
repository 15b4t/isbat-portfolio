'use client'

import { anomalyCharacters } from '@/data/constants'
import { useEffect, useRef } from 'react'

const MatrixRain = () => {
  // Animation speed
  const speed = 30

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

    initialize()
    animate(0) // Start the animation loop

    window.addEventListener('resize', initialize)

    return () => {
      window.removeEventListener('resize', initialize)
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current)
      }
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
