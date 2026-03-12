import Link from "next/link";

interface ExpertiseCard {
  title: string;
  href: string;
  description: string;
}

interface ExpertiseCardsProps {
  cards: ExpertiseCard[];
  title?: string;
}

export default function ExpertiseCards({
  cards,
  title = "Expertise correlate",
}: ExpertiseCardsProps) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 section-divider">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <span className="tag mb-4 block w-fit">Expertise</span>
          <h2
            className="heading-md"
            style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="group p-8 rounded-2xl border border-[var(--border)] hover:border-[rgba(88,208,245,0.3)] hover:bg-white/[0.02] transition-all duration-300"
            >
              <h3
                className="text-lg font-semibold mb-3 group-hover:text-[var(--cyan)] transition-colors"
                style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "rgba(240,240,240,0.4)" }}
              >
                {card.description}
              </p>
              <div
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--cyan)" }}
              >
                Scopri
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
