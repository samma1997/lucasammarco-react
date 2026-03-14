'use client'

import { useState, useEffect, useRef, type CSSProperties } from 'react'
import {
  MF_COLORS,
  MF_TYPO,
  MF_TRACKING,
  MF_LEADING,
  MF_CONTENT_WIDTH,
  IMG,
} from '../_shared'

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SCRAMBLE_CHARS = '░▒▓█▀▄■□●○◆◇'
const STAGGER_MS = 30
const SCRAMBLE_ITERATIONS = 4
const SCRAMBLE_STEP_MS = 35

/* ------------------------------------------------------------------ */
/*  ScrambleText                                                       */
/* ------------------------------------------------------------------ */

interface CharState {
  char: string
  opacity: number
  y: number
}

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState<CharState[]>(
    text.split('').map(() => ({
      char: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
      opacity: 0.15,
      y: 12,
    })),
  )

  useEffect(() => {
    const chars = text.split('')
    const timeouts: ReturnType<typeof setTimeout>[] = []

    chars.forEach((targetChar, i) => {
      const startTime = delay + i * STAGGER_MS

      // Scramble phase -- cycle through random block characters
      for (let j = 0; j < SCRAMBLE_ITERATIONS; j++) {
        timeouts.push(
          setTimeout(() => {
            setDisplayed((prev) => {
              const next = [...prev]
              next[i] = {
                char:
                  targetChar === ' '
                    ? ' '
                    : SCRAMBLE_CHARS[
                        Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                      ],
                opacity: 0.2 + j * 0.18,
                y: 12 - j * 3,
              }
              return next
            })
          }, startTime + j * SCRAMBLE_STEP_MS),
        )
      }

      // Final reveal
      timeouts.push(
        setTimeout(() => {
          setDisplayed((prev) => {
            const next = [...prev]
            next[i] = { char: targetChar, opacity: 1, y: 0 }
            return next
          })
        }, startTime + SCRAMBLE_ITERATIONS * SCRAMBLE_STEP_MS),
      )
    })

    return () => timeouts.forEach(clearTimeout)
  }, [text, delay])

  return (
    <span style={{ display: 'inline' }} aria-label={text}>
      {displayed.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            opacity: d.opacity,
            transform: `translateY(${d.y}px)`,
            transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
            minWidth: text[i] === ' ' ? '0.3em' : undefined,
            color: d.opacity < 1 ? MF_COLORS.textDim : MF_COLORS.white,
          }}
        >
          {d.char}
        </span>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  AssessmentCard — fake 3-step assessment preview                     */
/* ------------------------------------------------------------------ */

