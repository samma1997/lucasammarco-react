'use client'

import { useEffect, useRef, useState } from 'react'
import Footer from '@/components/Footer'

interface FAQItem {
  q: string
  a: string
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const FAQ_DATA: FAQSection[] = [
  {
    title: 'Tickets & Visiting',
    items: [
      {
        q: 'What are your operating hours?',
        a: 'We are open Sunday through Thursday from 10AM to 8PM, and Friday through Saturday from 10AM to 9PM.',
      },
      {
        q: 'How long is a typical visit?',
        a: 'Most visitors spend between 60 and 90 minutes exploring MoMoney. Of course, curious minds are welcome to stay longer.',
      },
      {
        q: 'Where are you located?',
        a: 'We are located at 501 Elm St, Dallas, TX 75202 — right in the heart of the historic West End.',
      },
      {
        q: 'Can I book online?',
        a: 'Yes! Timed-entry tickets are available at momoney.com/tickets. Booking in advance is strongly recommended.',
      },
    ],
  },
  {
    title: "Who's MoMoney For?",
    items: [
      {
        q: 'Is it suitable for kids?',
        a: 'Absolutely. MoMoney is designed for all ages — from curious five-year-olds to sharp-minded adults. Every exhibit has something to discover.',
      },
      {
        q: 'Is the museum accessible?',
        a: 'Yes, MoMoney is fully wheelchair accessible. All floors are reachable via elevator and our team is always on hand to assist.',
      },
      {
        q: 'Do you support multiple languages?',
        a: 'Our primary language is English, and we offer multilingual signage throughout the museum for our international guests.',
      },
    ],
  },
  {
    title: 'The MoMoney Experience',
    items: [
      {
        q: 'What should I bring?',
        a: 'Just yourself and your curiosity. We provide everything you need for a fully immersive experience.',
      },
      {
        q: 'Can I take photos?',
        a: 'Yes — photography is not just allowed, it is encouraged. Every corner of MoMoney is designed to be share-worthy.',
      },
      {
        q: 'Is there a gift shop?',
        a: 'Yes! Our gift shop features unique money-themed merchandise you will not find anywhere else.',
      },
    ],
  },
  {
    title: 'Special Access & Events',
    items: [
      {
        q: 'Do you host private events?',
        a: 'Yes. MoMoney is available for private events, corporate gatherings, and group bookings. Contact us at hello@momoney.com for details.',
      },
      {
        q: 'Are there school visit programs?',
        a: 'Yes, we offer curated educational packages for school groups. Our curriculum-aligned programs are available for all grade levels.',
      },
      {
        q: 'Do you offer discounts?',
        a: 'We offer group rates, student discounts, and military pricing. See our tickets page for the full breakdown.',
      },
    ],
  },
]

interface AccordionItemProps {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function AccordionItem({ q, a, isOpen, onToggle, index }: AccordionItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      el.style.height = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.height = '0px'
      el.style.opacity = '0'
    }
  }, [isOpen])

  return (
    <div
      className="faq-item"
      style={{
        borderBottom: '1px solid var(--theme-border)',
      }}
    >
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="faq-q-text">{q}</span>
        <span
          className="faq-chevron"
          aria-hidden="true"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s ease',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        ref={bodyRef}
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className="faq-answer"
        style={{
          height: '0px',
          opacity: '0',
          overflow: 'hidden',
          transition: 'height 0.4s ease, opacity 0.35s ease',
        }}
      >
        <p className="faq-answer-text">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
        )

        const sectionEls = sectionsRef.current?.querySelectorAll('.faq-section')
        if (sectionEls) {
          gsap.fromTo(
            sectionEls,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: sectionsRef.current,
                start: 'top 82%',
                once: true,
              },
            }
          )
        }
      })
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  return (
    <div
      className="theme-green"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)', minHeight: '100vh' }}
    >
      <style>{`
        .faq-page {
          padding-top: var(--section-space-page-top);
        }
        .faq-hero {
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-bottom: var(--section-space-main);
          border-bottom: 1px solid var(--theme-border);
        }
        .faq-hero h1 {
          color: var(--theme-text);
          margin-bottom: 1rem;
        }
        .faq-subtitle {
          font-size: var(--font-size-text-large);
          opacity: 0.6;
          font-family: 'Aileron', Arial, sans-serif;
          max-width: 50ch;
        }
        .faq-body {
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-top: var(--section-space-main);
          padding-bottom: var(--section-space-large);
        }
        .faq-sections {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .faq-section {
          opacity: 0;
        }
        .faq-section-title {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h6);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--theme-text);
          opacity: 0.45;
          margin-bottom: var(--space-15);
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--theme-border);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: transparent;
          border: none;
          padding: var(--space-15) 0;
          text-align: left;
          color: var(--theme-text);
          cursor: url("/images/cursors/cursor-pointer-links.svg") 8 4, pointer;
        }
        .faq-q-text {
          font-family: 'Facultyglyphic', 'Palatino Linotype', serif;
          font-size: var(--font-size-h3);
          font-weight: 400;
          line-height: 1.25;
          color: var(--theme-text);
        }
        .faq-answer-text {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-main);
          line-height: 1.65;
          color: var(--theme-text);
          opacity: 0.75;
          padding-bottom: var(--space-15);
          max-width: 70ch;
        }
      `}</style>

      <main className="faq-page">
        <div className="faq-hero" ref={heroRef} style={{ opacity: 0 }}>
          <h1>FAQ</h1>
          <p className="faq-subtitle">Find Answers &amp; Visitor Guidelines</p>
        </div>

        <div className="faq-body">
          <div className="faq-sections" ref={sectionsRef}>
            {FAQ_DATA.map((section, sIdx) => (
              <div key={section.title} className="faq-section">
                <p className="faq-section-title">{section.title}</p>
                <div>
                  {section.items.map((item, iIdx) => {
                    const key = `${sIdx}-${iIdx}`
                    return (
                      <AccordionItem
                        key={key}
                        q={item.q}
                        a={item.a}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggleItem(key)}
                        index={sIdx * 100 + iIdx}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
