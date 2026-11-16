"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
  link: string;
  badge: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "ee2025",
    title: "Explore and Evolve 2025",
    category: "Flagship Hackathon",
    year: "2025",
    description: "The premiere 36-hour multi-track hackathon bringing together over 400 developers to innovate on real-world problems.",
    imageUrl: "/assets/explore-and-evolve.png",
    link: "/hackathons",
    badge: "Flagship",
  },
  {
    id: "adcis2025",
    title: "ADCIS 2025",
    category: "International Conference",
    year: "2025",
    description: "International Conference on Advances in Data Science & Intelligent Systems in association with global computing research leaders.",
    imageUrl: "/assets/adcis.png",
    link: "/conferences",
    badge: "International",
  },
  {
    id: "aiagent",
    title: "Autonomous Agent Workshop",
    category: "Hands-on Workshop",
    year: "2025",
    description: "Deep-dive practical session architecting LLM tool-calling agents and production-ready vector retrieval pipelines.",
    imageUrl: "/assets/ai-agent.png",
    link: "/workshops",
    badge: "Technical",
  },
  {
    id: "ieeeday",
    title: "IEEE Day Global Celebration",
    category: "Community & Keynotes",
    year: "2025",
    description: "Celebrating historical technological milestones with keynote talks, networking mixers, and project exhibitions.",
    imageUrl: "/assets/IEEE-CS-BangaloreChapter-Logo-1.png",
    link: "/technical-talks",
    badge: "Milestone",
  },
];

export default function HorizontalShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical scroll to horizontal percentage
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

  return (
    <>
      {/* Desktop Sticky Horizontal Scroll Experience */}
      <section ref={targetRef} className="relative h-[220vh] hidden lg:block">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-slate-100/60 dark:bg-[#060B12] transition-colors border-y border-slate-200/80 dark:border-white/10">
          
          {/* Section Header */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan mb-2">
                  <span className="w-2 h-2 rounded-full bg-ieee-cyan animate-pulse" />
                  Marquee Milestones
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">Showcase</span>
                </h2>
              </div>
              <p className="text-sm font-bold text-ieee-primary dark:text-ieee-cyan flex items-center gap-2">
                <span>Scroll vertically to advance showcase</span>
                <span className="animate-bounce">&rarr;</span>
              </p>
            </div>
          </div>

          {/* Horizontal Track */}
          <div className="w-full overflow-hidden pl-6 lg:pl-12">
            <motion.div style={{ x }} className="flex gap-8 w-max pr-12">
              {SHOWCASE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="w-[460px] h-[490px] rounded-3xl overflow-hidden bg-white dark:bg-[#0D1826] border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col group hover:border-ieee-cyan/60 transition-all duration-300 shrink-0"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-[#060B12]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="460px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white shadow-md">
                        {item.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-ieee-cyan">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-ieee-cyan transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <Link
                        href={item.link}
                        className="inline-flex items-center text-sm font-bold text-ieee-primary dark:text-ieee-cyan group-hover:translate-x-1 transition-transform"
                      >
                        Explore Details
                        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile/Tablet Horizontal Scroll Carousel */}
      <section className="lg:hidden py-16 bg-slate-100/60 dark:bg-[#050914] border-y border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan mb-2">
            <span className="w-2 h-2 rounded-full bg-ieee-cyan animate-pulse" />
            Marquee Milestones
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">Showcase</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Swipe sideways to view key events &rarr;
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto px-4 sm:px-6 pb-6 no-scrollbar snap-x snap-mandatory">
          {SHOWCASE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="w-[320px] sm:w-[380px] rounded-3xl overflow-hidden bg-white dark:bg-[#0C162E] border border-slate-200/80 dark:border-white/10 shadow-lg flex flex-col shrink-0 snap-center"
            >
              <div className="relative h-48 w-full bg-slate-100 dark:bg-[#080E1E]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-ieee-primary text-white shadow-md">
                    {item.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-ieee-cyan">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                    {item.year}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-xs font-bold text-ieee-primary dark:text-ieee-cyan"
                  >
                    Explore &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
