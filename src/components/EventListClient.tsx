"use client";

import React, { useState } from 'react';
import EventCard from './EventCard';

export default function EventListClient({ initialEvents }: { initialEvents: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = initialEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-center">
        <input 
          type="text" 
          placeholder="Search events..." 
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800 dark:border-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="articles-sm_list hr-flex w-dyn-items">
        {filteredEvents.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
        {filteredEvents.length === 0 && (
          <div className="w-full text-center py-12 text-gray-500">No events found matching your search.</div>
        )}
      </div>
    </div>
  );
}
