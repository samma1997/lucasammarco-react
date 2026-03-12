'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const wrapper = section.querySelector('.horizontal-wrapper') as HTMLElement | null
    const track = section.querySelector('.track') as HTMLElement | null
    const textPin = document.querySelector('.horizontal-text-pin') as HTMLElement | null

    if (!wrapper || !track) return

    const isMobile = window.matchMedia('(max-width: 479px)').matches

    // Split text elements in first slide (split-timeline)
    const splitElems = section.querySelectorAll('.split-timeline')
    let allLines: HTMLElement[] = []
    let splitPlayed = false

    splitElems.forEach((el) => {
      const lines = Array.from(el.querySelectorAll('br'))
      // We just animate the paragraphs themselves since SplitText isn't available
      allLines.push(el as HTMLElement)
    })

    gsap.set(allLines, { y: '140%', opacity: 0 })

    const firstSlide = section.querySelector('.h-slide')
    const firstArrows = firstSlide?.querySelectorAll('.h-arrow') || []
    if (firstArrows.length) gsap.set(Array.from(firstArrows), { yPercent: 150 })

    function playIntroAnim() {
      if (splitPlayed) return
      splitPlayed = true

      if (allLines.length) {
        gsap.to(allLines, { y: '0%', opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.05 })
      }
      if (firstArrows.length) {
        gsap.to(Array.from(firstArrows), { yPercent: 0, duration: 0.7, ease: 'power3.out' })
      }
      document.body.classList.add('h-slide-1-ready')
    }

    if (isMobile) {
      gsap.set(wrapper, { scale: 1, x: 0, y: 0 })
      gsap.set(track, { x: 0 })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: playIntroAnim,
      })

      return
    }

    const getTotalDistance = () => track.scrollWidth - window.innerWidth

    gsap.set(wrapper, { scale: 0, x: 0, y: 0 })
    gsap.set(track, { x: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + (getTotalDistance() + window.innerHeight * 0.5),
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'none' },
    })

    tl.addLabel('scaleStart')
    tl.to(wrapper, { scale: 1, x: '50vw', duration: 0.3 })
    tl.call(playIntroAnim, undefined, '>')
    tl.addLabel('scaleEnd')
    tl.to(wrapper, { x: '0vw', duration: 0.2 })
    tl.to(track, { x: () => -getTotalDistance(), duration: 0.5 })
    tl.to({}, { duration: 0.15 })

    if (textPin) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        end: () => {
          const st = tl.scrollTrigger!
          const scaleStart = st.start + tl.labels.scaleStart * (st.end - st.start)
          const scaleEnd = st.start + tl.labels.scaleEnd * (st.end - st.start)
          const scaleDuration = scaleEnd - scaleStart
          return scaleStart + scaleDuration * 0.7
        },
        pin: textPin,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
      })
    }

    // Slide animations (custom_script_5 logic - intersection observer per slide)
    const slides = gsap.utils.toArray<HTMLElement>('.h-slide')
    slides.forEach((slide, index) => {
      const targets = Array.from(slide.querySelectorAll('.split-horizontal'))
      const svgPaths = Array.from(slide.querySelectorAll('.svg-draw path')) as SVGPathElement[]
      const arrows = Array.from(slide.querySelectorAll('.h-arrow'))
      const isFirst = index === 0

      gsap.set(targets, { y: '140%', opacity: 0 })
      if (svgPaths.length) {
        svgPaths.forEach((path) => {
          const length = path.getTotalLength()
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
        })
      }
      if (arrows.length && !isFirst) gsap.set(arrows, { yPercent: 150 })

      let played = false

      const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return
          if (isFirst && !document.body.classList.contains('h-slide-1-ready')) return
          if (played) return
          played = true

          if (targets.length) {
            gsap.to(targets, { y: '0%', opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.05 })
          }
          if (svgPaths.length) {
            gsap.to(svgPaths, { strokeDashoffset: 0, duration: 1.5, ease: 'power3.inOut' })
          }
          if (arrows.length) {
            gsap.to(arrows, { yPercent: 0, duration: 0.5, ease: 'power3.out' })
          }
          slideObserver.unobserve(slide)
        })
      }, { threshold: [0.5] })

      slideObserver.observe(slide)
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div className="horizontal-section" ref={sectionRef}>
      <div className="horizontal-wrapper">
        <div className="track">
          {/* Slide 1 - Strategy */}
          <div className="h-slide">
            <div className="top">
              <p className="claim-s split-timeline">
                Analyzing a market, validating<br />
                The product-market fit and test<br />
                the solidity of the business model:<br />
                key steps to transform<br />
                a successful idea on offer.<br />
              </p>
              <div className="div-hide">
                <div className="h-arrow w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                    <path d="M16.0003 14.1421H11.9895V6.59024L3.14789 15.4319L0.568359 12.8524L9.41002 4.01071H1.85812V0H16.0003L16.0003 14.1421Z" fill="#FA4838" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bot col clipping-text gap">
              <div className="nav-tag clipping-text split-timeline">business &amp; product</div>
              <h2 className="clipping-text split-timeline home-h2">Strategy</h2>
            </div>
          </div>

          {/* Slide side 1 */}
          <div className="h-slide side">
            <div className="slide-side__content">
              <div className="nav-tag color-white split-horizontal">Offer</div>
              <div className="w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" fill="none" className="svg-draw">
                  <path d="M1.19006 0.969727C1.19006 31.7697 26.1601 56.7397 56.9601 56.7397" stroke="white" strokeWidth="1" strokeMiterlimit="10" />
                  <path d="M56.8401 1.0498C26.0401 1.0498 1.07007 26.0198 1.07007 56.8198" stroke="white" strokeWidth="1" strokeMiterlimit="10" />
                  <path d="M0.940063 56.6997C31.7401 56.6997 56.7101 31.7297 56.7101 0.929688" stroke="white" strokeWidth="1" strokeMiterlimit="10" />
                  <path d="M56.69 1H1V56.69H56.69V1Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" />
                </svg>
              </div>
              <div className="nav-tag color-white split-horizontal">Offer</div>
            </div>
          </div>

          {/* Slide 2 - Design */}
          <div className="h-slide">
            <div className="top">
              <p className="claim-s split-horizontal">
                Allier Design Thinking<br />
                et Agilité pour développer<br />
                des expériences de marque<br />
                et des interfaces clients uniques,<br />
                conçues pour durer et performer.
              </p>
              <div className="div-hide">
                <div className="h-arrow w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                    <path d="M16.0003 14.1421H11.9895V6.59024L3.14789 15.4319L0.568359 12.8524L9.41002 4.01071H1.85812V0H16.0003L16.0003 14.1421Z" fill="#FA4838" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bot col clipping-text gap">
              <div className="nav-tag clipping-text split-horizontal">Digital experiences</div>
              <h2 className="clipping-text split-reveal split-horizontal">Design</h2>
            </div>
          </div>

          {/* Slide side 2 */}
          <div className="h-slide side">
            <div className="slide-side__content">
              <div className="nav-tag color-white split-horizontal">Offer</div>
              <div className="w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" fill="none" className="svg-draw">
                  <path d="M14.75 56.44C22.3439 56.44 28.5 44.0293 28.5 28.72C28.5 13.4107 22.3439 1 14.75 1C7.15608 1 1 13.4107 1 28.72C1 44.0293 7.15608 56.44 14.75 56.44Z" stroke="white" strokeWidth="0.5" strokeMiterlimit="10" />
                  <path d="M28.73 56.44C36.3239 56.44 42.48 44.0293 42.48 28.72C42.48 13.4107 36.3239 1 28.73 1C21.1361 1 14.98 13.4107 14.98 28.72C14.98 44.0293 21.1361 56.44 28.73 56.44Z" stroke="white" strokeWidth="0.5" strokeMiterlimit="10" />
                  <path d="M42.72 56.44C50.3139 56.44 56.47 44.0293 56.47 28.72C56.47 13.4107 50.3139 1 42.72 1C35.1261 1 28.97 13.4107 28.97 28.72C28.97 44.0293 35.1261 56.44 42.72 56.44Z" stroke="white" strokeWidth="0.5" strokeMiterlimit="10" />
                </svg>
              </div>
              <div className="nav-tag color-white split-horizontal">Offer</div>
            </div>
          </div>

          {/* Slide 3 - Transformation */}
          <div className="h-slide">
            <div className="top">
              <p className="claim-s split-horizontal">
                Accompanying the transformation<br />
                of your organization,<br />
                of your methods and your talents<br />
                to increase efficiency,<br />
                manage your teams and build<br />
                sustainable growth.
              </p>
              <div className="div-hide">
                <div className="h-arrow w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                    <path d="M16.0003 14.1421H11.9895V6.59024L3.14789 15.4319L0.568359 12.8524L9.41002 4.01071H1.85812V0H16.0003L16.0003 14.1421Z" fill="#FA4838" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bot col clipping-text gap">
              <div className="nav-tag clipping-text split-horizontal">Digital &amp; methodology</div>
              <h2 className="clipping-text split-horizontal split-reveal">Transfor<br />— Nation</h2>
            </div>
          </div>

          {/* Slide side 3 */}
          <div className="h-slide side">
            <div className="slide-side__content">
              <div className="nav-tag color-white split-horizontal">Offer</div>
              <div className="w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-draw" viewBox="0 0 59 59" fill="none">
                  <path d="M28.92 28.92L28.65 56.83H1V1H56.84L57.06 28.9L28.92 28.92Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" />
                  <path d="M56.5042 29.7143L28.9945 2.20459L1.48476 29.7143L28.9945 57.2241L56.5042 29.7143Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" />
                </svg>
              </div>
              <div className="nav-tag color-white split-horizontal">Offer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
