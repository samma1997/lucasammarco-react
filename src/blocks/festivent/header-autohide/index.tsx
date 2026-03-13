'use client'

import { useRef, useState, useEffect } from 'react'
import { FestiventLogoSVG } from '../_shared/components'
import { TYPO, NAV_ITEMS } from '../_shared'

const KEYFRAMES = `
  @media (max-width: 768px) {
    .fv-desktop-nav { display: none !important; }
    .fv-burger { display: flex !important; }
  }
  @media (min-width: 769px) {
    .fv-burger { display: none !important; }
  }
`

export default function HeaderAutohide() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY
      const header = headerRef.current
      if (!header) return
      if (st > 120 && st > lastScroll.current) {
        header.style.transform = 'translateY(-100%)'
        header.style.opacity = '0'
      } else {
        header.style.transform = 'translateY(0)'
        header.style.opacity = '1'
      }
      lastScroll.current = st
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{KEYFRAMES}</style>

      <header ref={headerRef} style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(15,51,86,0.95)',
        backdropFilter: 'blur(12px)',
        transition: 'transform 0.5s ease, opacity 0.5s ease',
        padding: '0 clamp(1.5rem, 3vw, 3rem)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <FestiventLogoSVG width={120} color="#fef7de" />
        </a>

        {/* Desktop nav */}
        <nav className="fv-desktop-nav" style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
        }}>
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} style={{
              textDecoration: 'none',
              color: '#fef7de',
              fontWeight: 700,
              fontSize: TYPO.bodySmall,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              padding: '0.45rem 1.1rem',
              border: '1.5px solid rgba(254,247,222,0.4)',
              borderRadius: '100px',
              transition: 'all 0.25s',
              fontFamily: "'Metro Sans', sans-serif",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fef7de'; e.currentTarget.style.color = '#0f3356' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fef7de' }}
            >{item.label}</a>
          ))}
          {/* Hamburger icon */}
          <button style={{
            background: 'none',
            border: '1.5px solid rgba(254,247,222,0.4)',
            borderRadius: '100px',
            padding: '0.45rem 0.7rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            alignItems: 'center',
            justifyContent: 'center',
          }} onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ width: 18, height: 2, background: '#fef7de', display: 'block', borderRadius: 1 }} />
            <span style={{ width: 18, height: 2, background: '#fef7de', display: 'block', borderRadius: 1 }} />
            <span style={{ width: 18, height: 2, background: '#fef7de', display: 'block', borderRadius: 1 }} />
          </button>
        </nav>

        {/* Mobile burger */}
        <button className="fv-burger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexDirection: 'column',
          gap: '5px',
          padding: '8px',
        }}>
          <span style={{ width: 24, height: 2.5, background: '#fef7de', display: 'block', borderRadius: 2, transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7.5px)' : 'none' }} />
          <span style={{ width: 24, height: 2.5, background: '#fef7de', display: 'block', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ width: 24, height: 2.5, background: '#fef7de', display: 'block', borderRadius: 2, transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7.5px)' : 'none' }} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: '#0f3356',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              textDecoration: 'none',
              color: '#fef7de',
              fontSize: TYPO.headlineLarge,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>{item.label}</a>
          ))}
          <a href="#tickets" onClick={() => setMenuOpen(false)} style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 2rem',
            border: '2px solid #fef7de',
            borderRadius: '100px',
            color: '#fef7de',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: TYPO.titleLarge,
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}>J&apos;ach&egrave;te mon billet!</a>
        </div>
      )}
    </>
  )
}
