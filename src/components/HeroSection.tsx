'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const buttonBigRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const root = buttonBigRef.current
    const hero = document.querySelector('.home-hero') as HTMLElement | null
    const nav = document.querySelector('.navigation') as HTMLElement | null

    if (!root || !hero) return
    if (/Mobi|Android/i.test(navigator.userAgent)) return

    const ACTIVATION_DELAY = 1000
    let delayOver = false
    setTimeout(() => { delayOver = true }, ACTIVATION_DELAY)

    const setX = gsap.quickTo(root, 'x', { duration: 0.3, ease: 'power3.out' })
    const setY = gsap.quickTo(root, 'y', { duration: 0.3, ease: 'power3.out' })

    let isOverNav = false

    gsap.set(root, { scale: 0, pointerEvents: 'none' })

    function getHeroVisibleRatio() {
      const rect = hero!.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      const clamped = Math.max(0, Math.min(visible, rect.height))
      return rect.height > 0 ? clamped / rect.height : 0
    }

    function shouldBeActive() {
      if (!delayOver) return false
      if (isOverNav) return false
      return getHeroVisibleRatio() >= 0.5
    }

    function activateCursor() {
      if (!shouldBeActive()) return
      hero!.classList.add('cursor-replaced')
      gsap.to(root!, { scale: 1, duration: 0.5, ease: 'quart.out' })
    }

    function deactivateCursor() {
      hero!.classList.remove('cursor-replaced')
      gsap.to(root!, { scale: 0, duration: 0.4, ease: 'quart.out' })
    }

    if (nav) {
      nav.addEventListener('mouseenter', () => { isOverNav = true; deactivateCursor() })
      nav.addEventListener('mouseleave', () => { isOverNav = false })
    }

    const observer = ScrollTrigger.observe({
      type: 'pointer',
      onMove: (self) => {
        const { x, y } = self as unknown as { x: number; y: number }
        if (!shouldBeActive()) { deactivateCursor(); return }
        setX(x); setY(y)
        activateCursor()
      },
    })

    const handleScroll = () => {
      if (!shouldBeActive()) deactivateCursor()
    }
    window.addEventListener('scroll', handleScroll)

    const targetHref = root.getAttribute('href') || ''
    if (targetHref) {
      hero.addEventListener('click', (e) => {
        if (!shouldBeActive()) return
        const interactive = (e.target as HTMLElement).closest('a, button')
        if (interactive) return
        window.location.href = targetHref
      })
    }

    return () => {
      observer.kill()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="section-home">
      {/* Custom cursor button-big */}
      <a
        ref={buttonBigRef}
        data-follow="btn"
        href="/contatti"
        className="button-big w-inline-block"
      >
        <div className="button-big__content">
          <div className="btn-b color-orange">Launch an offer</div>
        </div>
        <div className="button-big__content circle-big">
          <div className="button-big__svg w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" width="0.72vw" height="0.72vw" viewBox="0 0 8 8" fill="none">
              <g>
                <path d="M4 8L2.8656 6.8656L5.0016 4.7296L0 4.7296L1.54889e-07 3.2704L5.0016 3.2704L2.8656 1.1344L4 0L8 4L4 8Z" fill="#FA4838" />
              </g>
            </svg>
          </div>
        </div>
      </a>

      {/* Home hero */}
      <div
        data-follow="area"
        className="container full-page home-hero"
      >
        <div className="div-block home-margin follow-section">
          <p className="claim-m">
            Transforming ideas <br />
            into innovative solutions.<br />
            Building an organization that <br />
            fosters their development.
          </p>
        </div>

        <div className="test w-embed">
          <div className="div-hide">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 611 178" fill="none">
              <path d="M51.84 70.32C51.84 51.36 63.12 40.56 85.68 37.92H0V4.56H141.84V37.92H108C96.24 37.92 90.24 48.96 90.24 70.32V172.56H51.84V70.32Z" fill="white" />
              <path d="M149.632 172.56V4.56H188.033V172.56H149.632Z" fill="white" />
              <path d="M195.493 4.56H233.413L259.813 139.92L279.493 4.56H333.013L352.693 139.92L379.093 4.56H417.013L381.733 172.56H326.773L306.373 27.36L285.733 172.56H230.773L195.493 4.56Z" fill="white" />
              <path d="M424.461 172.56V4.56H462.861V172.56H424.461Z" fill="white" />
              <path d="M477.287 48.24C477.287 20.16 504.167 0 541.607 0C581.687 0 605.927 24.72 605.927 54.96H567.527C567.527 42.72 558.887 29.76 541.607 29.76C525.047 29.76 515.687 38.88 515.687 49.2C515.687 63.12 531.047 66.24 546.887 70.08C584.327 78.48 610.727 93.36 610.727 127.44C610.727 156 583.127 177.12 543.527 177.12C498.887 177.12 471.527 149.76 471.527 117.12H509.927C509.687 131.28 521.447 147.36 543.527 147.36C560.327 147.36 572.327 138.24 572.327 126.24C572.327 111.12 556.247 107.76 538.727 103.68C497.447 93.84 477.287 78.72 477.287 48.24Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Before horizontal section */}
      <div className="container before-horizontal">
        <div className="h-line"></div>
        <div className="card-container">
          <div className="w-layout-grid grid-container no-padd">
            <div>
              <div className="div-hide">
                <div className="nav-tag split-tag">Approach</div>
              </div>
            </div>
            <div id="w-node-manifesto">
              <p className="manifesto">
                We are TIWIS. We combine strategy, innovation and digital technology to develop your service offerings and generate sustainable growth.
              </p>
            </div>
          </div>
          <div className="spacer"></div>
        </div>
        <div className="w-layout-grid grid-container no-padd horizontal-text-pin">
          <div className="rel">
            <div className="subtitle-in-text">
              <div className="nav-tag split-tag">offers</div>
            </div>
            <p className="manifesto">
              <span className="text-span-2"> </span>We align business model, product strategy and organization to transform your projects into sustainable successes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
