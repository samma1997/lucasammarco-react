'use client'

import { useEffect, useState } from 'react'

interface PreviewShellProps {
  isEmbed: boolean
  needsScroll?: boolean
  children: React.ReactNode
}

/**
 * In embed mode (?embed=1), used inside catalog iframe thumbnails:
 * - Hides the "Back to catalog" button
 * - After 2s forces all elements visible (catches GSAP opacity:0 stuck states)
 * - Hides loading curtains immediately
 */
export default function PreviewShell({ isEmbed, needsScroll, children }: PreviewShellProps) {
  const [forceVisible, setForceVisible] = useState(false)

  useEffect(() => {
    if (!isEmbed) return
    // Force visibility after animations have had time to play
    const timer = setTimeout(() => setForceVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [isEmbed])

  return (
    <div style={{ minHeight: '100vh' }}>
      {isEmbed && (
        <style>{`
          /* Hide curtains/overlays immediately in embed */
          .fv-curtain { display: none !important; }
          /* Hide any loading overlays */
          [class*="curtain"], [class*="loader"], [class*="loading"] {
            display: none !important;
          }
          ${forceVisible ? `
          /* Force all elements visible after timeout */
          [style*="opacity: 0"], [style*="opacity:0"] {
            opacity: 1 !important;
          }
          ` : ''}
        `}</style>
      )}

      {!isEmbed && (
        <a
          href="/"
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            zIndex: 9999,
            padding: '0.5rem 1rem',
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontFamily: 'system-ui, sans-serif',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ← Back to catalog
        </a>
      )}

      {needsScroll ? (
        <div style={{ height: '300vh' }}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
