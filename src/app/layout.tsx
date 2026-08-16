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
  metadataBase: new URL("https://ieee-cs-cu.vercel.app"),
  title: {
    template: "%s | IEEE CS CHRIST University",
    default: "IEEE CS CHRIST University",
  },
  description: "The official IEEE Computer Society Student Branch Chapter of CHRIST (Deemed to be University), Bangalore. We host hackathons, workshops, and tech talks.",
  openGraph: {
    title: "IEEE CS CHRIST University",
    description: "The official IEEE Computer Society Student Branch Chapter of CHRIST (Deemed to be University), Bangalore.",
    url: "https://ieee-cs-cu.vercel.app", // Adjust when deployed
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
  icons: {
    icon: "/assets/ieee_cs_cu.png",
    shortcut: "/assets/ieee_cs_cu.png",
    apple: "/assets/ieee_cs_cu.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
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
