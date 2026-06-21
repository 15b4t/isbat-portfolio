'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { anomalyCharcters } from '@/data/constants'

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
const anomolyCharacters = anomalyCharcters
const NOISE_POOL_SIZE = 4000
const noisePool = generateRandomString(NOISE_POOL_SIZE, anomolyCharacters)

// O(1) noise retrieval by taking random slices of the static pool
const getPreGeneratedNoise = length => {
  const start = Math.floor(Math.random() * (NOISE_POOL_SIZE - length))
  return noisePool.substring(start, start + length)
}

const GlitchCard = ({ children }) => {
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [randomString, setRandomString] = useState('')

  const intervalRef = useRef(null)
  const isInViewRef = useRef(false) // Ref to track viewport status

  const animationDuration = 1.2

  // Effect to set readiness after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Effect to generate the random string noise
  useEffect(() => {
    let interval = null
    if (!isDecrypting) {
      interval = setInterval(() => {
        setRandomString(getPreGeneratedNoise(1200))
      }, 100)
    } else {
      // Keep updating noise during the sweep animation
      interval = setInterval(() => {
        setRandomString(getPreGeneratedNoise(1200))
      }, 100)
      const timer = setTimeout(() => {
        clearInterval(interval)
      }, animationDuration * 1000)
      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
    return () => clearInterval(interval)
  }, [isDecrypting, animationDuration])

  useEffect(() => {
    // Check if the component is ready AND in view, but not already decrypting.
    if (isReady && isInViewRef.current && !isDecrypting) {
      setIsDecrypting(true)
    }
  }, [isReady, isDecrypting])

  return (
    <motion.div
      className='relative w-full h-[350px] rounded-lg overflow-hidden border border-matrix-green-dark/30'
      // onViewportEnter updates ref.
      onViewportEnter={() => {
        isInViewRef.current = true
        // If the component is already ready when it enters view, decrypt immediately.
        if (isReady) {
          setIsDecrypting(true)
        }
      }}
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
