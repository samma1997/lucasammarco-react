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
  'merit-first': { bg: '#0a0a0a', accent: '#3b82f6' },
}

const IFRAME_W = 1440
const IFRAME_H = 900

export default function BlockCard({ block }: BlockCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [scale, setScale] = useState(0.3)
  const wrapRef = useRef<HTMLDivElement>(null)
  const colors = COLLECTION_COLORS[block.collection] || { bg: '#1a1a1a', accent: '#1ce585' }

  // Lazy-load iframe when card is near viewport
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShouldLoad(true); io.disconnect() } },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Dynamically compute scale based on actual card width
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w > 0) setScale(w / IFRAME_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleClick = useCallback(() => {
    router.push(`/preview/${block.id}`)
  }, [router, block.id])

  return (
    <div
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
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        boxShadow: isHovered ? '0 0 20px rgba(28,229,133,0.08)' : 'none',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Live preview area */}
      <div
        ref={wrapRef}
        style={{
          width: '100%',
          aspectRatio: '16 / 10',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg}dd 60%, ${colors.accent}33 100%)`,
        }}
      >
        {shouldLoad && (
          <iframe
            src={`/preview/${block.id}?embed=1`}
            title={block.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${IFRAME_W}px`,
              height: `${IFRAME_H}px`,
              border: 'none',
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
              pointerEvents: 'none',
            }}
            tabIndex={-1}
          />
        )}

        {/* Sigla badge */}
        <div style={{
          position: 'absolute', top: '0.6rem', left: '0.6rem', zIndex: 3,
          padding: '0.25rem 0.6rem', borderRadius: '0.375rem',
          fontSize: '0.8rem', fontWeight: 700,
          fontFamily: 'ui-monospace, monospace', letterSpacing: '0.05em',
          backgroundColor: 'rgba(0,0,0,0.7)', color: '#1ce585',
          backdropFilter: 'blur(4px)', border: '1px solid rgba(28,229,133,0.25)',
        }}>
          {block.sigla}
        </div>

        {/* Hover preview button */}
        {isHovered && (
          <div style={{
            position: 'absolute', bottom: '0.75rem', right: '0.75rem', zIndex: 3,
            padding: '0.35rem 0.9rem', borderRadius: '0.375rem',
            fontSize: '0.75rem', fontWeight: 600,
            backgroundColor: '#1ce585', color: '#0a0a0a', letterSpacing: '0.03em',
          }}>
            Preview →
          </div>
        )}

        {/* Accent stripe */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', zIndex: 3,
          background: colors.accent, opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.2s',
        }} />
      </div>

      {/* Metadata */}
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem',
            fontWeight: 700, color: '#1ce585', letterSpacing: '0.05em',
          }}>
            {block.sigla}
          </span>
          <span style={{ fontWeight: 500, fontSize: '0.9375rem', color: '#f1f0ec', lineHeight: 1.3 }}>
            {block.title}
          </span>
        </div>

        <p style={{
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.4,
          marginBottom: '0.6rem', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {block.description}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '9999px',
            fontSize: '0.75rem', fontWeight: 500,
            backgroundColor: 'rgba(28,229,133,0.12)', color: '#1ce585',
          }}>
            {block.category.charAt(0).toUpperCase() + block.category.slice(1)}
          </span>
          <span style={{
            display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '9999px',
            fontSize: '0.75rem', fontWeight: 500,
            backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)',
          }}>
            {block.collection}
          </span>
        </div>
      </div>
    </div>
  )
}
