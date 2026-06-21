'use client'

import { config } from '@/data/config'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // State to hold the current time, formatted as HH:MM:SS
  const [currentTime, setCurrentTime] = useState('')

  // Effect to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-GB')) // 'en-GB' gives HH:MM:SS format
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Navigation links
  const navLinks = [
    { name: '01_projects', href: '#projects' },
    { name: '02_about', href: '#about' },
    { name: '03_contact', href: '#contact' },
  ]

  // Click handler to scroll to top smoothly
  const handleHomeClick = e => {
    e.preventDefault() // Prevent the default link behavior
    setIsMobileMenuOpen(false) // Close mobile menu if open
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <header className='fixed crt-text top-0 left-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-matrix-green-dark/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-12 text-sm font-mono'>
          {/* Left Side: System Info */}
          <div className='flex items-center gap-4 text-text-secondary'>
            <a
              href='/'
              onClick={handleHomeClick}
              className='hover:text-matrix-green transition-colors'
              aria-label='Back to top'
            >
              <span>[SYS: {config.name.toUpperCase()}.EXE]</span>
            </a>
            <span className='hidden lg:inline'>[STATUS: ONLINE]</span>
          </div>

          {/* Right Side: Navigation & Time */}
          <div className='flex items-center gap-6'>
            <nav className='hidden md:flex items-center gap-6'>
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className='text-text-secondary hover:text-matrix-green transition-colors'
                >
                  [{link.name}]
                </a>
              ))}
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden text-text-secondary hover:text-matrix-green font-mono transition-colors focus:outline-none cursor-pointer text-sm px-1'
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? '[ EXIT ]' : '[ MENU ]'}
            </button>

            <div className='hidden md:block text-matrix-green-dark'>
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-matrix-green-dark/10 bg-background/95 backdrop-blur-md w-full px-6 py-4 flex flex-col gap-4 border-b border-matrix-green-dark/20 transition-all duration-200'>
          <nav className='flex flex-col gap-3 font-mono text-base'>
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className='text-text-secondary hover:text-matrix-green transition-colors py-1'
              >
                [{link.name}]
              </a>
            ))}
            <div className='text-xs text-text-secondary/60 mt-2 border-t border-matrix-green-dark/10 pt-2'>
              [STATUS: ONLINE]
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
