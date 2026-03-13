import type { Metadata } from 'next'
import '../styles/lenis.css'
import '../styles/webflow.css'
import '../styles/inline.css'
import '../styles/responsive-fixes.css'
import './globals.css'
import Navigation from '@/components/Navigation'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Luca Sammarco | Web Developer & SEO Specialist — Monza',
  description:
    'Luca Sammarco: sviluppo web, SEO, GEO, software custom e soluzioni AI per far crescere il tuo business online. Monza, Italia.',
  openGraph: {
    title: 'Luca Sammarco | Web Developer & SEO Specialist — Monza',
    description:
      'Luca Sammarco: sviluppo web, SEO, GEO, software custom e soluzioni AI per far crescere il tuo business online. Monza, Italia.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luca Sammarco | Web Developer & SEO Specialist — Monza',
    description:
      'Luca Sammarco: sviluppo web, SEO, GEO, software custom e soluzioni AI per far crescere il tuo business online. Monza, Italia.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <Navigation />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
