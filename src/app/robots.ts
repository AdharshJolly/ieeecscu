import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ieee-cs-cu.vercel.app'; // Replace with production URL when deployed

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Explicitly block crawlers from admin dashboard and backend APIs
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
