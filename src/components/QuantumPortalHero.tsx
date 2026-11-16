"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

/**
 * Reusable Hero Content Component.
 * Rendered twice:
 * 1. Once on the Base Surface (isReveal=false): black text in light mode, clickable buttons.
 * 2. Once inside the Moving Reveal Lens (isReveal=true): luminous white text, dark neon badges.
 * Both share identical layout, spacing, and responsive typography so they align with 100% pixel perfection!
 */
function HeroContent({ isReveal = false }: { isReveal?: boolean }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
      {/* Left Hero Typography */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-12 sm:pt-16 lg:pt-0">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border backdrop-blur-md mb-6 sm:mb-8 shadow-sm transition-colors ${
            isReveal
              ? "bg-[#00857C]/30 border-[#00C4B4] text-[#00C4B4] shadow-[0_0_15px_rgba(0,196,180,0.35)]"
              : "bg-white dark:bg-[#00857C]/20 border-slate-300 dark:border-[#00C4B4]/30 text-[#00857C] dark:text-[#00C4B4]"
          }`}
        >
          <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#00857C] dark:bg-[#00C4B4] animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase">
            CHRIST (Deemed to be University) • Bangalore
          </span>
        </div>

        <h1
          className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-4 sm:mb-6 ${
            isReveal
              ? "text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]"
              : "text-slate-900 dark:text-white"
          }`}
        >
          Advance Your <br />
          <span
            className={
              isReveal
                ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00C4B4] via-[#22E1D2] to-[#FFB800] drop-shadow-[0_0_30px_rgba(0,196,180,0.7)]"
                : "text-transparent bg-clip-text bg-gradient-to-r from-[#00857C] via-[#00C4B4] to-[#FFB800]"
            }
          >
            Tech Journey
          </span>
        </h1>

        <p
          className={`text-sm sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl leading-relaxed ${
            isReveal ? "text-slate-100 font-medium drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]" : "text-slate-600 dark:text-slate-300/85"
          }`}
        >
          A student-driven technical community under IEEE Computer Society, focused on cutting-edge innovation, peer mentorship, and real-world engineering mastery.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="https://www.ieee.org/"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#00857C] to-[#00C4B4] rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(0,196,180,0.45)] hover:shadow-[0_0_55px_rgba(0,196,180,0.7)] hover:-translate-y-1"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-15"></span>
            <span className="relative flex items-center">
              Become a Member
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          <Link
            href="/hackathons"
            className={`inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-sm backdrop-blur-md ${
              isReveal
                ? "text-white bg-[#0D1826]/90 border border-[#00C4B4]/40 hover:bg-[#122338]"
                : "text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0D1826]/80 hover:bg-slate-100 dark:hover:bg-[#122338] border border-slate-300 dark:border-white/10"
            }`}
          >
            Explore Calendar
          </Link>
        </div>
      </div>

      {/* Right Visual Orbit with Floating Badges (Desktop/Tablet) */}
      <div className="w-full lg:w-1/2 relative hidden md:block">
        <div className="relative w-full aspect-square max-w-[560px] mx-auto">
          <div
            className={`absolute inset-0 rounded-full animate-[spin_40s_linear_infinite] border ${
              isReveal ? "border-[#00C4B4]/40" : "border-slate-300 dark:border-[#00C4B4]/20"
            }`}
          />
          <div className="absolute inset-10 border border-dashed border-amber-500/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

          {/* Floating Card 1: Hackathons */}
          <div
            className={`absolute top-[12%] right-[8%] w-52 backdrop-blur-xl rounded-3xl shadow-2xl p-5 transform rotate-6 animate-float ${
              isReveal
                ? "bg-[#0D1826]/95 border border-[#00C4B4]/40 text-white shadow-[0_0_25px_rgba(0,196,180,0.25)]"
                : "bg-white dark:bg-[#0D1826]/90 border border-slate-200 dark:border-white/10"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#00857C]/25 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-[#00C4B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className={`font-extrabold text-base ${isReveal ? "text-white" : "text-slate-900 dark:text-white"}`}>Hackathons</h3>
            <p className={`text-xs mt-1 ${isReveal ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>48-hour sprints solving industry challenges.</p>
          </div>

          {/* Floating Card 2: Workshops */}
          <div
            className={`absolute bottom-[16%] left-[6%] w-52 backdrop-blur-xl rounded-3xl shadow-2xl p-5 transform -rotate-6 animate-float animation-delay-2000 ${
              isReveal
                ? "bg-[#0D1826]/95 border border-[#FFB800]/40 text-white shadow-[0_0_25px_rgba(255,184,0,0.25)]"
                : "bg-white dark:bg-[#0D1826]/90 border border-slate-200 dark:border-white/10"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500/25 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className={`font-extrabold text-base ${isReveal ? "text-white" : "text-slate-900 dark:text-white"}`}>Masterclasses</h3>
            <p className={`text-xs mt-1 ${isReveal ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>Hands-on architectures with industry leads.</p>
          </div>

          {/* Central Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-gradient-to-tr from-[#00857C] to-[#00C4B4] rounded-full shadow-[0_0_90px_rgba(0,196,180,0.6)] flex items-center justify-center p-8">
            <Image
              src="/assets/ieee_cs_cu.png"
              alt="IEEE CS CU Logo"
              width={110}
              height={110}
              className="object-contain drop-shadow-2xl brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuantumPortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1440, height: 900 });

  // Mouse & Touch tracking with smooth spring physics
  const mouseX = useMotionValue(720);
  const mouseY = useMotionValue(450);

  const springConfig = { stiffness: 350, damping: 28 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowDimensions({ width: w, height: h });
      mouseX.set(w * 0.5);
      mouseY.set(h * 0.45);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    mouseX.set(e.touches[0].clientX - rect.left);
    mouseY.set(e.touches[0].clientY - rect.top);
  };

  // Pinned Scroll Controller with 380vh for high resistance & deliberate pacing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // =========================================================================
  // STRICTLY ISOLATED SCROLL PHASES (No Overlapping Text / No Jumble)
  // =========================================================================

  // Phase 1: Surface Hero (0% -> 22%): Fully visible then cleanly dissolves
  const surfaceOpacity = useTransform(scrollYProgress, [0.08, 0.22], [1, 0]);
  const surfaceY = useTransform(scrollYProgress, [0.08, 0.22], [0, -80]);
  const surfacePointerEvents = useTransform(scrollYProgress, (v) => (v > 0.22 ? "none" : "auto"));
  const surfaceVisibility = useTransform(scrollYProgress, (v) => (v > 0.25 ? "hidden" : "visible"));

  // Phase 2: Quantum Lens Centering & Expansion (20% -> 55%)
  const textRingOpacity = useTransform(scrollYProgress, [0.05, 0.18], [1, 0]);
  const lensCenterProgress = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  // Lens radius expands smoothly from 120px on mobile / 140px on desktop to 2500px (takeover)
  const baseRadius = windowDimensions.width < 640 ? 110 : 140;
  const lensRadius = useTransform(scrollYProgress, [0.25, 0.55], [baseRadius, 2500]);

  // Interpolated Lens Center (from mouse cursor position to viewport center as user scrolls)
  const lensX = useTransform([smoothMouseX, lensCenterProgress], ([mX, progress]: any) => {
    const centerX = windowDimensions.width / 2;
    return mX * (1 - progress) + centerX * progress;
  });

  const lensY = useTransform([smoothMouseY, lensCenterProgress], ([mY, progress]: any) => {
    const centerY = windowDimensions.height / 2;
    return mY * (1 - progress) + centerY * progress;
  });

  // Dynamic CSS Clip-Path string updated at 60fps
  const revealClipPath = useMotionTemplate`circle(${lensRadius}px at ${lensX}px ${lensY}px)`;

  // Phase 3: Bento Command Console (Solid resistance from 58% -> 92%)
  const bentoOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.88, 0.96], [0, 1, 1, 0]);
  const bentoScale = useTransform(scrollYProgress, [0.55, 0.65, 0.88, 0.96], [0.92, 1, 1, 0.95]);
  const bentoY = useTransform(scrollYProgress, [0.55, 0.65, 0.88, 0.96], [40, 0, 0, -30]);
  const bentoPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.6 && v <= 0.9 ? "auto" : "none"));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      className="relative h-[380vh] w-full bg-[#F2F7F6] dark:bg-[#060B12] transition-colors duration-300 select-none overflow-x-clip"
    >
      {/* Sticky Fullscreen Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* =======================================================================
            LAYER 1: THE SURFACE BASE LAYER (Light / Dark Adaptive)
            Contains the standard page background and ambient dot grid.
            ======================================================================= */}
        <div className="absolute inset-0 bg-[#F2F7F6] dark:bg-[#060B12] transition-colors duration-300">
          {/* Subtle Ambient Dot Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,133,124,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(0,196,180,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
          
          {/* Ambient Glow Blobs */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-ieee-primary/10 dark:bg-ieee-primary/20 blur-[130px] pointer-events-none" />
          <div className="absolute top-[20%] -right-[10%] w-[45%] h-[55%] rounded-full bg-ieee-cyan/10 dark:bg-ieee-cyan/20 blur-[130px] pointer-events-none" />
        </div>

        {/* =======================================================================
            LAYER 2: BASE SURFACE TYPOGRAPHY & INTERACTIVE CONTROLS (z-10)
            In light mode: text is black (text-slate-900). Fully interactive.
            ======================================================================= */}
        <motion.div
          style={{
            opacity: surfaceOpacity,
            y: surfaceY,
            pointerEvents: surfacePointerEvents as any,
            visibility: surfaceVisibility as any,
          }}
          className="relative z-10 w-full flex items-center justify-center"
        >
          <HeroContent isReveal={false} />
        </motion.div>

        {/* =======================================================================
            LAYER 3: THE REVEAL LENS CONTAINER (z-25, CLIPPED INSIDE CURSOR/TOUCH CIRCLE)
            Sits directly above the surface layer with pointer-events-none.
            Contains:
            1) The Quantum Silicon Circuit Schematic background (#03070E)
            2) Identical HeroContent clone styled with luminous white text (text-white)
            ======================================================================= */}
        <motion.div
          style={{
            clipPath: isClient ? revealClipPath : undefined,
            WebkitClipPath: isClient ? revealClipPath : undefined,
          }}
          className="absolute inset-0 z-25 pointer-events-none bg-[#03070E] dark:bg-[#02050A] overflow-hidden flex items-center justify-center shadow-2xl"
        >
          {/* Quantum Matrix Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#00C4B4_1.8px,transparent_1.8px)] [background-size:24px_24px] opacity-30" />

          {/* High-Tech Circuit Schematics & Waveguides */}
          <div className="absolute w-[850px] h-[850px] rounded-full border-2 border-[#00C4B4]/40 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[620px] h-[620px] rounded-full border border-dashed border-[#FFB800]/50 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-[420px] h-[420px] rounded-full border-2 border-[#00C4B4]/60 animate-[spin_25s_linear_infinite]" />

          {/* Detailed Quantum Silicon Die SVG with Glowing Buses */}
          <svg className="absolute w-full h-full max-w-[1250px] max-h-[850px] opacity-95" viewBox="0 0 1000 700" fill="none">
            {/* Bus Traces */}
            <path d="M50 350 H380 V180 H480" stroke="#00C4B4" strokeWidth="2.5" strokeDasharray="8 6" />
            <path d="M950 350 H620 V520 H520" stroke="#00C4B4" strokeWidth="2.5" strokeDasharray="8 6" />
            <path d="M500 60 V260" stroke="#FFB800" strokeWidth="3" />
            <path d="M500 640 V440" stroke="#FFB800" strokeWidth="3" />

            {/* Diagonal Interconnects */}
            <line x1="200" y1="180" x2="380" y2="180" stroke="#00C4B4" strokeWidth="2" />
            <line x1="800" y1="520" x2="620" y2="520" stroke="#FFB800" strokeWidth="2" />

            {/* Central QPU Core Block */}
            <rect x="410" y="260" width="180" height="180" rx="24" fill="#071322" stroke="#00C4B4" strokeWidth="3.5" />
            <rect x="435" y="285" width="130" height="130" rx="16" fill="#030810" stroke="#FFB800" strokeWidth="2.5" />
            <circle cx="500" cy="350" r="38" fill="url(#coreGlowPulse)" />

            <text x="500" y="345" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
              IEEE QPU
            </text>
            <text x="500" y="362" textAnchor="middle" fill="#00C4B4" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ACCELERATOR
            </text>

            {/* Wirebonds */}
            <line x1="410" y1="290" x2="330" y2="280" stroke="#FFB800" strokeWidth="2.5" />
            <line x1="410" y1="350" x2="310" y2="350" stroke="#00C4B4" strokeWidth="2.5" />
            <line x1="410" y1="410" x2="330" y2="420" stroke="#FFB800" strokeWidth="2.5" />
            <line x1="590" y1="290" x2="670" y2="280" stroke="#FFB800" strokeWidth="2.5" />
            <line x1="590" y1="350" x2="690" y2="350" stroke="#00C4B4" strokeWidth="2.5" />
            <line x1="590" y1="410" x2="670" y2="420" stroke="#FFB800" strokeWidth="2.5" />

            {/* Neural Matrix & Processing Units */}
            <rect x="210" y="230" width="120" height="80" rx="10" fill="#0A1C33" stroke="#00C4B4" strokeWidth="2" />
            <text x="270" y="275" textAnchor="middle" fill="#00C4B4" fontSize="11" fontWeight="bold" fontFamily="monospace">ALU CORE 01</text>

            <rect x="210" y="390" width="120" height="80" rx="10" fill="#0A1C33" stroke="#00C4B4" strokeWidth="2" />
            <text x="270" y="435" textAnchor="middle" fill="#00C4B4" fontSize="11" fontWeight="bold" fontFamily="monospace">NEURAL MESH</text>

            <rect x="670" y="230" width="120" height="80" rx="10" fill="#0A1C33" stroke="#FFB800" strokeWidth="2" />
            <text x="730" y="275" textAnchor="middle" fill="#FFB800" fontSize="11" fontWeight="bold" fontFamily="monospace">Q-REGISTERS</text>

            <rect x="670" y="390" width="120" height="80" rx="10" fill="#0A1C33" stroke="#00C4B4" strokeWidth="2" />
            <text x="730" y="435" textAnchor="middle" fill="#00C4B4" fontSize="11" fontWeight="bold" fontFamily="monospace">OPTIC BUS</text>

            <defs>
              <radialGradient id="coreGlowPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22E1D2" stopOpacity="1" />
                <stop offset="60%" stopColor="#00857C" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#030810" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Luminous Inverted White Typography Overlay inside the Reveal Lens */}
          <motion.div
            style={{
              opacity: surfaceOpacity,
              y: surfaceY,
              visibility: surfaceVisibility as any,
            }}
            className="relative z-10 w-full flex items-center justify-center pointer-events-none"
          >
            <HeroContent isReveal={true} />
          </motion.div>
        </motion.div>

        {/* =======================================================================
            LAYER 4: THE CURSOR/TOUCH LENS RING & SPINNING CIRCUMFERENCE TEXT (z-30)
            ======================================================================= */}
        {isClient && (
          <motion.div
            style={{
              x: lensX,
              y: lensY,
              opacity: textRingOpacity,
            }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
          >
            {/* The Lens Border Ring */}
            <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border-2 border-[#00857C] dark:border-[#00C4B4] shadow-[0_0_35px_rgba(0,196,180,0.5),inset_0_0_20px_rgba(0,196,180,0.2)] flex items-center justify-center">
              {/* Inner crosshair pip */}
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00857C] dark:bg-[#00C4B4] shadow-[0_0_12px_#00C4B4]" />

              {/* Spinning Text Ring Around the Circumference */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
              >
                <svg className="w-full h-full" viewBox="0 0 280 280">
                  <path
                    id="lensTextCircle"
                    d="M 140, 140 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                    fill="none"
                  />
                  <text className="text-[10px] font-black uppercase tracking-[0.24em] fill-[#00857C] dark:fill-[#00C4B4]">
                    <textPath href="#lensTextCircle" startOffset="0%">
                      • IEEE COMPUTER SOCIETY • CHRIST UNIVERSITY • ADVANCING TECH •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            LAYER 5: BENTO COMMAND CONSOLE (HIGH RESISTANCE: 58% -> 92%)
            Responsive max-height & overflow protection on mobile phones!
            ======================================================================= */}
        <motion.div
          style={{
            opacity: bentoOpacity,
            scale: bentoScale,
            y: bentoY,
            pointerEvents: bentoPointerEvents as any,
          }}
          className="absolute inset-0 z-40 flex items-center justify-center px-3 sm:px-6 lg:px-8"
        >
          <div className="max-w-5xl w-full max-h-[86vh] overflow-y-auto bg-white/95 dark:bg-[#0A1322]/95 backdrop-blur-3xl rounded-[28px] sm:rounded-[36px] border-2 border-slate-200 dark:border-[#00C4B4]/40 p-5 sm:p-8 md:p-12 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between transition-colors duration-300">
            {/* Console Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-8 border-b border-slate-200 dark:border-white/10 gap-3 sm:gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00857C]/15 dark:bg-[#00857C]/25 border border-[#00857C]/30 dark:border-[#00C4B4]/30 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#00857C] dark:text-[#00C4B4] mb-1.5 sm:mb-2 shadow-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00857C] dark:bg-[#00C4B4] animate-ping" />
                  Quantum Telemetry Active
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  IEEE CS CU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00857C] dark:from-[#00C4B4] to-amber-500">Command Console</span>
                </h2>
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-inner">
                SYSTEM CORE UNLOCKED // 2026.1
              </div>
            </div>

            {/* Bento Grid Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 my-4 sm:my-8">
              {/* Node 1: Community Strength */}
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-[#00857C] dark:text-[#00C4B4] uppercase tracking-wider block mb-1">Chapter Telemetry</span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-1.5 sm:mb-2">500+</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Active student engineers, developers, and researchers collaborating across disciplines.
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-[#00857C] dark:text-[#00C4B4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00857C] dark:bg-[#00C4B4]" />
                  Verified Active Members
                </div>
              </div>

              {/* Node 2: Flagship Accelerator */}
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 dark:text-[#FFB800] uppercase tracking-wider block mb-1">Flagship Engine</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1.5 sm:mb-2">Explore &amp; Evolve</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Premiere 36-hour hackathon bringing together over 400 innovators with &#8377;1.5L+ in prize grants.
                  </p>
                </div>
                <Link
                  href="/hackathons"
                  className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-amber-600 dark:text-[#FFB800] hover:underline"
                >
                  <span>Explore Hackathon Track</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              {/* Node 3: International Research */}
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-[#00857C] dark:text-[#00C4B4] uppercase tracking-wider block mb-1">Academic Horizon</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1.5 sm:mb-2">ADCIS 2025</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    International Conference indexed in IEEE Xplore &amp; Scopus connecting scholars across 15+ nations.
                  </p>
                </div>
                <Link
                  href="/conferences"
                  className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#00857C] dark:text-[#00C4B4] hover:underline"
                >
                  <span>Explore Conference Track</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Bottom Status & Scroll Prompt */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 gap-1 sm:gap-0 text-center sm:text-left">
              <span>Scroll down to continue &darr;</span>
              <span className="text-[#00857C] dark:text-[#00C4B4] font-bold">CHRIST (Deemed to be University)</span>
            </div>
          </div>
        </motion.div>

        {/* Subtle Scroll Prompt at Bottom */}
        <motion.div
          style={{ opacity: textRingOpacity }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 sm:gap-1.5 pointer-events-none"
        >
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#00857C] dark:text-[#00C4B4] text-center px-4">
            Scroll down to unfold chapter
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-3.5 h-6 sm:w-4 sm:h-7 rounded-full border-2 border-slate-400 dark:border-white/20 flex justify-center pt-1"
          >
            <div className="w-1 h-1 sm:h-1.5 rounded-full bg-[#00857C] dark:bg-[#00C4B4]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
