import { Metadata } from "next";
import { getEventsByTypes } from "@/lib/data";
import EventListClient from "@/components/EventListClient";
import { FadeIn } from "@/components/MotionWrapper";

export const metadata: Metadata = {
  title: "Hackathons | IEEE CS CU",
  description: "Build, innovate, and compete. Join our 24-hour and 48-hour coding marathons to solve real-world problems and win exciting prizes at CHRIST University.",
  alternates: {
    canonical: "/hackathons",
  },
};

export default async function Hackathons() {
  let events: any[] = [];
  try {
    events = await getEventsByTypes(["hackathon"]);
  } catch (error) {
    console.error("Failed to load hackathon events:", error);
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#060B12] pt-28 pb-24 transition-colors duration-300">
      
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/80 dark:border-white/10">
        {/* Ambient IEEE Atmospheric Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[55%] h-[70%] rounded-full bg-ieee-primary/15 dark:bg-ieee-primary/25 blur-[120px] animate-blob" />
          <div className="absolute top-[20%] -right-[15%] w-[45%] h-[60%] rounded-full bg-ieee-cyan/15 dark:bg-ieee-cyan/25 blur-[120px] animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ieee-primary/10 border border-ieee-primary/25 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ieee-cyan animate-pulse" />
              <span className="text-xs font-bold text-ieee-primary dark:text-ieee-cyan tracking-wider uppercase">
                Competitive Sprint Track
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Hackathons &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">
                Code Marathons
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300/80 max-w-3xl leading-relaxed mb-10">
              Transform bold ideas into production-ready software in 36 to 48 hours. Collaborate with visionary peers, master state-of-the-art tech stacks, and pitch to leading tech founders.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-4">
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">500+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Active Hackers</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">36-48h</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Sprint Format</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">&#8377;1.5L+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Cash &amp; Grants</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#0B152B]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-ieee-primary dark:text-ieee-cyan">100%</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Hands-on Code</div>
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
