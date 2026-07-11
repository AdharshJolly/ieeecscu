import React from 'react';
import Link from 'next/link';

export default function EventCard({ event }: { event: any }) {
  // Simple heuristic for status based on year
  const currentYear = new Date().getFullYear();
  const isPast = event.date.includes((currentYear - 1).toString());
  const isUpcoming = event.date.includes((currentYear + 1).toString()) || event.date.includes(currentYear.toString());
  
  const statusBadge = isPast ? (
    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">Past</span>
  ) : isUpcoming ? (
    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">Upcoming</span>
  ) : (
    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold animate-pulse">Live</span>
  );

  return (
    <div role="listitem" className="articles-sm_item w-dyn-item transition transform hover:scale-105 hover:shadow-xl duration-300">
      <Link data-w-id="8d989806-bb7c-a715-4a52-bf61fecef93d" href={event.link || "#"} className="project-card normal-card w-inline-block">
        <div className="project-card_content-top all-articles relative">
          <div className="absolute top-2 right-2 z-10">{statusBadge}</div>
          <img src={event.imageUrl || "/assets/explore-and-evolve.png"} loading="lazy" alt="" className="image-100 w-full h-48 object-cover rounded-t-lg" />
        </div>
        <div className="project-card_content-bottom p-4 bg-white dark:bg-gray-800 rounded-b-lg">
          <div className="article-card_info mb-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">{event.date}</div>
          </div>
          <div className="article-card_name">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</div>
          </div>
          <div className="mt-3">
             <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-700 px-2 py-1 rounded">{event.type}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
