import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { FEATURED_PROJECTS } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <Container>
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-4">
          <div>
            <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#045CB4] mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Progetti recenti
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#045CB4] hover:gap-3 transition-all"
          >
            Vedi tutti i progetti
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <StaggerItem key={project.id}>
              <div className="group overflow-hidden rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Project visual */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                  <span className="text-white font-bold text-xl opacity-80">
                    {project.title.charAt(0)}
                  </span>
                  <div className="absolute top-4 left-4">
                    <Badge variant="gray" className="bg-black/20 text-white border-0 backdrop-blur-sm">
                      {project.categoryLabel}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 text-white/60 text-sm font-medium">
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#045CB4] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="space-y-1">
                    {project.results.slice(0, 2).map((result, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#045CB4] flex-shrink-0" />
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
