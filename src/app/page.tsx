import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import Navigation from "@/components/Navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDB();
  const rawEvents = await Event.find({}).sort({ date: -1 });
  // Serialize for passing to client (or just rendering in server component)
  const events = JSON.parse(JSON.stringify(rawEvents));

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navigation />

      {/* Top Banner / Hero Newsletter */}
      <div className="flex justify-center mt-6">
        <a
          href="https://www.ieee.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 px-4 py-2 rounded-full text-xs text-center text-gray-800 hover:bg-gray-200 transition-colors"
        >
          Sign up today to become an IEEE member
        </a>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming & Past Events</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <a
                key={event._id}
                href={event.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-medium text-gray-800 rounded-full uppercase tracking-wider">
                      {event.type}
                    </span>
                  </div>
                </div>
              </a>
            ))}

            {events.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No events found.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} IEEE Computer Society CHRIST University -
            Bangalore Student Branch Chapter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
