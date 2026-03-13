'use client'

import { useEffect, useRef } from 'react'
import Footer from '@/components/Footer'

const ACCENT_COLORS: string[] = [
  '#00592b',  // green
  '#9eb5ff',  // blue
  '#f580db',  // pink
  '#ffec00',  // yellow
  '#ff7c24',  // orange
  '#1ce585',  // green-text
]

const CATEGORY_COLORS: Record<string, string> = {
  History: '#00592b',
  Education: '#9eb5ff',
  'Financial Literacy': '#f580db',
  Technology: '#ffec00',
  Culture: '#ff7c24',
  'Local Spotlight': '#1ce585',
}

interface BlogPost {
  id: number
  slug: string
  date: string
  category: string
  title: string
  excerpt: string
  accentColor: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'wild-history-of-paper-money',
    date: 'February 12, 2026',
    category: 'History',
    title: 'The Wild History of Paper Money',
    excerpt:
      "From China's Tang Dynasty to your wallet, the story of paper money is stranger than fiction. Discover how a revolutionary idea transformed global commerce forever.",
    accentColor: ACCENT_COLORS[0],
  },
  {
    id: 2,
    slug: 'why-kids-should-learn-about-money-early',
    date: 'February 5, 2026',
    category: 'Education',
    title: 'Why Kids Should Learn About Money Early',
    excerpt:
      'Financial literacy starts young — and the habits formed in childhood shape a lifetime of decisions. Here is how to make money education fun and meaningful.',
    accentColor: ACCENT_COLORS[1],
  },
  {
    id: 3,
    slug: '5-money-myths-that-need-to-die',
    date: 'January 28, 2026',
    category: 'Financial Literacy',
    title: '5 Money Myths That Need to Die',
    excerpt:
      'Common misconceptions debunked — from "cash is safer than a bank" to "you need to be rich to invest." We set the record straight on five persistent money myths.',
    accentColor: ACCENT_COLORS[2],
  },
  {
    id: 4,
    slug: 'future-of-currency-beyond-cash',
    date: 'January 20, 2026',
    category: 'Technology',
    title: 'The Future of Currency: Beyond Cash',
    excerpt:
      'Digital wallets, crypto, and CBDCs are reshaping how we think about money. A deep dive into where currency is heading and what it means for everyday life.',
    accentColor: ACCENT_COLORS[3],
  },
  {
    id: 5,
    slug: 'how-museums-make-learning-fun',
    date: 'January 10, 2026',
    category: 'Culture',
    title: 'How Museums Make Learning Fun',
    excerpt:
      'Interactive experiences that stick — why hands-on museums outperform traditional classrooms in knowledge retention and visitor engagement.',
    accentColor: ACCENT_COLORS[4],
  },
  {
    id: 6,
    slug: 'dallas-city-of-financial-innovation',
    date: 'December 30, 2025',
    category: 'Local Spotlight',
    title: 'Dallas: A City of Financial Innovation',
    excerpt:
      'From oil booms to fintech unicorns, Dallas has always been a place where money moves fast. Explore the financial history of one of America\'s most dynamic cities.',
    accentColor: ACCENT_COLORS[5],
  },
]

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } = {}

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Hero animation
        gsap.from('.blog-hero-title', {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        gsap.from('.blog-hero-subtitle', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        })

        // Cards stagger on scroll
        gsap.from('.blog-card', {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        })
      })
    }

    initGsap()

    return () => {
      if (ctx.revert) ctx.revert()
    }
  }, [])

  return (
    <main
      className="theme-light"
      style={{
        backgroundColor: 'var(--white)',
        color: 'var(--black)',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .blog-hero {
          padding-top: var(--section-space-page-top);
          padding-bottom: var(--section-space-small);
          padding-inline: var(--site-margin);
          border-bottom: 1px solid var(--black-o10);
        }
        .blog-hero-eyebrow {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-bottom: 0.5rem;
        }
        .blog-hero-title {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h1);
          font-weight: 700;
          line-height: 0.85;
          text-transform: uppercase;
          color: var(--black);
          margin-bottom: 1.25rem;
        }
        .blog-hero-subtitle {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-large);
          font-weight: 400;
          line-height: 1.4;
          max-width: 52ch;
          opacity: 0.65;
        }
        .blog-grid-section {
          padding-block: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.25rem, 2.5vw, 2rem);
        }
        @media (max-width: 1023px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 599px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
        .blog-card {
          background: #fff;
          border: 1px solid rgba(25, 15, 10, 0.08);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .blog-card:hover {
          box-shadow: 0 8px 32px rgba(25, 15, 10, 0.12);
          transform: translateY(-3px);
        }
        .blog-card-accent {
          height: 5px;
          width: 100%;
          flex-shrink: 0;
        }
        .blog-card-body {
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.75rem;
        }
        .blog-card-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .blog-card-date {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-text-small);
          font-weight: 500;
          opacity: 0.45;
          letter-spacing: 0.04em;
        }
        .blog-card-category {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-text-small);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.2em 0.65em;
          border-radius: 100px;
          color: #190f0a;
        }
        .blog-card-title {
          font-family: 'Facultyglyphic', 'Palatino Linotype', sans-serif;
          font-size: var(--font-size-h3);
          font-weight: 400;
          line-height: 1.2;
          color: var(--black);
          margin: 0;
        }
        .blog-card-excerpt {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-main);
          font-weight: 400;
          line-height: 1.55;
          opacity: 0.6;
          flex: 1;
        }
        .blog-card-link {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--black);
          display: inline-flex;
          align-items: center;
          gap: 0.35em;
          margin-top: 0.5rem;
          transition: gap 0.2s ease;
        }
        .blog-card-link:hover {
          gap: 0.6em;
        }
      `}</style>

      {/* Hero */}
      <div className="blog-hero" ref={heroRef}>
        <div style={{ maxWidth: '100rem', marginInline: 'auto' }}>
          <p className="blog-hero-eyebrow">MoMoney Museum</p>
          <h1 className="blog-hero-title">Blog</h1>
          <p className="blog-hero-subtitle">
            Stories, insights, and money tales from the MoMoney team
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="blog-grid-section" ref={cardsRef}>
        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="blog-card">
              <div
                className="blog-card-accent"
                style={{ backgroundColor: post.accentColor }}
              />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-date">{post.date}</span>
                  <span
                    className="blog-card-category"
                    style={{
                      backgroundColor: post.accentColor + '33',
                      color: post.accentColor === '#ffec00' ? '#401011' : post.accentColor,
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="blog-card-link">
                  Read More <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
