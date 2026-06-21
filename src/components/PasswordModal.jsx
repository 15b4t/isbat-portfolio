'use client'

import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'

const PasswordModal = ({ onComplete }) => {
  const [status, setStatus] = useState('typing')

  useEffect(() => {
    if (status === 'granted') {
      const timer = setTimeout(onComplete, 1700)
      return () => clearTimeout(timer)
    }
  }, [status, onComplete])

  return (
    <div className='password-modal-container'>
      <div className='password-modal'>
        <div className='modal-title-bar'>
          {status === 'typing' ? 'Enter Password' : 'RTF CONTROL'}
        </div>
        <div className='modal-content text-xl'>
          {status === 'typing' && (
            <TypeAnimation
              sequence={['********', 500, () => setStatus('granted')]}
              wrapper='p'
              cursor={true}
              speed={85}
              repeat={0}
            />
          )}
          {status === 'granted' && (
            <p className='text-center'>ACCESS GRANTED</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PasswordModal
