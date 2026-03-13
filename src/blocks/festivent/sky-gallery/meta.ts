import type { BlockMeta } from '../../types'

export const meta: BlockMeta = {
  id: 'sky-gallery',
  sigla: 'FV9',
  title: 'Sky Gallery',
  description: 'Full-screen sky.jpg background hero with floating gallery photos that animate via GSAP ScrollTrigger parallax.',
  category: 'hero',
  tags: ['gsap', 'parallax', 'gallery', 'fullscreen'],
  collection: 'festivent',
  sourceUrl: 'https://festivent.ca',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'section',
  needsScroll: true,
}
