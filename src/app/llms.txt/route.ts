import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Event from '@/models/Event';
import OfficeBearer from '@/models/OfficeBearer';

// Revalidate this page every hour (3600 seconds) to cache the results
export const revalidate = 3600;

export async function GET() {
  try {
    await connectDB();

    // Fetch ALL events
    const allEvents = await Event.find().sort({ date: -1 }).lean();

    // Fetch ALL office bearers and sort by year (descending) and order (ascending)
    const allBearers = await OfficeBearer.find().sort({ year: -1, order: 1 }).lean();

    let md = `# IEEE Computer Society - CHRIST University Student Branch Chapter\n\n`;
    md += `> The official student branch chapter of the IEEE Computer Society at CHRIST (Deemed to be University), Bangalore.\n\n`;
    
    md += `## Overview\n`;
    md += `The IEEE Computer Society (IEEE CS) Student Branch Chapter at CHRIST University is a premier student-run organization dedicated to advancing the theory, practice, and application of computer and information processing science and technology. We serve as a vibrant hub for computing professionals, students, and enthusiasts, aiming to empower the next generation of technologists through collaboration, innovation, and leadership.\n\n`;

    md += `## Events\n\n`;
    
    if (allEvents && allEvents.length > 0) {
      allEvents.forEach((e: any) => {
        const dateStr = new Date(e.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        md += `- **${e.title}** (${dateStr}) - [${(e.type || 'Event').toUpperCase()}]\n`;
        if (e.description) md += `  ${e.description.replace(/\n/g, ' ')}\n`;
        if (e.location) md += `  *Location: ${e.location}*\n`;
        if (e.link) md += `  [More Info/Register](${e.link})\n`;
        md += `\n`;
      });
    } else {
      md += `No events available.\n\n`;
    }

    md += `## Office Bearers\n`;
    if (allBearers && allBearers.length > 0) {
      let currentYearPrinted = "";
      allBearers.forEach((b: any) => {
        if (b.year !== currentYearPrinted) {
          md += `\n### Academic Year ${b.year}\n`;
          currentYearPrinted = b.year;
        }
        md += `- **${b.name}** - ${b.role}\n`;
        if (b.linkedinUrl) md += `  [LinkedIn](${b.linkedinUrl})\n`;
        if (b.githubUrl) md += `  [GitHub](${b.githubUrl})\n`;
      });
    } else {
      md += `No office bearers found.\n`;
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
