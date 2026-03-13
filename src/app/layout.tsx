import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Museum of Money | MoMoney — Interactive Money Museum Dallas',
  description:
    'Discover the story of money at MoMoney, the interactive Museum of Money in Dallas, TX. Hands-on exhibits, live experiences, and more. Book your tickets today.',
  keywords: ['museum of money', 'MoMoney', 'interactive museum', 'Dallas', 'money history', 'finance education'],
  openGraph: {
    title: 'Museum of Money | MoMoney',
    description: 'Money: it\'s all about change. Discover its story at MoMoney, the interactive Museum of Money.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Museum of Money | MoMoney',
    description: 'Money: it\'s all about change. Discover its story at MoMoney, the interactive Museum of Money.',
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
      <body className="theme-green">
        <SmoothScrollProvider>
          <Navigation />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
