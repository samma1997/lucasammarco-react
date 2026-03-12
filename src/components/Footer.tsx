import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="px-6 md:px-10 py-16 section-divider"
      style={{ background: "rgba(255,255,255,0.01)" }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Col 1 — Brand */}
          <div>
            <div
              className="text-lg font-semibold mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Luca Sammarco
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(240,240,240,0.4)" }}
            >
              Consulente in strategia digitale, sviluppo software e innovazione
              AI. Monza, Italia.
            </p>
          </div>

          {/* Col 2 — Links */}
          <div>
            <div
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "rgba(240,240,240,0.25)" }}
            >
              Navigazione
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Offerta", href: "/servizi/seo-geo" },
                { label: "Approccio", href: "/approccio" },
                { label: "Expertise", href: "/expertise/audit-seo" },
                { label: "Progetti", href: "/progetti" },
                { label: "Chi Sono", href: "/chi-sono" },
                { label: "Contatti", href: "/contatti" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm link-underline"
                    style={{ color: "rgba(240,240,240,0.45)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <div
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "rgba(240,240,240,0.25)" }}
            >
              Contatti
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@lucasammarco.com"
                className="text-sm link-underline"
                style={{ color: "rgba(240,240,240,0.45)" }}
              >
                info@lucasammarco.com
              </a>
              <a
                href="https://linkedin.com/in/lucasammarco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm link-underline inline-flex items-center gap-2"
                style={{ color: "rgba(240,240,240,0.45)" }}
              >
                LinkedIn
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 10L10 2M10 2H4M10 2v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <span
                className="text-sm"
                style={{ color: "rgba(240,240,240,0.25)" }}
              >
                Monza, Italia
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(240,240,240,0.2)" }}
          >
            &copy; {currentYear} Luca Sammarco. Sito realizzato da Luca Sammarco.
          </p>
          <div className="flex gap-6">
            <Link
              href="/informazioni-legali"
              className="text-xs link-underline"
              style={{ color: "rgba(240,240,240,0.2)" }}
            >
              Informazioni legali
            </Link>
            <Link
              href="/privacy"
              className="text-xs link-underline"
              style={{ color: "rgba(240,240,240,0.2)" }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
