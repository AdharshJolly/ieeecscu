"use client";

import React, { useState } from 'react';
import EventCard from './EventCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventListClient({ initialEvents }: { initialEvents: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [timelineFilter, setTimelineFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  const filteredEvents = initialEvents.filter(event => {
    // Timeline filter
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (timelineFilter === 'upcoming' && eventDate < today) return false;
    if (timelineFilter === 'past' && eventDate >= today) return false;

    // Search filter
    const query = searchQuery.toLowerCase();
    const title = event.title ? event.title.toLowerCase() : "";
    const date = event.date ? event.date.toString().toLowerCase() : "";
    const type = event.type ? event.type.toLowerCase() : "";
    return title.includes(query) || date.includes(query) || type.includes(query);
  });

  return (
    <div className="w-full">
      {/* Filters Container */}
      <div className="mb-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center">
        
        {/* Timeline Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full shrink-0">
          {(['upcoming', 'past', 'all'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimelineFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm capitalize transition-all duration-300 ${
                timelineFilter === filter 
                  ? 'bg-white dark:bg-slate-700 text-ieee-primary shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative group w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-ieee-primary to-ieee-secondary rounded-full blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative flex items-center w-full bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ieee-primary/50 focus-within:border-ieee-primary">
            <div className="pl-6 text-slate-400 dark:text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search events, dates, or topics..." 
              className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-slate-900 dark:text-white placeholder-slate-400 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="pr-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        <AnimatePresence>
          {filteredEvents.map((event: any) => (
            <motion.div
              key={event._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="w-full flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700"
        >
          <div className="w-20 h-20 mb-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No events found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">We couldn't find any events matching "{searchQuery}". Try adjusting your search terms.</p>
        </motion.div>
      )}
    </div>
  );
}
