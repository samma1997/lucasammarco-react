'use client'

import { useCallback } from 'react'

interface CatalogNavProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function CatalogNav({ searchQuery, onSearchChange }: CatalogNavProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value)
    },
    [onSearchChange],
  )

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: '1.125rem',
          color: '#f1f0ec',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Block Library
      </span>

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 2rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <input
          type="text"
          placeholder="Search blocks..."
          value={searchQuery}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '36px',
            padding: '0 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: '#f1f0ec',
            fontSize: '0.875rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            outline: 'none',
            transition: 'border-color 0.2s ease, background-color 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(28, 229, 133, 0.4)'
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
          }}
        />
      </div>

      {/* Right spacer to keep search centered */}
      <div style={{ width: '100px', flexShrink: 0 }} />
    </nav>
  )
}
