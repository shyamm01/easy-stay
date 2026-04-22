import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyStay.in — Find Your Perfect PG, Room & Flat in India",
  description:
    "EasyStay makes finding verified PGs, rooms, and flats effortless. Map-based search, verified listings, WhatsApp alerts, and UPI payments. Starting in Bangalore.",
  keywords: [
    "PG in Bangalore",
    "rooms for rent India",
    "paying guest",
    "flat rental",
    "verified PG",
    "room search",
    "EasyStay",
  ],
  openGraph: {
    title: "EasyStay.in — Find Your Perfect PG, Room & Flat in India",
    description:
      "Map-based search for verified PGs, rooms, and flats. WhatsApp alerts & UPI payments.",
    url: "https://easystay.in",
    siteName: "EasyStay",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyStay.in — Your Room Search, Simplified",
    description:
      "Verified PGs & rooms with map search, WhatsApp alerts, and UPI payments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
