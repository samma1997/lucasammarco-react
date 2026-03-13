import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luca Sammarco | Web Developer & SEO Specialist — Monza',
  description:
    'Luca Sammarco: sviluppo web, SEO, GEO, software custom e soluzioni AI per far crescere il tuo business online. Monza, Italia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        {children}
      </body>
    </html>
  )
}
