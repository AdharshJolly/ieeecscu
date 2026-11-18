"use client";

import React, { useRef, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth responsive horizontal translation:
  // On mobile (narrow screen), track translates further to reveal all 4 cards
  // On desktop, translates to -54%
  const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const xDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-52%"]);
  const x = isMobile ? xMobile : xDesktop;

  return (
    <section
      ref={targetRef}
      className="relative h-[250vh] w-full bg-slate-100/60 dark:bg-[#060B12] transition-colors border-y border-slate-200/80 dark:border-white/10"
    >
      {/* Pinned Sticky Viewport (Works on BOTH Mobile and Desktop!) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan mb-1 sm:mb-2">
                <span className="w-2 h-2 rounded-full bg-ieee-cyan animate-pulse" />
                Marquee Milestones
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">Showcase</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold text-ieee-primary dark:text-ieee-cyan flex items-center gap-2">
              <span>Scroll down to advance showcase</span>
              <span className="animate-bounce">&rarr;</span>
            </p>
          </div>
        </div>

        {/* Pinned Horizontal Scrolling Track */}
        <div className="w-full overflow-hidden pl-4 sm:pl-6 lg:pl-12">
          <motion.div
            style={{ x }}
            className="flex gap-4 sm:gap-6 lg:gap-8 w-max pr-6 sm:pr-12"
          >
            {SHOWCASE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="w-[280px] sm:w-[360px] lg:w-[440px] h-[390px] sm:h-[450px] lg:h-[480px] rounded-3xl overflow-hidden bg-white dark:bg-[#0D1826] border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col group hover:border-ieee-cyan/60 transition-all duration-300 shrink-0"
              >
                {/* Image & Badges */}
                <div className="relative h-44 sm:h-56 lg:h-64 w-full overflow-hidden bg-slate-100 dark:bg-[#060B12]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white shadow-md">
                      {item.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between items-end text-white">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ieee-cyan truncate max-w-[200px]">
                      {item.category}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-ieee-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={item.link}
                      className="inline-flex items-center text-xs sm:text-sm font-bold text-ieee-primary dark:text-ieee-cyan group-hover:translate-x-1 transition-transform"
                    >
                      Explore Details
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
}
