import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Event from '@/models/Event';
import OfficeBearer from '@/models/OfficeBearer';

// Revalidate this page every hour (3600 seconds) to cache the results
export const revalidate = 3600;

export async function GET() {
  try {
    await connectDB();

    // Fetch the 10 most recent events
    const recentEvents = await Event.find().sort({ date: -1 }).limit(10).lean();

    // Fetch current office bearers (most recent year)
    const allYears = await OfficeBearer.distinct('year');
    allYears.sort().reverse();
    const currentYear = allYears.length > 0 ? allYears[0] : '2024-2025';
    const bearers = await OfficeBearer.find({ year: currentYear }).sort({ order: 1 }).lean();

    let md = `# IEEE Computer Society - CHRIST University Student Branch Chapter\n\n`;
    md += `> The official student branch chapter of the IEEE Computer Society at CHRIST (Deemed to be University), Bangalore.\n\n`;
    
    md += `## Overview\n`;
    md += `The IEEE Computer Society (IEEE CS) Student Branch Chapter at CHRIST University is a premier student-run organization dedicated to advancing the theory, practice, and application of computer and information processing science and technology. We serve as a vibrant hub for computing professionals, students, and enthusiasts, aiming to empower the next generation of technologists through collaboration, innovation, and leadership.\n\n`;

    md += `## Dynamic Information (Auto-updated)\n\n`;
    
    md += `### Upcoming & Recent Events\n`;
    if (recentEvents && recentEvents.length > 0) {
      recentEvents.forEach((e: any) => {
        const dateStr = new Date(e.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        md += `- **${e.title}** (${dateStr}) - [${(e.type || 'Event').toUpperCase()}]\n`;
        if (e.description) md += `  ${e.description.replace(/\n/g, ' ')}\n`;
        if (e.location) md += `  *Location: ${e.location}*\n`;
        if (e.link) md += `  [More Info/Register](${e.link})\n`;
        md += `\n`;
      });
    } else {
      md += `No recent events available.\n\n`;
    }

    md += `### Current Office Bearers (${currentYear})\n`;
    if (bearers && bearers.length > 0) {
      bearers.forEach((b: any) => {
        md += `- **${b.name}** - ${b.role}\n`;
        if (b.linkedinUrl) md += `  [LinkedIn](${b.linkedinUrl})\n`;
        if (b.githubUrl) md += `  [GitHub](${b.githubUrl})\n`;
      });
    } else {
      md += `No office bearers found for the current academic year.\n`;
    }
    md += `\n`;

    md += `## Site Structure & Navigation\n`;
    md += `- **Home Page**: [https://ieeecscu.com](https://ieeecscu.com)\n`;
    md += `- **Events Hub**: [https://ieeecscu.com/events](https://ieeecscu.com/events)\n`;
    md += `- **Team Directory**: [https://ieeecscu.com/team](https://ieeecscu.com/team)\n\n`;

    md += `## Official Connect & Social Media\n`;
    md += `- **Instagram**: [https://www.instagram.com/ieeecscu/](https://www.instagram.com/ieeecscu/)\n`;
    md += `- **LinkedIn**: [https://www.linkedin.com/company/ieee-cscu/](https://www.linkedin.com/company/ieee-cscu/)\n`;

    return new NextResponse(md, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error("Error generating llms.txt:", error);
    return new NextResponse("Error generating llms.txt", { status: 500 });
  }
}
