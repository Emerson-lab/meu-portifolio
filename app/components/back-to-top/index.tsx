'use client'

import { useCallback, useEffect, useState } from "react"
import { Button } from "../button"
import { TbArrowNarrowUp } from "react-icons/tb"

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
    <div className="fixed right-4 bottom-4 z-20">
      {isShow &&
        <Button onClick={scrollToTop} className="shadow-lg shadow-emerald-400/20">
          <TbArrowNarrowUp size={20} />
        </Button>
      }
    </div>
  )
}