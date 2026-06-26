'use client'

import { useState } from 'react'
import { useSettings } from '@/context/SettingsContext'

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    crtEnabled,
    flickerEnabled,
    bloomEnabled,
    toggleCrt,
    toggleFlicker,
    toggleBloom,
  } = useSettings()

  const handleReboot = () => {
    localStorage.removeItem('hasVisited')
    window.location.reload()
  }

  return (
    <div className='fixed bottom-4 right-4 z-[9998] font-mono text-sm'>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='bg-background/90 border border-matrix-green/50 text-matrix-green px-3 py-2 rounded shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:border-matrix-green hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] transition-all duration-300 cursor-pointer'
        >
          [ SYS_CTRL.EXE ]
        </button>
      )}

      {/* Retro Settings Modal */}
      {isOpen && (
        <div className='password-modal shadow-2xl w-[280px] md:w-[320px]'>
          {/* DOS title bar */}
          <div className='modal-title-bar flex justify-between items-center px-2 py-1'>
            <span>SYSTEM DIAGNOSTICS</span>
            <button
              onClick={() => setIsOpen(false)}
              className='hover:bg-red-600 hover:text-white px-2 font-bold cursor-pointer'
            >
              X
            </button>
          </div>

          <div className='modal-content space-y-4 text-base p-4'>
            <p className='text-xs opacity-80 border-b border-white/20 pb-2 mb-2'>
              Adjust environment variables for accessibility and rendering.
            </p>

            <div className='space-y-3 font-mono'>
              {/* CRT Toggle */}
              <label className='flex items-center gap-3 cursor-pointer select-none group'>
                <input
                  type='checkbox'
                  checked={crtEnabled}
                  onChange={toggleCrt}
                  className='sr-only'
                />
                <span className='text-matrix-green group-hover:text-white transition-colors'>
                  {crtEnabled ? '[X]' : '[ ]'} CRT SCANLINES
                </span>
              </label>

              {/* Flicker Toggle */}
              <label className='flex items-center gap-3 cursor-pointer select-none group'>
                <input
                  type='checkbox'
                  checked={flickerEnabled}
                  onChange={toggleFlicker}
                  className='sr-only'
                />
                <span className='text-matrix-green group-hover:text-white transition-colors'>
                  {flickerEnabled ? '[X]' : '[ ]'} SCREEN FLICKER
                </span>
              </label>

              {/* Bloom Toggle */}
              <label className='flex items-center gap-3 cursor-pointer select-none group'>
                <input
                  type='checkbox'
                  checked={bloomEnabled}
                  onChange={toggleBloom}
                  className='sr-only'
                />
                <span className='text-matrix-green group-hover:text-white transition-colors'>
                  {bloomEnabled ? '[X]' : '[ ]'} PHOSPHOR BLOOM
                </span>
              </label>
            </div>

            <div className='border-t border-white/20 pt-4 flex flex-col gap-2'>
              <button
                onClick={handleReboot}
                className='w-full text-center py-2 bg-matrix-green-dark/40 hover:bg-matrix-green text-matrix-green hover:text-black border border-matrix-green/30 transition-all font-mono text-sm cursor-pointer'
              >
                [ REBOOT_SYSTEM.BAT ]
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className='w-full text-center py-1 text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer'
              >
                [ CLOSE_UTILITY ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPanel
