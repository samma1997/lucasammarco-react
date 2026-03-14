'use client'

import { useState } from 'react'

/* ─── constants ─── */
const BASE = '/blocks/merit-first'
const IMG = `${BASE}/images`
const SVG = `${BASE}/svg`

const FONT_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

const C = {
  bgBase: '#0a0a0a',
  surface: '#111',
  surfaceHover: '#1a1a1a',
  border: '#262626',
  borderSubtle: '#404040',
  heading: '#fff',
  body: '#d4d4d4',
  muted: '#a3a3a3',
  dim: '#737373',
  brandRed: '#dc2626',
  brandBlue: '#3b82f6',
} as const

/* ─── shared inline style helpers ─── */
const container = (max = 1400): React.CSSProperties => ({
  maxWidth: max,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 24,
  paddingRight: 24,
  width: '100%',
})

const sectionPad: React.CSSProperties = {
  paddingTop: '6rem',
  paddingBottom: '6rem',
}

/* ─── keyframes injected once ─── */
const KEYFRAMES = `
@keyframes mf-textShimmer {
  0% { background-position: 250% center; }
  100% { background-position: -50% center; }
}
@keyframes mf-scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.3333%); }
}
@keyframes mf-scrollRight {
  0% { transform: translateX(-33.3333%); }
  100% { transform: translateX(0); }
}
@keyframes mf-fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
`

/* ─── logos data ─── */
const LOGOS_ROW1 = [
  { name: 'avila', src: `${IMG}/avila.png`, type: 'png' },
  { name: 'bronco', src: `${IMG}/bronco.png`, type: 'png' },
  { name: 'fieldguide', src: `${IMG}/fieldguide-color.png`, type: 'png' },
  { name: 'candid', src: `${IMG}/candid.png`, type: 'png' },
  { name: 'hellopatient', src: `${SVG}/hellopatient.svg`, type: 'svg' },
  { name: 'ramp', src: `${SVG}/ramp.svg`, type: 'svg' },
]
const LOGOS_ROW2 = [
  { name: 'patlytics', src: `${SVG}/patlytics.svg`, type: 'svg' },
  { name: 'standardmetrics', src: `${IMG}/standardmetrics.png`, type: 'png' },
  { name: 'fitlabs', src: `${SVG}/fitlabs.svg`, type: 'svg' },
  { name: 'clay', src: `${IMG}/clay.png`, type: 'png' },
  { name: 'loop', src: `${SVG}/loop.svg`, type: 'svg' },
  { name: 'promise', src: `${SVG}/promise.svg`, type: 'svg' },
]
const LOGOS_ROW3 = [
  { name: 'julius', src: `${SVG}/julius.svg`, type: 'svg' },
  { name: 'opto', src: `${SVG}/opto.svg`, type: 'svg' },
  { name: 'vals', src: `${SVG}/vals.svg`, type: 'svg' },
  { name: 'edia', src: `${SVG}/edia.svg`, type: 'svg' },
  { name: 'numeric', src: `${SVG}/numeric.svg`, type: 'svg' },
  { name: 'lightlabs', src: `${SVG}/lightlabs.svg`, type: 'svg' },
]

/* ─── capabilities tabs ─── */
const TABS = [
  {
    id: 'ai-test',
    label: 'AI Test Creation',
    title: 'AI Test Creation',
    subtitle: 'Build work-sample evaluations tailored to the role and company.',
    detail:
      'Design evaluations that mirror real work in minutes. AI generates tailored questions based on the role, level, and skills that matter to your team. Supports text, audio, video, code challenges, multiple choice, and document uploads.',
    image: `${IMG}/capabilities_ai-test-creation.png`,
  },
  {
    id: 'evaluation',
    label: 'Evaluation',
    title: 'Evaluation',
    subtitle: 'Objective scoring that eliminates bias from the hiring process.',
    detail:
      'AI-powered evaluation analyzes candidate responses against structured rubrics. Every submission is scored consistently, surfacing the best performers regardless of background or pedigree.',
    image: `${IMG}/capabilities_ai-test-creation.png`,
  },
  {
    id: 'integrity',
    label: 'Integrity',
    title: 'Integrity',
    subtitle: 'Ensure every assessment result is authentic and trustworthy.',
    detail:
      'Advanced proctoring, plagiarism detection, and behavioral analysis safeguard every assessment. Know that the person who took the test is the person you hire.',
    image: `${IMG}/capabilities_ai-test-creation.png`,
  },
  {
    id: 'ats',
    label: 'ATS Integration',
    title: 'ATS Integration',
    subtitle: 'Seamless integration with your existing hiring workflow.',
    detail:
      'Connect MeritFirst to your ATS in minutes. Candidate results sync automatically, so your team never leaves the tools they already use. Supports Greenhouse, Lever, Ashby, and more.',
    image: `${IMG}/capabilities_ai-test-creation.png`,
  },
  {
    id: 'candidate-exp',
    label: 'Candidate Experience',
    title: 'Candidate Experience',
    subtitle: 'A hiring process candidates actually respect.',
    detail:
      'Candidates receive clear instructions, fair timelines, and meaningful feedback. A great candidate experience strengthens your employer brand and attracts top talent.',
    image: `${IMG}/capabilities_ai-test-creation.png`,
  },
]

