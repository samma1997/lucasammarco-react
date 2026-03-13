'use client'

import type { BlockMeta } from '@/blocks/types'
import BlockCard from './BlockCard'

interface BlockGridProps {
  blocks: BlockMeta[]
}

export default function BlockGrid({ blocks }: BlockGridProps) {
  return (
    <>
      <style>{`
        .catalog-block-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          padding: 0 1.5rem;
        }
        @media (max-width: 1023px) {
          .catalog-block-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 639px) {
          .catalog-block-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="catalog-block-grid">
        {blocks.map((block) => (
          <BlockCard key={block.id} block={block} />
        ))}
      </div>
    </>
  )
}
