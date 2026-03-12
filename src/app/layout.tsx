import type { Metadata } from 'next'
import '../styles/lenis.css'
import '../styles/webflow.css'
import '../styles/inline.css'
import '../styles/responsive-fixes.css'
import './globals.css'
import Navigation from '@/components/Navigation'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'TIWIS | Strategic sparring partners and drivers of your growth',
  description:
    'Tiwis supports companies in defining their strategy, designing digital experiences and implementing their growth operationally, with an agile and pragmatic approach.',
  openGraph: {
    title: 'TIWIS | Strategic sparring partners and drivers of your growth',
    description:
      'Tiwis supports companies in defining their strategy, designing digital experiences and implementing their growth operationally, with an agile and pragmatic approach.',
    type: 'website',
    images: [
      'https://cdn.prod.website-files.com/68f77e49c7ca6bd68b326c3d/69457111016b9c2b2ec75eb8_Tiwis_Screen.jpg',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TIWIS | Strategic sparring partners and drivers of your growth',
    description:
      'Tiwis supports companies in defining their strategy, designing digital experiences and implementing their growth operationally, with an agile and pragmatic approach.',
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
