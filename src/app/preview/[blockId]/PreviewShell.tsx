'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

interface PreviewShellProps {
  isEmbed: boolean
  needsScroll?: boolean
  children: React.ReactNode
}

export default function PreviewShell({ isEmbed, needsScroll, children }: PreviewShellProps) {
  // In embed mode: after a short delay, kill all GSAP tweens that keep
  // elements at opacity 0 and force everything visible
  useEffect(() => {
    if (!isEmbed) return
    const timer = setTimeout(() => {
      // Force-complete any entrance animations so the preview isn't blank
      gsap.globalTimeline.progress(1)
    }, 800)
    return () => clearTimeout(timer)
  }, [isEmbed])

  return (
    <div style={{ minHeight: '100vh' }}>
      {isEmbed && (
        <style>{`
          .fv-curtain,
          [class*="curtain"],
          [class*="loader"],
          [class*="loading"] {
            display: none !important;
          }
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
        <div style={{ height: '300vh' }}>{children}</div>
      ) : (
        children
      )}
    </div>
  )
}
