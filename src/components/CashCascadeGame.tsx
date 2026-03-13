'use client';

/**
 * CashCascadeGame — interactive coin-catching mini-game.
 *
 * Game flow:
 *   intro  →  countdown (3-2-1-GO!)  →  playing (30 s)  →  over (modal)
 *
 * Architecture:
 *   - React state drives phase transitions and UI display values only.
 *   - All hot-path game state lives in refs to avoid stale-closure bugs.
 *   - GSAP Draggable handles horizontal piggy-bank movement (touch + mouse).
 *   - Falling coins and confetti are imperative DOM nodes managed outside React.
 *   - requestAnimationFrame drives the collision-detection loop (~60 fps).
 *   - A self-rescheduling setTimeout drives coin spawning with variable interval.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GamePhase = 'intro' | 'countdown' | 'playing' | 'over';

interface ActiveCoin {
  id:     number;
  value:  1 | 5 | 10 | 25;
  el:     HTMLDivElement;
  tween:  gsap.core.Tween;
  caught: boolean;
}

// ---------------------------------------------------------------------------
// Module-level constants
// ---------------------------------------------------------------------------

const GAME_DURATION_S  = 30;
const PIGGY_SIZE_PX    = 90;
const COIN_SIZE_PX     = 50;
const CONFETTI_PER_HIT = 12;

/** Weighted selection table — weights sum to 100 */
const COIN_TABLE: { value: 1 | 5 | 10 | 25; weight: number }[] = [
  { value: 1,  weight: 50 },
  { value: 5,  weight: 30 },
  { value: 10, weight: 15 },
  { value: 25, weight:  5 },
];

const COIN_IMAGE: Record<number, string> = {
  1:  '/images/game/coin-1.svg',
  5:  '/images/game/coin-5.svg',
  10: '/images/game/coin-10.svg',
  25: '/images/game/coin-25.svg',
};

/** HSL burst colour per coin denomination */
const COIN_BURST_COLOR: Record<number, string> = {
  1:  'hsl(48,60%,60%)',
  5:  'hsl(25,70%,58%)',
  10: 'hsl(56,85%,52%)',
  25: 'hsl(299,55%,60%)',
};

