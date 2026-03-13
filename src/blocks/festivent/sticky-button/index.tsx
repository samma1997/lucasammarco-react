'use client'

import { TYPO } from '../_shared'

export default function StickyButton() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '1.5rem',
      zIndex: 90,
    }}>
      <button style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.25rem',
        background: '#fef7de',
        border: '2px solid #154e85',
        borderRadius: '100px',
        color: '#154e85',
        fontWeight: 700,
        fontSize: TYPO.bodySmall,
        textTransform: 'uppercase',
        fontFamily: "'Metro Sans', sans-serif",
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        transition: 'all 0.25s',
        letterSpacing: '0.03em',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = '#154e85'; e.currentTarget.style.color = '#fef7de' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fef7de'; e.currentTarget.style.color = '#154e85' }}
      >
        INFOS PRATIQUES
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}
