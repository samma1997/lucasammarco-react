'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { BlockMeta } from '@/blocks/types'

interface BlockCardProps {
  block: BlockMeta
}

const COLLECTION_COLORS: Record<string, { bg: string; accent: string }> = {
  'museum-of-money': { bg: '#1a1a2e', accent: '#c9a962' },
  'the-grind': { bg: '#0d0d0d', accent: '#ff4444' },
  festivent: { bg: '#154e85', accent: '#f15c56' },
}

export default function BlockCard({ block }: BlockCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const colors = COLLECTION_COLORS[block.collection] || { bg: '#1a1a1a', accent: '#1ce585' }

  // Lazy load iframe when card enters viewport
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleClick = useCallback(() => {
    router.push(`/preview/${block.id}`)
  }, [router, block.id])

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '0.75rem',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: isHovered
          ? '1px solid rgba(28, 229, 133, 0.3)'
          : '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        boxShadow: isHovered ? '0 0 20px rgba(28, 229, 133, 0.08)' : 'none',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Live preview iframe */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          position: 'relative',
          background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg}dd 60%, ${colors.accent}33 100%)`,
        }}
      >
        {isVisible && (
          <iframe
            src={`/preview/${block.id}`}
            title={block.title}
            loading="lazy"
            style={{
              width: '1440px',
              height: '900px',
              border: 'none',
              transform: 'scale(0.243)',
              transformOrigin: 'top left',
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            tabIndex={-1}
          />
        )}

        {/* Sigla badge */}
        <div
          style={{
            position: 'absolute',
            top: '0.6rem',
            left: '0.6rem',
            padding: '0.25rem 0.6rem',
            borderRadius: '0.375rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            fontFamily: 'ui-monospace, monospace',
            letterSpacing: '0.05em',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#1ce585',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(28, 229, 133, 0.25)',
            zIndex: 2,
          }}
        >
          {block.sigla}
        </div>

        {/* Preview button on hover */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: '#1ce585',
            color: '#0a0a0a',
            letterSpacing: '0.03em',
            zIndex: 2,
          }}>
            Preview →
          </div>
        )}

        {/* Accent stripe */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: colors.accent,
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.2s',
          zIndex: 2,
        }} />
      </div>

      {/* Metadata */}
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#1ce585',
            letterSpacing: '0.05em',
          }}>
            {block.sigla}
          </span>
          <span style={{
            fontWeight: 500,
            fontSize: '0.9375rem',
            color: '#f1f0ec',
            lineHeight: 1.3,
          }}>
            {block.title}
          </span>
        </div>

        <p style={{
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.35)',
          lineHeight: 1.4,
          marginBottom: '0.6rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {block.description}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500,
            backgroundColor: 'rgba(28, 229, 133, 0.12)',
            color: '#1ce585',
          }}>
            {block.category.charAt(0).toUpperCase() + block.category.slice(1)}
          </span>
          <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500,
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.4)',
          }}>
            {block.collection}
          </span>
        </div>
      </div>
    </div>
  )
}
