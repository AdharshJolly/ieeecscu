import { Metadata } from "next";
import { getLatestEvents } from "@/lib/data";
import EventCard, { EventData } from "@/components/EventCard";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/MotionWrapper";
import KineticText from "@/components/KineticText";
import StackedCards from "@/components/StackedCards";
import HorizontalShowcase from "@/components/HorizontalShowcase";

export const metadata: Metadata = {
  title: "IEEE CS CU Student Branch Chapter | CHRIST University",
  description: "A student-driven technical community under IEEE Computer Society, focused on innovation, collaboration, and real-world computing experiences at CHRIST University.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  let latestEvents: EventData[] = [];
  try {
    latestEvents = await getLatestEvents(6);
  } catch (error) {
    console.error("Failed to fetch latest events:", error);
  }

  return (
    <>
      <div className="w-full bg-slate-50 dark:bg-[#060B12] transition-colors duration-300">
        
        {/* PREMIUM HERO SECTION */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#060B12] pt-24 lg:pt-32 pb-16">
          {/* Atmospheric IEEE Brand Mesh Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[25%] -left-[10%] w-[55%] h-[65%] rounded-full bg-ieee-primary/15 dark:bg-ieee-primary/25 blur-[130px] animate-blob" />
            <div className="absolute top-[20%] -right-[10%] w-[45%] h-[55%] rounded-full bg-ieee-cyan/15 dark:bg-ieee-cyan/25 blur-[130px] animate-blob animation-delay-2000" />
            <div className="absolute -bottom-[20%] left-[25%] w-[50%] h-[50%] rounded-full bg-ieee-yellow/10 dark:bg-ieee-yellow/15 blur-[120px] animate-blob animation-delay-4000" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 w-full">
            <FadeIn delay={0.1} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ieee-primary/10 dark:bg-ieee-primary/20 border border-ieee-primary/25 backdrop-blur-md mb-8 shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-ieee-cyan animate-pulse"></span>
                <span className="text-xs font-bold text-ieee-primary dark:text-ieee-cyan tracking-wider uppercase">
                  CHRIST (Deemed to be University) • Bangalore
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
                Advance Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary via-ieee-cyan to-sky-400">
                  Tech Journey
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300/80 mb-10 max-w-2xl leading-relaxed">
                A student-driven technical community under IEEE Computer Society, focused on cutting-edge innovation, peer mentorship, and real-world engineering mastery.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="https://www.ieee.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-ieee-primary to-ieee-cyan rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(0,181,226,0.45)] hover:shadow-[0_0_55px_rgba(0,181,226,0.7)] hover:-translate-y-1"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-15"></span>
                  <span className="relative flex items-center">
                    Become a Member
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>

                <Link
                  href="/hackathons"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-[#0B152B]/80 hover:bg-slate-100 dark:hover:bg-[#0F1E3D] border border-slate-200 dark:border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                >
                  Explore Calendar
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="left" className="w-full lg:w-1/2 relative hidden md:block mt-12 lg:mt-0">
              <div className="relative w-full aspect-square max-w-[580px] mx-auto">
                {/* Tech orbit rings */}
                <div className="absolute inset-0 border border-ieee-primary/20 dark:border-ieee-cyan/20 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-10 border border-dashed border-ieee-cyan/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                
                {/* Floating Card 1: Hackathons */}
                <div className="absolute top-[12%] right-[8%] w-52 bg-white/80 dark:bg-[#0C162E]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 p-5 transform rotate-6 animate-float">
                  <div className="w-10 h-10 rounded-2xl bg-ieee-primary/15 dark:bg-ieee-cyan/15 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-ieee-primary dark:text-ieee-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Hackathons</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">48-hour sprints solving industry challenges.</p>
                </div>
                
                {/* Floating Card 2: Workshops */}
                <div className="absolute bottom-[16%] left-[6%] w-52 bg-white/80 dark:bg-[#0C162E]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 p-5 transform -rotate-6 animate-float animation-delay-2000">
                  <div className="w-10 h-10 rounded-2xl bg-ieee-yellow/15 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-amber-500 dark:text-ieee-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Masterclasses</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hands-on architectures with industry leads.</p>
                </div>

                {/* Central Emblazoned Logo Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-gradient-to-tr from-ieee-primary to-ieee-cyan rounded-full shadow-[0_0_90px_rgba(0,181,226,0.6)] flex items-center justify-center p-8">
                  <Image src="/assets/ieee_cs_cu.png" alt="IEEE CS CU Logo" width={110} height={110} className="object-contain drop-shadow-2xl brightness-0 invert" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CHAPTER MISSION & OVERVIEW SECTION (WITH KINETIC WORD-BY-WORD TEXT) */}
        <section className="py-28 bg-white dark:bg-[#08101A] border-t border-slate-200/80 dark:border-white/10 overflow-hidden transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right" className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ieee-primary/10 border border-ieee-primary/20 text-xs font-bold uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan">
                  <span className="w-2 h-2 rounded-full bg-ieee-cyan animate-pulse" />
                  Our Purpose &amp; Mission
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                  Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">Next Generation</span> of Engineers
                </h2>

                {/* Kinetic Word-by-Word Scrubbing Reader */}
                <KineticText
                  text="The IEEE Computer Society Student Branch Chapter at CHRIST University is a student-driven community dedicated to advancing knowledge in computing and technology. As part of the global IEEE network, we provide a launchpad for students to innovate, collaborate, and engineer solutions for real-world impact."
                  highlightWords={["IEEE", "CHRIST", "computing", "technology", "innovate", "collaborate", "impact"]}
                  className="text-xl sm:text-2xl font-medium leading-relaxed"
                />

                <div className="flex items-center gap-5 pt-4 border-t border-slate-100 dark:border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-ieee-primary/15 dark:bg-ieee-cyan/15 border border-ieee-primary/25 flex items-center justify-center text-ieee-primary dark:text-ieee-cyan">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">500+ Active Members</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">A vibrant ecosystem of software and systems engineers.</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} direction="left" className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200/80 dark:border-white/10">
                  <Image src="/assets/adcis.png" alt="Students collaborating at IEEE" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-8">
                    <div>
                      <span className="text-amber-400 dark:text-ieee-yellow font-extrabold tracking-wider uppercase text-xs mb-2 block">Our Impact</span>
                      <p className="text-white text-xl font-bold">Building a legacy of technical excellence since 2018.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-ieee-primary/25 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-ieee-cyan/25 rounded-full blur-3xl -z-10" />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CORE PILLARS SECTION (WITH STACKED CARDS) */}
        <section className="py-28 bg-slate-50 dark:bg-[#060B12] overflow-hidden transition-colors border-t border-slate-200/80 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ieee-cyan/10 border border-ieee-cyan/20 text-xs font-bold uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan mb-4">
                What We Do
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                Four Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">Excellence</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Explore our core activities designed to provide holistic growth, professional networking, and real-world engineering mastery.
              </p>
            </FadeIn>
            
            {/* Stacked Cards Interactive Component */}
            <StackedCards />
          </div>
        </section>

        {/* FLAGSHIP SHOWCASE SECTION (HORIZONTAL SCROLL TRACK) */}
        <HorizontalShowcase />

        {/* LATEST EVENTS SECTION */}
        <section className="py-24 relative bg-white dark:bg-[#08101A] border-t border-slate-200/80 dark:border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up" className="flex flex-col sm:flex-row items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">Activities</span>
                </h2>
                <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                  Stay updated with our latest hackathons, conferences, and technical workshops.
                </p>
              </div>
              <Link href="/hackathons" className="group flex items-center text-sm font-bold text-ieee-primary dark:text-ieee-cyan hover:underline">
                View Complete Calendar
                <svg className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </FadeIn>
            
            {latestEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {latestEvents.map((event, i) => (
                  <FadeIn key={event._id || event.title} delay={0.08 * (i + 1)} direction="up">
                    <EventCard event={event} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 dark:bg-[#0B152B] rounded-3xl border border-slate-200/80 dark:border-white/10 p-8">
                <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg">No events scheduled at this moment. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
