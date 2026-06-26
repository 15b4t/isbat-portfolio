'use client'

import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'

const HackingSequence = ({ onComplete }) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1300),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 2900),
      setTimeout(onComplete, 3800),
    ]
    return () => timeouts.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className='font-mono text-lg crt-text'>
      <p>* Welcome to CityPower Grid Rerouting *</p>
      <p>Authorised Users only</p>
      <p>New users MUST notify Sys/Ops.</p>
      <br />
      <p>login:</p>
      <p className='text-matrix-green-dark'>80/tcp open http host2.2.os</p>
      <p className='text-matrix-green-dark'>81/tcp open http host2.2.os</p>
      <br />

      {/* The nmap command, typed out */}
      {step >= 1 && (
        <TypeAnimation
          sequence={['> nmap -v -sS -O 10.2.2.2']}
          wrapper='p'
          cursor={false}
          speed={65}
        />
      )}

      {/* The nmap results, appear instantly */}
      {step >= 2 && (
        <div className='mt-2 text-text-secondary'>
          <p>Starting nmap V. 2.54BETA25</p>
          <p>
            Insufficient responses for TCP sequencing (3), OS detection may be
            less accurate
          </p>
          <p>Interesting ports on 10.2.2.2:</p>
          <p>
            (The 1539 ports scanned but not shown below are in state: closed)
          </p>
          <pre className='font-mono'>
            {'Port     State       Service\n'}
            {'22/tcp   open        ssh'}
          </pre>
          <br />
          <p>No exact OS matches for host</p>
          <br />
          <p>Nmap run completed — 1 IP address (1 host up) scanned</p>
        </div>
      )}

      {/* The sshnuke command, typed out */}
      {step >= 3 && (
        <div className='mt-2'>
          <TypeAnimation
            sequence={['> sshnuke 10.2.2.2 -rootpw "Z10N0101"']}
            wrapper='p'
            cursor={false}
            speed={75}
          />
        </div>
      )}

      {/* The final results, appear instantly */}
      {step >= 4 && (
        <div className='mt-2 text-text-primary'>
          <p>Connecting to 10.2.2.2:ssh ... successful</p>
          <p>Attempting to exploit SSHv1 CRC32 ... successful</p>
          <p>Resetting root password to "Z10N0101".</p>
          <p>System open: Access level &lt;9&gt;</p>
        </div>
      )}
    </div>
  )
}

export default HackingSequence
