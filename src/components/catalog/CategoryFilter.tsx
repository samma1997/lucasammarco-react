'use client'

import { useCallback } from 'react'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const handleClick = useCallback(
    (category: string | null) => () => {
      onCategoryChange(category)
    },
    [onCategoryChange],
  )

  const pillBase: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    flexShrink: 0,
  }

  const activePill: React.CSSProperties = {
    ...pillBase,
    backgroundColor: '#1ce585',
    color: '#0a0a0a',
  }

  const inactivePill: React.CSSProperties = {
    ...pillBase,
    backgroundColor: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.5)',
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        paddingBottom: '0.25rem',
      }}
    >
      <button
        style={activeCategory === null ? activePill : inactivePill}
        onClick={handleClick(null)}
        onMouseEnter={(e) => {
          if (activeCategory !== null) {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
          }
        }}
        onMouseLeave={(e) => {
          if (activeCategory !== null) {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
          }
        }}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          style={activeCategory === category ? activePill : inactivePill}
          onClick={handleClick(category)}
          onMouseEnter={(e) => {
            if (activeCategory !== category) {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
            }
          }}
          onMouseLeave={(e) => {
            if (activeCategory !== category) {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
            }
          }}
        >
          {capitalize(category)}
        </button>
      ))}
    </div>
  )
}
