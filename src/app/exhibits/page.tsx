'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '@/components/Footer'
import FlipButton from '@/components/FlipButton'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                                 */
/* ------------------------------------------------------------------ */

const GROUND_FLOOR = [
  {
    number: '01',
    title: 'Money, Unmasked',
    description:
      'Peel back every assumption you carry about money. Through hands-on activations and immersive storytelling, discover how your personal relationship with cash was shaped — and how to rewrite it.',
    image: '/images/exhibits/exhibit-1.avif',
    accent: '#1ce585',
  },
  {
    number: '02',
    title: 'Barter Bazaar',
    description:
      'Step into an ancient marketplace where shells, salt, and spices ruled commerce. Trade your way through history and feel how barter shaped civilizations long before the first coin was struck.',
    image: '/images/exhibits/exhibit-2.avif',
    accent: '#f580db',
  },
  {
    number: '03',
    title: 'Currency Curiosities',
    description:
      'From rai stones the size of cartwheels to cardboard emergency notes, explore the strangest, rarest, and most beautifully bizarre currencies ever to circulate the globe.',
    image: '/images/showcase/697a753241ff66a57d68e5e8_9. Catch the Counterfeits.avif',
    accent: '#ffec00',
  },
  {
    number: '04',
    title: "Gold Diggers' Den",
    description:
      'Strike gold — literally. Pan for flakes, lift an actual gold bar, and snap the ultimate flex photo surrounded by glittering treasure. Your feed will thank you.',
    image: '/images/exhibits/exhibit-5.avif',
    accent: '#ff7c24',
  },
  {
    number: '05',
    title: 'MoKnowledge Lab',
    description:
      'Challenge an AI to a financial duel, decode the language of investing, and walk out with an actual financial literacy certification. Education has never felt this alive.',
    image: '/images/exhibits/exhibit-6.avif',
    accent: '#9eb5ff',
  },
]

