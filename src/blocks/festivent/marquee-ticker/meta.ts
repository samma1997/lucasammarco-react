import type { BlockMeta } from '../../types'

export const meta: BlockMeta = {
  id: 'marquee-ticker',
  sigla: 'FV1',
  title: 'Festivent — Marquee Ticker Bar',
  description: 'Red scrolling ticker bar with repeating announcement text in futura-pt-condensed',
  category: 'cta',
  tags: ['gsap', 'marquee', 'ticker', 'css-animation'],
  collection: 'festivent',
  sourceUrl: 'https://festivent.ca',
  dependencies: ['gsap'],
  viewport: 'section',
  needsScroll: false,
}
