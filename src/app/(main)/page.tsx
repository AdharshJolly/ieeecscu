import { Metadata } from "next";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import EventCard, { EventData } from "@/components/EventCard";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/MotionWrapper";

export const metadata: Metadata = {
  title: "IEEE CS CU Student Branch",
  description: "A student-driven technical community under IEEE Computer Society, focused on innovation, collaboration, and real-world computing experiences at CHRIST University.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  let latestEvents: EventData[] = [];
  try {
    await connectDB();
    const rawLatestEvents = await Event.find({}).sort({ date: -1 }).limit(3).lean();
    latestEvents = JSON.parse(JSON.stringify(rawLatestEvents));
  } catch (error) {
    console.error("Failed to fetch latest events:", error);
  }

  return (
    <>
      <div className="w-full bg-white dark:bg-slate-900 transition-colors duration-300">
        
        {/* PREMIUM HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0a0f1c] pt-24 lg:pt-32 pb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-ieee-primary/10 dark:bg-ieee-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob" />
            <div className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] rounded-full bg-ieee-secondary/10 dark:bg-ieee-secondary/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
            <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-ieee-yellow/10 dark:bg-ieee-yellow/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-4000" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 w-full">
            <FadeIn delay={0.1} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ieee-primary/10 border border-ieee-primary/20 backdrop-blur-md mb-8 shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-ieee-primary animate-pulse"></span>
                <span className="text-sm font-semibold text-ieee-secondary dark:text-ieee-primary tracking-wide uppercase">
                  Welcome to CHRIST University
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                Advance Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-secondary">
                  Tech Journey
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
                A student-driven technical community under IEEE Computer Society, focused on innovation, collaboration, and real-world computing experiences at CHRIST University.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="https://www.ieee.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-ieee-primary rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(0,181,226,0.6)] hover:shadow-[0_0_60px_-15px_rgba(0,181,226,0.8)] hover:-translate-y-1"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center">
                    Become a Member
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="left" className="w-full lg:w-1/2 relative hidden md:block mt-12 lg:mt-0">
              <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                <div className="absolute inset-0 border-[1px] border-ieee-primary/20 dark:border-ieee-primary/30 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-8 border-[1px] border-dashed border-ieee-secondary/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                
                <div className="absolute top-[15%] right-[10%] w-48 h-56 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-white/10 p-5 transform rotate-6 animate-float">
                  <div className="w-10 h-10 rounded-lg bg-ieee-primary/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-ieee-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Hackathons</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Build the next big thing in 48 hours.</p>
                </div>
                
                <div className="absolute bottom-[20%] left-[5%] w-48 h-56 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-white/10 p-5 transform -rotate-6 animate-float animation-delay-2000">
                  <div className="w-10 h-10 rounded-lg bg-ieee-secondary/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-ieee-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Workshops</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Hands-on learning with industry experts.</p>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-tr from-ieee-primary to-ieee-secondary rounded-full shadow-[0_0_80px_rgba(0,181,226,0.5)] flex items-center justify-center">
                  <Image src="/assets/ieee_cs_cu.png" alt="IEEE CS CU Logo" width={100} height={100} className="object-contain drop-shadow-2xl brightness-0 invert" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right" className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                  Empowering the <span className="text-ieee-primary">Next Generation</span> of Engineers
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  The IEEE Computer Society Student Branch Chapter at CHRIST University is a student-driven community dedicated to advancing knowledge in computing and technology. As part of the global IEEE network, the chapter provides a platform for students to collaborate, innovate, and engage with emerging technologies.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Through workshops, technical events, and conferences, members gain practical exposure beyond the classroom. The chapter focuses on fostering innovation, research, and professional development while connecting students with peers, academicians, and industry professionals.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ieee-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-ieee-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">500+ Active Members</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">A growing network of driven students.</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} direction="left" className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-700">
                  <Image src="/assets/adcis.png" alt="Students collaborating" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-8">
                    <div>
                      <span className="text-ieee-yellow font-bold tracking-wider uppercase text-sm mb-2 block">Our Impact</span>
                      <p className="text-white text-xl font-medium">Building a legacy of technical excellence since 2018.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-ieee-secondary/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-ieee-primary/20 rounded-full blur-2xl"></div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CORE PILLARS (WHAT WE DO) */}
        <section className="py-24 bg-slate-50 dark:bg-[#0a0f1c] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                What We Do
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Our core pillars are designed to provide members with holistic growth, networking opportunities, and practical experience.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Pillar 1 */}
              <FadeIn delay={0.1} direction="up">
                <Link href="/hackathons" className="group block bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-2 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-ieee-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                  <div className="w-14 h-14 rounded-xl bg-ieee-primary/10 flex items-center justify-center mb-6 text-ieee-primary relative z-10">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Hackathons</h3>
                  <p className="text-slate-500 dark:text-slate-400 relative z-10">Intense 24-48 hour coding marathons to prototype solutions to real-world problems.</p>
                </Link>
              </FadeIn>

              {/* Pillar 2 */}
              <FadeIn delay={0.2} direction="up">
                <Link href="/conferences" className="group block bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-2 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 relative z-10">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Conferences</h3>
                  <p className="text-slate-500 dark:text-slate-400 relative z-10">Gatherings of students, researchers, and professionals to discuss emerging tech trends.</p>
                </Link>
              </FadeIn>

              {/* Pillar 3 */}
              <FadeIn delay={0.3} direction="up">
                <Link href="/workshops" className="group block bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-2 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-ieee-yellow/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                  <div className="w-14 h-14 rounded-xl bg-ieee-yellow/10 flex items-center justify-center mb-6 text-yellow-600 dark:text-ieee-yellow relative z-10">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Workshops</h3>
                  <p className="text-slate-500 dark:text-slate-400 relative z-10">Interactive, hands-on sessions to learn specific frameworks, languages, or tools.</p>
                </Link>
              </FadeIn>

              {/* Pillar 4 */}
              <FadeIn delay={0.4} direction="up">
                <Link href="/technical-talks" className="group block bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-2 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-ieee-secondary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                  <div className="w-14 h-14 rounded-xl bg-ieee-secondary/10 flex items-center justify-center mb-6 text-ieee-secondary relative z-10">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Tech Talks</h3>
                  <p className="text-slate-500 dark:text-slate-400 relative z-10">Insights and experiences shared by industry veterans and cutting-edge researchers.</p>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* LATEST EVENTS SECTION */}
        <section className="py-24 relative bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up" className="flex flex-col sm:flex-row items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Upcoming <span className="text-ieee-primary">Activities</span>
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                  Stay updated with our latest events and flagship programs.
                </p>
              </div>
              <Link href="/hackathons" className="group flex items-center text-sm font-bold text-ieee-primary hover:text-ieee-secondary transition-colors">
                View Event Calendar
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </FadeIn>
            
            {latestEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                {latestEvents.map((event, i) => (
                  <FadeIn key={event._id || event.title} delay={0.1 * (i + 1)} direction="up">
                    <EventCard event={event} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <FadeIn delay={0.2} direction="up" className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No upcoming events</h3>
                <p className="text-slate-500 dark:text-slate-400">Our team is busy planning the next big thing. Check back soon!</p>
              </FadeIn>
            )}
          </div>
        </section>

        {/* JOIN CTA SECTION */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-[#0a0f1c] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-ieee-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-ieee-secondary/20 rounded-full blur-3xl"></div>
          
          <FadeIn direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Become part of a global network of computing professionals. Gain access to exclusive resources, workshops, and career opportunities by joining our student branch today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-ieee-yellow rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-ieee-yellow/20"
              >
                Join IEEE Today
              </a>
              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors backdrop-blur-md"
              >
                Contact Us
              </a>
            </div>
          </FadeIn>
        </section>

      </div>
    </>
  );
}
