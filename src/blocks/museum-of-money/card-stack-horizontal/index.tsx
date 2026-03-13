'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Exhibit card data
// ---------------------------------------------------------------------------
interface Exhibit {
  title: string
  image: string
  description: string
}

const EXHIBITS: Exhibit[] = [
  {
    title: 'Dex Diamondhands',
    image: '/blocks/museum-of-money/images/exhibits/exhibit-5.avif',
    description: 'Our 80s AI dude reads your financial future',
  },
  {
    title: 'Currency Designer',
    image: '/blocks/museum-of-money/images/exhibits/exhibit-9.avif',
    description: 'Design your own dough',
  },
  {
    title: 'Bull vs Bear',
    image: '/blocks/museum-of-money/images/exhibits/exhibit-7.avif',
    description: 'Ring the bell, watch the battle',
  },
  {
    title: 'Penny Thinkers',
    image: '/blocks/museum-of-money/images/exhibits/exhibit-1.avif',
    description: 'Mind tricks and money',
  },
  {
    title: 'Cash Shower',
    image: '/blocks/museum-of-money/images/exhibits/exhibit-6.avif',
    description: 'Hop into a tub full of dollars',
  },
  {
    title: 'Ask MoAI',
    image: '/blocks/museum-of-money/images/exhibits/exhibit-2.avif',
    description: 'Chat with our AI for finance life-hacks',
  },
]

// Per-card random rotation/drift values — deterministic so SSR & client match
const CARD_TRANSFORMS = [
  { rotation: 12, xPct: 40, yPct: 14 },
  { rotation: -15, xPct: -35, yPct: 12 },
  { rotation: 10, xPct: 45, yPct: -13 },
  { rotation: -18, xPct: -42, yPct: 16 },
  { rotation: 14, xPct: 38, yPct: -11 },
  { rotation: -11, xPct: -44, yPct: 15 },
]

// ---------------------------------------------------------------------------
// Single exhibit card
// ---------------------------------------------------------------------------
function ExhibitCard({ exhibit, index }: { exhibit: Exhibit; index: number }) {
  return (
    <article
      data-card-stack-card
      style={{
        flexShrink: 0,
        width: 'clamp(240px, 28vw, 380px)',
        borderRadius: '1.2rem',
        overflow: 'hidden',
        backgroundColor: '#004923',
        border: '1px solid rgba(28,229,133,0.18)',
        display: 'flex',
        flexDirection: 'column',
        willChange: 'transform',
        transformOrigin: 'center center',
        boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
      }}
      aria-label={exhibit.title}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <Image
          src={exhibit.image}
          alt={exhibit.title}
          fill
          sizes="(max-width: 767px) 85vw, 28vw"
          style={{ objectFit: 'cover' }}
          priority={index < 2}
        />
        {/* Number badge */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: '#1ce585',
            color: '#00592b',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Text */}
      <div
        style={{
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          flexGrow: 1,
        }}
      >
        <h3
          className="card-title"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: '#f1f0ec',
            margin: 0,
          }}
        >
          {exhibit.title}
        </h3>
        <p
          className="card-description"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
            lineHeight: 1.5,
            color: 'rgba(241,240,236,0.65)',
            margin: 0,
          }}
        >
          {exhibit.description}
        </p>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// CardStackSection
