'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const expertiseItems = [
  { href: '/en/expertise/business-plan-financier-pilotable', label: 'Managed financial business plan' },
  { href: '/en/expertise/pitch-deck-investisseur', label: 'Investor pitch deck' },
  { href: '/en/expertise/analyse-et-positionnement-strategique', label: 'Analysis and strategic positioning' },
  { href: '/en/expertise/plateforme-de-support-client', label: 'Customer support platform' },
  { href: '/en/expertise/deploiement-de-programme-crm', label: 'CRM program deployment' },
  { href: '/en/expertise/strategie-data-ia-et-automation', label: 'Data strategy, AI and automation' },
  { href: '/en/expertise/experience-mobile', label: 'Seamless mobile experience' },
  { href: '/en/expertise/site-e-commerce', label: 'Efficient e-commerce site' },
  { href: '/en/expertise/site-vitrine', label: 'Tailored corporate brand site' },
]

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const navLinks = document.querySelectorAll('.nav-link')
    const whiteSections = document.querySelectorAll('.bg-white')
    const footer = document.querySelector('.footer')
    const followSection = document.querySelector('.home-hero')

    const btnCenters = nav.querySelectorAll('.button-small__center')
    const btnArrows = nav.querySelectorAll('.button-small__arrow')
    const btnBlocks = [...Array.from(btnCenters), ...Array.from(btnArrows)]

    const logoSvgs = nav.querySelectorAll('.logo svg *')
    const arrowSvgs = nav.querySelectorAll('.button-small__arrow svg *')

    let lastScroll = 0
    const scrollThreshold = 10
    const navHeight = nav.offsetHeight
    let navHidden = false

    const isVisible = (el: Element | null, offsetPx = 0): boolean => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > offsetPx
    }

    requestAnimationFrame(() => {
      nav.classList.add('is-ready')
      nav.classList.add('with-logo')
    })

    function updateNavColors() {
      if (nav!.classList.contains('menu-open')) return

      const footerRect = footer ? footer.getBoundingClientRect() : null
      const footerVisible = footerRect
        ? footerRect.top <= window.innerHeight && footerRect.bottom >= 0
        : false

      let onWhite = false
      whiteSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= navHeight && rect.bottom >= 0) onWhite = true
      })

      nav!.classList.toggle('is-on-white', onWhite && !footerVisible)

      if (footerVisible) {
        gsap.to(navLinks, { color: '#fff', duration: 0.25, ease: 'power2.out' })
        gsap.to(logoSvgs, { fill: '#fff', duration: 0.25, ease: 'power2.out' })
        gsap.to(arrowSvgs, { fill: '#fff', duration: 0.25, ease: 'power2.out' })
        gsap.to(btnBlocks, { backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.25, ease: 'power2.out' })
      } else if (onWhite) {
        gsap.to(navLinks, { color: '#000', duration: 0.25, ease: 'power2.out' })
        gsap.to(logoSvgs, { fill: '#000', duration: 0.25, ease: 'power2.out' })
        gsap.to(arrowSvgs, { fill: '#000', duration: 0.25, ease: 'power2.out' })
        gsap.to(btnBlocks, { backgroundColor: 'rgba(204,229,255,0.35)', duration: 0.25, ease: 'power2.out' })
      } else {
        gsap.to(navLinks, { color: '#fff', duration: 0.25, ease: 'power2.out' })
        gsap.to(logoSvgs, { fill: '#fff', duration: 0.25, ease: 'power2.out' })
        gsap.to(arrowSvgs, { fill: '#fff', duration: 0.25, ease: 'power2.out' })
        gsap.to(btnBlocks, { backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.25, ease: 'power2.out' })
      }
    }

    const handleScroll = () => {
      if (nav!.classList.contains('menu-open')) return
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop
      const inFollowSection = isVisible(followSection, window.innerHeight * 0.1)

      if (!inFollowSection) {
        if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
          if (currentScroll > lastScroll && currentScroll > 100) {
            nav!.style.transform = 'translateY(-100%)'
            navHidden = true
          } else {
            nav!.style.transform = 'translateY(0)'
            navHidden = false
            if (currentScroll > window.innerHeight) {
              nav!.classList.remove('with-logo')
            } else {
              nav!.classList.add('with-logo')
            }
          }
          lastScroll = currentScroll
        }
      } else {
        nav!.style.transform = 'translateY(0)'
        navHidden = false
        nav!.classList.add('with-logo')
      }
      updateNavColors()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (nav!.classList.contains('menu-open')) return
      if (e.clientY < 40 && navHidden) {
        nav!.style.transform = 'translateY(0)'
        navHidden = false
        nav!.classList.remove('with-logo')
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    setTimeout(updateNavColors, 50)

    // Dropdown animation
    const dropdownConfigs = [
      { triggerSelector: '.nav-link--offre', dropdownSelector: '.nav-dropdown--offre' },
      { triggerSelector: '.nav-link--expertise', dropdownSelector: '.nav-dropdown--expertise' },
    ]

    dropdownConfigs.forEach(({ triggerSelector, dropdownSelector }) => {
      const trigger = document.querySelector(triggerSelector) as HTMLElement | null
      const dropdown = document.querySelector(dropdownSelector) as HTMLElement | null
      if (!trigger || !dropdown) return

      const items = Array.from(dropdown.querySelectorAll('.split-nav'))
      if (!items.length) return

      gsap.set(items, { yPercent: 120, opacity: 0 })

      const showTl = gsap
        .timeline({ paused: true })
        .fromTo(dropdown, { y: 8 }, { y: 0, duration: 0.3, ease: 'quart.out' }, 0)
        .to(items, { yPercent: 0, opacity: 1, duration: 1, ease: 'quart.out', stagger: 0.05 }, 0)

      let hideTimeout: ReturnType<typeof setTimeout>

      const openDropdown = () => {
        clearTimeout(hideTimeout)
        dropdown.classList.add('is-open')
        showTl.play()
      }
      const closeDropdown = () => {
        hideTimeout = setTimeout(() => {
          dropdown.classList.remove('is-open')
          showTl.reverse()
        }, 80)
      }

      trigger.addEventListener('mouseenter', openDropdown)
      trigger.addEventListener('mouseleave', closeDropdown)
      dropdown.addEventListener('mouseenter', () => clearTimeout(hideTimeout))
      dropdown.addEventListener('mouseleave', closeDropdown)
    })

    // Burger mobile
    const burger = nav.querySelector('.nav-burger-btn') as HTMLElement | null
    const panel = document.querySelector('.nav-mobile-panel') as HTMLElement | null

    if (burger && panel) {
      const bottomPolyline = burger.querySelector('#globalnav-menutrigger-bread-bottom')
      const topPolyline = burger.querySelector('#globalnav-menutrigger-bread-top')

      let bottomOpen: Element | null = null, bottomClose: Element | null = null
      let topOpen: Element | null = null, topClose: Element | null = null

      if (bottomPolyline) {
        const anims = bottomPolyline.querySelectorAll('animate')
        bottomOpen = anims[0]; bottomClose = anims[1]
      }
      if (topPolyline) {
        const anims = topPolyline.querySelectorAll('animate')
        topOpen = anims[0]; topClose = anims[1]
      }

      let isOpen = false

      const subMenuOffres = document.querySelector('.nav-mobile__submenu-offres') as HTMLElement | null
      const subMenuExpertise = document.querySelector('.nav-mobile__submenu-expertise') as HTMLElement | null
      const subMenus = [subMenuOffres, subMenuExpertise].filter(Boolean) as HTMLElement[]

      const openSubMenu = (sub: HTMLElement) => {
        subMenus.forEach((s) => { if (s !== sub) s.classList.remove('is-open') })
        panel.classList.add('has-submenu-open')
        sub.classList.add('is-open')
      }
      const closeSubMenu = (sub: HTMLElement) => {
        sub.classList.remove('is-open')
        panel.classList.remove('has-submenu-open')
      }

      const triggerOffres = panel.querySelector('.nav-mobile__link-offres') as HTMLElement | null
      const triggerExpertise = panel.querySelector('.nav-mobile__link-expertise') as HTMLElement | null

      if (triggerOffres && subMenuOffres) {
        triggerOffres.addEventListener('click', (e) => { e.preventDefault(); openSubMenu(subMenuOffres) })
      }
      if (triggerExpertise && subMenuExpertise) {
        triggerExpertise.addEventListener('click', (e) => { e.preventDefault(); openSubMenu(subMenuExpertise) })
      }

      document.querySelectorAll('.nav-mobile__submenu-back').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault()
          const submenu = (btn as HTMLElement).closest('.nav-mobile__submenu') as HTMLElement | null
          if (submenu) closeSubMenu(submenu)
        })
      })

      burger.addEventListener('click', () => {
        isOpen = !isOpen
        panel.classList.toggle('is-open', isOpen)
        burger.classList.toggle('is-open', isOpen)
        nav!.classList.toggle('menu-open', isOpen)
        document.body.classList.toggle('no-scroll', isOpen)

        if (!isOpen) {
          subMenus.forEach((sm) => sm.classList.remove('is-open'))
          panel.classList.remove('has-submenu-open')
          updateNavColors()
        }

        if (topOpen && bottomOpen && topClose && bottomClose) {
          if (isOpen) {
            ;(topOpen as SVGAnimateElement).beginElement()
            ;(bottomOpen as SVGAnimateElement).beginElement()
          } else {
            ;(topClose as SVGAnimateElement).beginElement()
            ;(bottomClose as SVGAnimateElement).beginElement()
          }
        }
      })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div data-wf--nav--variant="base" className="navigation" ref={navRef}>
        <Link href="/en" aria-current="page" className="nav--logo w-inline-block w--current">
          <div className="logo nav__link w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 27" fill="currentColor">
              <path d="M7.29989 9.92547C7.29989 7.24932 8.88829 5.72493 12.0651 5.3523H0V0.643631H19.9733V5.3523H15.2081C13.5521 5.3523 12.7072 6.91057 12.7072 9.92547V24.3564H7.29989V9.92547Z" fill="currentColor" />
              <path d="M21.0706 24.3564V0.643631H26.4779V24.3564H21.0706Z" fill="currentColor" />
              <path d="M27.5285 0.643631H32.8683L36.5858 19.7493L39.3571 0.643631H46.8935L49.6648 19.7493L53.3823 0.643631H58.722L53.7541 24.3564H46.0148L43.1422 3.86179L40.2357 24.3564H32.4965L27.5285 0.643631Z" fill="currentColor" />
              <path d="M59.7708 24.3564V0.643631H65.1781V24.3564H59.7708Z" fill="currentColor" />
              <path d="M67.2095 6.80894C67.2095 2.84553 70.9947 0 76.2668 0C81.9107 0 85.3241 3.48916 85.3241 7.75745H79.9168C79.9168 6.02981 78.7001 4.20054 76.2668 4.20054C73.9349 4.20054 72.6169 5.4878 72.6169 6.94445C72.6169 8.90921 74.7798 9.34959 77.0103 9.8916C82.2825 11.0772 86 13.1775 86 17.9878C86 22.019 82.1135 25 76.5372 25C70.2512 25 66.3984 21.1382 66.3984 16.5312H71.8058C71.772 18.5298 73.428 20.7995 76.5372 20.7995C78.9029 20.7995 80.5927 19.5122 80.5927 17.8184C80.5927 15.6843 78.3284 15.21 75.8613 14.6341C70.0484 13.2453 67.2095 11.1111 67.2095 6.80894Z" fill="currentColor" />
            </svg>
          </div>
        </Link>

        <div className="nav--item">
          <a href="#" className="nav-tag color-white nav-link nav-link--offre">Offer</a>
          <Link href="/en/notre-approche" className="nav-tag color-white nav-link">Approach</Link>
          <a href="#" className="nav-tag color-white nav-link nav-link--expertise">ExpertiseS</a>
          <Link href="/en/projets" className="nav-tag color-white nav-link">Projects</Link>
          <Link href="/en/qui-sommes-nous" className="nav-tag color-white nav-link">About</Link>

          <div className="nav--dropdown nav-dropdown--offre">
            <Link href="/en/strategie-business-et-produit" className="nav-dropdown__link split-nav nav-link">Business and Product Strategy</Link>
            <Link href="/en/design-dexperiences" className="nav-dropdown__link split-nav nav-link">Experience design</Link>
            <Link href="/en/transformation-digitale-et-plan-de-croissance" className="nav-dropdown__link split-nav nav-link">Digital and methodological transformation</Link>
          </div>

          <div className="nav--dropdown nav-dropdown--expertise">
            <div className="w-dyn-list">
              <div role="list" className="nav-list w-dyn-items">
                {expertiseItems.map((item) => (
                  <div role="listitem" key={item.href} className="w-dyn-item">
                    <Link href={item.href} className="nav-dropdown__link split-nav nav-link">{item.label}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="nav--buttons">
          <div className="nav--lang">
            <div className="w-locales-list">
              <div role="list" className="w-locales-items">
                <div role="listitem" className="w-locales-item">
                  <Link hrefLang="fr" href="/fr" className="nav-tag color-white nav-link">fr</Link>
                </div>
                <div role="listitem" className="w-locales-item">
                  <Link hrefLang="en" href="/en" aria-current="page" className="nav-tag color-white nav-link w--current">en</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="nav--button">
            <Link href="/en/contactez-nous" className="button-small w-inline-block">
              <div className="button-small__arrow left">
                <div className="div-hide">
                  <div className="w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M4 8L2.8656 6.8656L5.0016 4.7296L0 4.7296L1.54889e-07 3.2704L5.0016 3.2704L2.8656 1.1344L4 0L8 4L4 8Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="button-small__center">
                <div className="div-hide">
                  <div className="btn-s color-white nav-link">Contact us</div>
                  <div className="btn-s color-white nav-link hide">Contact us</div>
                </div>
              </div>
              <div className="button-small__arrow right">
                <div className="div-hide">
                  <div className="w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M4 8L2.8656 6.8656L5.0016 4.7296L0 4.7296L1.54889e-07 3.2704L5.0016 3.2704L2.8656 1.1344L4 0L8 4L4 8Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="nav-burger">
          <button className="nav-burger-btn" aria-label="Toggle menu">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <polyline id="globalnav-menutrigger-bread-bottom" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="2 12, 16 12">
                <animate attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5" />
                <animate attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12" />
              </polyline>
              <polyline id="globalnav-menutrigger-bread-top" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="2 5, 16 5">
                <animate attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15" />
                <animate attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5" />
              </polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div className="nav-mobile-panel">
        <div className="div-block-9">
          <ul role="list" className="nav-mobile__list-link">
            <li className="nav-mobile__list-item"><a href="#" className="nav-mobile__link nav-mobile__link-offres">Deals</a></li>
            <li className="nav-mobile__list-item"><Link href="/en/notre-approche" className="nav-mobile__link">Approach</Link></li>
            <li className="nav-mobile__list-item"><a href="#" className="nav-mobile__link nav-mobile__link-expertise">Expertise</a></li>
            <li className="nav-mobile__list-item"><Link href="/en/projets" className="nav-mobile__link">Projects</Link></li>
            <li className="nav-mobile__list-item"><Link href="/en/qui-sommes-nous" className="nav-mobile__link">About</Link></li>
            <li className="nav-mobile__list-item"><Link href="/en/contactez-nous" className="nav-mobile__link">Contact</Link></li>
          </ul>
          <div className="nav--lang">
            <div className="w-locales-list">
              <div role="list" className="w-locales-items">
                <div role="listitem" className="w-locales-item"><Link hrefLang="fr" href="/fr" className="nav-lang color-black">fr</Link></div>
                <div role="listitem" className="w-locales-item"><Link hrefLang="en" href="/en" className="nav-lang color-black w--current">en</Link></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bot clipping-text nav">
          <div className="footer-bot-info">
            <p className="claim-s max-w-footer split">Consulting firm in strategy, product and digital innovation.</p>
          </div>
          <div className="h-line-mobile on-mobile clipping-item"></div>
          <div className="right right-align">
            <div className="footer-mobile">
              <a href="https://www.linkedin.com/company/tiwis-consulting" className="link-block w-inline-block">
                <div className="div-hide"><div className="nav-tag color-white">Linkedin</div><div className="nav-tag hide color-white">Linkedin</div></div>
              </a>
              <a href="mailto:Hello@tiwis.fr" className="link-block w-inline-block">
                <div className="div-hide"><div className="nav-tag color-white">Hello@tiwis.fr</div><div className="nav-tag hide color-white">Hello@tiwis.fr</div></div>
              </a>
            </div>
          </div>
        </div>

        {/* Submenu Offres */}
        <div className="nav-mobile__submenu nav-mobile__submenu-offres">
          <div className="submenu__block">
            <div className="nav-mobile__submenu-back">
              <img src="/images/vector.png" loading="lazy" alt="" className="svg-back" />
              <div className="submenu-back">Deals</div>
            </div>
            <ul role="list" className="nav-submobile__list-link">
              <li className="nav-submobile__list-item"><Link href="/en/strategie-business-et-produit" className="nav-submobile__link">Business and Product Strategy</Link></li>
              <li className="nav-submobile__list-item"><Link href="/en/design-dexperiences" className="nav-submobile__link">Experience design</Link></li>
              <li className="nav-submobile__list-item"><Link href="/en/transformation-digitale-et-plan-de-croissance" className="nav-submobile__link">Digital and methodological transformation</Link></li>
            </ul>
          </div>
        </div>

        {/* Submenu Expertise */}
        <div className="nav-mobile__submenu nav-mobile__submenu-expertise">
          <div className="submenu__block">
            <div className="nav-mobile__submenu-back">
              <img src="/images/vector.png" loading="lazy" alt="" className="svg-back" />
              <div className="submenu-back">Expertise</div>
            </div>
            <div className="w-dyn-list">
              <div role="list" className="nav-submobile__list-link w-dyn-items">
                {expertiseItems.map((item) => (
                  <div role="listitem" key={item.href} className="nav-submobile__list-item w-dyn-item">
                    <Link href={item.href} className="nav-submobile__link">{item.label}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
