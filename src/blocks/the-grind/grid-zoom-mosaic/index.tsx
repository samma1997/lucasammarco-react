'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Grid image data — 15 items (3 rows x 5 cols), repeating from 13 available
// ---------------------------------------------------------------------------
const GRID_IMAGES = [
  '/blocks/the-grind/images/grid/1.webp',
  '/blocks/the-grind/images/grid/2.webp',
  '/blocks/the-grind/images/grid/3.webp',
  '/blocks/the-grind/images/grid/4.webp',
  '/blocks/the-grind/images/grid/5.webp',
  '/blocks/the-grind/images/grid/6.webp',
  '/blocks/the-grind/images/grid/7.webp',
  '/blocks/the-grind/images/grid/8.webp',
  '/blocks/the-grind/images/grid/9.webp',
  '/blocks/the-grind/images/grid/10.webp',
  '/blocks/the-grind/images/grid/11.webp',
  '/blocks/the-grind/images/grid/12.webp',
  '/blocks/the-grind/images/grid/13.webp',
  '/blocks/the-grind/images/grid/1.webp',
  '/blocks/the-grind/images/grid/2.webp',
]

// Center item index in a 3x5 grid (row 1, col 2 = index 7)
const CENTER_INDEX = 7

// ---------------------------------------------------------------------------
// GridZoomMosaic
// ---------------------------------------------------------------------------
export default function GridZoomMosaic() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyWrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stickyWrapper = stickyWrapperRef.current
    const grid = gridRef.current

    if (!section || !stickyWrapper || !grid) return

    const ctx = gsap.context(() => {
      const items = grid.querySelectorAll<HTMLDivElement>('[data-tg-grid-item]')
      if (!items.length) return

      const centerItem = items[CENTER_INDEX]
      const otherItems = Array.from(items).filter((_, i) => i !== CENTER_INDEX)

      // Set initial states
      gsap.set(centerItem, { scale: 1.4, zIndex: 25 })
      gsap.set(otherItems, { scale: 0.2, autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyWrapper,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      // Center item scales down to 1
      tl.to(
        centerItem,
        {
          scale: 1,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0,
      )

      // Other items scale to 1, opacity to 1 — staggered from center
      tl.to(
        otherItems,
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          stagger: {
            amount: 0.8,
            from: 'center',
            grid: [3, 5],
          },
        },
        '-=0.5',
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-tg-grid-section
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Tall scroll wrapper for pin spacing */}
      <div
        ref={stickyWrapperRef}
        data-tg-grid-sticky-wrapper
        className="grid_sticky_wrapper"
        style={{
          position: 'relative',
          width: '100%',
          height: '300vh',
        }}
      >
        {/* Pinned grid container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: 'clamp(0.5rem, 1vw, 1rem)',
          }}
        >
          {/* Grid */}
          <div
            ref={gridRef}
            data-tg-grid
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: 'clamp(0.25rem, 0.5vw, 0.5rem)',
              width: '100%',
              height: '100%',
              maxWidth: '1600px',
              maxHeight: '900px',
            }}
          >
            {GRID_IMAGES.map((src, i) => (
              <div
                key={i}
                data-tg-grid-item
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '0.375rem',
                  willChange: 'transform, opacity',
                  transformOrigin: 'center center',
                }}
              >
                <Image
                  src={src}
                  alt={`The Grind community ${i + 1}`}
                  fill
                  sizes="(max-width: 767px) 50vw, 20vw"
                  style={{ objectFit: 'cover' }}
                  priority={i === CENTER_INDEX}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE: simplify grid for smaller screens                           */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        @media (max-width: 767px) {
          [data-tg-grid] {
            grid-template-columns: repeat(3, 1fr) !important;
            grid-template-rows: repeat(5, 1fr) !important;
          }
        }

        @media (max-width: 479px) {
          [data-tg-grid] {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
