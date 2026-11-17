import { Metadata } from "next";
import { getLatestEvents } from "@/lib/data";
import EventCard, { EventData } from "@/components/EventCard";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/MotionWrapper";
import KineticText from "@/components/KineticText";
import StackedCards from "@/components/StackedCards";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import Hero from "@/components/Hero";

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
        
        {/* HIGH-IMPACT HERO SECTION */}
        <Hero />

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

        {/* CORE PILLARS SECTION (PINNED SCROLL STACKED CARDS DECK) */}
        <StackedCards />

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
