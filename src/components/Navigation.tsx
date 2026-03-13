'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import FlipButton from './FlipButton'
import styles from './Navigation.module.css'

const NAV_LINKS = [
  { href: '/exhibits', label: 'Exhibits' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
]

const MOBILE_LINKS = [
  { href: '/tickets', label: 'Book Tickets' },
  { href: '/exhibits', label: 'Exhibits' },
  { href: '/find-us', label: 'Find us' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/events', label: 'Events' },
  { href: '/money-lab', label: 'Money Lab' },
  { href: '/gift-shop', label: 'Gift Shop' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLSpanElement>(null)
  const menuWrapRef = useRef<HTMLDivElement>(null)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuBaseRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLUListElement>(null)
  const menuTlRef = useRef<gsap.core.Timeline | null>(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount] = useState(0)

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Build the mobile menu GSAP timeline once
  const buildMenuTimeline = useCallback(() => {
    if (!menuWrapRef.current || !menuOverlayRef.current || !menuBaseRef.current || !menuLinksRef.current) return

    const links = menuLinksRef.current.querySelectorAll('li')

    gsap.set(menuWrapRef.current, { display: 'none' })
    gsap.set(menuBaseRef.current, { xPercent: 100, opacity: 0 })
    gsap.set(menuOverlayRef.current, { opacity: 0 })
    gsap.set(links, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        if (menuWrapRef.current) gsap.set(menuWrapRef.current, { display: 'flex' })
      },
      onReverseComplete: () => {
        if (menuWrapRef.current) gsap.set(menuWrapRef.current, { display: 'none' })
        document.body.style.overflow = ''
      },
    })

    tl.to(menuOverlayRef.current, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
    .to(menuBaseRef.current, {
      xPercent: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'elastic.out(0.8, 0.6)',
    }, '<0.05')
    .to(links, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
    }, '-=0.3')

    menuTlRef.current = tl
  }, [])

  const openMenu = useCallback(() => {
    if (!menuTlRef.current) buildMenuTimeline()
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
    menuTlRef.current?.play()
  }, [buildMenuTimeline])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuTlRef.current?.reverse()
  }, [])

  // Scroll-based nav hide / show + tagline fade
  useEffect(() => {
    const nav = navRef.current
    const tagline = taglineRef.current
    if (!nav) return

    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const scrolled = currentY > 60
        const goingDown = currentY > lastScrollY.current

        // data attributes — mirrors the original's pattern
        nav.dataset.scrollingStarted = scrolled ? 'true' : 'false'
        nav.dataset.scrollingDirection = goingDown ? 'down' : 'up'

        // Tagline fade
        if (tagline) {
          gsap.to(tagline, {
            opacity: scrolled ? 0 : 1,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        // Nav hide on scroll down, show on scroll up
        if (scrolled && goingDown) {
          gsap.to(nav, {
            yPercent: -100,
            duration: 0.4,
            ease: 'power2.inOut',
            overwrite: 'auto',
          })
        } else {
          gsap.to(nav, {
            yPercent: 0,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        lastScrollY.current = currentY
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ESC key closes menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) closeMenu()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen, closeMenu])

  // Build timeline on mount
  useEffect(() => {
    // Short defer to ensure refs are populated
    const id = setTimeout(buildMenuTimeline, 50)
    return () => clearTimeout(id)
  }, [buildMenuTimeline])

  return (
    <>
      <header
        ref={navRef}
        className={styles.nav}
        data-scrolling-started="false"
        data-scrolling-direction="up"
      >
        {/* ─── Desktop Nav ─── */}
        <div className={styles.desktop}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>MoMoney</span>
            <span ref={taglineRef} className={styles.tagline}>
              Museum of Money
            </span>
          </Link>

          {/* Nav links */}
          <nav aria-label="Primary navigation">
            <ul className={styles.linkList}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.navLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Cart */}
          <div className={styles.actions}>
            <FlipButton href="/tickets/general-admission" variant="primary">
              Book Tickets
            </FlipButton>

            <Link href="/checkout" className={styles.cartWrap} aria-label={`Cart, ${cartCount} items`}>
              <svg
                className={styles.cartIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                width="22"
                height="22"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ─── Mobile Nav ─── */}
        <div className={styles.mobile}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>MoMoney</span>
          </Link>

          <div className={styles.mobileRight}>
            <Link href="/checkout" className={styles.cartWrap} aria-label={`Cart, ${cartCount} items`}>
              <svg
                className={styles.cartIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                width="20"
                height="20"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={menuOpen ? closeMenu : openMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              data-menu-btn
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      <div
        ref={menuWrapRef}
        className={styles.menuWrap}
        data-menu-wrap
        style={{ display: 'none' }}
      >
        {/* Backdrop */}
        <div
          ref={menuOverlayRef}
          className={styles.menuOverlay}
          onClick={closeMenu}
          data-menu-overlay
          aria-hidden="true"
        />

        {/* Menu panel */}
        <div
          ref={menuBaseRef}
          className={styles.menuBase}
          data-menu-base
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            className={styles.menuClose}
            onClick={closeMenu}
            aria-label="Close menu"
            data-menu-close
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="24" height="24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Link list */}
          <ul
            ref={menuLinksRef}
            className={styles.menuLinks}
            data-menu-link-list
          >
            {MOBILE_LINKS.map(({ href, label }) => (
              <li key={href} className={styles.menuItem}>
                <Link
                  href={href}
                  className={styles.menuLink}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
