'use client'

import { TYPO, SOCIALS, FOOTER_INFOS, FOOTER_FESTIVENT } from '../_shared'
import { FestiventLogoSVG } from '../_shared/components'
import { KEYFRAMES } from '../_shared/keyframes'

export default function FooterFestival() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <footer style={{
        clipPath: 'circle(28800px at 50% 28891px)',
        background: '#0f3356',
        padding: '0 clamp(1rem, 3vw, 3rem) 0',
      }}>
        {/* Cream card */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          background: '#fef7de',
          borderRadius: '1.5rem',
          padding: 'clamp(2rem, 4vw, 3.5rem)',
        }}>
          <div className="fv-footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr 1fr',
            gap: '3rem',
          }}>
            {/* Left column */}
            <div>
              <h3 style={{
                fontFamily: "'Metro Sans', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: TYPO.headlineLarge,
                color: '#154e85',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                POUR TOUT SAVOIR SUR LE FESTIVAL
              </h3>
              <a href="#" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                background: '#f15c56',
                borderRadius: '100px',
                color: '#fff',
                fontWeight: 700,
                fontSize: TYPO.bodySmall,
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontFamily: "'Metro Sans', sans-serif",
                marginBottom: '1.5rem',
                transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span className="fv-btn-label">ABONNE-TOI &Agrave; L&apos;INFOLETTRE</span>
              </a>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {SOCIALS.map(social => (
                  <a key={social.name} href="#" style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1.5px solid #154e85',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#154e85' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#154e85">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Middle column */}
            <div>
              <h4 style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: TYPO.headlineMedium,
                color: '#154e85',
                letterSpacing: '-0.01em',
                marginBottom: '1rem',
              }}>INFOS PRATIQUES</h4>
              {FOOTER_INFOS.map((item, idx) => (
                <a key={item} href="#" className="fv-footer-link" style={{
                  display: 'block',
                  color: '#154e85',
                  textDecoration: 'none',
                  fontSize: TYPO.bodyMedium,
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                  opacity: 0.6,
                }}
                  data-idx={idx}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >{item}</a>
              ))}
            </div>

            {/* Right column */}
            <div>
              <h4 style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: TYPO.headlineMedium,
                color: '#154e85',
                letterSpacing: '-0.01em',
                marginBottom: '1rem',
              }}>LE FESTIVENT</h4>
              {FOOTER_FESTIVENT.map((item, idx) => (
                <a key={item} href="#" className="fv-footer-link" style={{
                  display: 'block',
                  color: '#154e85',
                  textDecoration: 'none',
                  fontSize: TYPO.bodyMedium,
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                  opacity: 0.6,
                }}
                  data-idx={idx}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >{item}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '1.5rem 0 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: TYPO.bodySmall,
          color: 'rgba(199,234,251,0.4)',
        }}>
          <span>&copy; 2025 | Festivent</span>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="#" style={{ color: 'rgba(199,234,251,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c7eafb')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,234,251,0.4)')}
            >Politique de confidentialit&eacute;</a>
            <a href="#" style={{ color: 'rgba(199,234,251,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c7eafb')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,234,251,0.4)')}
            >Conditions de vente</a>
            <a href="#" style={{ color: 'rgba(199,234,251,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c7eafb')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,234,251,0.4)')}
            >Site web par Les Pr&eacute;tentieux</a>
          </div>
          {/* Scroll to top */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid rgba(199,234,251,0.3)',
            background: 'transparent',
            color: 'rgba(199,234,251,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7eafb'; e.currentTarget.style.color = '#c7eafb' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(199,234,251,0.3)'; e.currentTarget.style.color = 'rgba(199,234,251,0.5)' }}
          >
            &uarr;
          </button>
        </div>

        {/* Logo watermark — uses FestiventLogoSVG for completeness */}
        <div style={{ display: 'none' }}>
          <FestiventLogoSVG width={0} />
        </div>
      </footer>
    </>
  )
}
