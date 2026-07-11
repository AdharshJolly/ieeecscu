"use client";

import { useState, useEffect } from "react";

export interface Event {
  _id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  link?: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "hackathon",
    date: "",
    description: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ title: "", type: "hackathon", date: "", description: "", link: "" });
        fetchEvents();
      } else {
        const text = await res.text();
        setError(`Failed to create event: ${text}`);
      }
    } catch (error: unknown) {
      setError(`Error submitting form: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Create Event Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
          {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-black">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
              >
                <option value="hackathon">Hackathon</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="talk">Talk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Link (Optional)</label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        {/* Existing Events List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Events</h2>
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-gray-500">No events found.</p>
            ) : (
              events.map((event) => (
                <div key={event._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-3 text-black">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
                  {event.link && (
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium mt-1 inline-block">
                      View Event Details
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
