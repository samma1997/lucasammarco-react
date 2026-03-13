'use client'

import { TYPO, IMG } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

export default function SpotifyEmbed() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <section style={{
        clipPath: 'circle(28800px at 50% 28891px)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 3vw, 3rem)',
        background: 'linear-gradient(180deg, #f89e5d 0%, #f17a5e 30%, #8a7db8 60%, #5a9fd4 85%, #c7eafb 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '40%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', bottom: '-10%', right: '-8%', width: '35%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />

        <div className="fv-reveal" style={{ maxWidth: 500, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <iframe
            src="https://open.spotify.com/embed/playlist/4OJEEDvC7paQxTxDIbF6ON?utm_source=generator&theme=0"
            width="100%"
            height="400"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '12px' }}
          />
        </div>
      </section>
    </>
  )
}