// ---------------------------------------------------------------------------
// Pure helpers (module scope — no closures)
// ---------------------------------------------------------------------------

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function pickCoin(): 1 | 5 | 10 | 25 {
  let r = Math.random() * 100;
  for (const { value, weight } of COIN_TABLE) {
    r -= weight;
    if (r <= 0) return value;
  }
  return 1;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CashCascadeGame() {

  // ---- React display state (only what the template reads) ----
  const [phase,         setPhase]         = useState<GamePhase>('intro');
  const [displayScore,  setDisplayScore]  = useState(0);
  const [displayTime,   setDisplayTime]   = useState(GAME_DURATION_S);
  const [countdownText, setCountdownText] = useState('3');
  const [finalScore,    setFinalScore]    = useState(0);
  const [timeIsLow,     setTimeIsLow]     = useState(false);

  // ---- Stable DOM refs ----
  const sectionRef      = useRef<HTMLDivElement>(null);
  const introRef        = useRef<HTMLDivElement>(null);
  const gameAreaRef     = useRef<HTMLDivElement>(null);
  const piggyWrapRef    = useRef<HTMLDivElement>(null);
  const piggyDefaultRef = useRef<HTMLImageElement>(null);
  const piggyHappyRef   = useRef<HTMLImageElement>(null);
  const piggyMovingRef  = useRef<HTMLImageElement>(null);
  const hudRef          = useRef<HTMLDivElement>(null);
  const modalRef        = useRef<HTMLDivElement>(null);
  const scoreNumRef     = useRef<HTMLSpanElement>(null);

  // ---- Mutable game state — never trigger re-renders ----
  const phaseRef        = useRef<GamePhase>('intro');
  const scoreRef        = useRef(0);
  const timeRef         = useRef(GAME_DURATION_S);
  const difficultyRef   = useRef(0);            // 0 → 1 over the 30-second match
  const coinsRef        = useRef<ActiveCoin[]>([]);
  const coinIdRef       = useRef(0);
  const confIdRef       = useRef(0);
  const rafRef          = useRef<number | null>(null);
  const spawnTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameTimerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const draggableRef    = useRef<Draggable | null>(null);
  const piggyStateRef   = useRef<'default' | 'moving' | 'happy'>('default');
  const happyTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastDragXRef    = useRef(0);
  const audioSourceRef  = useRef<HTMLAudioElement | null>(null);

  // Mirror phase into a ref so callbacks never capture a stale value
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // =========================================================================
  // Audio
  // =========================================================================

  const playKaChing = useCallback(() => {
    try {
      if (!audioSourceRef.current) {
        audioSourceRef.current = new Audio('/audio/ka-ching.mp3');
        audioSourceRef.current.volume = 0.3;
        audioSourceRef.current.load();
      }
      // Clone so multiple catches can overlap
      const clone = audioSourceRef.current.cloneNode(true) as HTMLAudioElement;
      clone.volume = 0.3;
      clone.play().catch(() => { /* browser autoplay policy — ignore */ });
    } catch {
      // Silently swallow any audio errors so the game is never blocked
    }
  }, []);

  // =========================================================================
  // Piggy state machine
  // =========================================================================

  const applyPiggyVisual = useCallback((state: 'default' | 'moving' | 'happy') => {
    piggyStateRef.current = state;
    if (!piggyDefaultRef.current || !piggyHappyRef.current || !piggyMovingRef.current) return;
    piggyDefaultRef.current.style.display = state === 'default' ? 'block' : 'none';
    piggyHappyRef.current.style.display   = state === 'happy'   ? 'block' : 'none';
    piggyMovingRef.current.style.display  = state === 'moving'  ? 'block' : 'none';
  }, []);

  const triggerHappy = useCallback(() => {
    if (happyTimerRef.current) clearTimeout(happyTimerRef.current);
    applyPiggyVisual('happy');
    happyTimerRef.current = setTimeout(() => {
      if (phaseRef.current === 'playing') {
        applyPiggyVisual(draggableRef.current?.isDragging ? 'moving' : 'default');
      }
    }, 300);
  }, [applyPiggyVisual]);

  // =========================================================================
  // Confetti burst (imperative DOM, managed outside React)
  // =========================================================================

  const burstConfetti = useCallback((cx: number, cy: number, coinValue: number) => {
    const area = gameAreaRef.current;
    if (!area) return;
    const color = COIN_BURST_COLOR[coinValue] ?? 'hsl(48,60%,60%)';

    for (let i = 0; i < CONFETTI_PER_HIT; i++) {
      confIdRef.current++;
      const size   = 4 + Math.random() * 5;
      const circle = Math.random() > 0.5;
      const el     = document.createElement('div');

      el.style.cssText = [
        'position:absolute',
        `width:${size}px`,
        `height:${size}px`,
        `background:${color}`,
        `border-radius:${circle ? '50%' : '2px'}`,
        'pointer-events:none',
        `left:${cx}px`,
        `top:${cy}px`,
        'z-index:20',
        'transform:translate(-50%,-50%)',
        'will-change:transform,opacity',
      ].join(';');

      area.appendChild(el);

      const angle    = Math.random() * 360;
      const velocity = 70 + Math.random() * 110;
      const rad      = (angle * Math.PI) / 180;
      const tx       = Math.cos(rad) * velocity;
      const ty       = Math.sin(rad) * velocity - 55;

      gsap.to(el, {
        x:        tx,
        y:        ty + 110,
        opacity:  0,
        scale:    0,
        duration: 0.85 + Math.random() * 0.5,
        ease:     'power2.out',
        onComplete() { el.parentNode?.removeChild(el); },
      });
    }
  }, []);

  // =========================================================================
  // Collision detection — runs every animation frame while phase === 'playing'
  // =========================================================================

  const collisionLoop = useCallback(() => {
    if (phaseRef.current !== 'playing') return;

    const area      = gameAreaRef.current;
    const piggyWrap = piggyWrapRef.current;
    if (!area || !piggyWrap) {
      rafRef.current = requestAnimationFrame(collisionLoop);
      return;
    }

    const aR = area.getBoundingClientRect();
    const pR = piggyWrap.getBoundingClientRect();

    // Piggy hit-box, slightly inset so the catch feels generous but fair
    const margin = 10;
    const hL = pR.left   - aR.left + margin;
    const hR = pR.right  - aR.left - margin;
    const hT = pR.top    - aR.top  + margin;
    const hB = pR.bottom - aR.top  - margin;

    const caughtIds: number[] = [];

    for (const coin of coinsRef.current) {
      if (coin.caught) continue;

      const cR = coin.el.getBoundingClientRect();
      const cx = (cR.left + cR.right)  / 2 - aR.left;
      const cy = (cR.top  + cR.bottom) / 2 - aR.top;

      if (cx > hL && cx < hR && cy > hT && cy < hB) {
        coin.caught = true;
        coin.tween.kill();

        // Visual: pop + fade the coin out
        gsap.to(coin.el, {
          scale:    1.65,
          opacity:  0,
          duration: 0.2,
          ease:     'power2.out',
          onComplete() { coin.el.parentNode?.removeChild(coin.el); },
        });

        // Score
        scoreRef.current += coin.value;
        setDisplayScore(scoreRef.current);

        // Animate score number
        if (scoreNumRef.current) {
          gsap.fromTo(
            scoreNumRef.current,
            { scale: 1.55, color: '#ffec00' },
            { scale: 1,    color: '#190f0a', duration: 0.3, ease: 'back.out(3)' }
          );
        }

        // FX
        burstConfetti(cx, cy, coin.value);
        playKaChing();
        triggerHappy();

        caughtIds.push(coin.id);
      }
    }

    if (caughtIds.length > 0) {
      coinsRef.current = coinsRef.current.filter(c => !caughtIds.includes(c.id));
    }

    rafRef.current = requestAnimationFrame(collisionLoop);
  }, [burstConfetti, playKaChing, triggerHappy]);

  // =========================================================================
  // Coin spawner — single coin drop per call
  // =========================================================================

  const spawnCoin = useCallback(() => {
    const area = gameAreaRef.current;
    if (!area || phaseRef.current !== 'playing') return;

    const aW    = area.clientWidth;
    const aH    = area.clientHeight;
    const x     = Math.random() * (aW - COIN_SIZE_PX);
    const value = pickCoin();
    const diff  = difficultyRef.current;
    const speed = lerp(1.0, 2.5, diff);
    const base  = 2.2 + Math.random() * 1.8;  // 2.2–4.0 s at 1× speed
    const dur   = base / speed;
    const rot   = 360 + Math.random() * 360;

    const el = document.createElement('div');
    el.style.cssText = [
      'position:absolute',
      `width:${COIN_SIZE_PX}px`,
      `height:${COIN_SIZE_PX}px`,
      `left:${x}px`,
      `top:-${COIN_SIZE_PX}px`,
      'z-index:10',
      'pointer-events:none',
      'will-change:transform',
    ].join(';');

    const img      = document.createElement('img');
    img.src        = COIN_IMAGE[value];
    img.alt        = `${value} cent coin`;
    img.draggable  = false;
    img.style.cssText = 'width:100%;height:100%;display:block;pointer-events:none;user-select:none;';
    el.appendChild(img);
    area.appendChild(el);

    const id = coinIdRef.current++;
    const tween = gsap.to(el, {
      y:        aH + COIN_SIZE_PX,
      rotation: rot,
      duration: dur,
      ease:     'none',
      onComplete() {
        // Coin escaped — clean up if not already caught
        coinsRef.current = coinsRef.current.filter(c => c.id !== id);
        el.parentNode?.removeChild(el);
      },
    });

    coinsRef.current.push({ id, value, el, tween, caught: false });
  }, []);

  // =========================================================================
  // Stop all game loops and clean up live DOM nodes
  // =========================================================================

  const stopAllLoops = useCallback(() => {
    if (spawnTimerRef.current)  { clearTimeout(spawnTimerRef.current);   spawnTimerRef.current  = null; }
    if (gameTimerRef.current)   { clearInterval(gameTimerRef.current);   gameTimerRef.current   = null; }
    if (rafRef.current)         { cancelAnimationFrame(rafRef.current);  rafRef.current         = null; }
    if (happyTimerRef.current)  { clearTimeout(happyTimerRef.current);   happyTimerRef.current  = null; }

    draggableRef.current?.disable();

    // Kill and remove all live coins
    for (const coin of coinsRef.current) {
      coin.tween.kill();
      coin.el.parentNode?.removeChild(coin.el);
    }
    coinsRef.current = [];
  }, []);

  // =========================================================================
  // Self-rescheduling spawn scheduler (variable interval = progressive difficulty)
  // =========================================================================

  const scheduleSpawn = useCallback(() => {
    if (phaseRef.current !== 'playing') return;

    spawnCoin();

    // Difficulty is based on elapsed time read from timeRef
    const elapsed = GAME_DURATION_S - timeRef.current;
    const t       = Math.max(0, elapsed / GAME_DURATION_S);
    difficultyRef.current = Math.min(1, Math.pow(t, 1.5));

    const interval = Math.round(lerp(800, 200, difficultyRef.current));
    spawnTimerRef.current = setTimeout(scheduleSpawn, interval);
  }, [spawnCoin]);

  // =========================================================================
  // Begin gameplay (called once countdown finishes)
  // =========================================================================

  const beginGameplay = useCallback(() => {
    // Reset all mutable state
    scoreRef.current      = 0;
    timeRef.current       = GAME_DURATION_S;
    difficultyRef.current = 0;
    coinsRef.current      = [];
    coinIdRef.current     = 0;
    confIdRef.current     = 0;

    setDisplayScore(0);
    setDisplayTime(GAME_DURATION_S);
    setTimeIsLow(false);

    // Transition React phase so game area + piggy render in the DOM
    setPhase('playing');

    // Defer Draggable setup by one animation frame so the DOM nodes exist
    requestAnimationFrame(() => {
      const area      = gameAreaRef.current;
      const piggyWrap = piggyWrapRef.current;
      if (!area || !piggyWrap) return;

      // Reset piggy position (GSAP clears any leftover transform)
      gsap.set(piggyWrap, { x: 0 });
      lastDragXRef.current = 0;
      applyPiggyVisual('default');

      // Re-create Draggable
      if (draggableRef.current) {
        draggableRef.current.kill();
        draggableRef.current = null;
      }

      const [d] = Draggable.create(piggyWrap, {
        type:    'x',
        bounds:  area,
        inertia: false,
        onDragStart() {
          applyPiggyVisual('moving');
          lastDragXRef.current = (this as Draggable).x;
        },
        onDrag(this: Draggable) {
          const delta = this.x - lastDragXRef.current;
          if (Math.abs(delta) > 0.5 && piggyMovingRef.current) {
            piggyMovingRef.current.style.transform = delta > 0 ? 'scaleX(1)' : 'scaleX(-1)';
          }
          lastDragXRef.current = this.x;
        },
        onDragEnd() {
          if (piggyStateRef.current !== 'happy') applyPiggyVisual('default');
        },
      });
      draggableRef.current = d;

      // Kick off all game loops
      rafRef.current = requestAnimationFrame(collisionLoop);
      scheduleSpawn();

      gameTimerRef.current = setInterval(() => {
        timeRef.current -= 1;
        setDisplayTime(timeRef.current);
        setTimeIsLow(timeRef.current <= 5);

        if (timeRef.current <= 0) {
          stopAllLoops();
          setFinalScore(scoreRef.current);
          setPhase('over');
        }
      }, 1000);
    });
  }, [applyPiggyVisual, collisionLoop, scheduleSpawn, stopAllLoops]);

  // =========================================================================
  // Countdown sequence: 3 → 2 → 1 → GO! then launch gameplay
  // =========================================================================

  const runCountdown = useCallback(() => {
    setPhase('countdown');
    const steps = ['3', '2', '1', 'GO!'];
    let i = 0;

    const tick = () => {
      setCountdownText(steps[i]);
      i++;
      if (i < steps.length) {
        setTimeout(tick, 850);
      } else {
        // Wait for the last label to be visible before starting gameplay
        setTimeout(beginGameplay, 750);
      }
    };
    tick();
  }, [beginGameplay]);

  // =========================================================================
  // Button handlers
  // =========================================================================

  const handlePlay = useCallback(() => {
    const intro = introRef.current;
    if (!intro) { runCountdown(); return; }
    gsap.to(intro, {
      opacity:    0,
      scale:      0.88,
      duration:   0.38,
      ease:       'power2.in',
      onComplete: runCountdown,
    });
  }, [runCountdown]);

  const handleReplay = useCallback(() => {
    const modal = modalRef.current;
    if (!modal) { setPhase('intro'); return; }
    gsap.to(modal, {
      opacity:  0,
      scale:    0.88,
      duration: 0.28,
      ease:     'power2.in',
      onComplete() {
        setDisplayScore(0);
        setDisplayTime(GAME_DURATION_S);
        setTimeIsLow(false);
        setPhase('intro');
      },
    });
  }, []);

  // =========================================================================
  // Phase-driven GSAP animations (entrance effects on DOM nodes)
  // =========================================================================

  // Animate intro in when phase returns to 'intro'
  useEffect(() => {
    if (phase === 'intro') {
      const el = introRef.current;
      if (el) gsap.fromTo(el, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.42, ease: 'back.out(2)' });
    }
  }, [phase]);

  // Fade HUD in when gameplay starts
  useEffect(() => {
    if (phase === 'playing') {
      const el = hudRef.current;
      if (el) gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }
  }, [phase]);

  // Slide modal in on game over
  useEffect(() => {
    if (phase === 'over') {
      const el = modalRef.current;
      if (el) gsap.fromTo(el, { opacity: 0, scale: 0.82, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 0.52, ease: 'back.out(2)' });
    }
  }, [phase]);

  // =========================================================================
  // Cleanup on unmount
  // =========================================================================

  useEffect(() => {
    return () => {
      stopAllLoops();
      draggableRef.current?.kill();
      if (audioSourceRef.current) {
        audioSourceRef.current.pause();
        audioSourceRef.current = null;
      }
    };
  }, [stopAllLoops]);

  // =========================================================================
  // Derived helpers
  // =========================================================================

  const isGameActive = phase === 'playing' || phase === 'over';

  // =========================================================================
  // Render
  // =========================================================================

  return (
    <section
      ref={sectionRef}
      data-game-wrap
      style={{
        position:        'relative',
        backgroundColor: '#ffec00',
        color:           '#190f0a',
        fontFamily:      'Montserrat, sans-serif',
        padding:         'clamp(40px,6vw,80px) clamp(16px,5vw,48px)',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        minHeight:       '600px',
        overflow:        'hidden',
      }}
    >
      {/* CSS keyframe for countdown pop — injected once, scoped to this block */}
      <style>{`
        @keyframes ccPop {
          0%   { transform: scale(0.3); opacity: 0; }
          55%  { transform: scale(1.18); opacity: 1; }
          78%  { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* ==================================================================
          INTRO SCREEN
      ================================================================== */}
      {phase === 'intro' && (
        <div
          ref={introRef}
          data-game-intro
          style={{
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '22px',
            maxWidth:      '520px',
            textAlign:     'center',
            position:      'relative',
            zIndex:        10,
          }}
        >
          <h2
            style={{
              fontFamily:    'Montserrat, sans-serif',
              fontWeight:    900,
              fontSize:      'clamp(2.2rem,7vw,4.2rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color:         '#190f0a',
              margin:        0,
            }}
          >
            Cash Cascade
          </h2>

          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize:   'clamp(0.9rem,2.2vw,1.1rem)',
              lineHeight: 1.65,
              color:      '#190f0a',
              margin:     0,
            }}
          >
            Get ready for Cash Cascade! Steer your trusty piggy bank left and
            right to scoop up as much change as you can in just 30 seconds, and
            watch your score soar!
          </p>

          <button
            data-game-start
            onClick={handlePlay}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
            style={{
              background:    '#190f0a',
              color:         '#ffec00',
              fontFamily:    'Montserrat, sans-serif',
              fontWeight:    800,
              fontSize:      '1.05rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding:       '14px 52px',
              border:        'none',
              borderRadius:  '4px',
              cursor:        'pointer',
              transition:    'transform 0.15s ease',
              userSelect:    'none',
            }}
          >
            Play
          </button>
        </div>
      )}

      {/* ==================================================================
          COUNTDOWN OVERLAY
          position:fixed so it centres over the full viewport regardless
          of scroll position
      ================================================================== */}
      {phase === 'countdown' && (
        <div
          data-game-countdown-wrap
          style={{
            position:       'fixed',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            zIndex:         200,
            pointerEvents:  'none',
          }}
        >
          {/*
           * The `key` prop forces React to unmount + remount the span on every
           * label change, which re-triggers the CSS animation.
           */}
          <span
            key={countdownText}
            data-game-countdown
            style={{
              fontFamily:    'Montserrat, sans-serif',
              fontWeight:    900,
              fontSize:      'clamp(5rem,22vw,13rem)',
              color:         '#190f0a',
              lineHeight:    1,
              textShadow:    '0 6px 32px rgba(0,0,0,0.10)',
              animation:     'ccPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            {countdownText}
          </span>
        </div>
      )}

      {/* ==================================================================
          GAME AREA — mounted for 'playing' and 'over' so refs stay stable
      ================================================================== */}
      {isGameActive && (
        <div
          style={{
            position: 'relative',
            width:    '100%',
            maxWidth: '700px',
          }}
        >
          {/* ---- HUD ---- */}
          <div
            ref={hudRef}
            data-game-hud
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              width:          '100%',
              padding:        '0 2px 10px',
              opacity:        0,  // GSAP fades this in
            }}
          >
            {/* Score */}
            <div
              data-game-score
              style={{
                fontFamily:    'Montserrat, sans-serif',
                fontWeight:    900,
                fontSize:      'clamp(1.4rem,4vw,2rem)',
                color:         '#190f0a',
                letterSpacing: '-0.02em',
                display:       'flex',
                alignItems:    'baseline',
                gap:           '6px',
              }}
            >
              <span
                style={{
                  fontWeight:    700,
                  fontSize:      '0.62em',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity:       0.55,
                }}
              >
                Score
              </span>
              <span ref={scoreNumRef}>{displayScore}</span>
            </div>

            {/* Timer */}
            <div
              data-game-time
              style={{
                fontFamily:    'Montserrat, sans-serif',
                fontWeight:    900,
                fontSize:      'clamp(1.4rem,4vw,2rem)',
                letterSpacing: '-0.02em',
                display:       'flex',
                alignItems:    'baseline',
                gap:           '6px',
                color:         timeIsLow ? '#cc2200' : '#190f0a',
                transition:    'color 0.3s ease',
              }}
            >
              <span
                style={{
                  fontWeight:    700,
                  fontSize:      '0.62em',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity:       0.55,
                }}
              >
                Time
              </span>
              <span>{displayTime}s</span>
            </div>
          </div>

          {/* ---- Game arena ---- */}
          <div
            ref={gameAreaRef}
            data-game-area
            style={{
              position:     'relative',
              width:        '100%',
              height:       'clamp(320px,52vw,480px)',
              background:   'rgba(25,15,10,0.05)',
              border:       '2px solid rgba(25,15,10,0.14)',
              borderRadius: '16px',
              overflow:     'hidden',
            }}
          >
            {/* ---- Piggy bank (GSAP Draggable target) ---- */}
            <div
              ref={piggyWrapRef}
              data-game-piggy-wrap
              style={{
                position:   'absolute',
                bottom:     '14px',
                left:       '50%',
                marginLeft: `-${PIGGY_SIZE_PX / 2}px`,
                width:      `${PIGGY_SIZE_PX}px`,
                height:     `${PIGGY_SIZE_PX}px`,
                cursor:     'grab',
                userSelect: 'none',
                touchAction:'none',
                zIndex:     30,
                willChange: 'transform',
              }}
            >
              {/* Default state */}
              <img
                ref={piggyDefaultRef}
                src="/images/game/piggy.svg"
                alt="Piggy bank"
                draggable={false}
                data-game-piggy-default
                style={{
                  width:         '100%',
                  height:        '100%',
                  display:       'block',
                  pointerEvents: 'none',
                  userSelect:    'none',
                }}
              />
              {/* Happy state — shown for 300 ms on coin catch */}
              <img
                ref={piggyHappyRef}
                src="/images/game/piggy-alt.svg"
                alt="Happy piggy bank"
                draggable={false}
                data-game-piggy-happy
                style={{
                  width:         '100%',
                  height:        '100%',
                  display:       'none',
                  position:      'absolute',
                  top:           0,
                  left:          0,
                  pointerEvents: 'none',
                  userSelect:    'none',
                }}
              />
              {/* Moving state — shown while dragging, flipped by scaleX */}
              <img
                ref={piggyMovingRef}
                src="/images/game/piggy-walking.svg"
                alt="Moving piggy bank"
                draggable={false}
                data-game-piggy-moving
                style={{
                  width:         '100%',
                  height:        '100%',
                  display:       'none',
                  position:      'absolute',
                  top:           0,
                  left:          0,
                  pointerEvents: 'none',
                  userSelect:    'none',
                  transformOrigin: '50% 50%',
                }}
              />
            </div>

            {/* ---- Game-over modal — inside the arena so it fills it ---- */}
            {phase === 'over' && (
              <div
                ref={modalRef}
                data-game-modal
                style={{
                  position:       'absolute',
                  inset:          0,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  zIndex:         50,
                  background:     'rgba(255,236,0,0.9)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  borderRadius:   '14px',
                }}
              >
                <div
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    alignItems:    'center',
                    gap:           '16px',
                    padding:       'clamp(24px,5vw,44px) clamp(20px,5vw,40px)',
                    textAlign:     'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily:    'Montserrat, sans-serif',
                      fontWeight:    900,
                      fontSize:      'clamp(1.6rem,5vw,2.5rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      color:         '#190f0a',
                      margin:        0,
                    }}
                  >
                    Time&apos;s Up!
                  </p>

                  <p
                    style={{
                      fontFamily:    'Montserrat, sans-serif',
                      fontWeight:    700,
                      fontSize:      '0.68rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color:         '#190f0a',
                      opacity:       0.6,
                      margin:        0,
                    }}
                  >
                    Your Score
                  </p>

                  <p
                    data-game-final-score
                    style={{
                      fontFamily:    'Montserrat, sans-serif',
                      fontWeight:    900,
                      fontSize:      'clamp(3rem,11vw,5.5rem)',
                      color:         '#190f0a',
                      lineHeight:    1,
                      margin:        0,
                    }}
                  >
                    {finalScore}
                  </p>

                  <button
                    data-game-retry
                    onClick={handleReplay}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
                    style={{
                      background:    '#190f0a',
                      color:         '#ffec00',
                      fontFamily:    'Montserrat, sans-serif',
                      fontWeight:    800,
                      fontSize:      '1rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding:       '12px 38px',
                      border:        'none',
                      borderRadius:  '4px',
                      cursor:        'pointer',
                      transition:    'transform 0.15s ease',
                      userSelect:    'none',
                    }}
                  >
                    Play Again
                  </button>

                  <a
                    href="/tickets"
                    style={{
                      fontFamily:          'Montserrat, sans-serif',
                      fontWeight:          700,
                      fontSize:            '0.82rem',
                      letterSpacing:       '0.02em',
                      color:               '#190f0a',
                      textDecoration:      'underline',
                      textUnderlineOffset: '3px',
                      lineHeight:          1.5,
                      textAlign:           'center',
                    }}
                  >
                    Ready for Real-Life Cash Grab?<br />
                    Book Your MoMoney Tickets!
                  </a>
                </div>
              </div>
            )}

          </div>{/* /game-area */}

        </div>
      )}

    </section>
  );
}
