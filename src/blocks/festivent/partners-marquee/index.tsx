'use client'

import { TYPO, IMG } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

export default function PartnersMarquee() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <section style={{
        background: '#0f3356',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Giant faded text marquee */}
        <div style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          marginBottom: '2rem',
        }}>
          <div className="fv-marquee-wrapper" style={{
            display: 'inline-flex',
            animation: 'fv-marquee-partners 25s linear infinite',
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{
                fontFamily: "'Metro Sans', sans-serif",
                fontWeight: 700,
                fontSize: TYPO.displayLarge,
                textTransform: 'uppercase',
                color: 'rgba(26,93,150,0.3)',
                paddingRight: '3rem',
                letterSpacing: '-0.02em',
              }}>
                MERCI &Agrave; NOS PARTENAIRES
              </span>
            ))}
          </div>
        </div>

        {/* Partner logos */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '0 2rem',
        }}>
          <img src={`${IMG}/partner-1.jpg`} alt="Partenaire 1" style={{
            height: 50,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.5,
            transition: 'opacity 0.3s',
            cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          />
          <img src={`${IMG}/partner-2.jpg`} alt="Partenaire 2" style={{
            height: 50,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.5,
            transition: 'opacity 0.3s',
            cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          />
        </div>
      </section>
    </>
  )
}
