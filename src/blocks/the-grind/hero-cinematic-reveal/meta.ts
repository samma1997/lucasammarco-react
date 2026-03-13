import type { BlockMeta } from '../../types'
export const meta: BlockMeta = {
  id: 'hero-cinematic-reveal',
  sigla: 'HR2',
  title: 'Cinematic Hero Reveal',
  description: 'Full-viewport cinematic entrance with sequential clip-path reveals, SVG stroke animation, container expansion, and split-text heading',
  category: 'hero',
  tags: ['gsap', 'timeline', 'clip-path', 'svg-stroke', 'split-text', 'cinematic'],
  collection: 'the-grind',
  sourceUrl: 'https://thegrind.nl',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'full',
  needsScroll: false,
}
