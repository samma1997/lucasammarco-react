'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Reviewer {
  name: string
  quote: string
  image: string
  alt: string
}

const REVIEWERS: Reviewer[] = [
  {
    name: 'Jordan G.',
    quote: 'Bull, Bear or Bust was an adrenaline rush — taking a spin at the stock market simulator taught me more in 10 minutes than any finance class ever did.',
    image: '/images/reviewers/6852b066a2ff5057324c39df_MM_Male_C.avif',
    alt: 'Jordan G. reviewer photo',
  },
  {
    name: 'Rebecca B.',
    quote: 'Fake bills, real skills! The Catch the Counterfeits exhibit had me squinting for imperfections like a seasoned detective. I almost fooled myself.',
    image: '/images/reviewers/6852b0655055199fdf8e0e6f_MM_Female_C.avif',
    alt: 'Rebecca B. reviewer photo',
  },
  {
    name: 'Margo H.',
    quote: 'I hit the motherlode of fun in the Hoard of Gold — diving into coins and bars was a blissful chase I never wanted to end.',
    image: '/images/reviewers/6852b0654bac60af2ff2b355_MM_Female_B.avif',
    alt: 'Margo H. reviewer photo',
  },
  {
    name: 'Alex R.',
    quote: 'The stock market simulator taught me more in 10 minutes than months of reading finance blogs. Genuinely eye-opening and ridiculously fun.',
    image: '/images/reviewers/6852b066a2ff5057324c39f6_MM_Male_A.avif',
    alt: 'Alex R. reviewer photo',
  },
  {
    name: 'Mark T.',
    quote: 'The Counterfeits exhibit blew my mind. I thought I knew what a fake bill looked like — turns out I had no idea.',
    image: '/images/reviewers/6852b06596f2164862674cf1_MM_Male_B.avif',
    alt: 'Mark T. reviewer photo',
  },
  {
    name: 'Jessica L.',
    quote: 'Diving into coins and bars was a blissful chase — the Hoard of Gold is pure treasure-hunter fantasy made real.',
    image: '/images/reviewers/6852b066abded64d1cdc40b1_MM_Female_A.avif',
    alt: 'Jessica L. reviewer photo',
  },
]

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Theme transition on scroll into view
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(section, {
              '--theme-bg': '#9eb5ff',
              '--theme-text': '#0023d1',
              duration: 0.6,
              ease: 'power2.out',
            })
          }
        },
      })

      // Cards stagger fade-up animation
      const cards = cardsRef.current.filter(Boolean)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: { each: 0.12, from: 'start' },
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            toggleActions: 'play none none reset',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#9eb5ff',
        color: '#0023d1',
        fontFamily: '"Montserrat", sans-serif',
      }}
      className="reviews-section"
    >
      <style>{`
        .reviews-section {
          padding: clamp(3.5rem, 8vw, 10rem) clamp(1rem, 5vw, 4rem);
        }
        .reviews-headline {
          font-size: clamp(0.75rem, 1.2vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.6;
          margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
        }
        .reviews-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: clamp(2.5rem, 6vw, 5rem);
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2.5vw, 2rem);
        }
        @media (max-width: 991px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 479px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
        .review-card {
          background: rgba(0, 35, 209, 0.07);
          border: 1.5px solid rgba(0, 35, 209, 0.15);
          border-radius: 1.25rem;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: border-color 0.3s ease, background 0.3s ease;
          will-change: transform, opacity;
        }
        .review-card:hover {
          background: rgba(0, 35, 209, 0.12);
          border-color: rgba(0, 35, 209, 0.3);
        }
        .review-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .reviewer-avatar-wrap {
          flex-shrink: 0;
          width: 3.25rem;
          height: 3.25rem;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(0, 35, 209, 0.25);
          position: relative;
        }
        .reviewer-name {
          font-size: clamp(0.9rem, 1.3vw, 1.1rem);
          font-weight: 700;
          letter-spacing: 0.01em;
        }
        .reviewer-role {
          font-size: 0.75rem;
          font-weight: 500;
          opacity: 0.55;
          letter-spacing: 0.03em;
          margin-top: 0.1rem;
        }
        .star-row {
          display: flex;
          gap: 0.2rem;
        }
        .star {
          font-size: 0.85rem;
          color: #0023d1;
        }
        .review-quote {
          font-size: clamp(0.875rem, 1.1vw, 1rem);
          font-weight: 400;
          line-height: 1.6;
          opacity: 0.85;
          font-style: italic;
          flex: 1;
        }
        .review-quote::before {
          content: '"';
          font-style: normal;
          font-size: 1.5em;
          line-height: 0;
          vertical-align: -0.35em;
          margin-right: 0.1em;
          opacity: 0.4;
        }
        .review-quote::after {
          content: '"';
          font-style: normal;
          font-size: 1.5em;
          line-height: 0;
          vertical-align: -0.35em;
          margin-left: 0.1em;
          opacity: 0.4;
        }
      `}</style>

      <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
        <p className="reviews-headline">Visitor Reviews</p>
        <h2 className="reviews-title">What people are saying</h2>

        <div className="reviews-grid">
          {REVIEWERS.map((reviewer, i) => (
            <div
              key={reviewer.name}
              className="review-card"
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
            >
              <div className="review-card-header">
                <div className="reviewer-avatar-wrap">
                  <Image
                    src={reviewer.image}
                    alt={reviewer.alt}
                    fill
                    sizes="52px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="reviewer-name">{reviewer.name}</p>
                  <p className="reviewer-role">Verified Visitor</p>
                </div>
              </div>

              <div className="star-row">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="star" aria-hidden="true">★</span>
                ))}
              </div>

              <p className="review-quote">{reviewer.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
