import { blockRegistry } from '@/blocks/registry'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import PreviewShell from './PreviewShell'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<string, ComponentType<any>> = {
  // Museum of Money
  'card-stack-horizontal': dynamic(() => import('@/blocks/museum-of-money/card-stack-horizontal')),
  'reviews-stagger-grid': dynamic(() => import('@/blocks/museum-of-money/reviews-stagger-grid')),
  'slideshow-parallax-wipe': dynamic(() => import('@/blocks/museum-of-money/slideshow-parallax-wipe')),
  'cash-cascade-game': dynamic(() => import('@/blocks/museum-of-money/cash-cascade-game')),
  // The Grind
  'hero-cinematic-reveal': dynamic(() => import('@/blocks/the-grind/hero-cinematic-reveal')),
  'grid-zoom-mosaic': dynamic(() => import('@/blocks/the-grind/grid-zoom-mosaic')),
  // MeritFirst
  'hero-sticky-scramble': dynamic(() => import('@/blocks/merit-first/hero-sticky-scramble')),
  'logos-carousel': dynamic(() => import('@/blocks/merit-first/logos-carousel')),
  'capabilities-grid': dynamic(() => import('@/blocks/merit-first/capabilities-grid')),
  'beam-spin-card': dynamic(() => import('@/blocks/merit-first/beam-spin-card')),
  'footer-dark': dynamic(() => import('@/blocks/merit-first/footer-dark')),
  // Festivent individual blocks
  'hero-balloon': dynamic(() => import('@/blocks/festivent/hero-balloon')),
  'artists-carousel': dynamic(() => import('@/blocks/festivent/artists-carousel')),
  'activities-grid': dynamic(() => import('@/blocks/festivent/activities-grid')),
  'sky-gallery': dynamic(() => import('@/blocks/festivent/sky-gallery')),
  'visit-cards': dynamic(() => import('@/blocks/festivent/visit-cards')),
}

export function generateStaticParams() {
  return blockRegistry.map(block => ({ blockId: block.id }))
}

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ blockId: string }>
  searchParams: Promise<{ embed?: string }>
}) {
  const { blockId } = await params
  const { embed } = await searchParams
  const isEmbed = embed === '1'
  const BlockComponent = blockComponents[blockId]

  if (!BlockComponent) {
    notFound()
  }

  const meta = blockRegistry.find(b => b.id === blockId)

  return (
    <PreviewShell isEmbed={isEmbed} needsScroll={meta?.needsScroll}>
      <BlockComponent />
    </PreviewShell>
  )
}
