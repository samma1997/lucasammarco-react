import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="text-[200px] font-bold leading-none mb-8 opacity-[0.04]"
          style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.05em" }}
        >
          404
        </div>
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 -mt-32"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Pagina non trovata
        </h1>
        <p
          className="text-lg mb-10 max-w-md"
          style={{ color: "rgba(240,240,240,0.45)" }}
        >
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <Link href="/" className="btn-primary">
          Torna alla home
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </section>
      <Footer />
    </main>
  );
}
