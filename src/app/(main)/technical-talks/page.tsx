import { Metadata } from "next";
import { getEventsByTypes } from "@/lib/data";
import EventListClient from "@/components/EventListClient";
import { FadeIn } from "@/components/MotionWrapper";

export const metadata: Metadata = {
  title: "Technical Talks | IEEE CS CU",
  description: "Gain frontline engineering insights from global technology leaders, distinguished researchers, and industry pioneers at CHRIST University.",
  alternates: {
    canonical: "/technical-talks",
  },
};

export default async function TechnicalTalks() {
  let events: any[] = [];
  try {
    events = await getEventsByTypes(["technical-talk"]);
  } catch (error) {
    console.error("Failed to load technical talk events:", error);
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#060B12] pt-28 pb-24 transition-colors duration-300">
      
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/80 dark:border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[55%] h-[70%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] animate-blob" />
          <div className="absolute top-[20%] -left-[15%] w-[45%] h-[60%] rounded-full bg-ieee-primary/15 dark:bg-ieee-primary/25 blur-[120px] animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 tracking-wider uppercase">
                Distinguished Speaker Series
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Keynotes &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-400 to-ieee-primary">
                Technical Talks
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300/80 max-w-3xl leading-relaxed mb-10">
              Unpack complex engineering paradigms. Learn how global software architectures scale to hundreds of millions of users, directly from the principal architects who build them.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-4">
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">FAANG+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Principal Guests</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">Live Q&amp;A</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Unfiltered Dialogues</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">Frontier</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Emerging Paradigms</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">Recordings</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Member Archive</div>
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
