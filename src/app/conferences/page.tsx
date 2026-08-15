import Head from "next/head";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import EventListClient from "@/components/EventListClient";

export const dynamic = "force-dynamic";

export default async function Conferences() {
  await connectDB();
  const rawEvents = await Event.find({ type: "conference" }).sort({ date: -1 }).lean();
  const events = JSON.parse(JSON.stringify(rawEvents));

  return (
    <>
      <Head>
        <title>Conferences - IEEE CS CU</title>
      </Head>
      <div className="w-full bg-white min-h-screen pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Conferences
            </h1>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Explore our upcoming and past conferences. Join industry leaders, researchers, and students to discuss the latest in technology.
            </p>
          </div>
          <EventListClient initialEvents={events} />
        </div>
      </div>
    </>
  );
}
