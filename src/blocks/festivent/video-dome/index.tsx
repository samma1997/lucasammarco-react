'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoDome() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const videoInner = document.querySelector('.fv-video-inner')
      if (videoInner) {
        gsap.to(videoInner, {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fv-video-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="fv-video-section" style={{
      background: '#fef7de',
      padding: '0',
      marginTop: '-1px',
      position: 'relative',
    }}>
      <div className="fv-video-inner" style={{
        clipPath: 'circle(28800px at 50% 28891px)',
        overflow: 'visible',
        position: 'relative',
        width: '100%',
        height: '56.25vw',
        maxHeight: 900,
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        >
          <source src="https://festivent.ca/wp-content/uploads/2025/11/siteweb_2025_v09.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
