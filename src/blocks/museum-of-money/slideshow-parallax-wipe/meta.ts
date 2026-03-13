import type { BlockMeta } from '../../types'
export const meta: BlockMeta = {
  id: 'slideshow-parallax-wipe',
  sigla: 'SL1',
  title: 'Parallax Wipe Slideshow',
  description: 'Full-screen slideshow with parallax wipe transitions and swipe gestures',
  category: 'slideshow',
  tags: ['gsap', 'parallax', 'wipe', 'swipe', 'flickity'],
  collection: 'museum-of-money',
  sourceUrl: 'https://museumofmoney.com',
  dependencies: ['gsap', 'gsap/ScrollTrigger', 'flickity'],
  viewport: 'full',
  needsScroll: true,
}
