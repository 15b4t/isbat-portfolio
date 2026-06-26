'use client'

import { useState, useEffect } from 'react'
import { Fira_Code, VT323 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import { SettingsProvider, useSettings } from '@/context/SettingsContext'
import SettingsPanel from '@/components/SettingsPanel'

const firaCode = Fira_Code({ subsets: ['latin'], display: 'swap' })
const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323', // Assign it a CSS variable
})

function LayoutContent({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(null)
  const { crtEnabled, bloomEnabled } = useSettings()

  useEffect(() => {
    document.title = 'Isbat Bin Hossain | Portfolio'
    const hasVisited = localStorage.getItem('hasVisited')
    setIsFirstVisit(!hasVisited)
  }, [])

  const handleLoadingComplete = () => {
    localStorage.setItem('hasVisited', 'true')
    setIsLoading(false)
  }

  return (
    <html lang='en'>
      <head>
        <meta
          name='description'
          content='A Matrix themed portfolio of Isbat Bin Hossain, a Backend Engineer and System Builder, showcasing projects in Node.js, Python and more.'
        />
        <link rel='icon' href='/icon.svg' type='image/svg+xml' />
        {/* --- Open Graph & Twitter Card Metadata (for social sharing) --- */}
        <meta property='og:title' content='Isbat Bin Hossain | Portfolio' />
        <meta
          property='og:description'
          content='A Matrix-themed portfolio showcasing the work of a backend engineer and system builder.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://isbat-portfolio.vercel.app/' />
        <meta
          property='og:image'
          content='https://isbat-portfolio.vercel.app/screenshots/hero_section.PNG'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Isbat Bin Hossain | Portfolio' />
        <meta
          name='twitter:description'
          content='A Matrix-themed portfolio showcasing the work of a backend engineer and system builder.'
        />
        <meta
          name='twitter:image'
          content='https://isbat-portfolio.vercel.app/screenshots/hero_section.PNG'
        />
      </head>
      <body className={`${firaCode.className} ${vt323.variable} bg-background ${crtEnabled ? 'crt-active' : ''} ${bloomEnabled ? 'bloom-active' : ''}`}>
        <div className='crt-effect'>
          {isFirstVisit === null ? (
            <div className='w-full h-dvh' />
          ) : isLoading ? (
            <Loader
              isFirstVisit={isFirstVisit}
              onLoadingComplete={handleLoadingComplete}
            />
          ) : (
            <main className='crt-text'>
              <Navbar />
              {children}
              <SettingsPanel />
            </main>
          )}
        </div>
      </body>
    </html>
  )
}

export default function RootLayout({ children }) {
  return (
    <SettingsProvider>
      <LayoutContent>{children}</LayoutContent>
    </SettingsProvider>
  )
}
