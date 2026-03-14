import type { BlockMeta } from '../../types'

export const meta: BlockMeta = {
  id: 'capabilities-grid',
  sigla: 'MF3',
  title: 'MeritFirst — Capabilities Grid',
  description: 'Responsive 2-column feature grid with scroll-triggered fade-in and 4:3 images',
  category: 'cards',
  tags: ['grid', 'fade-in', 'scroll', 'features', 'responsive'],
  collection: 'merit-first',
  sourceUrl: 'https://www.meritfirst.us',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'section',
  needsScroll: true,
}
