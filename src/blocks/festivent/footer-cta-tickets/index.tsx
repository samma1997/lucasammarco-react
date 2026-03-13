'use client'

import { TYPO, IMG, JUMBO_HEIGHT } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

export default function FooterCtaTickets() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <section style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1rem, 3vw, 3rem)',
        background: '#0f3356',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Blur decorations */}
        <img className="fv-blur-deco" src={`${IMG}/orange-blur-alt.png`} alt="" style={{
          position: 'absolute', top: '10%', left: '-5%', width: '35%', opacity: 0.3, pointerEvents: 'none',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', bottom: '5%', right: '-8%', width: '30%', opacity: 0.2, pointerEvents: 'none',
        }} />
        {/* Ferris wheel with spin animation */}
        <img src={`${IMG}/ferris-wheel.png`} alt="" style={{
          position: 'absolute', bottom: '-5%', right: '5%',
          width: 'clamp(150px, 20vw, 300px)', opacity: 0.1, pointerEvents: 'none',
          animation: 'fv-footer-spin 40s linear infinite',
        }} />

        <div className="fv-reveal" style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          {/* Badge */}
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: '100px',
            color: '#fff',
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.titleSmall,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}>
            EN VENTE D&Egrave;S MAINTENANT!
          </span>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displayMedium,
            color: '#fff',
            marginBottom: '2.5rem',
          }}>
            REJOINS LA F&Ecirc;TE, PRENDS TON BILLET!
          </h2>

          {/* Jumbo CTA */}
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            height: JUMBO_HEIGHT,
            borderRadius: `calc(0.5 * ${JUMBO_HEIGHT})`,
            padding: '0 4rem',
            border: '2px solid #fff',
            color: '#fff',
            fontWeight: 700,
            fontSize: TYPO.labelLarge,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: "'Metro Sans', sans-serif",
            transition: 'all 0.3s',
            background: 'transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0f3356' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
          >
            <span className="fv-btn-label">BILLETTERIE</span>
          </a>
        </div>
      </section>
    </>
  )
}