function AssessmentCard({ opacity, scale }: { opacity: number; scale: number }) {
  const steps = [
    { num: 1, label: 'Role Analysis', desc: 'AI maps required competencies', active: true },
    { num: 2, label: 'Skill Assessment', desc: 'Adaptive difficulty scoring', active: false },
    { num: 3, label: 'Candidate Ranking', desc: 'Merit-based leaderboard', active: false },
  ]

  return (
    <div
      style={{
        position: 'relative',
        marginTop: '48px',
        width: '100%',
        maxWidth: '480px',
        opacity,
        transform: `scale(${scale})`,
        transition: 'opacity 0.1s linear, transform 0.1s linear',
      }}
    >
      {/* Beam border wrapper */}
      <div style={styles.cardBeamWrapper}>
        {/* Spinning conic gradient */}
        <div style={styles.cardBeamDisc} aria-hidden="true" />

        {/* Inner card */}
        <div style={styles.cardInner}>
          {/* Card header */}
          <div style={styles.cardHeader}>
            <div style={styles.cardDot} />
            <span style={styles.cardHeaderLabel}>Assessment Preview</span>
            <span style={styles.cardHeaderBadge}>AI-Powered</span>
          </div>

          {/* Steps */}
          <div style={styles.cardSteps}>
            {steps.map((step) => (
              <div key={step.num} style={styles.cardStep}>
                <div
                  style={{
                    ...styles.cardStepNum,
                    ...(step.active ? styles.cardStepNumActive : {}),
                  }}
                >
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      ...styles.cardStepLabel,
                      color: step.active ? '#000' : 'rgba(0,0,0,0.5)',
                    }}
                  >
                    {step.label}
                  </div>
                  <div style={styles.cardStepDesc}>{step.desc}</div>
                </div>
                {step.active && (
                  <div style={styles.cardStepIndicator}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ animation: 'mf-pulse 2s ease-in-out infinite' }}
                    >
                      <circle cx="8" cy="8" r="4" fill={MF_COLORS.brandBlue} />
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke={MF_COLORS.brandBlue}
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={styles.cardProgress}>
            <div style={styles.cardProgressTrack}>
              <div style={styles.cardProgressBar} />
            </div>
            <span style={styles.cardProgressLabel}>Step 1 of 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Keyframe styles injected via <style>                               */
/* ------------------------------------------------------------------ */

const KEYFRAMES = `
@keyframes mf-beam-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes mf-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes mf-progress {
  0% { width: 0%; }
  100% { width: 33%; }
}
`

/* ------------------------------------------------------------------ */
/*  Shared inline styles                                               */
/* ------------------------------------------------------------------ */

const FONT_STACK =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

const styles = {
  outerWrap: {
    height: '180vh',
    position: 'relative',
  } satisfies CSSProperties,

  sticky: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MF_COLORS.base,
    overflow: 'hidden',
    fontFamily: FONT_STACK,
  } satisfies CSSProperties,

  bgGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '140%',
    height: '140%',
    background:
      'radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.07) 0%, rgba(239,68,68,0.035) 40%, transparent 70%)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  } satisfies CSSProperties,

  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: MF_CONTENT_WIDTH,
    width: '100%',
    padding: '24px',
  } satisfies CSSProperties,

  headline: {
    fontSize: MF_TYPO.hero,
    lineHeight: MF_LEADING.hero,
    letterSpacing: MF_TRACKING.hero,
    fontWeight: 700,
    color: MF_COLORS.white,
    textTransform: 'uppercase',
    margin: 0,
  } satisfies CSSProperties,

  subtitle: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    lineHeight: MF_LEADING.body,
    color: MF_COLORS.textMuted,
    maxWidth: '500px',
    margin: '24px auto 0',
    fontWeight: 400,
  } satisfies CSSProperties,

  tagline: {
    fontSize: '0.875rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: MF_COLORS.textDim,
    marginTop: '12px',
    fontWeight: 500,
  } satisfies CSSProperties,

  buttonRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '36px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  } satisfies CSSProperties,

  btnBase: {
    height: '48px',
    borderRadius: '4px',
    padding: '0 24px',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: FONT_STACK,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease, transform 0.15s ease',
    whiteSpace: 'nowrap',
  } satisfies CSSProperties,

  btnDemo: {
    backgroundColor: MF_COLORS.surface,
    color: MF_COLORS.white,
    border: `1px solid rgba(255,255,255,0.2)`,
  } satisfies CSSProperties,

  btnAssessment: {
    backgroundColor: MF_COLORS.white,
    color: MF_COLORS.base,
    border: 'none',
  } satisfies CSSProperties,

  /* Assessment card styles */
  cardBeamWrapper: {
    position: 'relative',
    borderRadius: '12px',
    padding: '2px',
    overflow: 'hidden',
    background: 'rgba(255,255,255,0.08)',
  } satisfies CSSProperties,

  cardBeamDisc: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200%',
    height: '200%',
    background:
      'conic-gradient(from 0deg, transparent 0deg 200deg, #3b82f6 260deg, #ef4444 320deg, transparent 360deg)',
    animation: 'mf-beam-spin 4s linear infinite',
  } satisfies CSSProperties,

  cardInner: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    color: '#000',
  } satisfies CSSProperties,

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
  } satisfies CSSProperties,

  cardDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
  } satisfies CSSProperties,

  cardHeaderLabel: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#000',
    flex: 1,
    textAlign: 'left',
  } satisfies CSSProperties,

  cardHeaderBadge: {
    fontSize: '0.6875rem',
    fontWeight: 600,
    color: MF_COLORS.brandBlue,
    backgroundColor: 'rgba(59,130,246,0.1)',
    padding: '2px 8px',
    borderRadius: '100px',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  } satisfies CSSProperties,

  cardSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  } satisfies CSSProperties,

  cardStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 10px',
    borderRadius: '8px',
    textAlign: 'left',
  } satisfies CSSProperties,

  cardStepNum: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 700,
    backgroundColor: 'rgba(0,0,0,0.06)',
    color: 'rgba(0,0,0,0.4)',
    flexShrink: 0,
  } satisfies CSSProperties,

  cardStepNumActive: {
    backgroundColor: MF_COLORS.brandBlue,
    color: '#fff',
  } satisfies CSSProperties,

  cardStepLabel: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    lineHeight: 1.3,
  } satisfies CSSProperties,

  cardStepDesc: {
    fontSize: '0.6875rem',
    color: 'rgba(0,0,0,0.4)',
    lineHeight: 1.3,
    marginTop: '1px',
  } satisfies CSSProperties,

  cardStepIndicator: {
    flexShrink: 0,
  } satisfies CSSProperties,

  cardProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(0,0,0,0.08)',
  } satisfies CSSProperties,

  cardProgressTrack: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
  } satisfies CSSProperties,

  cardProgressBar: {
    height: '100%',
    width: '33%',
    borderRadius: '2px',
    background: `linear-gradient(90deg, ${MF_COLORS.brandBlue}, ${MF_COLORS.brandRed})`,
    animation: 'mf-progress 1.5s ease-out forwards',
  } satisfies CSSProperties,

  cardProgressLabel: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.4)',
    whiteSpace: 'nowrap',
  } satisfies CSSProperties,
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeroStickyScramble() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      if (!outerRef.current) return
      const rect = outerRef.current.getBoundingClientRect()
      const totalScroll = outerRef.current.offsetHeight - window.innerHeight
      if (totalScroll <= 0) {
        setScrollProgress(0)
        return
      }
      // How far we've scrolled through the extra 80vh
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Card interpolation: opacity 0.4 -> 1, scale 0.98 -> 1
  const cardOpacity = 0.4 + scrollProgress * 0.6
  const cardScale = 0.98 + scrollProgress * 0.02

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div ref={outerRef} style={styles.outerWrap}>
        <section style={styles.sticky}>
          {/* Background blur glow */}
          <div style={styles.bgGlow} />

          <div style={styles.content}>
            {/* Headline */}
            <h1 style={styles.headline}>
              <ScrambleText text="HIRING IS BROKEN." delay={200} />
              <br />
              <ScrambleText text="FIX IT OR FAIL." delay={800} />
            </h1>

            {/* Subtitle */}
            <p style={styles.subtitle}>
              You don&apos;t have to be lucky, you just have to be good
            </p>

            {/* Tagline */}
            <p style={styles.tagline as CSSProperties}>
              Opportunity Promised. Outcomes Earned.
            </p>

            {/* CTAs */}
            <div style={styles.buttonRow}>
              <button
                type="button"
                style={{ ...styles.btnBase, ...styles.btnDemo }}
              >
                Book a Demo
              </button>

              <button
                type="button"
                style={{ ...styles.btnBase, ...styles.btnAssessment }}
              >
                Start Assessment
              </button>
            </div>

            {/* Assessment preview card */}
            <AssessmentCard opacity={cardOpacity} scale={cardScale} />
          </div>
        </section>
      </div>
    </>
  )
}
