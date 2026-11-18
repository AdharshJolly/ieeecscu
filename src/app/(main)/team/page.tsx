import { getBearerYears, getBearersByYear } from "@/lib/data";
import Link from "next/link";
import TeamDeck from "@/components/TeamDeck";
import { FadeIn } from "@/components/MotionWrapper";
import { Metadata } from "next";

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
  let yearsRaw: string[] = [];
  let paramYear: string | undefined;

  try {
    const [fetchedYears, params] = await Promise.all([getBearerYears(), searchParams]);
    yearsRaw = fetchedYears || [];
    paramYear = params?.year;
  } catch (error) {
    console.error("Failed to load bearer years:", error);
  }

  const allYears = [...yearsRaw].sort().reverse(); // Newest first

  // Default to the most recent year
  const activeYear = paramYear || (allYears.length > 0 ? allYears[0] : "2026");
  
  // Fetch bearers for the active year
  let bearers: any[] = [];
  try {
    bearers = await getBearersByYear(activeYear);
  } catch (error) {
    console.error(`Failed to load bearers for year ${activeYear}:`, error);
  }

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B12] pt-28 pb-24 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/80 dark:border-white/10 mb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[55%] h-[70%] rounded-full bg-ieee-primary/15 dark:bg-ieee-primary/25 blur-[120px] animate-blob" />
          <div className="absolute top-[20%] -right-[15%] w-[45%] h-[60%] rounded-full bg-ieee-cyan/15 dark:bg-ieee-cyan/25 blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[20%] left-[30%] w-[40%] h-[50%] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[100px] animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ieee-primary/10 border border-ieee-primary/25 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ieee-cyan animate-pulse" />
              <span className="text-xs font-bold text-ieee-primary dark:text-ieee-cyan tracking-wider uppercase">
                Executive Chapter Leadership
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              The Minds Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary via-ieee-cyan to-amber-400">
                IEEE CS CU
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Meet our passionate student leaders, faculty advisors, and innovators engineering real-world technical impact at CHRIST (Deemed to be University).
            </p>

            {/* Year Selector Tabs */}
            {allYears.length > 0 && (
              <div className="inline-flex p-1.5 rounded-full bg-white dark:bg-[#0D1622] border border-slate-200 dark:border-white/10 shadow-lg">
                {allYears.map((y: string) => {
                  const isActive = activeYear === y;
                  return (
                    <Link 
                      key={y}
                      href={`?year=${y}`}
                      className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                        isActive 
                        ? "bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white shadow-md shadow-ieee-primary/40 scale-105" 
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {y}
                    </Link>
                  );
                })}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Team Playing Card Deck & Flip-Out Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TeamDeck bearers={bearers} activeYear={activeYear} />
      </div>
    </div>
  );
}
