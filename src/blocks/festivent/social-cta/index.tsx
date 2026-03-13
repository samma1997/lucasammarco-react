'use client'

import { TYPO, IMG, SOCIALS } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

export default function SocialCta() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <section style={{
        clipPath: 'circle(28800px at 50% 28891px)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: 'linear-gradient(180deg, #f89e5d 0%, #f17a5e 40%, #a87cc0 70%, #7aa8d4 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', top: '-10%', right: '-8%', width: '40%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', bottom: '-10%', left: '-5%', width: '35%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />

        {/* Floating ambiance photos (sides) */}
        <div className="fv-social-floating" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <img src={`${IMG}/ambiance-2.jpg`} alt="" style={{
            position: 'absolute', top: '15%', left: '4%',
            width: 'clamp(100px, 12vw, 180px)', borderRadius: '12px',
            transform: 'rotate(-8deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
          <img src={`${IMG}/ambiance-3.jpg`} alt="" style={{
            position: 'absolute', bottom: '10%', left: '6%',
            width: 'clamp(90px, 10vw, 150px)', borderRadius: '12px',
            transform: 'rotate(5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
          <img src={`${IMG}/artist-photo.jpg`} alt="" style={{
            position: 'absolute', top: '20%', right: '4%',
            width: 'clamp(110px, 13vw, 190px)', borderRadius: '12px',
            transform: 'rotate(6deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
          <img src={`${IMG}/ambiance-1.jpg`} alt="" style={{
            position: 'absolute', bottom: '15%', right: '5%',
            width: 'clamp(100px, 11vw, 160px)', borderRadius: '12px',
            transform: 'rotate(-5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
        </div>

        <div className="fv-reveal" style={{ position: 'relative', zIndex: 2, maxWidth: 650, margin: '0 auto' }}>
          {/* Overline badge */}
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            border: '1.5px solid rgba(255,255,255,0.6)',
            borderRadius: '100px',
            color: '#fff',
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.titleSmall,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}>
            NE MANQUE RIEN!
          </span>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displaySmall,
            color: '#154e85',
            marginBottom: '2.5rem',
          }}>
            POUR UN VENT DE FESTIVIT&Eacute;S AU QUOTIDIEN
          </h2>

          {/* Social icons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}>
            {SOCIALS.map(social => (
              <a key={social.name} href="#" style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '2px solid #f15c56',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s',
                textDecoration: 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f15c56' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#f15c56">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