/* ─── sub-components ─── */

function TextWallRow({ text, count = 8 }: { text: string; count?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5em',
        whiteSpace: 'nowrap',
        lineHeight: 1.1,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ opacity: 0.9 }}>
          {text}
        </span>
      ))}
    </div>
  )
}

function LogoRow({
  logos,
  duration,
  reverse = false,
}: {
  logos: typeof LOGOS_ROW1
  duration: number
  reverse?: boolean
}) {
  const tripled = [...logos, ...logos, ...logos]
  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          width: 'max-content',
          animation: `${reverse ? 'mf-scrollRight' : 'mf-scrollLeft'} ${duration}s linear infinite`,
        }}
      >
        {tripled.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            loading="lazy"
            style={{
              height: 28,
              width: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1) grayscale(100%)',
              opacity: 0.5,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */

export default function MeritFirstFullPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tab = TABS[activeTab]

  return (
    <div
      style={{
        backgroundColor: C.bgBase,
        color: C.body,
        fontFamily: FONT_STACK,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* ═══════════ S1: HEADER ═══════════ */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(10,10,10,0.7)',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            ...container(1400),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img
              src={`${IMG}/icon-white.png`}
              alt="MeritFirst"
              style={{ height: 28, width: 28 }}
            />
            <span
              style={{
                color: C.heading,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              MeritFirst
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}
            className="mf-desktop-nav"
          >
            {['For Candidates', 'Manifesto', "We're Hiring!", 'Login'].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  color: C.muted,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.heading
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.muted
                }}
              >
                <span className="mf-link-underline">{label}</span>
              </a>
            ))}
            <a
              href="#"
              style={{
                backgroundColor: C.heading,
                color: C.bgBase,
                padding: '8px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              Book a Demo
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="mf-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: C.heading,
              cursor: 'pointer',
              padding: 8,
            }}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            className="mf-mobile-menu"
            style={{
              backgroundColor: 'rgba(10,10,10,0.95)',
              borderTop: `1px solid ${C.border}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {['For Candidates', 'Manifesto', "We're Hiring!", 'Login'].map((label) => (
              <a
                key={label}
                href="#"
                style={{ color: C.muted, textDecoration: 'none', fontSize: 16, fontWeight: 500 }}
              >
                {label}
              </a>
            ))}
            <a
              href="#"
              style={{
                backgroundColor: C.heading,
                color: C.bgBase,
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Book a Demo
            </a>
          </div>
        )}
      </header>

      {/* ═══════════ S2: "HIRING IS BROKEN." TEXT WALL ═══════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: C.bgBase,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35em',
            fontSize: 'clamp(32px, 7vw, 96px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: C.heading,
            letterSpacing: '-0.02em',
            userSelect: 'none',
            lineHeight: 1.1,
            overflow: 'hidden',
            width: '100%',
            padding: '0 0',
          }}
        >
          {Array.from({ length: 8 }).map((_, row) => (
            <TextWallRow key={row} text="HIRING IS BROKEN." count={8} />
          ))}
        </div>
        {/* Blur overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <img
            src={`${IMG}/blur-sm.png`}
            alt=""
            style={{
              width: '70%',
              maxWidth: 600,
              height: 'auto',
              mixBlendMode: 'screen',
              opacity: 0.7,
            }}
          />
        </div>
      </section>

      {/* ═══════════ S3: "FIX IT OR FAIL." TEXT WALL ═══════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: C.bgBase,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35em',
            fontSize: 'clamp(32px, 7vw, 96px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: C.heading,
            letterSpacing: '-0.02em',
            userSelect: 'none',
            lineHeight: 1.1,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {Array.from({ length: 8 }).map((_, row) => (
            <TextWallRow key={row} text="FIX IT OR FAIL." count={8} />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <img
            src={`${IMG}/blur-sm.png`}
            alt=""
            style={{
              width: '70%',
              maxWidth: 600,
              height: 'auto',
              mixBlendMode: 'screen',
              opacity: 0.5,
            }}
          />
        </div>
      </section>

      {/* ═══════════ S4: VALUE PROPOSITION ═══════════ */}
      <section style={{ ...sectionPad, paddingTop: '10rem', paddingBottom: '4rem' }}>
        <div style={{ ...container(800), textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw + 1rem, 72px)',
              fontWeight: 700,
              color: C.heading,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: 24,
            }}
          >
            You don&apos;t have to be lucky, you just have to be good.
          </h2>
          <p
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: C.muted,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Can you diagnose the problem?
          </p>
        </div>
      </section>

      {/* ═══════════ S5: DIAGNOSTIC ASSESSMENT (3 cards) ═══════════ */}
      <section style={{ ...sectionPad, paddingTop: '2rem' }}>
        <div style={container(1100)}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              marginBottom: 48,
            }}
          >
            {[
              {
                num: '01',
                text: 'You get 3 questions to investigate. No more. Ask the right ones.',
              },
              {
                num: '02',
                text: 'The answer is hidden. You have to ask for it. Think before you dig.',
              },
              {
                num: '03',
                text: 'Deliver your diagnosis and plan of action. What went wrong, and what should they do?',
              },
            ].map((card) => (
              <div
                key={card.num}
                style={{
                  backgroundColor: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: C.dim,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {card.num}
                </span>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: C.body,
                    margin: 0,
                  }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a
              href="#"
              style={{
                display: 'inline-block',
                backgroundColor: C.heading,
                color: C.bgBase,
                padding: '14px 36px',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,255,255,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Assessment
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ S6: MERITOCRACY CTA ═══════════ */}
      <section style={{ ...sectionPad, paddingTop: '8rem', paddingBottom: '8rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ ...container(1100), position: 'relative' }}>
          {/* Side text */}
          <div
            style={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%) rotate(90deg)',
              transformOrigin: 'center center',
              whiteSpace: 'nowrap',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: C.dim,
              display: 'none',
            }}
            className="mf-side-text"
          >
            Opportunity Promised. Outcomes Earned.
          </div>

          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(28px, 5vw + 1rem, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                margin: 0,
                marginBottom: 24,
                backgroundImage:
                  'linear-gradient(90deg, #fff 0%, #fff 40%, #a3a3a3 50%, #fff 60%, #fff 100%)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'mf-textShimmer 6s ease-in-out infinite',
              }}
            >
              Choose meritocracy. Try it yourself.
            </h2>
            <p
              style={{
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                color: C.muted,
                margin: 0,
                marginBottom: 40,
                lineHeight: 1.6,
              }}
            >
              Skills-based hiring assessments — hire on merit, not history
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.dim,
                margin: 0,
                marginBottom: 32,
              }}
            >
              Opportunity Promised. Outcomes Earned.
            </p>
            <a
              href="#"
              style={{
                display: 'inline-block',
                border: `1px solid ${C.borderSubtle}`,
                color: C.heading,
                padding: '14px 36px',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = C.heading
                e.currentTarget.style.color = C.bgBase
                e.currentTarget.style.borderColor = C.heading
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = C.heading
                e.currentTarget.style.borderColor = C.borderSubtle
              }}
            >
              Try An Assessment
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ S7: DUAL AUDIENCE ═══════════ */}
      <section style={sectionPad}>
        <div style={container(1100)}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {/* For Companies */}
            <div
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: '2.5rem',
                transition: 'border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.borderSubtle
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'rgba(59,130,246,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.brandBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: C.brandBlue,
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                For Companies
              </h3>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: C.body,
                  margin: 0,
                }}
              >
                Skills-based assessments that reveal who can do the job, not just who looks good on paper.
              </p>
            </div>

            {/* For Candidates */}
            <div
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: '2.5rem',
                transition: 'border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.borderSubtle
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'rgba(220,38,38,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.brandRed} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: C.brandRed,
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                For Candidates
              </h3>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: C.body,
                  margin: 0,
                }}
              >
                Skip the resume lottery. Prove your skills and get hired for what you can actually do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S8: CAPABILITIES / FEATURE TABS ═══════════ */}
      <section style={{ ...sectionPad, paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div style={container(1265)}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: C.dim,
              margin: 0,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            Capabilities
          </p>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw + 0.5rem, 56px)',
              fontWeight: 700,
              color: C.heading,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              textAlign: 'center',
              margin: 0,
              marginBottom: 48,
            }}
          >
            Focus on what actually matters.
          </h2>

          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              gap: 4,
              marginBottom: 48,
              overflowX: 'auto',
              borderBottom: `1px solid ${C.border}`,
              paddingBottom: 0,
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: i === activeTab ? `2px solid ${C.heading}` : '2px solid transparent',
                  color: i === activeTab ? C.heading : C.dim,
                  padding: '12px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s',
                  fontFamily: FONT_STACK,
                  marginBottom: -1,
                }}
                onMouseEnter={(e) => {
                  if (i !== activeTab) e.currentTarget.style.color = C.muted
                }}
                onMouseLeave={(e) => {
                  if (i !== activeTab) e.currentTarget.style.color = C.dim
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            key={tab.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 48,
              animation: 'mf-fadeIn 0.4s ease-out',
            }}
            className="mf-tab-content"
          >
            <div
              style={{
                display: 'grid',
                gap: 48,
                alignItems: 'center',
              }}
              className="mf-tab-grid"
            >
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(20px, 3vw, 32px)',
                    fontWeight: 700,
                    color: C.heading,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  {tab.title}
                </h3>
                <p
                  style={{
                    fontSize: 18,
                    color: C.body,
                    lineHeight: 1.5,
                    margin: 0,
                    marginBottom: 16,
                    fontWeight: 500,
                  }}
                >
                  {tab.subtitle}
                </p>
                <p
                  style={{
                    fontSize: 16,
                    color: C.muted,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {tab.detail}
                </p>
              </div>
              <div
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.surface,
                }}
              >
                <img
                  src={tab.image}
                  alt={tab.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S9: COMPANIES / CANDIDATES SPLIT CARDS ═══════════ */}
      <section style={sectionPad}>
        <div style={container(1100)}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {/* Companies */}
            <div
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 32,
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.borderSubtle
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 700,
                    color: C.heading,
                    letterSpacing: '-0.025em',
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  Companies
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: C.muted,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Build the best team and discover hidden talent. Evaluate candidates at scale, surface key insights, and protect your team&apos;s time.
                </p>
              </div>
              <a
                href="#"
                style={{
                  display: 'inline-block',
                  backgroundColor: C.heading,
                  color: C.bgBase,
                  padding: '14px 32px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'opacity 0.2s',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                Book a Demo
              </a>
            </div>

            {/* Candidates */}
            <div
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 32,
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.borderSubtle
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 700,
                    color: C.heading,
                    letterSpacing: '-0.025em',
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  Candidates
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: C.muted,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Stop submitting resumes into a black hole. Show what you can do and get hired for your real abilities, not just your credentials.
                </p>
              </div>
              <a
                href="#"
                style={{
                  display: 'inline-block',
                  border: `1px solid ${C.borderSubtle}`,
                  color: C.heading,
                  padding: '14px 32px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  backgroundColor: 'transparent',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = C.heading
                  e.currentTarget.style.color = C.bgBase
                  e.currentTarget.style.borderColor = C.heading
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = C.heading
                  e.currentTarget.style.borderColor = C.borderSubtle
                }}
              >
                Discover Opportunities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S10: LOGO CAROUSEL ═══════════ */}
      <section style={{ ...sectionPad, paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div style={{ ...container(1400), marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw + 0.5rem, 56px)',
              fontWeight: 700,
              color: C.heading,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              textAlign: 'center',
              margin: 0,
            }}
          >
            We are building for the courageous
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <LogoRow logos={LOGOS_ROW1} duration={30} />
          <LogoRow logos={LOGOS_ROW2} duration={35} reverse />
          <LogoRow logos={LOGOS_ROW3} duration={25} />
        </div>
      </section>

      {/* ═══════════ S11: FOOTER CTA ═══════════ */}
      <section
        style={{
          paddingTop: '8rem',
          paddingBottom: '8rem',
        }}
      >
        <div style={{ ...container(800), textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw + 1rem, 72px)',
              fontWeight: 700,
              color: C.heading,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: 20,
            }}
          >
            Choose meritocracy.
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: C.muted,
              lineHeight: 1.6,
              margin: 0,
              marginBottom: 48,
            }}
          >
            America&apos;s frontier is in unlocking our hidden talent.
          </p>
          <a
            href="#"
            style={{
              display: 'inline-block',
              backgroundColor: C.heading,
              color: C.bgBase,
              padding: '18px 48px',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Book a Demo
          </a>
        </div>
      </section>

      {/* ═══════════ S12: FOOTER ═══════════ */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: '4rem',
          paddingBottom: '3rem',
        }}
      >
        <div style={container(1400)}>
          {/* Footer grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 40,
              marginBottom: 64,
            }}
          >
            {/* Platform */}
            <div>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: C.dim,
                  margin: 0,
                  marginBottom: 20,
                }}
              >
                Platform
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li>
                  <a href="#" style={{ color: C.muted, textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = C.heading }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = C.muted }}
                  >
                    For Candidates
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: C.dim,
                  margin: 0,
                  marginBottom: 20,
                }}
              >
                Company
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Manifesto', 'Newsroom', "We're Hiring!"].map((link) => (
                  <li key={link}>
                    <a href="#" style={{ color: C.muted, textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = C.heading }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = C.muted }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: C.dim,
                  margin: 0,
                  marginBottom: 20,
                }}
              >
                Legal
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Terms & Conditions', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" style={{ color: C.muted, textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = C.heading }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = C.muted }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: C.dim,
                  margin: 0,
                  marginBottom: 20,
                }}
              >
                Connect
              </h4>
              <div style={{ display: 'flex', gap: 16 }}>
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/meritfirst/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: C.muted, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.heading }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.muted }}
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* X/Twitter */}
                <a
                  href="https://x.com/MeritFirstUS"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: C.muted, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.heading }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.muted }}
                  aria-label="X"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              paddingTop: 32,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            {/* Backed by */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: C.dim,
                }}
              >
                Backed by
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <img
                  src={`${SVG}/8vc-logo.svg`}
                  alt="8VC"
                  style={{ height: 20, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.6 }}
                />
                <img
                  src={`${SVG}/slow-ventures-logo.svg`}
                  alt="Slow Ventures"
                  style={{ height: 18, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.6 }}
                />
              </div>
            </div>

            {/* Built in Texas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img
                src={`${SVG}/texas-outline.svg`}
                alt="Texas"
                style={{ height: 18, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.5 }}
              />
              <span style={{ fontSize: 13, color: C.dim, fontWeight: 500 }}>Built in Texas</span>
            </div>

            {/* Copyright */}
            <p style={{ fontSize: 13, color: C.dim, margin: 0 }}>
              &copy; 2026 MeritFirst, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════ RESPONSIVE STYLES (injected) ═══════════ */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Link underline effect */
            .mf-link-underline {
              position: relative;
              display: inline-block;
            }
            .mf-link-underline::after {
              content: '';
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 0;
              height: 1px;
              background: currentColor;
              transition: width 0.3s ease;
            }
            .mf-link-underline:hover::after,
            a:hover .mf-link-underline::after {
              width: 100%;
            }

            /* Hide scrollbar on tabs */
            .mf-tab-content::-webkit-scrollbar { display: none; }

            /* Responsive: mobile */
            @media (max-width: 768px) {
              .mf-desktop-nav {
                display: none !important;
              }
              .mf-mobile-menu-btn {
                display: block !important;
              }
              .mf-side-text {
                display: none !important;
              }
            }

            /* Responsive: desktop */
            @media (min-width: 769px) {
              .mf-mobile-menu-btn {
                display: none !important;
              }
              .mf-mobile-menu {
                display: none !important;
              }
              .mf-side-text {
                display: block !important;
              }
            }

            /* Tab content grid on desktop */
            @media (min-width: 1024px) {
              .mf-tab-grid {
                grid-template-columns: 1fr 1.2fr !important;
              }
            }

            /* Smooth scrollbar */
            * {
              scrollbar-width: thin;
              scrollbar-color: #262626 transparent;
            }
          `,
        }}
      />
    </div>
  )
}
