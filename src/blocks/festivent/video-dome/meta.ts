import type { BlockMeta } from '../../types'

export const meta: BlockMeta = {
  id: 'video-dome',
  sigla: 'FV4',
  title: 'Festivent — Video Dome',
  description: 'Full-width video with circular clip-path dome shape and GSAP ScrollTrigger parallax effect',
  category: 'cta',
  tags: ['gsap', 'clip-path', 'parallax', 'video', 'ScrollTrigger'],
  collection: 'festivent',
  sourceUrl: 'https://festivent.ca',
  dependencies: ['gsap', 'gsap/ScrollTrigger'],
  viewport: 'section',
  needsScroll: true,
}
