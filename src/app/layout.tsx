import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";
import { site } from "@/content/site";
import { plain } from "@/lib/content";
import { MotionLayer } from "@/components/motion/MotionLayer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${plain(site.name)} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  openGraph: {
    type: "website",
    title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] bg-accent px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionLayer />
        {children}
      </body>
    </html>
  );
}
