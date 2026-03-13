import type { BlockMeta } from '../../types'

export const meta: BlockMeta = {
  id: 'two-scenes-cta',
  sigla: 'FV7',
  title: 'Two Scenes CTA',
  description: 'Light blue CTA section with a rotated venue image that animates via GSAP ScrollTrigger parallax on scroll.',
  category: 'cta',
  tags: ['gsap', 'parallax', 'cta'],
  collection: 'festivent',
  sourceUrl: 'https://festivent.ca',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'section',
  needsScroll: true,
}
