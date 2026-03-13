'use client'

import { useEffect, useRef, useState } from 'react'
import Footer from '@/components/Footer'

interface Product {
  id: number
  title: string
  price: string
  colorBlock: string
  label: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'MoMoney T-Shirt',
    price: '$29.99',
    colorBlock: '#00592b',
    label: 'Apparel',
  },
  {
    id: 2,
    title: 'Gold Bar Chocolate',
    price: '$12.99',
    colorBlock: '#ffec00',
    label: 'Edible',
  },
  {
    id: 3,
    title: 'Currency Design Kit',
    price: '$24.99',
    colorBlock: '#9eb5ff',
    label: 'Activity',
  },
  {
    id: 4,
    title: 'Piggy Bank (Limited Edition)',
    price: '$34.99',
    colorBlock: '#f580db',
    label: 'Collectible',
  },
  {
    id: 5,
    title: 'MoMoney Cap',
    price: '$22.99',
    colorBlock: '#ff7c24',
    label: 'Apparel',
  },
  {
    id: 6,
    title: 'Money History Book',
    price: '$19.99',
    colorBlock: '#190f0a',
    label: 'Book',
  },
]

export default function GiftShopPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    let ctx: { revert?: () => void } = {}

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.from('.giftshop-hero-title', {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        gsap.from('.giftshop-hero-subtitle', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        })
        gsap.from('.giftshop-cart-badge', {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(2)',
        })

        gsap.from('.product-card', {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
          y: 60,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
        })
      })
    }

    initGsap()

    return () => {
      if (ctx.revert) ctx.revert()
    }
  }, [])

  const handleAddToCart = async (productId: number) => {
    setCartCount((prev) => prev + 1)
    // Micro-animation feedback
    const btn = document.querySelector(`[data-product-btn="${productId}"]`)
    if (btn) {
      const { gsap } = await import('gsap')
      gsap.timeline()
        .to(btn, { scale: 0.92, duration: 0.1 })
        .to(btn, { scale: 1, duration: 0.3, ease: 'back.out(3)' })
    }
  }

  return (
    <main
      className="theme-yellow"
      style={{
        backgroundColor: '#ffec00',
        color: '#401011',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .giftshop-hero {
          padding-top: var(--section-space-page-top);
          padding-bottom: var(--section-space-small);
          padding-inline: var(--site-margin);
          border-bottom: 1px solid rgba(64, 16, 17, 0.12);
        }
        .giftshop-hero-inner {
          max-width: 100rem;
          margin-inline: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .giftshop-hero-eyebrow {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-bottom: 0.5rem;
        }
        .giftshop-hero-title {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h1);
          font-weight: 700;
          line-height: 0.85;
          text-transform: uppercase;
          color: #401011;
          margin-bottom: 1.25rem;
        }
        .giftshop-hero-subtitle {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-large);
          font-weight: 400;
          line-height: 1.4;
          max-width: 50ch;
          opacity: 0.6;
        }
        .giftshop-cart-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #401011;
          color: #ffec00;
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 0.65rem 1.25rem;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .giftshop-cart-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffec00;
          color: #401011;
          font-weight: 700;
          min-width: 1.4em;
          height: 1.4em;
          border-radius: 100px;
          font-size: 0.85em;
        }
        .giftshop-section {
          padding-block: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2.5vw, 1.75rem);
        }
        @media (max-width: 1023px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 599px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
        .product-card {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(64, 16, 17, 0.1);
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 12px rgba(64, 16, 17, 0.06);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .product-card:hover {
          box-shadow: 0 8px 32px rgba(64, 16, 17, 0.14);
          transform: scale(1.02);
        }
        .product-color-block {
          height: clamp(140px, 20vw, 200px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
        }
        .product-card-body {
          padding: clamp(1rem, 2.5vw, 1.5rem);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .product-card-title {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h4);
          font-weight: 500;
          line-height: 1.2;
          color: #401011;
          margin: 0;
        }
        .product-card-price {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h3);
          font-weight: 700;
          line-height: 1;
          color: #401011;
          margin-top: 0.25rem;
        }
        .product-add-btn {
          margin-top: auto;
          padding-top: 0.75rem;
          background: #401011;
          color: #ffec00;
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          padding: 0.75rem 1.25rem;
          width: 100%;
          cursor: url("/images/cursors/cursor-pointer-links.svg") 8 4, pointer;
          transition: background 0.2s ease, color 0.2s ease;
          display: block;
        }
        .product-add-btn:hover {
          background: #190f0a;
        }
      `}</style>

      {/* Hero */}
      <div className="giftshop-hero" ref={heroRef}>
        <div className="giftshop-hero-inner">
          <div>
            <p className="giftshop-hero-eyebrow">MoMoney Museum</p>
            <h1 className="giftshop-hero-title">Gift Shop</h1>
            <p className="giftshop-hero-subtitle">
              Take a piece of MoMoney home with you
            </p>
          </div>
          <div className="giftshop-cart-badge">
            <span>Cart</span>
            <span className="giftshop-cart-count">{cartCount}</span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="giftshop-section" ref={gridRef}>
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className="product-color-block"
                style={{ backgroundColor: product.colorBlock }}
                aria-hidden="true"
              >
                <span className="product-label">{product.label}</span>
              </div>
              <div className="product-card-body">
                <h4 className="product-card-title">{product.title}</h4>
                <p className="product-card-price">{product.price}</p>
                <button
                  className="product-add-btn"
                  data-product-btn={product.id}
                  onClick={() => handleAddToCart(product.id)}
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
