import { Metadata } from "next";
import { getEventsByTypes } from "@/lib/data";
import EventListClient from "@/components/EventListClient";
import { FadeIn } from "@/components/MotionWrapper";

export const metadata: Metadata = {
  title: "Conferences | IEEE CS CU",
  description: "Explore our prestigious international and national computing conferences. Join researchers, industry leaders, and students advancing computer science frontiers.",
  alternates: {
    canonical: "/conferences",
  },
};

export default async function Conferences() {
  let events: any[] = [];
  try {
    events = await getEventsByTypes(["conference"]);
  } catch (error) {
    console.error("Failed to load conference events:", error);
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#060B12] pt-28 pb-24 transition-colors duration-300">
      
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/80 dark:border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[70%] rounded-full bg-ieee-primary/15 dark:bg-ieee-primary/25 blur-[120px] animate-blob" />
          <div className="absolute top-[20%] -left-[15%] w-[45%] h-[60%] rounded-full bg-ieee-yellow/10 dark:bg-ieee-yellow/15 blur-[120px] animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ieee-yellow/10 border border-ieee-yellow/30 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ieee-yellow animate-pulse" />
              <span className="text-xs font-bold text-amber-700 dark:text-ieee-yellow tracking-wider uppercase">
                Scholarly Research Track
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              International &amp; Academic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary via-ieee-cyan to-amber-400">
                Conferences
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300/80 max-w-3xl leading-relaxed mb-10">
              Convening eminent scientists, industry pioneers, and student researchers to present breakthroughs in artificial intelligence, distributed systems, and quantum theory.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-4">
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">IEEE Xplore</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Indexed Archives</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">15+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Global Nations</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">Peer-Rev</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Double-Blind Review</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">Scopus</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Publication Rank</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Events Stream Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <EventListClient initialEvents={events} />
      </section>
    </div>
  );
}
