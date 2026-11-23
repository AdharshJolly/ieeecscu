"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface KineticTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

function Word({
  children,
  range,
  progress,
  isHighlight,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  isHighlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <span className="relative inline-block mr-[0.25em] last:mr-0">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block transition-colors duration-200 ${
          isHighlight
            ? "text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan font-bold"
            : "text-slate-900 dark:text-white"
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function KineticText({ text, className = "", highlightWords = [] }: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");
  const cleanHighlights = highlightWords.map((w) => w.toLowerCase());

  return (
    <div ref={containerRef} className={`relative leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isHighlight = cleanHighlights.includes(cleanWord);

        return (
          <Word
            key={i}
            range={[start, end]}
            progress={scrollYProgress}
            isHighlight={isHighlight}
          >
            {word}
          </Word>
        );
      })}
    </div>
  );
}
