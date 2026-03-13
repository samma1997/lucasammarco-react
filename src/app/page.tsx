'use client'

import { useState, useMemo } from 'react'
import { blockRegistry, getAllCategories } from '@/blocks/registry'
import CatalogNav from '@/components/catalog/CatalogNav'
import CategoryFilter from '@/components/catalog/CategoryFilter'
import BlockGrid from '@/components/catalog/BlockGrid'

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categories = useMemo(() => getAllCategories(), [])

  const filteredBlocks = useMemo(() => {
    return blockRegistry.filter((block) => {
      const matchesCategory =
        !activeCategory || block.category === activeCategory
      const matchesSearch =
        !searchQuery ||
        block.sigla.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        block.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, activeCategory])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#f1f0ec',
      }}
    >
      <CatalogNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Spacer for fixed nav */}
      <div style={{ paddingTop: '80px' }}>
        {/* Hero area */}
        <div
          style={{
            padding: '3rem 1.5rem 1rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Block Library
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.125rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {blockRegistry.length} animated blocks ready to use
          </p>
        </div>

        {/* Category filter */}
        <div
          style={{
            padding: '0 1.5rem 2rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Grid */}
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <BlockGrid blocks={filteredBlocks} />
        </div>

        {/* Empty state */}
        {filteredBlocks.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            <p style={{ fontSize: '1.25rem' }}>
              No blocks match your search
            </p>
          </div>
        )}

        {/* Footer spacer */}
        <div style={{ height: '4rem' }} />
      </div>
    </div>
  )
}
