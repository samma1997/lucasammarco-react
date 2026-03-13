import type { BlockMeta } from '../../types'
export const meta: BlockMeta = {
  id: 'card-stack-horizontal',
  sigla: 'CS1',
  title: 'Horizontal Card Stack',
  description: 'Pinned horizontal scroll section with stacked cards revealing on scroll',
  category: 'cards',
  tags: ['gsap', 'scrolltrigger', 'horizontal-scroll', 'pinned'],
  collection: 'museum-of-money',
  sourceUrl: 'https://museumofmoney.com',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'full',
  needsScroll: true,
}