const LOWER_LEVEL = [
  {
    number: '06',
    title: 'Money Canvas',
    description:
      'Where art meets economics. World-class murals and installations reimagine currency as creative expression — because every bill is already a tiny masterpiece.',
    image: '/images/exhibits/exhibit-7.avif',
    accent: '#f580db',
  },
  {
    number: '07',
    title: 'The MoMoney Bank',
    description:
      'The vault is real. The laser maze is live. Navigate pressure-sensitive beams, crack the combination, and stage the most cinematic heist your camera roll has ever seen.',
    image: '/images/showcase/697a747e577ab58c0bf5445c_16. Lazer Maze.avif',
    accent: '#1ce585',
  },
  {
    number: '08',
    title: 'InstaMoney Photo Ops',
    description:
      'Larger-than-life backdrops engineered for maximum shareability. Money showers, dollar-bill wallpaper, and neon-lit stages — every corner is a hero shot waiting to happen.',
    image: '/images/showcase/697a70e6e10fc15113187ffc_21. Snap & Flex 2.avif',
    accent: '#9eb5ff',
  },
  {
    number: '09',
    title: 'Market Madness',
    description:
      'Ring the bell and enter a live trading floor simulation. Read the ticker, make the call, and find out if you have what it takes to beat the market — before the closing bell.',
    image: '/images/exhibits/exhibit-9.avif',
    accent: '#ffec00',
  },
  {
    number: '10',
    title: 'Money, Rebooted',
    description:
      'Design your own currency. Study hyperinflation through immersive data art. Explore crypto, digital wallets, and whatever comes next — the future of money starts here.',
    image: '/images/showcase/697a7557660f6271d0dddcb1_5. Marketplace Shuffle.avif',
    accent: '#ff0037',
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                            */
/* ------------------------------------------------------------------ */

export default function ExhibitsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const groundCardsRef = useRef<HTMLDivElement>(null)
  const lowerCardsRef = useRef<HTMLDivElement>(null)
  const floorHeadRefs = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero title */
      gsap.fromTo(
        heroRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
      )

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.25 }
      )

      /* Floor headings */
      floorHeadRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* Ground floor cards */
      if (groundCardsRef.current) {
        const cards = groundCardsRef.current.querySelectorAll<HTMLElement>('.exhibit-card')
        gsap.fromTo(
          cards,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: groundCardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      /* Lower level cards */
      if (lowerCardsRef.current) {
        const cards = lowerCardsRef.current.querySelectorAll<HTMLElement>('.exhibit-card')
        gsap.fromTo(
          cards,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: lowerCardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      /* CTA */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .exhibits-page {
          background-color: var(--black);
          color: var(--white);
          min-height: 100vh;
        }

        /* ---- Hero ---- */
        .exhibits-hero {
          padding-top: var(--section-space-page-top);
          padding-bottom: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }

        .exhibits-hero__eyebrow {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(241, 240, 236, 0.45);
          margin-bottom: 1rem;
        }

        .exhibits-hero__heading {
          max-width: 22ch;
        }

        .exhibits-hero__subtitle {
          margin-top: var(--space-2);
          font-size: var(--font-size-text-large);
          line-height: 1.5;
          color: rgba(241, 240, 236, 0.65);
          max-width: 56ch;
        }

        /* ---- Section divider bar ---- */
        .exhibits-divider {
          width: 100%;
          height: 1px;
          background: rgba(241, 240, 236, 0.12);
        }

        /* ---- Floor section ---- */
        .exhibits-floor {
          padding-top: var(--section-space-main);
          padding-bottom: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }

        .exhibits-floor__header {
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
          margin-bottom: var(--space-4);
        }

        .exhibits-floor__label {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h2);
          font-weight: 700;
          line-height: 0.85;
          text-transform: uppercase;
          color: var(--white);
        }

        .exhibits-floor__tag {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(241, 240, 236, 0.4);
          padding: 0.35em 0.9em;
          border: 1px solid rgba(241, 240, 236, 0.15);
          border-radius: 100px;
          white-space: nowrap;
        }

        /* ---- Card grid ---- */
        .exhibits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.75rem);
        }

        @media (max-width: 1024px) {
          .exhibits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .exhibits-grid {
            grid-template-columns: 1fr;
          }
        }

        /* First card spans 2 columns on large screens */
        @media (min-width: 1025px) {
          .exhibit-card:first-child {
            grid-column: span 2;
          }
          .exhibit-card:first-child .exhibit-card__image-wrap {
            height: clamp(18rem, 32vw, 36rem);
          }
        }

        /* ---- Individual card ---- */
        .exhibit-card {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(241, 240, 236, 0.12);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(241, 240, 236, 0.03);
          transition: border-color 0.3s ease, transform 0.3s ease;
          will-change: transform;
        }

        .exhibit-card:hover {
          border-color: rgba(241, 240, 236, 0.3);
          transform: translateY(-4px);
        }

        .exhibit-card__image-wrap {
          position: relative;
          width: 100%;
          height: clamp(14rem, 22vw, 26rem);
          overflow: hidden;
          background: rgba(241, 240, 236, 0.05);
        }

        .exhibit-card__image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .exhibit-card:hover .exhibit-card__image-wrap img {
          transform: scale(1.04);
        }

        .exhibit-card__number {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h4);
          font-weight: 700;
          line-height: 1;
          color: var(--black);
          background: var(--white);
          padding: 0.3em 0.65em;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }

        .exhibit-card__body {
          padding: clamp(1.25rem, 2.5vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .exhibit-card__title {
          color: var(--white);
        }

        .exhibit-card__desc {
          font-size: var(--font-size-text-main);
          line-height: 1.55;
          color: rgba(241, 240, 236, 0.6);
        }

        .exhibit-card__accent-line {
          height: 2px;
          width: 3rem;
          border-radius: 2px;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        /* ---- CTA section ---- */
        .exhibits-cta {
          padding-top: var(--section-space-large);
          padding-bottom: var(--section-space-large);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-3);
        }

        .exhibits-cta__heading {
          color: var(--white);
          max-width: 18ch;
        }

        .exhibits-cta__sub {
          font-size: var(--font-size-text-large);
          color: rgba(241, 240, 236, 0.55);
          max-width: 48ch;
          line-height: 1.5;
        }
      `}</style>

      <div className="exhibits-page theme-dark">
        {/* ---- Hero ---- */}
        <section className="exhibits-hero">
          <p className="exhibits-hero__eyebrow">Museum of Money</p>
          <div ref={heroRef}>
            <h1 className="u-text-h1 exhibits-hero__heading">
              Explore Our Exhibits
            </h1>
          </div>
          <p className="exhibits-hero__subtitle" ref={subtitleRef}>
            Ten immersive rooms. Thousands of stories. One obsession: the thing that moves the
            world. Step inside and discover money like you never have before.
          </p>
        </section>

        <div className="exhibits-divider" />

        {/* ---- Ground Floor ---- */}
        <section className="exhibits-floor">
          <div
            className="exhibits-floor__header"
            ref={(el) => { floorHeadRefs.current[0] = el }}
          >
            <span className="exhibits-floor__label">Ground</span>
            <span className="exhibits-floor__tag">Floor 1</span>
          </div>

          <div className="exhibits-grid" ref={groundCardsRef}>
            {GROUND_FLOOR.map((exhibit) => (
              <article key={exhibit.number} className="exhibit-card">
                <div className="exhibit-card__image-wrap">
                  <Image
                    src={exhibit.image}
                    alt={exhibit.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="exhibit-card__number">{exhibit.number}</span>
                </div>
                <div className="exhibit-card__body">
                  <h3 className="u-text-h3 exhibit-card__title">{exhibit.title}</h3>
                  <p className="exhibit-card__desc">{exhibit.description}</p>
                  <div
                    className="exhibit-card__accent-line"
                    style={{ backgroundColor: exhibit.accent }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="exhibits-divider" />

        {/* ---- Lower Level ---- */}
        <section className="exhibits-floor">
          <div
            className="exhibits-floor__header"
            ref={(el) => { floorHeadRefs.current[1] = el }}
          >
            <span className="exhibits-floor__label">Lower</span>
            <span className="exhibits-floor__tag">Level B1</span>
          </div>

          <div className="exhibits-grid" ref={lowerCardsRef}>
            {LOWER_LEVEL.map((exhibit) => (
              <article key={exhibit.number} className="exhibit-card">
                <div className="exhibit-card__image-wrap">
                  <Image
                    src={exhibit.image}
                    alt={exhibit.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="exhibit-card__number">{exhibit.number}</span>
                </div>
                <div className="exhibit-card__body">
                  <h3 className="u-text-h3 exhibit-card__title">{exhibit.title}</h3>
                  <p className="exhibit-card__desc">{exhibit.description}</p>
                  <div
                    className="exhibit-card__accent-line"
                    style={{ backgroundColor: exhibit.accent }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="exhibits-cta" ref={ctaRef}>
          <h2 className="u-text-h2 exhibits-cta__heading">Ready to explore?</h2>
          <p className="exhibits-cta__sub">
            All ten exhibits are included with every general admission ticket. Grab yours and
            start your money journey today.
          </p>
          <FlipButton href="/tickets">Book Tickets</FlipButton>
        </section>

        <Footer />
      </div>
    </>
  )
}
