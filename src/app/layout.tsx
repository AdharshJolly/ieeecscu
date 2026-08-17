import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ieeecscu.com"),
  title: {
    template: "%s | IEEE CS CHRIST University",
    default: "IEEE CS CHRIST University",
  },
  description: "The official IEEE Computer Society Student Branch Chapter of CHRIST (Deemed to be University), Bangalore. We host hackathons, workshops, and tech talks.",
  keywords: ["IEEE", "Computer Society", "CHRIST University", "Student Branch", "Bangalore", "Hackathons", "Tech Talks", "Workshops", "Tech Community"],
  openGraph: {
    title: "IEEE CS CHRIST University",
    description: "The official IEEE Computer Society Student Branch Chapter of CHRIST (Deemed to be University), Bangalore.",
    url: "https://ieeecscu.com",
    siteName: "IEEE CS CU",
    images: [
      {
        url: "/assets/ieee_cs.png", // Fallback OG Image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'IEEE Computer Society CHRIST University',
    alternateName: 'IEEE CS CU',
    url: 'https://ieeecscu.com',
    logo: 'https://ieeecscu.com/assets/ieee_cs_cu.png',
    description: 'The official IEEE Computer Society Student Branch Chapter of CHRIST (Deemed to be University), Bangalore.',
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
