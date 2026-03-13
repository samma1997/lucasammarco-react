'use client'

import { TYPO, IMG } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

export default function VisitCards() {
  return (
    <>
      <style>{`
        ${KEYFRAMES}
        .fv-media-card {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s;
        }
        .fv-media-card:hover {
          transform: rotate(-1deg) translateY(-4px);
          box-shadow: 0 12px 30px rgba(241,92,86,0.15);
        }
      `}</style>
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: '#fef7de',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="fv-reveal" style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displayMedium,
            color: '#f15c56',
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            PR&Eacute;PARE TA VISITE
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Card 1 - Infos festivaliers */}
            <div className="fv-reveal fv-visit-grid fv-media-card" style={{
              display: 'flex',
              background: '#fce8e0',
              border: '1.5px solid #f15c56',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              minHeight: 220,
              cursor: 'pointer',
            }}>
              <div style={{ flex: '0 0 40%', overflow: 'hidden' }}>
                <img src={`${IMG}/infos.jpg`} alt="Infos festivaliers" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                flex: 1,
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
                  color: '#f15c56',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}>INFOS FESTIVALIERS</h3>
                <p style={{
                  color: '#154e85',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  opacity: 0.7,
                  fontWeight: 400,
                }}>
                  Tout ce que tu dois savoir pour profiter au maximum de ton exp&eacute;rience au Festivent.
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '2rem',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f15c56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 2 - Zones experience */}
            <div className="fv-reveal fv-visit-grid fv-media-card" style={{
              display: 'flex',
              background: '#fce8e0',
              border: '1.5px solid #f15c56',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              minHeight: 220,
              cursor: 'pointer',
            }}>
              <div style={{ flex: '0 0 40%', overflow: 'hidden' }}>
                <img src={`${IMG}/zones.jpg`} alt="Zones exp&eacute;rience" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                flex: 1,
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
                  color: '#f15c56',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}>ZONES EXP&Eacute;RIENCE</h3>
                <p style={{
                  color: '#154e85',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  opacity: 0.7,
                  fontWeight: 400,
                }}>
                  D&eacute;couvre les diff&eacute;rentes zones du site et planifie ton parcours id&eacute;al.
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '2rem',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f15c56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
