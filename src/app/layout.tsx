import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marketplace.yoonet.com.au"),
  title: {
    default: "Yoonet Marketplace - Your digital team, sorted",
    template: "%s · Yoonet Marketplace",
  },
  description:
    "Three plans covering hosting, SEO, ads, social, and website updates. One team of 130 people. 15+ years looking after Australian and Kiwi businesses.",
  keywords: [
    "managed website",
    "digital marketing agency",
    "SEO agency Australia",
    "Google Ads management",
    "Yoonet",
    "managed digital plans",
  ],
  authors: [{ name: "Yoonet" }],
  creator: "Yoonet",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://marketplace.yoonet.com.au",
    siteName: "Yoonet Marketplace",
    title: "Yoonet Marketplace - Your digital team, sorted",
    description:
      "Three plans covering hosting, SEO, ads, social, and website updates. One team of 130 people.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoonet Marketplace - Your digital team, sorted",
    description:
      "Three plans covering hosting, SEO, ads, social, and website updates. One team of 130 people.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${manrope.variable}`}>
      <body
        className="min-h-screen bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
