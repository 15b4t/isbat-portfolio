'use client'

import { useRef, useEffect } from 'react'
import { useMotionValue, useSpring, animate } from 'framer-motion'

import HeroSection from '@/components/HeroSection'
import ProjectShowcase from '@/components/ProjectShowcase'
import Footer from '@/components/Footer'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  const gridRef = useRef(null)
  const spotlightSize = useMotionValue(150)

  // Use spring effect for pulsing
  const smoothSpotlightSize = useSpring(spotlightSize, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  })

  useEffect(() => {
    const container = gridRef.current
    if (!container) return

    // pulsing animation
    const pulseAnimation = animate(spotlightSize, [100, 250, 100], {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    })

    const handleMouseMove = e => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      requestAnimationFrame(() => {
        container.style.setProperty('--mouse-x', `${x}px`)
        container.style.setProperty('--mouse-y', `${y}px`)
      })
    }

    // Subscribe to changes in the smooth size
    const unsubscribe = smoothSpotlightSize.on('change', value => {
      container.style.setProperty('--spotlight-size', `${value}px`)
    })

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      pulseAnimation.stop() // Stop the pulse animation
      unsubscribe() // Stop listening to size changes
    }
  }, [smoothSpotlightSize, spotlightSize])

  return (
    <main className='flex min-h-screen flex-col items-center'>
      <HeroSection />
      <div ref={gridRef} className='grid-background w-full flex justify-center'>
        <div className='interactive-grid-spotlight'></div>
        <div className='max-w-5xl w-full p-4 md:p-8 lg:p-12'>
          <ProjectShowcase />
          <AboutSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  )
}
