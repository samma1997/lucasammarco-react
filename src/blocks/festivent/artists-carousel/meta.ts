import type { BlockMeta } from '../../types'

export const meta: BlockMeta = {
  id: 'artists-carousel',
  sigla: 'FV5',
  title: 'Festivent — Artists Carousel',
  description: 'Infinite marquee carousel of artist cards with alternating rotation, float animation and GSAP scroll reveals',
  category: 'slideshow',
  tags: ['gsap', 'marquee', 'carousel', 'artists', 'css-animation', 'float'],
  collection: 'festivent',
  sourceUrl: 'https://festivent.ca',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'section',
  needsScroll: true,
}
