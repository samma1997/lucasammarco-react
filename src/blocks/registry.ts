import type { BlockMeta } from './types'

import { meta as cardStackHorizontal } from './museum-of-money/card-stack-horizontal/meta'
import { meta as reviewsStaggerGrid } from './museum-of-money/reviews-stagger-grid/meta'
import { meta as slideshowParallaxWipe } from './museum-of-money/slideshow-parallax-wipe/meta'
import { meta as cashCascadeGame } from './museum-of-money/cash-cascade-game/meta'
import { meta as heroCinematicReveal } from './the-grind/hero-cinematic-reveal/meta'
import { meta as gridZoomMosaic } from './the-grind/grid-zoom-mosaic/meta'
// MeritFirst
import { meta as meritfirstFull } from './merit-first/full-page/meta'
// Festivent individual blocks
import { meta as fvHeroBalloon } from './festivent/hero-balloon/meta'
import { meta as fvArtistsCarousel } from './festivent/artists-carousel/meta'
import { meta as fvActivitiesGrid } from './festivent/activities-grid/meta'
import { meta as fvSkyGallery } from './festivent/sky-gallery/meta'
import { meta as fvVisitCards } from './festivent/visit-cards/meta'

export const blockRegistry: BlockMeta[] = [
  cardStackHorizontal,
  reviewsStaggerGrid,
  slideshowParallaxWipe,
  cashCascadeGame,
  heroCinematicReveal,
  gridZoomMosaic,
  // MeritFirst
  meritfirstFull,
  // Festivent individual blocks
  fvHeroBalloon,
  fvArtistsCarousel,
  fvActivitiesGrid,
  fvSkyGallery,
  fvVisitCards,
]

export function getBlockMeta(id: string): BlockMeta | undefined {
  return blockRegistry.find(b => b.id === id)
}

export function getBlocksByCategory(category: string): BlockMeta[] {
  return blockRegistry.filter(b => b.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(blockRegistry.map(b => b.category))]
}
