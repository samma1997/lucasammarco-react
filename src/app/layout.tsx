import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Block Library — UI Component Catalog',
  description:
    'A curated catalog of production-ready UI blocks built with Next.js, GSAP, and Tailwind. Browse, preview, and copy components for your next project.',
  keywords: ['block library', 'UI components', 'Next.js', 'GSAP', 'Tailwind', 'component catalog'],
  openGraph: {
    title: 'Block Library — UI Component Catalog',
    description: 'Production-ready UI blocks built with Next.js, GSAP, and Tailwind.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Block Library — UI Component Catalog',
    description: 'Production-ready UI blocks built with Next.js, GSAP, and Tailwind.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
