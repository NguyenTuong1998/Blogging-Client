import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimationProps{
    children?: React.ReactNode; 
    keyValue?: string;
    initial?: object;
    animate? : object;
    transition?: object;
    className?: string;
}
const AnimationWraper: React.FC<AnimationProps> =
  (
    { 
      children,
      keyValue,
      initial = { opacity: 0 },
      animate = { opacity: 1 },
      transition = { duration: 1 },
      className
    }
  ) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default AnimationWraper