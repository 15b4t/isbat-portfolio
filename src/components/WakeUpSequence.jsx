'use client'

import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

const WakeUpSequence = ({ onComplete }) => {
  // We now have more steps in our sequence
  const [step, setStep] = useState(0)

  // Animation seqences
  const sequences = [
    ['> Wake up, Neo...', 600, () => setStep(1)],
    ['> The Matrix has you...', 800, () => setStep(2)],
    ['> Follow the white rabbit.', 800, () => setStep(3)],
    ['> Knock, knock, Neo.', 800, () => onComplete()], // Final step calls onComplete
  ]

  return (
    <div className='font-mono text-lg'>
      <TypeAnimation
        key={step}
        sequence={sequences[step]}
        wrapper='span'
        cursor={false}
        speed={45}
      />
    </div>
  )
}

export default WakeUpSequence
