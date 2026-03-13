'use client'

import { TYPO, MARQUEE_TEXT } from '../_shared'

const KEYFRAMES = `
  @keyframes fv-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .fv-marquee-wrapper {
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
`

export default function MarqueeTicker() {
  return (
    <div style={{
      background: '#f15c56',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '8px 0',
      position: 'relative',
      zIndex: 110,
    }}>
      <style>{KEYFRAMES}</style>
      <div className="fv-marquee-wrapper" style={{
        display: 'inline-flex',
        animation: 'fv-marquee 15s linear infinite',
      }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} style={{
            color: '#fff',
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.titleSmall,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            paddingRight: '3rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {MARQUEE_TEXT}
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#fef7de', opacity: 0.6 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
