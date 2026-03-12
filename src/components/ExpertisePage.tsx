import PageHero from "@/components/PageHero";
import StepsSection from "@/components/StepsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Phase {
  number: string;
  title: string;
  description: string;
}

interface Deliverable {
  text: string;
}

interface RelatedCase {
  title: string;
  href: string;
  service: string;
}

interface ExpertisePageProps {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor?: string;
  phases: Phase[];
  deliverables: Deliverable[];
  relatedCases?: RelatedCase[];
}

export default function ExpertisePageTemplate({
  tag,
  title,
  subtitle,
  description,
  accentColor = "var(--cyan)",
  phases,
  deliverables,
  relatedCases,
}: ExpertisePageProps) {
  return (
    <main>
      <PageHero
        tag={tag}
        title={title}
        subtitle={subtitle}
        description={description}
        accentColor={accentColor}
      />

      <StepsSection steps={phases} title="Le fasi del progetto" />

      {/* Deliverables */}
      <section className="py-24 md:py-32 px-6 md:px-10 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="tag mb-4 block w-fit">Output</span>
              <h2
                className="heading-md"
                style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
              >
                Cosa ricevi
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {deliverables.map((d, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] hover:bg-white/[0.02] transition-colors"
                >
                  <div
                    className="flex-none w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: accentColor }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5.5l2 2 4-4"
                        stroke="#0A0A0A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(240,240,240,0.6)" }}
                  >
                    {d.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related cases */}
      {relatedCases && relatedCases.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-10 section-divider">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-12">
              <span className="tag mb-4 block w-fit">Case Study</span>
              <h2
                className="heading-md"
                style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
              >
                Progetti correlati
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedCases.map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
                  className="group p-8 rounded-2xl border border-[var(--border)] hover:border-[rgba(88,208,245,0.3)] hover:bg-white/[0.02] transition-all"
                >
                  <span className="tag mb-4 block w-fit">{c.service}</span>
                  <h3
                    className="text-lg font-semibold group-hover:text-[var(--cyan)] transition-colors"
                    style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
                  >
                    {c.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </main>
  );
}
