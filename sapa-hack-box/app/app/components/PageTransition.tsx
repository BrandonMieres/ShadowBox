"use client"

import { motion, useScroll, useSpring, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import type React from "react" // Added import for React

const variants = {
  initial: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#9eff00] origin-[0%] z-50" style={{ scaleX }} />
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  )
}

export function AnimatedSection({
  children,
  direction = "left",
}: {
  children: React.ReactNode
  direction?: "left" | "right"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className="w-full">
      {children}
    </motion.div>
  )
}