// ---------------------------------------------------------------------------
export default function CardStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const outroRef = useRef<HTMLDivElement>(null)
  const isMobileRef = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    isMobileRef.current = window.innerWidth < 768

    if (isMobileRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const list = listRef.current
      const intro = introRef.current
      const outro = outroRef.current
      const cards = list?.querySelectorAll<HTMLElement>('[data-card-stack-card]')

      if (!track || !list || !intro || !outro || !cards) return

      const getScrollDistance = () =>
        list.scrollWidth - window.innerWidth

      const scrollTween = gsap.to(list, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: track,
          pin: true,
          scrub: true,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      if (!prefersReduced) {
        cards.forEach((card, i) => {
          const t = CARD_TRANSFORMS[i] ?? CARD_TRANSFORMS[0]
          gsap.fromTo(
            card,
            {
              rotation: t.rotation,
              xPercent: t.xPct,
              yPercent: t.yPct,
            },
            {
              rotation: 0,
              xPercent: 0,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 120%',
                end: 'right -20%',
                scrub: true,
              },
            },
          )
        })
      }

      if (cards[0]) {
        gsap.to(intro, {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[0],
            containerAnimation: scrollTween,
            start: 'left 100%',
            end: 'left 50%',
            scrub: true,
          },
        })
      }

      const lastCard = cards[cards.length - 1]
      if (lastCard) {
        gsap.fromTo(
          outro,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: lastCard,
              containerAnimation: scrollTween,
              start: 'right 80%',
              end: 'right 20%',
              scrub: true,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-card-stack-wrap
      style={{
        backgroundColor: '#00592b',
        color: '#f1f0ec',
        position: 'relative',
      }}
    >
      <div
        ref={trackRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Intro text */}
        <div
          ref={introRef}
          data-card-stack-intro
          style={{
            position: 'absolute',
            top: '50%',
            left: 'clamp(1.5rem, 5vw, 5rem)',
            transform: 'translateY(-50%)',
            zIndex: 10,
            maxWidth: '20rem',
          }}
          className="card-stack-intro"
        >
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#1ce585',
              marginBottom: '0.5rem',
            }}
          >
            Featured Exhibits
          </p>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#f1f0ec',
              margin: 0,
            }}
          >
            Six Ways<br />to Spend<br />Your Mind
          </h2>
        </div>

        {/* Card row */}
        <div
          ref={listRef}
          data-card-stack-list
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 'clamp(1rem, 2vw, 1.75rem)',
            padding:
              'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem) clamp(4rem, 8vw, 8rem)',
            paddingLeft: 'clamp(18rem, 38vw, 42rem)',
            paddingRight: 'clamp(18rem, 30vw, 36rem)',
            width: 'max-content',
            minHeight: '100vh',
            willChange: 'transform',
          }}
        >
          {EXHIBITS.map((exhibit, i) => (
            <ExhibitCard key={exhibit.title} exhibit={exhibit} index={i} />
          ))}
        </div>

        {/* Outro */}
        <div
          ref={outroRef}
          data-card-stack-outro
          style={{
            position: 'absolute',
            top: '50%',
            right: 'clamp(1.5rem, 5vw, 5rem)',
            transform: 'translateY(-50%)',
            zIndex: 10,
            textAlign: 'right',
            opacity: 0,
            visibility: 'hidden',
          }}
          className="card-stack-outro"
        >
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              color: 'rgba(241,240,236,0.65)',
              marginBottom: '1rem',
            }}
          >
            And there&apos;s even more inside.
          </p>
          <Link
            href="/exhibits"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding:
                'clamp(0.65rem, 1.2vw, 0.9rem) clamp(1.25rem, 2.5vw, 2rem)',
              backgroundColor: '#1ce585',
              color: '#00592b',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              borderRadius: '0.3rem',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#f1f0ec'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#1ce585'
              el.style.transform = 'translateY(0)'
            }}
          >
            Explore our exhibits
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE: vertical card grid (visible < 768px)                        */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        @media (max-width: 767px) {
          .card-stack-intro,
          .card-stack-outro {
            display: none !important;
          }

          [data-card-stack-list] {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            flex-direction: unset !important;
            width: auto !important;
            min-height: unset !important;
            padding: 1.5rem !important;
            gap: 1rem !important;
            transform: none !important;
          }

          [data-card-stack-card] {
            width: 100% !important;
            transform: none !important;
            rotation: 0 !important;
          }
        }

        @media (max-width: 479px) {
          [data-card-stack-list] {
            grid-template-columns: 1fr !important;
          }
        }

        .mobile-section-header {
          display: none;
        }

        @media (max-width: 767px) {
          .mobile-section-header {
            display: block;
            padding: 3rem 1.5rem 1rem;
          }
        }
      `}</style>

      {/* Mobile-only header */}
      <div className="mobile-section-header">
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#1ce585',
            marginBottom: '0.5rem',
          }}
        >
          Featured Exhibits
        </p>
        <h2
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#f1f0ec',
            marginBottom: '0',
          }}
        >
          Six Ways to Spend Your Mind
        </h2>
      </div>

      {/* Mobile-only CTA */}
      <div
        style={{
          display: 'none',
          padding: '1.5rem 1.5rem 3rem',
        }}
        className="mobile-outro"
      >
        <Link
          href="/exhibits"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1ce585',
            color: '#00592b',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            borderRadius: '0.3rem',
          }}
        >
          Explore our exhibits
        </Link>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .mobile-outro {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
