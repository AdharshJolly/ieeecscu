"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

interface PillarItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tag: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  badgeBg: string;
  gradient: string;
  icon: React.ReactNode;
}

const PILLARS: PillarItem[] = [
  {
    id: "hackathons",
    number: "01",
    title: "Hackathons",
    subtitle: "24-48 Hour Coding Sprints",
    description:
      "Rapidly engineer solutions to real-world problems. Collaborate with multidisciplinary peers, master emerging developer stacks under high stakes, and compete for institutional grants and industry-backed awards.",
    href: "/hackathons",
    tag: "Competitive Innovation",
    metrics: [
      { label: "Flagship Event", value: "Explore & Evolve" },
      { label: "Prize Grants", value: "₹1.5L+" },
      { label: "Active Innovators", value: "400+" },
    ],
    accentColor: "#00C4B4",
    badgeBg: "bg-[#00857C]/15 border-[#00C4B4]/30 text-[#00857C] dark:text-[#00C4B4]",
    gradient: "from-[#00857C]/15 to-transparent",
    icon: (
      <svg className="w-7 h-7 text-[#00857C] dark:text-[#00C4B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "conferences",
    number: "02",
    title: "Conferences",
    subtitle: "Scholarly Research & Global Publications",
    description:
      "Gathering international researchers, industry pioneers, and student scholars to present peer-reviewed papers on computing paradigms, intelligence systems, cloud architectures, and ethical engineering.",
    href: "/conferences",
    tag: "Global Research",
    metrics: [
      { label: "Annual Flagship", value: "ADCIS 2025" },
      { label: "Indexing", value: "IEEE Xplore & Scopus" },
      { label: "Global Reach", value: "15+ Nations" },
    ],
    accentColor: "#FFB800",
    badgeBg: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-[#FFB800]",
    gradient: "from-amber-500/15 to-transparent",
    icon: (
      <svg className="w-7 h-7 text-amber-500 dark:text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "workshops",
    number: "03",
    title: "Workshops",
    subtitle: "Hands-on Technical Mastery & Labs",
    description:
      "Interactive, practitioner-led build sessions covering cloud infrastructure, container orchestration, ML pipelines, and real-world tools that bridge the gap between classroom theory and industry production.",
    href: "/workshops",
    tag: "Practical Engineering",
    metrics: [
      { label: "Format", value: "Hands-on Coding" },
      { label: "Mentors", value: "Industry Architects" },
      { label: "Curriculum", value: "Zero to Deploy" },
    ],
    accentColor: "#10B981",
    badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500/15 to-transparent",
    icon: (
      <svg className="w-7 h-7 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "talks",
    number: "04",
    title: "Technical Talks",
    subtitle: "Distinguished Lectures & Live AMAs",
    description:
      "Direct dialogue with software engineering directors, research scientists, and technology pioneers sharing unfiltered insights into career roadmaps, enterprise architectural tradeoffs, and future computing horizons.",
    href: "/technical-talks",
    tag: "Leadership & Dialogue",
    metrics: [
      { label: "Series", value: "Executive AMAs" },
      { label: "Speakers", value: "Global Leads" },
      { label: "Access", value: "Open to Students" },
    ],
    accentColor: "#06B6D4",
    badgeBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-500/15 to-transparent",
    icon: (
      <svg className="w-7 h-7 text-cyan-500 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
];

interface DeckCardProps {
  index: number;
  pillar: PillarItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function DeckCardItem({
  index,
  pillar,
  progress,
  range,
  targetScale,
}: DeckCardProps) {
  // Smoothly scale down preceding cards as subsequent cards stack over them
  const scale = useTransform(progress, range, [1, targetScale]);

  // Tab offset relative to center: cards rest slightly stepped so upper headers remain visible
  const cardTopOffset = -35 + index * 38;

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <motion.div
        style={{
          scale,
          top: `${cardTopOffset}px`,
          zIndex: 10 + index * 10,
        }}
        className="pointer-events-auto relative w-full max-w-5xl rounded-[32px] sm:rounded-[36px] p-6 sm:p-9 md:p-10 bg-[#FFFFFF] dark:bg-[#0A1322] border-2 border-slate-200 dark:border-[#00C4B4]/25 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-25px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-colors duration-300"
      >
        {/* Subtle Ambient Brand Gradient in Corner */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${pillar.gradient} rounded-full blur-3xl pointer-events-none opacity-40`}
        />

        {/* Decorative Pillar Number Watermark in Background */}
        <div className="absolute top-2 right-6 text-7xl sm:text-8xl md:text-9xl font-black text-slate-900/[0.04] dark:text-white/[0.03] select-none pointer-events-none font-mono">
          {pillar.number}
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-6">
          {/*
            Card Top Header Tab:
            This 44px top tab is what stays visible when subsequent cards stack over it.
          */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                PILLAR {pillar.number} / 04
              </span>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${pillar.badgeBg}`}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: pillar.accentColor }} />
                {pillar.tag}
              </div>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner">
              {pillar.icon}
            </div>
          </div>

          {/* Card Core Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-base font-bold" style={{ color: pillar.accentColor }}>
                {pillar.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {pillar.description}
              </p>
            </div>

            {/* Metrics & CTA Column */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                {pillar.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{metric.label}:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">{metric.value}</span>
                  </div>
                ))}
              </div>

              <Link
                href={pillar.href}
                className="group relative inline-flex items-center justify-center px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 shadow-md hover:-translate-y-0.5 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, #00857C 0%, ${pillar.accentColor} 100%)`,
                }}
              >
                <span className="relative flex items-center gap-2">
                  Explore {pillar.title} Track
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track overall scroll progress through the entire 4-card sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative w-full bg-slate-50 dark:bg-[#060B12] transition-colors border-t border-slate-200/80 dark:border-white/10">
      {/* Section Header at Top */}
      <div className="pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ieee-cyan/10 border border-ieee-cyan/20 text-xs font-bold uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan mb-3">
          <span className="w-2 h-2 rounded-full bg-[#00857C] dark:bg-[#00C4B4] animate-pulse" />
          What We Do
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Four Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">Excellence</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Scroll down to browse through our four core chapter initiatives. Each pillar stacks progressively in the center of your screen.
        </p>
      </div>

      {/*
        The 4-Card Stacked Deck Container:
        Each card is an individual h-screen sticky item.
        This guarantees:
        1. Every card is 100% vertically and horizontally centered in the screen!
        2. Card 04 stays firmly locked and stacked with the other 3 cards!
        3. Generous trailing buffer (pb-[40vh]) so the stack never scrolls away prematurely!
      */}
      <div ref={containerRef} className="relative w-full pb-[40vh]">
        {PILLARS.map((pillar, index) => {
          // As subsequent cards enter, preceding cards scale down subtly
          const targetScale = 1 - (PILLARS.length - index - 1) * 0.04;
          const rangeStart = index * 0.22;

          return (
            <DeckCardItem
              key={pillar.id}
              index={index}
              pillar={pillar}
              progress={scrollYProgress}
              range={[rangeStart, 1.0]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
