'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MarqueeSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" fill="none">
    <path d="M8.3143 8.3143C-1.4381 18.0667 -1.4381 33.9333 8.3143 43.6857C18.0667 53.4381 33.9333 53.4381 43.6857 43.6857C53.4381 33.9333 53.4381 18.0667 43.6857 8.3143C33.9333 -1.4381 18.0667 -1.4381 8.3143 8.3143ZM9.23648 9.23648C16.2602 2.21273 26.6316 0.532593 35.266 4.18974C28.1728 3.09702 19.5447 6.15412 12.8494 12.8494C6.15412 19.5447 3.09702 28.1728 4.18974 35.266C0.532592 26.6316 2.21273 16.2602 9.23648 9.23648ZM34.6155 34.6155C41.715 27.5159 45.7701 19.5826 45.7322 13.8727C48.4166 20.9533 45.6501 30.8067 38.2284 38.2284C30.8067 45.6501 20.9596 48.4229 13.8727 45.7322C19.5826 45.7701 27.5159 41.715 34.6155 34.6155ZM11.144 43.9762C15.8434 42.6372 24.263 35.5061 29.8845 29.8845C35.5061 24.263 42.6309 15.837 43.9762 11.144C45.8901 16.216 41.7719 25.6147 33.6933 33.6933C25.6147 41.7719 16.2223 45.8964 11.144 43.9762ZM28.9624 28.9624C18.7299 39.1948 10.4429 43.9699 9.23648 42.7635C8.03007 41.5571 12.8052 33.2701 23.0376 23.0376C33.2701 12.8052 41.5571 8.03007 42.7635 9.23648C43.9699 10.4429 39.1948 18.7299 28.9624 28.9624ZM8.02375 40.856C6.1099 35.784 10.2281 26.3853 18.3067 18.3067C26.3853 10.2281 35.7777 6.10359 40.856 8.02375C36.1566 9.36281 27.737 16.4939 22.1155 22.1155C16.4939 27.737 9.36913 36.163 8.02375 40.856ZM17.3845 17.3845C10.2913 24.4778 6.22991 32.4174 6.26781 38.1273C3.58337 31.0467 6.35624 21.1996 13.7779 13.7779C21.1996 6.35624 31.0467 3.58337 38.1273 6.26781C32.4174 6.22991 24.4841 10.285 17.3845 17.3845ZM42.7635 42.7635C35.7398 49.7873 25.3684 51.4674 16.734 47.8103C23.8272 48.903 32.4553 45.8459 39.1506 39.1506C45.8459 32.4553 48.903 23.8272 47.8103 16.734C51.4674 25.3684 49.7873 35.7398 42.7635 42.7635Z" fill="#B2CBE6" stroke="#B2CBE6" />
  </svg>
)

const ArrowSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M8 7.33138H5.92082V3.41642L1.33724 8L0 6.66276L4.58358 2.07918H0.668622V0H8L8 7.33138Z" fill="#FA4838" />
  </svg>
)

const useCases = [
  {
    href: '/progetti',
    title: 'Superhead',
    subtitle: 'Piattaforma booking soggiorni premium in montagna',
    description: 'Brand Development e Product Development a 360°',
    image: '/images/superhead.jpg',
  },
  {
    href: '/progetti',
    title: 'Pellegrin',
    subtitle: 'Maison di gioielli in Provenza',
    description: 'Strategia di sviluppo e digitalizzazione',
    image: '/images/pellegrin.png',
  },
  {
    href: '/progetti',
    title: 'Lumara Vision',
    subtitle: 'Soluzione per la digitalizzazione delle operazioni marittime oil & gas',
    description: 'UX e sviluppo app',
    image: '/images/lumara.png',
  },
]

export default function BusinessCases() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const masks = Array.from(wrapper.querySelectorAll('.use-case__img-mask'))
    if (!masks.length) return

    gsap.set(masks, { clipPath: 'inset(30%)' })

    gsap.timeline({
      scrollTrigger: {
        trigger: masks[0],
        start: 'top bottom',
        end: '30% bottom',
        scrub: 1,
      },
    }).to(masks, {
      clipPath: 'inset(0%)',
      ease: 'none',
      stagger: 0.1,
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      {/* Marquee */}
      <div className="item--marquee">
        <div className="marquee">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="marquee-content scroll-marquee">
              <div className="marquee__text clipping-text">Buisness cases</div>
              <div className="marquee__svg w-embed">
                <MarqueeSVG />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use cases */}
      <div className="use-case__wrapper collection-list-wrapper-2 w-dyn-list" ref={wrapperRef}>
        <div role="list" className="use-case__list w-dyn-items">
          {useCases.map((uc) => (
            <div role="listitem" key={uc.href} className="use-case__item w-dyn-item">
              <Link href={uc.href} className="use-case__block w-inline-block">
                <div className="use-case__img-container">
                  <div className="use-case__img-mask">
                    <img
                      src={uc.image}
                      loading="lazy"
                      alt={uc.title}
                      className="use-case__img-item"
                    />
                  </div>
                </div>
                <div className="use-case__block-top">
                  <div className="top use-case__top-margin">
                    <h4 className="use-case-h4">{uc.title}</h4>
                    <div className="w-embed">
                      <ArrowSVG />
                    </div>
                  </div>
                  <p className="use-case-text">{uc.subtitle}</p>
                </div>
                <p className="use-case-text">{uc.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
