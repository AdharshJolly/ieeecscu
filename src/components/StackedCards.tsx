"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tag: string;
  icon: React.ReactNode;
  gradient: string;
}

const PILLARS: PillarItem[] = [
  {
    id: "hackathons",
    title: "Hackathons",
    subtitle: "24-48 Hour Coding Marathons",
    description:
      "Rapidly prototype solutions to real-world problems. Collaborate with cross-disciplinary peers, learn cutting-edge tools under intense time constraints, and compete for industry-sponsored awards.",
    href: "/hackathons",
    tag: "Competitive Innovation",
    gradient: "from-ieee-primary/20 via-teal-500/10 to-transparent",
    icon: (
      <svg className="w-8 h-8 text-ieee-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "conferences",
    title: "Conferences",
    subtitle: "Scholarly Research & Insights",
    description:
      "Gatherings of academic researchers, industry innovators, and student scholars to discuss emerging paradigms in computing, machine intelligence, data systems, and ethical engineering.",
    href: "/conferences",
    tag: "Global Research",
    gradient: "from-amber-500/20 via-ieee-yellow/10 to-transparent",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "workshops",
    title: "Workshops",
    subtitle: "Hands-on Technical Mastery",
    description:
      "Interactive, practitioner-led sessions on web architecture, systems programming, cloud infrastructure, AI models, and real-world tools that bridge the gap between classroom theory and industry practice.",
    href: "/workshops",
    tag: "Practical Engineering",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "talks",
    title: "Technical Talks",
    subtitle: "Industry Keynotes & AMA",
    description:
      "Direct exposure to technology leaders, senior software architects, and researchers sharing insights into modern engineering careers, enterprise engineering culture, and future computing horizons.",
    href: "/technical-talks",
    tag: "Leadership & Dialogue",
    gradient: "from-cyan-500/20 via-ieee-primary/10 to-transparent",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
];

export default function StackedCards() {
  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-8 pb-16">
      {PILLARS.map((pillar, index) => {
        const topOffset = 100 + index * 24; // Cascading sticky top
        return (
          <div
            key={pillar.id}
            style={{ top: `${topOffset}px` }}
            className="sticky transition-all duration-300"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-white dark:bg-[#0D1826] border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl group hover:border-ieee-cyan/40 transition-colors"
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-50 dark:opacity-30 pointer-events-none`}
              />
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-ieee-cyan/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-ieee-cyan animate-pulse" />
                    {pillar.tag}
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm font-semibold text-ieee-primary dark:text-ieee-cyan mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-6 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner">
                    {pillar.icon}
                  </div>

                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-ieee-primary to-ieee-cyan hover:opacity-90 text-white font-extrabold text-sm shadow-lg shadow-ieee-primary/25 hover:-translate-y-0.5 transition-all"
                  >
                    Explore {pillar.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
