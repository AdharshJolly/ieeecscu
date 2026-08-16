import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    await connectDB();
    const { id } = await params;
    const rawEvent = await Event.findById(id).lean();
    if (rawEvent) {
      return {
        title: rawEvent.title,
        description: rawEvent.description?.substring(0, 150) + "...",
        openGraph: {
          title: rawEvent.title,
          description: rawEvent.description?.substring(0, 150) + "...",
          images: rawEvent.imageUrl ? [rawEvent.imageUrl] : [],
        },
      };
    }
  } catch (error) {}
  
  return { title: "Event Details" };
}

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  // If the id isn't a valid MongoDB ObjectId, Mongoose might throw an error.
  // We'll wrap in a try-catch and return a 404 if it fails.
  let event = null;
  try {
    await connectDB();
    const { id } = await params;
    const rawEvent = await Event.findById(id).lean();
    if (rawEvent) {
      event = JSON.parse(JSON.stringify(rawEvent));
    }
  } catch (error) {
    console.error("Invalid ID or DB Error", error);
  }

  if (!event) {
    notFound();
  }

  const displayDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/hackathons" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-ieee-primary transition-colors">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="relative w-full h-64 sm:h-96">
            <Image 
              src={event.imageUrl || "/assets/ieee_cs.png"} 
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-white bg-ieee-primary rounded-full uppercase">
                {event.type}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-xl mr-4 text-ieee-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Date</p>
                  <p>{displayDate}</p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-xl mr-4 text-ieee-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Location</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="prose prose-lg dark:prose-invert prose-a:text-ieee-primary hover:prose-a:text-ieee-secondary max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 not-prose">About this Event</h3>
              {event.description ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{event.description}</ReactMarkdown>
              ) : (
                <p>No detailed description provided for this event yet.</p>
              )}
            </div>

            {event.link && (
              <div className="mt-12 text-center sm:text-left">
                <a 
                  href={event.link} 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-ieee-primary hover:bg-ieee-secondary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Register / Learn More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
