"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

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
    <span className="bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3 py-1 rounded-full font-bold shadow-sm backdrop-blur-md border border-slate-300/50 dark:border-white/10">
      Past
    </span>
  ) : isUpcoming ? (
    <span className="bg-ieee-primary text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm shadow-ieee-primary/40 backdrop-blur-md">
      Upcoming
    </span>
  ) : (
    <span className="bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white text-xs px-3 py-1 rounded-full font-bold shadow-md shadow-ieee-cyan/30 animate-pulse">
      Live Now
    </span>
  );

  const displayDate = typeof event.date === 'string' ? event.date : new Date(event.date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const isExternal = Boolean(!event._id && event.link && (event.link.startsWith('http://') || event.link.startsWith('https://')));
  const targetLink = event._id ? `/events/${event._id}` : (event.link || "");

  const CardContent = (
    <div className="h-full bg-white dark:bg-[#0D1826] rounded-2xl overflow-hidden shadow-md dark:shadow-2xl border border-slate-200/80 dark:border-white/10 hover:border-ieee-cyan/50 transition-all duration-300 flex flex-col group">
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-[#060B12]">
        <div className="absolute top-3 right-3 z-10">{statusBadge}</div>
        <Image 
          src={event.imageUrl || "/assets/ieee_cs.png"} 
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-108"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Luminous brand gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs font-bold tracking-wider text-ieee-primary dark:text-ieee-cyan uppercase mb-3">
          <svg className="w-4 h-4 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {displayDate}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-ieee-cyan transition-colors duration-200">
          {event.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300/80 line-clamp-3 mb-6 flex-grow leading-relaxed">
          {event.description || "Join us for this premier technical program organized by IEEE CS Student Branch."}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-ieee-primary dark:text-ieee-cyan bg-ieee-primary/10 dark:bg-ieee-cyan/10 border border-ieee-primary/20 dark:border-ieee-cyan/20 px-3 py-1 rounded-lg uppercase tracking-wider">
            {event.type}
          </span>

          {targetLink && (
            <span className="text-sm font-bold text-ieee-primary dark:text-ieee-cyan flex items-center group-hover:translate-x-1 transition-transform duration-200">
              Explore
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full"
    >
      <SpotlightCard className="h-full">
        {targetLink ? (
          <Link 
            href={targetLink} 
            className="block h-full"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {CardContent}
          </Link>
        ) : (
          <div className="block h-full cursor-default">
            {CardContent}
          </div>
        )}
      </SpotlightCard>
    </motion.div>
  );
}
