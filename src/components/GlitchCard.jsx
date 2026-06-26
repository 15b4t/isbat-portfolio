'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { anomalyCharacters } from '@/data/constants'

// Helper to generate a random string
const generateRandomString = (length, characterSet) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characterSet.charAt(
      Math.floor(Math.random() * characterSet.length)
    )
  }
  return result
}

// Pre-generate a static noise pool at startup to save CPU cycles
const NOISE_POOL_SIZE = 4000
const noisePool = generateRandomString(NOISE_POOL_SIZE, anomalyCharacters)

// O(1) noise retrieval by taking random slices of the static pool
const getPreGeneratedNoise = length => {
  const start = Math.floor(Math.random() * (NOISE_POOL_SIZE - length))
  return noisePool.substring(start, start + length)
}

const GlitchCard = ({ children }) => {
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [randomString, setRandomString] = useState('')

  // Tracks whether the card has scrolled into view; gates the noise loop
  // so off-screen cards do no work.
  const [isInView, setIsInView] = useState(false)

  const animationDuration = 1.2

  // Effect to set readiness after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Animate the encrypted noise only while the card is in view. Once the
  // decrypt sweep starts, keep refreshing for its duration, then stop.
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setRandomString(getPreGeneratedNoise(1200))
    }, 100)

    let stopTimer
    if (isDecrypting) {
      stopTimer = setTimeout(
        () => clearInterval(interval),
        animationDuration * 1000
      )
    }

    return () => {
      clearInterval(interval)
      clearTimeout(stopTimer)
    }
  }, [isInView, isDecrypting])

  useEffect(() => {
    // Decrypt once the card is both ready and in view.
    if (isReady && isInView && !isDecrypting) {
      setIsDecrypting(true)
    }
  }, [isReady, isInView, isDecrypting])

  return (
    <motion.div
      className='relative w-full h-[350px] rounded-lg overflow-hidden border border-matrix-green-dark/30'
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Content Layer */}
      <motion.div
        className='absolute inset-0 w-full h-full z-10'
        animate={isDecrypting ? 'visible' : 'hidden'}
        variants={{
          hidden: { clipPath: 'inset(0 0 100% 0)' },
          visible: { clipPath: 'inset(0 0 0% 0)' },
        }}
        transition={{ duration: animationDuration, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* Noise Layer (Clipped in reverse direction of reveal) */}
      <motion.div
        className='absolute inset-0 bg-background p-4 pointer-events-none'
        animate={isDecrypting ? 'visible' : 'hidden'}
        variants={{
          hidden: { clipPath: 'inset(0% 0 0 0)' },
          visible: { clipPath: 'inset(100% 0 0 0)' },
        }}
        transition={{ duration: animationDuration, ease: 'easeOut' }}
      >
        <p className='text-xs text-matrix-green/60 h-full break-words whitespace-pre-wrap font-mono leading-tight'>
          {randomString}
        </p>
      </motion.div>

      {/* Laser Scan Line */}
      {isDecrypting && (
        <motion.div
          className="absolute left-0 w-full h-[2px] bg-matrix-green shadow-[0_0_15px_1px_theme('colors.matrix-green')] z-20"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: animationDuration, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}

export default GlitchCard
