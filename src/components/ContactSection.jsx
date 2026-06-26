'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '@/data/config'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const ContactSection = () => {
  // Active = hovered or keyboard-focused, so the reveal works on touch/keyboard too.
  const [activeIcon, setActiveIcon] = useState(null)

  // Icons live here (JSX, not data); URLs + labels come from config.
  const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    email: <FaEnvelope />,
  }

  return (
    <section id='contact' className='py-24 text-center'>
      <h2 className='text-3xl font-bold mb-4'>{config.contact.title}</h2>
      <p className='text-text-secondary mb-12'>{config.contact.subtitle}</p>

      <div className='flex justify-center items-end gap-12 md:gap-16'>
        {Object.entries(config.contact.links).map(([key, { url, label }]) => (
          <a
            key={key}
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={key}
            className='flex flex-col items-center gap-4 group'
            onMouseEnter={() => setActiveIcon(key)}
            onMouseLeave={() => setActiveIcon(null)}
            onFocus={() => setActiveIcon(key)}
            onBlur={() => setActiveIcon(null)}
          >
            {/* Signal Strength Bars */}
            <div className='flex items-end h-10 gap-1'>
              {[0.4, 0.7, 1, 0.6].map((h, i) => (
                <motion.div
                  key={i}
                  className='w-2 bg-matrix-green-dark group-hover:bg-matrix-green group-focus-visible:bg-matrix-green transition-colors'
                  initial={{ height: '20%' }}
                  animate={{
                    height: activeIcon === key ? `${h * 100}%` : '20%',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              ))}
            </div>

            {/* Icon */}
            <div className='text-4xl text-text-secondary group-hover:text-matrix-green group-hover:-translate-y-1 group-focus-visible:text-matrix-green group-focus-visible:-translate-y-1 transition-all duration-300'>
              {socialIcons[key]}
            </div>

            {/* Label */}
            <p className='text-xs text-text-secondary font-mono transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'>
              {label}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ContactSection
