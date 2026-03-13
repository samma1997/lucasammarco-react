export type BlockCategory = 'hero' | 'cards' | 'reviews' | 'slideshow' | 'games' | 'navigation' | 'footer' | 'faq' | 'location' | 'cta' | 'button' | 'page'

export interface BlockMeta {
  id: string
  sigla: string            // codice breve per riferimento rapido (es. "CS1", "RV1")
  title: string
  description: string
  category: BlockCategory
  tags: string[]
  collection: string
  sourceUrl: string        // URL del sito di riferimento
  dependencies: string[]
  viewport: 'full' | 'section'
  needsScroll: boolean
}

/**
 * Brand Theme — cambia questi valori per ri-brandare tutti i blocchi.
 * I blocchi usano CSS custom properties (--theme-bg, --theme-text, ecc.)
 * che vengono sovrascritte dal tema attivo.
 */
export interface BrandTheme {
  name: string
  bg: string            // sfondo principale
  text: string          // colore testo principale
  accent: string        // colore accento (bottoni, link, badge)
  surface: string       // sfondo card/elementi secondari
  border: string        // bordi
  buttonBg: string      // sfondo bottoni
  buttonText: string    // testo bottoni
}
