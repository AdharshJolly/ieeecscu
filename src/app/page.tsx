import Head from "next/head";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import EventCard, { EventData } from "@/components/EventCard";
import Link from "next/link";

export default async function Home() {
  let latestEvents: EventData[] = [];
  try {
    await connectDB();
    // Fetch latest 3 events of any type, sorted by date descending
    const rawLatestEvents = await Event.find({}).sort({ date: -1 }).limit(3).lean();
    latestEvents = JSON.parse(JSON.stringify(rawLatestEvents));
  } catch (error) {
    console.error("Failed to fetch latest events:", error);
  }

  return (
    <>
      <Head>
        <title>IEEE CS CU Student Branch</title>
      </Head>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gray-50 border-b border-gray-200 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
              Empowering Students with <span className="text-blue-600">Technology</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-8">
              Welcome to the IEEE Computer Society Student Branch Chapter at Chandigarh University. Join us in building the future of technology through hackathons, conferences, and technical workshops.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-sm"
              >
                Become a Member
              </a>
              <Link
                href="/hackathons"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-sm"
              >
                View Events
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Events Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Latest Events</h2>
              <p className="mt-4 text-lg text-gray-500">
                Check out our most recent and upcoming activities.
              </p>
            </div>
            
            {latestEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestEvents.map((event) => (
                  <EventCard key={event._id || event.title} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No events found. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
