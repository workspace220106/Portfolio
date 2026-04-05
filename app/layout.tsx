import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "../components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Developer — Immersive 3D Portfolio",
  description:
    "A premium, immersive 3D portfolio showcasing cinematic web experiences, creative development, and interactive storytelling. Built with Next.js, React Three Fiber, and Framer Motion.",
  keywords: [
    "3D portfolio",
    "creative developer",
    "web developer",
    "three.js",
    "react three fiber",
    "interactive portfolio",
    "motion design",
    "frontend developer",
  ],
  authors: [{ name: "Creative Developer" }],
  openGraph: {
    title: "Creative Developer — Immersive 3D Portfolio",
    description:
      "Cinematic web experiences blending code, 3D, and motion design.",
    type: "website",
    locale: "en_US",
    siteName: "3D Developer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Developer — Immersive 3D Portfolio",
    description:
      "Cinematic web experiences blending code, 3D, and motion design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%23947EB0'/><stop offset='100%25' style='stop-color:%232F0A85'/></linearGradient></defs><circle cx='50' cy='50' r='45' fill='url(%23g)'/><text x='50' y='65' font-family='system-ui' font-size='45' font-weight='700' fill='white' text-anchor='middle'>D</text></svg>"
        />
      </head>
      <body className="bg-background text-highlight antialiased font-sans">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
