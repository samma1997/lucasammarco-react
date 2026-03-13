import type { BlockMeta } from '../../types'
export const meta: BlockMeta = {
  id: 'grid-zoom-mosaic',
  sigla: 'GR1',
  title: 'Grid Zoom Mosaic',
  description: 'Pinned scroll-driven photo grid where items zoom in from center with staggered back.out easing',
  category: 'cards',
  tags: ['gsap', 'scrolltrigger', 'grid', 'pinned', 'scrub', 'stagger', 'zoom'],
  collection: 'the-grind',
  sourceUrl: 'https://thegrind.nl',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'full',
  needsScroll: true,
}
