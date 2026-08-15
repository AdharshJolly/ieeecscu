"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Events", path: "/admin/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "Office Bearers", path: "/admin/office-bearers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  ];

  if (userRole === "SUPER_ADMIN") {
    links.push({ name: "Users", path: "/admin/users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" });
  }

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 md:min-h-screen flex flex-col transition-all duration-300 md:border-r border-b md:border-b-0 border-slate-800">
      <div className="h-16 flex items-center px-4 md:px-6 bg-slate-950 border-b border-slate-800 shrink-0">
        <span className="text-xl font-black text-white tracking-tight">IEEE CS <span className="text-ieee-primary">Admin</span></span>
      </div>
      
      <div className="p-2 md:p-4 flex-grow flex md:flex-col flex-row overflow-x-auto md:overflow-x-visible gap-2 mt-0 md:mt-4 no-scrollbar">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.path);
          return (
            <Link 
              key={link.name} 
              href={link.path}
              className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${isActive ? 'bg-ieee-primary/10 text-ieee-primary' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 2} d={link.icon} />
              </svg>
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-2 md:p-4 border-t border-slate-800 hidden md:block">
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
