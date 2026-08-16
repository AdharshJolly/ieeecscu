import connectDB from "@/lib/db";
import Event from "@/models/Event";
import User from "@/models/User";
import OfficeBearer from "@/models/OfficeBearer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  let eventCount = 0;
  let userCount = 0;
  let teamCount = 0;
  let recentEvents: any[] = [];

  try {
    await connectDB();
    eventCount = await Event.countDocuments();
    teamCount = await OfficeBearer.countDocuments();
    recentEvents = await Event.find().sort({ date: -1 }).limit(3).lean();
    
    if ((session?.user as any)?.role === 'SUPER_ADMIN') {
      userCount = await User.countDocuments();
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error);
  }

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Command Center</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Welcome back, {session?.user?.name}! Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-ieee-primary/5 rounded-full blur-2xl group-hover:bg-ieee-primary/20 transition-all duration-500"></div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Events</p>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white">{eventCount}</h2>
          </div>
          <div className="relative z-10 w-16 h-16 bg-ieee-primary/10 rounded-2xl flex items-center justify-center text-ieee-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        </div>

        <div className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Office Bearers</p>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white">{teamCount}</h2>
          </div>
          <div className="relative z-10 w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </div>

        {(session?.user as any)?.role === 'SUPER_ADMIN' && (
          <div className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between overflow-hidden relative md:col-span-2 lg:col-span-1">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-ieee-secondary/5 rounded-full blur-2xl group-hover:bg-ieee-secondary/20 transition-all duration-500"></div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Admins</p>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white">{userCount}</h2>
            </div>
            <div className="relative z-10 w-16 h-16 bg-ieee-secondary/10 rounded-2xl flex items-center justify-center text-ieee-secondary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Events</h3>
          <Link href="/admin/events" className="text-sm font-bold text-ieee-primary hover:text-ieee-secondary transition-colors">View All &rarr;</Link>
        </div>
        <div className="p-0">
          {recentEvents.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">No events found.</div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {recentEvents.map((event: any) => (
                <div key={event._id.toString()} className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  {event.imageUrl ? (
                    <div className="relative w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700">
                      <Image src={event.imageUrl} alt={event.title} fill className="object-cover" sizes="128px" />
                    </div>
                  ) : (
                    <div className="w-full sm:w-32 h-24 rounded-xl shrink-0 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="flex-grow text-center sm:text-left">
                    <div className="inline-block px-3 py-1 bg-ieee-primary/10 text-ieee-primary text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                      {event.type}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{event.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
