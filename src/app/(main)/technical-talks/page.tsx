import Head from "next/head";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import EventListClient from "@/components/EventListClient";

export const dynamic = "force-dynamic";

export default async function TechnicalTalks() {
  await connectDB();
  const rawEvents = await Event.find({ type: { $in: ["talk", "technical_talk", "webinar"] } }).sort({ date: -1 }).lean();
  const events = JSON.parse(JSON.stringify(rawEvents));

  return (
    <>
      <Head>
        <title>Technical Talks - IEEE CS CU</title>
      </Head>
      <div className="w-full bg-slate-50 dark:bg-[#0a0f1c] min-h-screen pt-32 pb-24 transition-colors duration-300">
        {/* MINIMALIST SUBPAGE HERO */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-8 pb-10 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center text-sm font-semibold text-ieee-primary uppercase tracking-wider mb-4">
            <span className="w-2 h-2 mr-3 bg-ieee-primary rounded-full"></span>
            Events
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Technical Talks
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            Join insightful sessions featuring industry veterans and cutting-edge researchers sharing their knowledge and experiences.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventListClient initialEvents={events} />
        </div>
      </div>
    </>
  );
}
