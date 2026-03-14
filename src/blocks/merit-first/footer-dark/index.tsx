'use client'

import { MF_COLORS, MF_FOOTER, IMG } from '../_shared'

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  FooterDark                                                         */
/* ------------------------------------------------------------------ */

export default function FooterDark() {
  return (
    <>
      <style>{`
        .mf-footer {
          background: ${MF_COLORS.base};
          border-top: 1px solid ${MF_COLORS.border};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .mf-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1.5rem 2rem;
        }

        .mf-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }

        .mf-footer-brand-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.25rem;
          margin: 0 0 0.5rem;
        }

        .mf-footer-tagline {
          color: ${MF_COLORS.textDim};
          font-size: 0.875rem;
          margin: 0 0 1.5rem;
          line-height: 1.5;
        }

        .mf-footer-backed-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .mf-footer-investor-logos {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .mf-footer-investor-logos img {
          filter: brightness(0) invert(1);
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .mf-footer-investor-logos img:hover {
          opacity: 0.8;
        }

        .mf-footer-col-heading {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: ${MF_COLORS.textDim};
          margin: 0 0 1rem;
        }

        .mf-footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .mf-footer-links a {
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
        }

        .mf-footer-links a:hover {
          color: #fff;
        }

        /* ---- Bottom bar ---- */
        .mf-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid ${MF_COLORS.borderSubtle};
          padding-top: 2rem;
          margin-top: 3rem;
        }

        .mf-footer-copyright {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }

        .mf-footer-location {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }

        .mf-footer-location img {
          width: 16px;
          filter: brightness(0) invert(1);
          opacity: 0.3;
        }

        .mf-footer-socials {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mf-footer-socials a {
          color: rgba(255,255,255,0.4);
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .mf-footer-socials a:hover {
          color: #fff;
        }

        /* ---- Responsive ---- */
        @media (max-width: 1024px) {
          .mf-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .mf-footer-grid {
            grid-template-columns: 1fr;
          }

          .mf-footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>

      <footer className="mf-footer">
        <div className="mf-footer-inner">
          {/* ---- 4-column grid ---- */}
          <div className="mf-footer-grid">
            {/* Column 1: Brand */}
            <div>
              <p className="mf-footer-brand-name">MeritFirst</p>
              <p className="mf-footer-tagline">
                Opportunity Promised. Outcomes Earned.
              </p>
              <div className="mf-footer-backed-label">Backed by</div>
              <div className="mf-footer-investor-logos">
                <img
                  src={`${IMG}/8vc-logo.svg`}
                  alt="8VC"
                  width={60}
                />
                <img
                  src={`${IMG}/slow-ventures-logo.svg`}
                  alt="Slow Ventures"
                  width={100}
                />
              </div>
            </div>

            {/* Column 2: Platform */}
            <div>
              <h4 className="mf-footer-col-heading">Platform</h4>
              <ul className="mf-footer-links">
                {MF_FOOTER.platform.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="mf-footer-col-heading">Company</h4>
              <ul className="mf-footer-links">
                {MF_FOOTER.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="mf-footer-col-heading">Legal</h4>
              <ul className="mf-footer-links">
                {MF_FOOTER.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Bottom bar ---- */}
          <div className="mf-footer-bottom">
            <span className="mf-footer-copyright">
              &copy; 2026 MeritFirst, Inc.
            </span>

            <span className="mf-footer-location">
              Built in
              <img
                src={`${IMG}/texas-outline.svg`}
                alt="Texas"
              />
              Texas
            </span>

            <div className="mf-footer-socials">
              <a href="#" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="X (Twitter)">
                <XIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
