'use client'

import { useCallback, type CSSProperties } from 'react'
import { MF_COLORS, MF_COMPANIES, IMG } from '../_shared'

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */

const KEYFRAMES = `
@keyframes mf-marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
`

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FONT_STACK =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

const LOGO_PATH = `${IMG}/logos`

/* ------------------------------------------------------------------ */
/*  Inline styles                                                      */
/* ------------------------------------------------------------------ */

const styles = {
  section: {
    backgroundColor: MF_COLORS.base,
    padding: '4rem 0',
    overflow: 'hidden',
    fontFamily: FONT_STACK,
  } satisfies CSSProperties,

  title: {
    fontSize: 'clamp(20px, 3vw, 24px)',
    color: MF_COLORS.textMuted,
    letterSpacing: '-0.02em',
    fontWeight: 500,
    textAlign: 'center',
    margin: '0 0 3rem',
    padding: '0 1.5rem',
    lineHeight: 1.4,
  } satisfies CSSProperties,

  marqueeContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    maskImage:
      'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage:
      'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  } satisfies CSSProperties,

  marqueeTrack: {
    display: 'flex',
    alignItems: 'center',
    gap: '80px',
    width: 'max-content',
    animation: 'mf-marquee-scroll 30s linear infinite',
  } satisfies CSSProperties,

  logoItem: {
    flexShrink: 0,
    width: '130px',
    height: '40px',
    objectFit: 'contain',
    filter: 'grayscale(1) brightness(0) invert(1) opacity(0.5)',
    transition: 'filter 0.3s ease, opacity 0.3s ease',
    opacity: 0.5,
    userSelect: 'none',
    pointerEvents: 'auto',
  } satisfies CSSProperties,

  logoItemHover: {
    filter: 'grayscale(0) brightness(0) invert(1) opacity(0.8)',
    opacity: 0.8,
  } satisfies CSSProperties,
}

/* ------------------------------------------------------------------ */
/*  Responsive overrides                                               */
/* ------------------------------------------------------------------ */

const RESPONSIVE_CSS = `
@media (max-width: 768px) {
  .mf-marquee-track {
    gap: 48px !important;
  }
}
.mf-marquee-container:hover .mf-marquee-track {
  animation-play-state: paused;
}
`

/* ------------------------------------------------------------------ */
/*  Logo component with error handling                                 */
/* ------------------------------------------------------------------ */

function LogoImg({ company }: { company: string }) {
  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.style.display = 'none'
    },
    [],
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.currentTarget.style.filter =
        'grayscale(0) brightness(0) invert(1) opacity(0.8)'
      e.currentTarget.style.opacity = '0.8'
    },
    [],
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.currentTarget.style.filter =
        'grayscale(1) brightness(0) invert(1) opacity(0.5)'
      e.currentTarget.style.opacity = '0.5'
    },
    [],
  )

  return (
    <img
      src={`${LOGO_PATH}/${company}.svg`}
      alt={company}
      loading="lazy"
      draggable={false}
      style={styles.logoItem}
      onError={handleError}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/** Duplicated array for seamless infinite scroll. */
const LOGOS_DOUBLED = [...MF_COMPANIES, ...MF_COMPANIES]

export default function LogosCarousel() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES + RESPONSIVE_CSS }} />

      <section style={styles.section}>
        {/* Title */}
        <p style={styles.title}>We are building for the courageous</p>

        {/* Marquee */}
        <div
          className="mf-marquee-container"
          style={styles.marqueeContainer}
        >
          <div
            className="mf-marquee-track"
            style={styles.marqueeTrack}
          >
            {LOGOS_DOUBLED.map((company, i) => (
              <LogoImg key={`${company}-${i}`} company={company} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
