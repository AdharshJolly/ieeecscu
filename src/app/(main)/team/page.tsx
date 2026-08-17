import connectDB from "@/lib/db";
import OfficeBearer from "@/models/OfficeBearer";
import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ year?: string }> }): Promise<Metadata> {
  const { year } = await searchParams;
  const displayYear = year ? `${year}` : "Current";
  
  return {
    title: `Office Bearers ${displayYear} | IEEE CS CU`,
    description: `Meet the dedicated student leaders and faculty who drive the IEEE Computer Society Student Chapter at CHRIST University for the ${displayYear} academic year.`,
    keywords: ["IEEE", "Computer Society", "CHRIST University", "Office Bearers", "Student Leaders", "Tech Community", displayYear],
    openGraph: {
      title: `Office Bearers ${displayYear} | IEEE CS CU`,
      description: `Meet the dedicated student leaders and faculty who drive the IEEE Computer Society Student Chapter at CHRIST University for the ${displayYear} academic year.`,
    },
    alternates: {
      canonical: "/team",
    },
  };
}

export default async function OfficeBearersPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
  await connectDB();
  
  // Find all distinct years to populate the dropdown/tabs
  const allYears = await OfficeBearer.distinct("year");
  allYears.sort().reverse(); // Newest first
  
  const { year } = await searchParams;
  
  // If no year specified in URL, default to the most recent year
  const activeYear = year || (allYears.length > 0 ? allYears[0] : "2024-2025");
  
  // Fetch bearers for the active year
  const rawBearers = await OfficeBearer.find({ year: activeYear }).sort({ order: 1 }).lean();
  const bearers = JSON.parse(JSON.stringify(rawBearers));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': bearers.map((bearer: any, index: number) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Person',
        'name': bearer.name,
        'jobTitle': bearer.role,
        'image': bearer.imageUrl ? `https://ieeecscu.com${bearer.imageUrl}` : undefined,
        'url': bearer.linkedinUrl || bearer.githubUrl || undefined,
        'sameAs': [bearer.linkedinUrl, bearer.githubUrl].filter(Boolean)
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1c] pt-32 pb-24 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-secondary">Office Bearers</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Meet the dedicated individuals who lead the IEEE Computer Society Student Chapter at CHRIST University.
          </p>
        </div>

        {/* Year Selector (Tabs) */}
        {allYears.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {allYears.map((y: string) => (
              <Link 
                key={y}
                href={`?year=${y}`}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  activeYear === y 
                  ? "bg-ieee-primary text-white shadow-lg shadow-ieee-primary/30" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {y}
              </Link>
            ))}
          </div>
        )}

        {/* Grid */}
        {bearers.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-400">No office bearers found for {activeYear}.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bearers.map((bearer: any, index: number) => (
              <div key={bearer._id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2 flex flex-col">
                <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800">
                  {bearer.imageUrl ? (
                    <Image 
                      src={bearer.imageUrl} 
                      alt={bearer.name} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 4}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700">
                      <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                    {bearer.linkedinUrl && (
                      <a href={bearer.linkedinUrl} target="_blank" rel="noreferrer" className="text-white hover:text-ieee-primary transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    )}
                    {bearer.githubUrl && (
                      <a href={bearer.githubUrl} target="_blank" rel="noreferrer" className="text-white hover:text-ieee-primary transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6 text-center flex-grow flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{bearer.name}</h3>
                  <p className="text-ieee-primary font-bold text-sm tracking-wide uppercase">{bearer.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
