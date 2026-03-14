'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import {
  MF_COLORS,
  MF_TYPO,
  MF_TRACKING,
  MF_LEADING,
  IMG,
} from '../_shared'

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FONT_STACK =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

const CYCLE_INTERVAL_MS = 2000
const TOTAL_STEPS = 3

const OPTIONS = [
  {
    level: 'Beginner',
    desc: 'Basic spreadsheet skills',
  },
  {
    level: 'Intermediate',
    desc: 'Statistical analysis & visualization',
  },
  {
    level: 'Advanced',
    desc: 'ML models & predictive analytics',
  },
] as const

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */

const KEYFRAMES = `
@keyframes mf2-beam-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}
`

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const s = {
  section: {
    minHeight: '80vh',
    backgroundColor: MF_COLORS.base,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    fontFamily: FONT_STACK,
  } satisfies CSSProperties,

  sectionTitle: {
    fontSize: MF_TYPO.sectionHeading,
    lineHeight: MF_LEADING.heading,
    letterSpacing: MF_TRACKING.sectionHeading,
    fontWeight: 700,
    color: MF_COLORS.white,
    textAlign: 'center',
    margin: '0 0 16px',
  } satisfies CSSProperties,

  sectionSub: {
    fontSize: MF_TYPO.body,
    lineHeight: MF_LEADING.body,
    color: MF_COLORS.textMuted,
    textAlign: 'center',
    margin: '0 0 48px',
    maxWidth: '480px',
  } satisfies CSSProperties,

  /* -- Card wrapper with perspective -- */
  perspective: {
    perspective: '1000px',
    width: '100%',
    maxWidth: '680px',
  } satisfies CSSProperties,

  cardOuter: {
    position: 'relative',
    backfaceVisibility: 'hidden',
  } satisfies CSSProperties,

  /* -- Beam border -- */
  beamWrap: {
    position: 'absolute',
    inset: '-2px',
    borderRadius: '18px',
    overflow: 'hidden',
    pointerEvents: 'none',
  } satisfies CSSProperties,

  beamDisc: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200%',
    height: '200%',
    background:
      'conic-gradient(from 0deg, transparent 0deg 200deg, #3b82f6 260deg, #ef4444 320deg, transparent 360deg)',
    animation: 'mf2-beam-spin 4s linear infinite',
  } satisfies CSSProperties,

  /* -- Card surface -- */
  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    color: '#000',
    zIndex: 1,
  } satisfies CSSProperties,

  /* -- Card content -- */
  cardHeader: {
    fontSize: '1.125rem',
    fontWeight: 700,
    margin: '0 0 20px',
    color: '#000',
  } satisfies CSSProperties,

  /* -- Progress steps -- */
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  } satisfies CSSProperties,

  progressDotActive: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: MF_COLORS.brandBlue,
    flexShrink: 0,
  } satisfies CSSProperties,

  progressDotInactive: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#d4d4d4',
    flexShrink: 0,
  } satisfies CSSProperties,

  progressLine: {
    width: '32px',
    height: '2px',
    backgroundColor: '#e5e5e5',
    flexShrink: 0,
  } satisfies CSSProperties,

  question: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#000',
    margin: '0 0 16px',
    lineHeight: '1.4',
  } satisfies CSSProperties,

  optionsWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '24px',
  } satisfies CSSProperties,

  option: (selected: boolean): CSSProperties => ({
    border: `1.5px solid ${selected ? MF_COLORS.brandBlue : '#e5e5e5'}`,
    borderRadius: '8px',
    padding: '12px 16px',
    backgroundColor: selected ? 'rgba(59,130,246,0.06)' : 'transparent',
    cursor: 'pointer',
    transition: 'border-color 0.25s ease, background-color 0.25s ease',
    textAlign: 'left',
  }),

  optionLevel: {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: '#000',
  } satisfies CSSProperties,

  optionDesc: {
    fontWeight: 400,
    fontSize: '0.875rem',
    color: '#666',
  } satisfies CSSProperties,

  nextBtn: {
    width: '100%',
    height: '40px',
    backgroundColor: MF_COLORS.base,
    color: MF_COLORS.white,
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: 600,
    fontFamily: FONT_STACK,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  } satisfies CSSProperties,
} as const

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BeamSpinCard() {
  const [activeOption, setActiveOption] = useState(0)

  /* Auto-cycle through options */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveOption((prev) => (prev + 1) % OPTIONS.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <section style={s.section}>
        {/* Section heading */}
        <h2 style={s.sectionTitle}>See it in action</h2>
        <p style={s.sectionSub}>
          Our AI creates role-specific assessments in seconds
        </p>

        {/* Card with beam border */}
        <div style={s.perspective}>
          <div style={s.cardOuter}>
            {/* Rotating beam glow layer */}
            <div style={s.beamWrap} aria-hidden="true">
              <div style={s.beamDisc} />
            </div>

            {/* Card content */}
            <div style={s.card}>
              <p style={s.cardHeader}>Quick Assessment</p>

              {/* Progress steps */}
              <div style={s.progressRow}>
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={
                        i === 0
                          ? s.progressDotActive
                          : s.progressDotInactive
                      }
                    />
                    {i < TOTAL_STEPS - 1 && <div style={s.progressLine} />}
                  </div>
                ))}
              </div>

              {/* Question */}
              <p style={s.question}>
                What best describes your experience with data analysis?
              </p>

              {/* Answer options */}
              <div style={s.optionsWrap}>
                {OPTIONS.map((opt, i) => (
                  <div
                    key={opt.level}
                    style={s.option(activeOption === i)}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveOption(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveOption(i)
                      }
                    }}
                  >
                    <span style={s.optionLevel}>{opt.level}</span>
                    <span style={s.optionDesc}> — {opt.desc}</span>
                  </div>
                ))}
              </div>

              {/* Next button */}
              <button type="button" style={s.nextBtn}>
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
