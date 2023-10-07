'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '../button'
import { TbArrowNarrowUp } from 'react-icons/tb'
import { AnimatePresence, motion } from 'framer-motion'

export const BckToTop = () => {
  const [isShow, setIsShow] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleScroll = useCallback(() => {
    if (!isShow && window.scrollY > 500) {
      setIsShow(true)
    }
    if (isShow && window.scrollY < 500) {
      setIsShow(false)
    }
  }, [isShow])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isShow &&
        <motion.div
          className="fixed right-4 bottom-4 z-20"
          initial={{ opacity: 0, right: -10 }}
          animate={{ opacity: 1, right: 16 }}
          exit={{ opacity: 0, right: -10 }}
        >
          <Button onClick={scrollToTop} className="shadow-lg shadow-emerald-400/20">
            <TbArrowNarrowUp size={20} />
          </Button>
        </motion.div>
      }
    </AnimatePresence>
  )
}