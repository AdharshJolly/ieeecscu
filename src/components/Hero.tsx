"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/MotionWrapper";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-28 pb-20 lg:pt-36 lg:pb-28 bg-[#F2F7F6] dark:bg-[#060B12] transition-colors duration-300 overflow-hidden">
      {/* Subtle Ambient Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,133,124,0.12)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(0,196,180,0.1)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Ambient Glow Blobs */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-ieee-primary/10 dark:bg-ieee-primary/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] -right-[10%] w-[45%] h-[55%] rounded-full bg-ieee-cyan/10 dark:bg-ieee-cyan/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Hero Typography & CTAs */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white dark:bg-[#00857C]/20 border border-slate-300 dark:border-[#00C4B4]/30 text-[#00857C] dark:text-[#00C4B4] backdrop-blur-md mb-6 sm:mb-8 shadow-sm">
                <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#00857C] dark:bg-[#00C4B4] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                  CHRIST (Deemed to be University) • Bangalore
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-4 sm:mb-6 text-slate-900 dark:text-white">
                Advance Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00857C] via-[#00C4B4] to-[#FFB800]">
                  Tech Journey
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300/85 mb-8 sm:mb-10 max-w-2xl leading-relaxed">
                A student-driven technical community under IEEE Computer Society, focused on cutting-edge innovation, peer mentorship, and real-world engineering mastery.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="https://www.ieee.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#00857C] to-[#00C4B4] rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(0,196,180,0.35)] hover:shadow-[0_0_50px_rgba(0,196,180,0.6)] hover:-translate-y-1"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-15" />
                  <span className="relative flex items-center">
                    Become a Member
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>

                <Link
                  href="/hackathons"
                  className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0D1826]/80 hover:bg-slate-100 dark:hover:bg-[#122338] border border-slate-300 dark:border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-sm backdrop-blur-md"
                >
                  Explore Calendar
                </Link>
              </div>
            </FadeIn>

            {/* Micro Highlight Metrics */}
            <FadeIn direction="up" delay={0.4} className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 w-full">
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">500+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Members</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#00857C] dark:text-[#00C4B4]">₹1.5L+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Hackathon Grants</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-500 dark:text-[#FFB800]">Global</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">IEEE Network</div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Visual Orbit with Floating Badges */}
          <div className="w-full lg:w-1/2 relative hidden md:block">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative w-full aspect-square max-w-[520px] mx-auto">
                {/* Orbit Rings */}
                <div className="absolute inset-0 rounded-full animate-[spin_40s_linear_infinite] border border-slate-300 dark:border-[#00C4B4]/20" />
                <div className="absolute inset-10 border border-dashed border-amber-500/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

                {/* Floating Card 1: Hackathons */}
                <div className="absolute top-[10%] right-[6%] w-52 backdrop-blur-xl rounded-3xl shadow-2xl p-5 transform rotate-6 animate-float bg-white dark:bg-[#0D1826]/90 border border-slate-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-2xl bg-[#00857C]/15 dark:bg-[#00857C]/25 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-[#00857C] dark:text-[#00C4B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Hackathons</h3>
                  <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">48-hour sprints solving industry challenges.</p>
                </div>

                {/* Floating Card 2: Masterclasses */}
                <div className="absolute bottom-[14%] left-[4%] w-52 backdrop-blur-xl rounded-3xl shadow-2xl p-5 transform -rotate-6 animate-float animation-delay-2000 bg-white dark:bg-[#0D1826]/90 border border-slate-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-amber-500 dark:text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Masterclasses</h3>
                  <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">Hands-on architectures with industry leads.</p>
                </div>

                {/* Central Glowing Orb with IEEE CS CU Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-gradient-to-tr from-[#00857C] to-[#00C4B4] rounded-full shadow-[0_0_80px_rgba(0,196,180,0.5)] flex items-center justify-center p-8">
                  <Image
                    src="/assets/ieee_cs_cu.png"
                    alt="IEEE CS CU Logo"
                    width={110}
                    height={110}
                    className="object-contain drop-shadow-2xl brightness-0 invert"
                    priority
                  />
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
