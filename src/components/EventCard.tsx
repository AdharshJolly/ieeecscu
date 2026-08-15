"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface EventData {
  _id?: string;
  title: string;
  type: string;
  date: string | Date;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export default function EventCard({ event }: { event: EventData }) {
  let isPast = false;
  let isUpcoming = false;

  const eventDate = new Date(event.date);
  const now = new Date();

  if (!isNaN(eventDate.getTime())) {
    const isToday = eventDate.toDateString() === now.toDateString();
    if (!isToday) {
      isPast = eventDate < now;
      isUpcoming = eventDate > now;
    }
  } else if (typeof event.date === 'string') {
    const currentYear = now.getFullYear();
    isPast = event.date.includes((currentYear - 1).toString());
    isUpcoming = event.date.includes((currentYear + 1).toString()) || event.date.includes(currentYear.toString());
  }

  const statusBadge = isPast ? (
    <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Past</span>
  ) : isUpcoming ? (
    <span className="bg-ieee-primary/10 text-ieee-secondary text-xs px-3 py-1.5 rounded-full font-bold shadow-sm backdrop-blur-md">Upcoming</span>
  ) : (
    <span className="bg-ieee-yellow/20 text-yellow-800 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm animate-pulse backdrop-blur-md">Live</span>
  );

  const displayDate = typeof event.date === 'string' ? event.date : new Date(event.date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  // Use dynamic route if _id exists, else fallback to provided link or #
  const targetLink = event._id ? `/events/${event._id}` : (event.link || "#");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={targetLink} className="block h-full bg-white dark:bg-gray-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-ieee-primary/10 transition-shadow duration-300 border border-gray-100 dark:border-gray-700/50 flex flex-col group">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute top-3 right-3 z-10">{statusBadge}</div>
          <Image 
            src={event.imageUrl || "/assets/ieee_cs.png"} 
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-xs font-semibold tracking-wide text-ieee-primary uppercase mb-3">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {displayDate}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-ieee-secondary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
            {event.description || "Join us for this exciting event organized by IEEE CS Student Branch."}
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
             <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
               {event.type}
             </span>
             <span className="text-sm font-medium text-ieee-primary flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
               View Details
               <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
