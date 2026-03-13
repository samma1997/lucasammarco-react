import type { BlockMeta } from '../../types'
export const meta: BlockMeta = {
  id: 'reviews-stagger-grid',
  sigla: 'RV1',
  title: 'Stagger Grid Reviews',
  description: 'Review cards with staggered fade-up entrance animation on scroll',
  category: 'reviews',
  tags: ['gsap', 'scrolltrigger', 'stagger', 'grid'],
  collection: 'museum-of-money',
  sourceUrl: 'https://museumofmoney.com',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'section',
  needsScroll: true,
}
