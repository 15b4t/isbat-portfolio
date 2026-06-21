'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { config } from '@/data/config'

const AVATAR_FONT_SIZE = 'clamp(4.5px, 2vw, 8px)'
const bootTime = new Date()

// --- Animation Variants for the Info Tab ---
const infoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each child will animate 0.1s after the previous one
    },
  },
}

const infoItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('bio')
  const [uptime, setUptime] = useState('')

  // Uptime Calculator Effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = now - bootTime // Difference in milliseconds

      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)

      setUptime(`${d}d ${h}h ${m}m ${s}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const tabs = ['bio', 'info', 'stack']

  return (
    <section id='about' className='py-24'>
      <h2 className='text-3xl font-bold text-center mb-16'>
        {config.about.title}
      </h2>

      <div className='flex flex-col md:flex-row gap-16 md:gap-12 items-start'>
        {/* Left Column: ASCII Avatar */}
        <motion.div
          className='w-full md:w-1/2 relative overflow-x-auto flex justify-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className='relative w-11/12 mx-auto'>
            <div className='scan-line-effect'></div>
            <pre
              className='text-matrix-green-dark leading-tight font-mono'
              style={{ fontSize: AVATAR_FONT_SIZE }}
            >
              {config.about.avatar}
            </pre>
          </div>
        </motion.div>

        {/* Right Column: Interactive Dossier */}
        <motion.div
          className='w-full md:w-1/2 border border-matrix-green-dark/30 p-6 bg-background rounded-lg'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Tab Headers */}
          <div className='flex items-center gap-4 mb-6 border-b border-matrix-green-dark/20 flex-wrap'>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-mono text-sm px-1 pb-2 transition-colors duration-200
                  ${
                    activeTab === tab
                      ? 'text-matrix-green border-b-2 border-matrix-green'
                      : 'text-text-secondary hover:text-matrix-green'
                  }`}
              >
                [ {tab.toUpperCase()} ]
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className='min-h-[250px] text-sm'>
            {activeTab === 'info' && (
              // This container orchestrates the stagger animation
              <motion.div
                key='info'
                className='space-y-3 font-mono'
                variants={infoContainerVariants}
                initial='hidden'
                animate='visible'
              >
                {Object.entries(config.about.info).map(([key, value]) => (
                  // Each line is now a motion component
                  <motion.div key={key} variants={infoItemVariants}>
                    <span className='text-text-secondary'>{key}:</span>
                    <div className='inline-block ml-4 text-text-primary'>
                      {/* Check if the value is an array */}
                      {Array.isArray(value) ? (
                        <div className='flex flex-wrap gap-2 mt-1'>
                          {value.map(item => (
                            <span
                              key={item}
                              className='bg-matrix-green/10 text-matrix-green text-xs px-2 py-1 rounded'
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span>{value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeTab === 'stack' && (
              // Apply the same stagger animation to the stack tab
              <motion.div
                key='stack' // Add key
                className='space-y-4 font-mono'
                variants={infoContainerVariants}
                initial='hidden'
                animate='visible'
              >
                {Object.entries(config.about.stack).map(([category, items]) => (
                  // Each category is now a motion component
                  <motion.div key={category} variants={infoItemVariants}>
                    <p className='text-text-secondary mb-2'>{category}:</p>
                    <div className='flex flex-wrap gap-2'>
                      {items.map(item => (
                        <span
                          key={item}
                          className='bg-matrix-green/10 text-matrix-green text-xs px-3 py-1 rounded-full'
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'bio' && (
              // Apply a simple fade-in animation to the bio tab
              <motion.p
                key='bio' // Add key
                className='text-text-secondary leading-relaxed'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {config.about.bio}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
