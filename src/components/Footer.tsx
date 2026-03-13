import Link from 'next/link'

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/tickets', label: 'Book Tickets' },
  { href: '/exhibits', label: 'Exhibits' },
  { href: '/find-us', label: 'Find Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/events', label: 'Events' },
  { href: '/money-lab', label: 'Money Lab' },
  { href: '/gift-shop', label: 'Gift Shop' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
]

const SOCIAL_LINKS: { href: string; label: string; handle: string }[] = [
  {
    href: 'https://www.facebook.com/profile.php?id=61577223339262',
    label: 'Facebook',
    handle: '@MoMoneyMuseum',
  },
  {
    href: 'https://www.instagram.com/momoneymuseum/',
    label: 'Instagram',
    handle: '@momoneymuseum',
  },
  {
    href: 'https://www.youtube.com/@MoMoneyMuseum',
    label: 'YouTube',
    handle: '@MoMoneyMuseum',
  },
  {
    href: 'https://www.tiktok.com/@momoneymuseum',
    label: 'TikTok',
    handle: '@momoneymuseum',
  },
]

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#190f0a',
        color: '#f1f0ec',
        fontFamily: '"Montserrat", sans-serif',
      }}
      className="site-footer"
    >
      <style>{`
        .site-footer {
          border-top: 1px solid rgba(241, 240, 236, 0.08);
        }
        .footer-inner {
          max-width: 90rem;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 6rem) clamp(1rem, 5vw, 4rem) clamp(1.5rem, 3vw, 2.5rem);
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          padding-bottom: clamp(2rem, 4vw, 3.5rem);
          border-bottom: 1px solid rgba(241, 240, 236, 0.08);
        }
        @media (max-width: 767px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 479px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
        }
        .footer-logo {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #f1f0ec;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 1rem;
        }
        .footer-logo span {
          color: #f580db;
        }
        .footer-tagline {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          font-weight: 400;
          line-height: 1.6;
          color: rgba(241, 240, 236, 0.5);
          max-width: 28ch;
          margin-bottom: 1.5rem;
        }
        .footer-col-heading {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(241, 240, 236, 0.35);
          margin-bottom: 1.25rem;
        }
        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-nav-link {
          font-size: clamp(0.85rem, 1.1vw, 1rem);
          font-weight: 500;
          color: rgba(241, 240, 236, 0.7);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.2s ease;
          display: inline-block;
        }
        .footer-nav-link:hover {
          color: #f1f0ec;
        }
        .footer-social-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-social-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .footer-social-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 1px solid rgba(241, 240, 236, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .footer-social-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .footer-social-link:hover {
          opacity: 0.8;
        }
        .footer-social-link:hover .footer-social-icon {
          border-color: rgba(241, 240, 236, 0.4);
          background: rgba(241, 240, 236, 0.06);
        }
        .footer-social-platform {
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(241, 240, 236, 0.7);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
        }
        .footer-social-handle {
          font-size: 0.72rem;
          color: rgba(241, 240, 236, 0.4);
          display: block;
        }
        .footer-ticket-cta {
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #f580db;
          color: #190f0a;
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border-radius: 100px;
          transition: opacity 0.25s ease;
        }
        .footer-ticket-cta:hover {
          opacity: 0.85;
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: clamp(1.25rem, 2.5vw, 2rem);
        }
        .footer-copyright {
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(241, 240, 236, 0.3);
          letter-spacing: 0.02em;
        }
        .footer-legal-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-legal-link {
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(241, 240, 236, 0.3);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s ease;
        }
        .footer-legal-link:hover {
          color: rgba(241, 240, 236, 0.65);
        }
        .footer-nav-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem 1.5rem;
        }
      `}</style>

      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-logo">
              Mo<span>Money</span>
            </Link>
            <p className="footer-tagline">
              The interactive Museum of Money in the heart of Dallas. Money: it's all about change.
            </p>
            <Link href="/tickets/general-admission" className="footer-ticket-cta">
              Book Tickets →
            </Link>
          </div>

          {/* Navigation column */}
          <div>
            <p className="footer-col-heading">Explore</p>
            <div className="footer-nav-cols">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="footer-nav-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social column */}
          <div>
            <p className="footer-col-heading">Follow Us</p>
            <ul className="footer-social-list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label} className="footer-social-item">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={`Follow MoMoney on ${social.label}`}
                  >
                    <span className="footer-social-icon" aria-hidden="true">
                      {social.label === 'Facebook' && 'f'}
                      {social.label === 'Instagram' && 'ig'}
                      {social.label === 'YouTube' && 'yt'}
                      {social.label === 'TikTok' && 'tt'}
                    </span>
                    <span>
                      <span className="footer-social-platform">{social.label}</span>
                      <span className="footer-social-handle">{social.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {CURRENT_YEAR} MoMoney — Museum of Money. All rights reserved.
          </p>
          <ul className="footer-legal-links">
            <li>
              <Link href="/privacy-policy" className="footer-legal-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="footer-legal-link">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="footer-legal-link">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Museum',
            name: 'MoMoney',
            alternateName: 'Museum of Money',
            url: 'https://www.museumofmoney.com',
            openingHours: ['Mo-Th 10:00-20:00', 'Fr-Sa 10:00-21:00', 'Su 10:00-20:00'],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '501 Elm St',
              addressLocality: 'Dallas',
              addressRegion: 'TX',
              postalCode: '75202',
              addressCountry: 'US',
            },
            sameAs: [
              'https://www.facebook.com/profile.php?id=61577223339262',
              'https://www.instagram.com/momoneymuseum/',
              'https://www.youtube.com/@MoMoneyMuseum',
              'https://www.tiktok.com/@momoneymuseum',
            ],
          }),
        }}
      />
    </footer>
  )
}
