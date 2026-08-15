import Head from "next/head";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import EventListClient from "@/components/EventListClient";

export const dynamic = "force-dynamic";

export default async function Hackathons() {
  await connectDB();
  const rawEvents = await Event.find({ type: "hackathon" }).sort({ date: -1 }).lean();
  const events = JSON.parse(JSON.stringify(rawEvents));

  return (
    <>
      <Head>
        <title>Hackathons - IEEE CS CU</title>
      </Head>
      <div className="w-full bg-white min-h-screen pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Hackathons
            </h1>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Build, innovate, and compete in our hackathons. Discover the challenges and unleash your creativity.
            </p>
          </div>
          <EventListClient initialEvents={events} />
        </div>
      </div>
    </>
  );
}
