'use client'

import { TypeAnimation } from 'react-type-animation'
import { config } from '@/data/config'
import MatrixRain from './MatrixRain'
import { motion } from 'framer-motion'

// Animation variants for the button container
const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Buttons will fade in 0.2s after one another
      delayChildren: 1.5, // Start the animation after a 1.5s delay
    },
  },
};

// Animation variants for each individual button
const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};


const HeroSection = () => {

  return (
    <section className='relative flex flex-col items-center justify-center text-center h-[100dvh] min-h-[400px] md:min-h-[500px] mb-16 overflow-hidden w-full'>
      <MatrixRain />

      <div className='relative z-10 p-4 crt-text'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]'>
          Hi, I'm {config.name}.
        </h1>
        <div className='text-lg md:text-xl lg:text-2xl text-matrix-green drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]'>
          <span className='font-semibold'>I am a </span>
          <TypeAnimation
            sequence={config.heroSequence}
            wrapper='span'
            speed={50}
            cursor={true}
            repeat={Infinity}
            className='font-mono'
          />
          <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Button 1: View Online Resume */}
          <motion.a
            href="https://rxresu.me/isbatbinhossain/isbat-bin-hossain"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm border border-matrix-green-dark/50 px-6 py-3 rounded text-text-secondary 
                       hover:border-matrix-green hover:text-matrix-green hover:-translate-y-1 transition-all duration-300"
            variants={buttonVariants}
          >
            [ VIEW_RESUME ]
          </motion.a>

          {/* Button 2: Visit Github */}
          <motion.a
            href={config.contact.links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm border border-matrix-green-dark/50 px-6 py-3 rounded text-text-secondary 
                       hover:border-matrix-green hover:text-matrix-green hover:-translate-y-1 transition-all duration-300"
            variants={buttonVariants}
          >
            [ ACCESS_GITHUB.SH ]
          </motion.a>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
