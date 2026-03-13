'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TYPO, IMG } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

gsap.registerPlugin(ScrollTrigger)

export default function TwoScenesCta() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fv-two-scenes-img').forEach((el) => {
        gsap.to(el, {
          y: '-40%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{KEYFRAMES}</style>
      <section ref={sectionRef} style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: '#c7eafb',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div className="fv-reveal" style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displaySmall,
            color: '#f15c56',
            marginBottom: '1.5rem',
          }}>
            PROFITE DE 2 SC&Egrave;NES C&Ocirc;TE &Agrave; C&Ocirc;TE
          </h2>
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 2rem',
            border: '2px solid #154e85',
            borderRadius: '100px',
            color: '#154e85',
            fontWeight: 700,
            fontSize: TYPO.bodyMedium,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: "'Metro Sans', sans-serif",
            transition: 'all 0.3s',
            background: 'transparent',
            marginBottom: '3rem',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#154e85'; e.currentTarget.style.color = '#c7eafb' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#154e85' }}
          >
            <span className="fv-btn-label">EN SAVOIR PLUS</span>
          </a>
        </div>
        <div className="fv-reveal" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="fv-two-scenes-img" style={{
            transform: 'rotate(4deg) translateY(75%)',
            transformOrigin: '0 100%',
            aspectRatio: '1/1',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(21,78,133,0.15)',
          }}>
            <img src={`${IMG}/venue.jpg`} alt="2 sc&egrave;nes" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }} />
          </div>
        </div>
      </section>
    </>
  )
}
