'use client'

import { TYPO, IMG } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

export default function ActivitiesGrid() {
  return (
    <>
      <style>{`
        ${KEYFRAMES}
        .fv-media-text-card {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s;
        }
        .fv-media-text-card:hover {
          transform: rotate(-1.5deg) translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }
      `}</style>
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: '#154e85',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="fv-reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
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
            }}>
              FAMILLE &amp; MONTGOLFI&Egrave;RES
            </span>
          </div>

          <h2 className="fv-reveal" style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displayMedium,
            color: '#fff',
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            ACTIVIT&Eacute;S POUR PETITS ET GRANDS
          </h2>

          <div className="fv-activities-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}>
            {/* Card 1 - Famille */}
            <div className="fv-reveal fv-media-text-card" style={{
              background: '#1a5d96',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: 340,
            }}>
              <div style={{ overflow: 'hidden' }}>
                <img src={`${IMG}/famille.jpg`} alt="Programmation familiale" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  fontFamily: "'Metro Sans', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: TYPO.headlineLarge,
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: '0.75rem',
                }}>PROGRAMMATION FAMILIALE</h3>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  marginBottom: '1.25rem',
                  fontWeight: 400,
                }}>
                  Disco mousse, mascotte Rafale, spectacles, piscines &agrave; &eacute;claboussures, jeux gonflables et plus encore!
                </p>
                <a href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.5rem',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: TYPO.bodySmall,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontFamily: "'Metro Sans', sans-serif",
                  transition: 'all 0.3s',
                  alignSelf: 'flex-start',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#154e85' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
                >
                  <span className="fv-btn-label">VIENS T&apos;AMUSER</span>
                </a>
              </div>
            </div>

            {/* Card 2 - Aerienne */}
            <div className="fv-reveal fv-media-text-card" style={{
              background: '#1a5d96',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: 340,
            }}>
              <div style={{ overflow: 'hidden' }}>
                <img src={`${IMG}/montgolfieres-photo.jpg`} alt="Programmation a&eacute;rienne" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  fontFamily: "'Metro Sans', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: TYPO.headlineLarge,
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: '0.75rem',
                }}>PROGRAMMATION A&Eacute;RIENNE</h3>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  marginBottom: '1.25rem',
                  fontWeight: 400,
                }}>
                  Envol&eacute;es de montgolfi&egrave;res, formes sp&eacute;ciales, parachutistes, spectacles m&eacute;t&eacute;o-d&eacute;pendants.
                </p>
                <a href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.5rem',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: TYPO.bodySmall,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontFamily: "'Metro Sans', sans-serif",
                  transition: 'all 0.3s',
                  alignSelf: 'flex-start',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#154e85' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
                >
                  <span className="fv-btn-label">VIENS T&apos;ENVOLER</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
