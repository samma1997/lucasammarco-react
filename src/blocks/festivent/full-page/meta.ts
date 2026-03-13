import type { BlockMeta } from '../../types'
export const meta: BlockMeta = {
  id: 'festivent-full',
  sigla: 'FV0',
  title: 'Festivent — Full Page',
  description: 'Full reconstruction of festivent.ca homepage — festival de montgolfières',
  category: 'page',
  tags: ['gsap', 'scroll', 'festival', 'events', 'full-page', 'carousel'],
  collection: 'festivent',
  sourceUrl: 'https://festivent.ca',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'full',
  needsScroll: false,
}
