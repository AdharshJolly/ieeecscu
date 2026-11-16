"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-ieee-primary via-ieee-cyan to-amber-400 origin-left z-[9999] pointer-events-none shadow-[0_0_10px_rgba(0,196,180,0.6)]"
      style={{ scaleX }}
    />
  );
}
