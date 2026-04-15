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
    default: "Yoonet Marketplace — Order digital like it's a menu",
    template: "%s · Yoonet Marketplace",
  },
  description:
    "Order digital like it's a menu. 14 productised services — hosting, SEO, ads, builds, admin — from the Yoonet team behind 500+ Australian and New Zealand businesses. Subscriptions from $600/mo.",
  keywords: [
    "managed website",
    "digital marketing agency",
    "SEO agency Australia",
    "Google Ads management",
    "Yoonet",
    "productised services",
  ],
  authors: [{ name: "Yoonet" }],
  creator: "Yoonet",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://marketplace.yoonet.com.au",
    siteName: "Yoonet Marketplace",
    title: "Yoonet Marketplace — Order digital like it's a menu",
    description:
      "14 productised services. One catalogue. Managed digital from the Yoonet team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoonet Marketplace — Order digital like it's a menu",
    description:
      "14 productised services. One catalogue. Managed digital from the Yoonet team.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
