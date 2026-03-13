'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — GSAP Observer casing conflict on case-insensitive macOS filesystems
import { Observer } from 'gsap/Observer'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(Observer, CustomEase)

CustomEase.create('slideshow-wipe', '0.6, 0.08, 0.02, 0.99')

interface Slide {
  src: string
  alt: string
}

const SLIDES: Slide[] = [
  {
    src: '/images/slideshow/6976c4b6d30a481d20700a7d_02 BB MoMoney Museum-BAT08313.avif',
    alt: 'MoMoney Museum interior — BAT08313',
  },
  {
    src: '/images/slideshow/6976c71f852f421d92068a61_21. Snap & Flex 2.avif',
    alt: 'Snap & Flex exhibit — photo opportunity zone',
  },
  {
    src: '/images/slideshow/6976c76622bf4018cd90ae6a_18. Vault Posedown.avif',
    alt: 'Vault Posedown exhibit — strike your richest pose',
  },
  {
    src: '/images/slideshow/697a70e6e10fc15113187ffc_21. Snap & Flex 2.avif',
    alt: 'Snap & Flex — luxe money fantasy zone',
  },
]

const TOTAL = SLIDES.length

export default function SlideshowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const slidesRef = useRef<HTMLDivElement[]>([])
  const slideInnerRef = useRef<HTMLDivElement[]>([])
  const thumbsRef = useRef<HTMLButtonElement[]>([])
  const currentRef = useRef<number>(0)
  const animatingRef = useRef<boolean>(false)
  const observerRef = useRef<Observer | null>(null)

  const setActiveThumb = useCallback((index: number) => {
    thumbsRef.current.forEach((thumb, i) => {
      if (!thumb) return
      thumb.setAttribute('data-active', i === index ? 'true' : 'false')
    })
  }, [])

  const goToSlide = useCallback((nextIndex: number, direction: number) => {
    if (animatingRef.current) return
    animatingRef.current = true

    const current = currentRef.current
    const slides = slidesRef.current
    const inners = slideInnerRef.current

    const currentSlide = slides[current]
    const nextSlide = slides[nextIndex]
    const currentInner = inners[current]
    const nextInner = inners[nextIndex]

    if (!currentSlide || !nextSlide) {
      animatingRef.current = false
      return
    }

    // Position next slide off-screen in direction of travel
    gsap.set(nextSlide, { zIndex: 2, xPercent: direction * 100 })
    gsap.set(currentSlide, { zIndex: 1 })
    if (nextInner) gsap.set(nextInner, { xPercent: -direction * 50 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, { zIndex: 0, xPercent: 0 })
        if (currentInner) gsap.set(currentInner, { xPercent: 0 })
        currentRef.current = nextIndex
        animatingRef.current = false
      },
    })

    // Outgoing slide
    tl.to(currentSlide, {
      xPercent: -direction * 100,
      duration: 0.9,
      ease: 'slideshow-wipe',
    }, 0)

    // Outgoing parallax inner
    if (currentInner) {
      tl.to(currentInner, {
        xPercent: direction * 50,
        duration: 0.9,
        ease: 'slideshow-wipe',
      }, 0)
    }

    // Incoming slide
    tl.to(nextSlide, {
      xPercent: 0,
      duration: 0.9,
      ease: 'slideshow-wipe',
    }, 0)

    // Incoming parallax inner
    if (nextInner) {
      tl.to(nextInner, {
        xPercent: 0,
        duration: 0.9,
        ease: 'slideshow-wipe',
      }, 0)
    }

    setActiveThumb(nextIndex)
  }, [setActiveThumb])

  const next = useCallback(() => {
    const nextIndex = (currentRef.current + 1) % TOTAL
    goToSlide(nextIndex, 1)
  }, [goToSlide])

  const prev = useCallback(() => {
    const nextIndex = (currentRef.current - 1 + TOTAL) % TOTAL
    goToSlide(nextIndex, -1)
  }, [goToSlide])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Set initial positions
    slidesRef.current.forEach((slide, i) => {
      if (!slide) return
      gsap.set(slide, {
        zIndex: i === 0 ? 1 : 0,
        xPercent: i === 0 ? 0 : 100,
      })
    })

    setActiveThumb(0)

    const ctx = gsap.context(() => {
      // Observer for swipe / drag / wheel navigation
      observerRef.current = Observer.create({
        target: section,
        type: 'touch,pointer',
        onRight: () => prev(),
        onLeft: () => next(),
        tolerance: 10,
        preventDefault: true,
      })
    }, section)

    return () => {
      observerRef.current?.kill()
      ctx.revert()
    }
  }, [next, prev, setActiveThumb])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#f580db',
        color: '#401011',
        fontFamily: '"Montserrat", sans-serif',
      }}
      className="slideshow-section"
    >
      <style>{`
        .slideshow-section {
          padding: clamp(3.5rem, 8vw, 10rem) clamp(1rem, 5vw, 4rem);
          overflow: hidden;
        }
        .slideshow-inner {
          max-width: 90rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
        }
        @media (max-width: 767px) {
          .slideshow-inner {
            grid-template-columns: 1fr;
          }
        }
        .slideshow-copy {
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vw, 2.5rem);
        }
        .slideshow-eyebrow {
          font-size: clamp(0.7rem, 1vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.55;
        }
        .slideshow-headline {
          font-size: clamp(2.25rem, 5.5vw, 4.5rem);
          font-weight: 900;
          line-height: 0.92;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .slideshow-body {
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          font-weight: 400;
          line-height: 1.65;
          opacity: 0.8;
          max-width: 38ch;
        }
        .slideshow-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #401011;
          color: #f580db;
          font-family: "Montserrat", sans-serif;
          font-size: clamp(0.8rem, 1.1vw, 0.95rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2rem;
          border-radius: 100px;
          border: 2px solid #401011;
          transition: background 0.3s ease, color 0.3s ease;
          width: fit-content;
        }
        .slideshow-cta:hover {
          background: transparent;
          color: #401011;
        }
        .slideshow-cta-arrow {
          font-size: 1.1em;
          transition: transform 0.3s ease;
        }
        .slideshow-cta:hover .slideshow-cta-arrow {
          transform: translateX(4px);
        }
        .slideshow-media {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .slideshow-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 1.5rem;
          overflow: hidden;
          background: rgba(64, 16, 17, 0.1);
        }
        .slideshow-slide {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .slideshow-slide-inner {
          position: absolute;
          inset: -10% -5%;
          width: 110%;
          height: 120%;
        }
        .slideshow-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: space-between;
        }
        .slideshow-thumbs {
          display: flex;
          gap: 0.5rem;
          flex: 1;
        }
        .slideshow-thumb {
          flex: 1;
          aspect-ratio: 4 / 3;
          border-radius: 0.6rem;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.3s ease, opacity 0.3s ease;
          opacity: 0.5;
          background: none;
          padding: 0;
          position: relative;
        }
        .slideshow-thumb[data-active="true"] {
          border-color: #401011;
          opacity: 1;
        }
        .slideshow-thumb:hover {
          opacity: 0.85;
        }
        .slideshow-nav {
          display: flex;
          gap: 0.5rem;
        }
        .slideshow-nav-btn {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: 2px solid rgba(64, 16, 17, 0.35);
          background: transparent;
          color: #401011;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease, border-color 0.25s ease;
          font-family: "Montserrat", sans-serif;
        }
        .slideshow-nav-btn:hover {
          background: rgba(64, 16, 17, 0.1);
          border-color: #401011;
        }
        .slideshow-counter {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          opacity: 0.6;
          white-space: nowrap;
        }
      `}</style>

      <div className="slideshow-inner">
        {/* Left: Copy */}
        <div className="slideshow-copy">
          <p className="slideshow-eyebrow">Our Story</p>
          <h2 className="slideshow-headline">
            Once upon a dime MoMoney was born
          </h2>
          <p className="slideshow-body">
            Picture diving headfirst into your wallet, where crisp dollar bills mingle
            with shimmering crypto keys. At MoMoney, you'll design your own currency,
            snap a selfie in a vault of gold, and take a spin on our stock-market wheel.
            Through playful, hands-on exhibits and data-driven storytelling, we trace
            money's journey from minting presses to blockchain nodes. Laugh, learn, and
            leave richer in every sense — because every dollar holds a story, and here,
            you're the storyteller.
          </p>
          <a href="/exhibits" className="slideshow-cta">
            Discover what's on
            <span className="slideshow-cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Right: Slideshow */}
        <div className="slideshow-media">
          {/* Main stage */}
          <div className="slideshow-stage">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className="slideshow-slide"
                ref={(el) => {
                  if (el) slidesRef.current[i] = el
                }}
              >
                <div
                  className="slideshow-slide-inner"
                  ref={(el) => {
                    if (el) slideInnerRef.current[i] = el
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Controls row */}
          <div className="slideshow-controls">
            <div className="slideshow-thumbs">
              {SLIDES.map((slide, i) => (
                <button
                  key={i}
                  className="slideshow-thumb"
                  data-active={i === 0 ? 'true' : 'false'}
                  aria-label={`Go to slide ${i + 1}`}
                  ref={(el) => {
                    if (el) thumbsRef.current[i] = el
                  }}
                  onClick={() => {
                    if (i === currentRef.current) return
                    const dir = i > currentRef.current ? 1 : -1
                    goToSlide(i, dir)
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>

            <div className="slideshow-nav">
              <button
                className="slideshow-nav-btn"
                aria-label="Previous slide"
                onClick={prev}
              >
                ←
              </button>
              <button
                className="slideshow-nav-btn"
                aria-label="Next slide"
                onClick={next}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
