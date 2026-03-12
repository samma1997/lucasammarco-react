import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#045CB4] to-[#046BD2] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#EAFD9C]/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto a far crescere il tuo business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Contattami per una consulenza gratuita di 30 minuti. Analizziamo insieme la
            tua situazione e definisco la strategia migliore per raggiungere i tuoi
            obiettivi digitali.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/preventivo" size="lg" variant="secondary">
              Richiedi Preventivo Gratuito
            </Button>
            <Button
              href="mailto:info@lucasammarco.com"
              size="lg"
              variant="ghost"
              className="text-white border-2 border-white/30 hover:bg-white/10"
            >
              Scrivi una Email
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            Rispondo entro 24 ore. Nessun impegno, nessuna pressione.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
