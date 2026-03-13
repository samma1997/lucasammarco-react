import type { BlockMeta } from '../../types'

export const meta: BlockMeta = {
  id: 'header-autohide',
  sigla: 'FV2',
  title: 'Festivent — Header Auto-hide',
  description: 'Sticky header that hides on scroll down and reveals on scroll up, with mobile burger menu overlay',
  category: 'navigation',
  tags: ['gsap', 'sticky', 'auto-hide', 'mobile-menu', 'blur'],
  collection: 'festivent',
  sourceUrl: 'https://festivent.ca',
  dependencies: ['gsap'],
  viewport: 'section',
  needsScroll: true,
}
