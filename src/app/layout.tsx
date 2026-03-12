import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luca Sammarco — Consulente Digitale, SEO & AI a Monza",
    template: "%s | Luca Sammarco",
  },
  description:
    "Consulente in strategia digitale, sviluppo software custom e innovazione AI. Trasformo idee in prodotti digitali che generano crescita. Monza, Italia.",
  keywords: [
    "consulente digitale Monza",
    "sviluppo software custom",
    "SEO specialist Italia",
    "AI automation",
    "web developer Monza",
    "Luca Sammarco",
  ],
  authors: [{ name: "Luca Sammarco", url: "https://lucasammarco.com" }],
  creator: "Luca Sammarco",
  metadataBase: new URL("https://lucasammarco.com"),
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://lucasammarco.com",
    siteName: "Luca Sammarco",
    title: "Luca Sammarco — Consulente Digitale, SEO & AI",
    description:
      "Consulente in strategia digitale, sviluppo software e innovazione AI per aziende che vogliono dominare il mercato.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luca Sammarco — Consulente Digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Sammarco — Consulente Digitale, SEO & AI",
    description:
      "Consulente in strategia digitale, sviluppo software e innovazione AI.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SmoothScrollProvider>
          <Navigation />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
