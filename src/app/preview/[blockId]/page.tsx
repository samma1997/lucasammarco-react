import { blockRegistry } from '@/blocks/registry'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

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
  // Festivent
  'festivent-full': dynamic(() => import('@/blocks/festivent/full-page')),
  // Festivent individual blocks (FV1–FV15)
  'marquee-ticker': dynamic(() => import('@/blocks/festivent/marquee-ticker')),
  'header-autohide': dynamic(() => import('@/blocks/festivent/header-autohide')),
  'hero-balloon': dynamic(() => import('@/blocks/festivent/hero-balloon')),
  'video-dome': dynamic(() => import('@/blocks/festivent/video-dome')),
  'artists-carousel': dynamic(() => import('@/blocks/festivent/artists-carousel')),
  'two-scenes-cta': dynamic(() => import('@/blocks/festivent/two-scenes-cta')),
  'activities-grid': dynamic(() => import('@/blocks/festivent/activities-grid')),
  'sky-gallery': dynamic(() => import('@/blocks/festivent/sky-gallery')),
  'visit-cards': dynamic(() => import('@/blocks/festivent/visit-cards')),
}

export function generateStaticParams() {
  return blockRegistry.map(block => ({ blockId: block.id }))
}

export default async function PreviewPage({ params }: { params: Promise<{ blockId: string }> }) {
  const { blockId } = await params
  const BlockComponent = blockComponents[blockId]

  if (!BlockComponent) {
    notFound()
  }

  const meta = blockRegistry.find(b => b.id === blockId)

  return (
    <div style={{ minHeight: '100vh' }}>
      <a
        href="/"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 9999,
          padding: '0.5rem 1rem',
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontFamily: 'system-ui, sans-serif',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        ← Back to catalog
      </a>

      {meta?.needsScroll && (
        <div style={{ height: '300vh' }}>
          <BlockComponent />
        </div>
      )}
      {!meta?.needsScroll && <BlockComponent />}
    </div>
  )
}
