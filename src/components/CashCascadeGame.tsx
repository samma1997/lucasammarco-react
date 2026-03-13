'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GamePhase = 'intro' | 'countdown' | 'playing' | 'over';

type CoinType = {
  id: number;
  value: 1 | 5 | 10 | 25;
  x: number;
  el: HTMLDivElement | null;
  tween: gsap.core.Tween | null;
  caught: boolean;
};

type ConfettiParticle = {
  id: number;
  el: HTMLDivElement | null;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GAME_DURATION = 30;
const PIGGY_WIDTH = 90;
const COIN_SIZE = 50;
const COLLISION_INTERVAL = 16;
const CONFETTI_COUNT = 12;

const COIN_WEIGHTS = [
  { value: 1 as const, weight: 50 },
  { value: 5 as const, weight: 30 },
  { value: 10 as const, weight: 15 },
  { value: 25 as const, weight: 5 },
];

const COIN_CONFETTI_HUE: Record<number, string> = {
  1:  'hsl(48, 60%, 65%)',
  5:  'hsl(25, 70%, 60%)',
  10: 'hsl(56, 80%, 55%)',
  25: 'hsl(299, 55%, 60%)',
};

const COIN_SRC: Record<number, string> = {
  1:  '/images/game/coin-1.svg',
  5:  '/images/game/coin-5.svg',
  10: '/images/game/coin-10.svg',
  25: '/images/game/coin-25.svg',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pickCoinValue(): 1 | 5 | 10 | 25 {
  const total = COIN_WEIGHTS.reduce((s, w) => s + w.weight, 0);
  let rand = Math.random() * total;
  for (const entry of COIN_WEIGHTS) {
    rand -= entry.weight;
    if (rand <= 0) return entry.value;
  }
  return 1;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CashCascadeGame() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [displayScore, setDisplayScore] = useState(0);
  const [displayTime, setDisplayTime] = useState(GAME_DURATION);
  const [countdownLabel, setCountdownLabel] = useState<string>('3');
  const [finalScore, setFinalScore] = useState(0);

  // DOM refs
  const sectionRef        = useRef<HTMLDivElement>(null);
  const gameAreaRef       = useRef<HTMLDivElement>(null);
  const piggyWrapRef      = useRef<HTMLDivElement>(null);
  const piggyDefaultRef   = useRef<HTMLImageElement>(null);
  const piggyHappyRef     = useRef<HTMLImageElement>(null);
  const piggyMovingRef    = useRef<HTMLImageElement>(null);
  const introRef          = useRef<HTMLDivElement>(null);
  const hudRef            = useRef<HTMLDivElement>(null);
  const modalRef          = useRef<HTMLDivElement>(null);
  const scoreDisplayRef   = useRef<HTMLSpanElement>(null);

  // Mutable game state (refs avoid stale closures)
  const scoreRef          = useRef(0);
  const timeRef           = useRef(GAME_DURATION);
  const coinsRef          = useRef<CoinType[]>([]);
  const confettiPoolRef   = useRef<ConfettiParticle[]>([]);
  const coinIdCounterRef  = useRef(0);
  const confettiIdRef     = useRef(0);
  const spawnIntervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerIntervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef            = useRef<number | null>(null);
  const draggableRef      = useRef<Draggable | null>(null);
  const piggyStateRef     = useRef<'default' | 'moving' | 'happy'>('default');
  const happyTimeoutRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragDirectionRef  = useRef<'left' | 'right'>('right');
  const lastPiggyXRef     = useRef(0);
  const difficultyRef     = useRef(0); // 0.0 -> 1.0 over 30s
  const audioRef          = useRef<HTMLAudioElement | null>(null);
  const phaseRef          = useRef<GamePhase>('intro');

  // Keep phaseRef in sync with state
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // ---------------------------------------------------------------------------
  // Audio
  // ---------------------------------------------------------------------------

  const playKaChing = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/ka-ching.mp3');
        audioRef.current.volume = 0.3;
      }
      const audio = audioRef.current.cloneNode() as HTMLAudioElement;
      audio.volume = 0.3;
      audio.play().catch(() => {/* ignore autoplay policy errors */});
    } catch {
      // Silently ignore audio errors
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Piggy state helpers
  // ---------------------------------------------------------------------------

  const setPiggyState = useCallback((state: 'default' | 'moving' | 'happy') => {
    if (!piggyDefaultRef.current || !piggyHappyRef.current || !piggyMovingRef.current) return;
    piggyStateRef.current = state;
    piggyDefaultRef.current.style.display  = state === 'default'  ? 'block' : 'none';
    piggyHappyRef.current.style.display    = state === 'happy'    ? 'block' : 'none';
    piggyMovingRef.current.style.display   = state === 'moving'   ? 'block' : 'none';
  }, []);

  const triggerHappyState = useCallback(() => {
    if (happyTimeoutRef.current) clearTimeout(happyTimeoutRef.current);
    setPiggyState('happy');
    happyTimeoutRef.current = setTimeout(() => {
      if (phaseRef.current === 'playing') {
        const isDragging = draggableRef.current?.isDragging ?? false;
        setPiggyState(isDragging ? 'moving' : 'default');
      }
    }, 300);
  }, [setPiggyState]);

  // ---------------------------------------------------------------------------
  // Confetti burst
  // ---------------------------------------------------------------------------

  const spawnConfetti = useCallback((x: number, y: number, value: number) => {
    const area = gameAreaRef.current;
    if (!area) return;

    const color = COIN_CONFETTI_HUE[value] ?? 'hsl(48, 60%, 65%)';

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const el = document.createElement('div');
      const size = 4 + Math.random() * 5;
      const isCircle = Math.random() > 0.5;

      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${isCircle ? '50%' : '2px'};
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        z-index: 20;
        transform: translate(-50%, -50%);
      `;
      area.appendChild(el);

      const angle = Math.random() * 360;
      const velocity = 80 + Math.random() * 120;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * velocity;
      const ty = Math.sin(rad) * velocity - 60;

      const id = confettiIdRef.current++;
      const particle: ConfettiParticle = { id, el };
      confettiPoolRef.current.push(particle);

      gsap.to(el, {
        x: tx,
        y: ty + 120,
        opacity: 0,
        scale: 0,
        duration: 1.0 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: () => {
          el.parentNode?.removeChild(el);
          confettiPoolRef.current = confettiPoolRef.current.filter(p => p.id !== id);
        },
      });
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Coin spawning
  // ---------------------------------------------------------------------------

  const spawnCoin = useCallback(() => {
    const area = gameAreaRef.current;
    if (!area || phaseRef.current !== 'playing') return;

    const areaRect = area.getBoundingClientRect();
    const maxX = areaRect.width - COIN_SIZE;
    const x = Math.random() * maxX;
    const value = pickCoinValue();

    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${COIN_SIZE}px;
      height: ${COIN_SIZE}px;
      left: ${x}px;
      top: -${COIN_SIZE}px;
      z-index: 10;
      pointer-events: none;
      will-change: transform;
    `;

    const img = document.createElement('img');
    img.src = COIN_SRC[value];
    img.alt = `${value} coin`;
    img.style.cssText = 'width: 100%; height: 100%; display: block; user-select: none; pointer-events: none;';
    el.appendChild(img);
    area.appendChild(el);

    const difficulty = difficultyRef.current;
    const speedMultiplier = lerp(1.0, 2.5, difficulty);
    const baseDuration = 2 + Math.random() * 2;
    const duration = baseDuration / speedMultiplier;
    const rotation = 360 + Math.random() * 360;

    const id = coinIdCounterRef.current++;
    const coin: CoinType = { id, value, x, el, tween: null, caught: false };

    const tween = gsap.to(el, {
      y: areaRect.height + COIN_SIZE,
      rotation,
      duration,
      ease: 'none',
      onComplete: () => {
        if (!coin.caught) {
          el.parentNode?.removeChild(el);
          coinsRef.current = coinsRef.current.filter(c => c.id !== id);
        }
      },
    });

    coin.tween = tween;
    coinsRef.current.push(coin);
  }, []);

  // ---------------------------------------------------------------------------
  // Collision detection (runs every frame while playing)
  // ---------------------------------------------------------------------------

  const collisionLoop = useCallback(() => {
    if (phaseRef.current !== 'playing') return;

    const piggyWrap = piggyWrapRef.current;
    const area = gameAreaRef.current;
    if (!piggyWrap || !area) {
      rafRef.current = requestAnimationFrame(collisionLoop);
      return;
    }

    const areaRect  = area.getBoundingClientRect();
    const piggyRect = piggyWrap.getBoundingClientRect();

    // Piggy bounding box relative to game area
    const pLeft   = piggyRect.left   - areaRect.left;
    const pRight  = piggyRect.right  - areaRect.left;
    const pTop    = piggyRect.top    - areaRect.top;
    const pBottom = piggyRect.bottom - areaRect.top;

    // Shrink piggy hit-box slightly for better feel
    const margin = 10;
    const hitLeft   = pLeft   + margin;
    const hitRight  = pRight  - margin;
    const hitTop    = pTop    + margin;
    const hitBottom = pBottom - margin;

    const toRemove: number[] = [];

    for (const coin of coinsRef.current) {
      if (coin.caught || !coin.el) continue;

      const coinRect = coin.el.getBoundingClientRect();
      const cLeft   = coinRect.left   - areaRect.left;
      const cRight  = coinRect.right  - areaRect.left;
      const cTop    = coinRect.top    - areaRect.top;
      const cBottom = coinRect.bottom - areaRect.top;

      const centerX = (cLeft + cRight) / 2;
      const centerY = (cTop + cBottom) / 2;

      const overlaps =
        centerX > hitLeft &&
        centerX < hitRight &&
        centerY > hitTop &&
        centerY < hitBottom;

      if (overlaps) {
        coin.caught = true;
        coin.tween?.kill();

        // Catch animation: scale + fade coin out
        gsap.to(coin.el, {
          scale: 1.5,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            coin.el?.parentNode?.removeChild(coin.el);
          },
        });

        // Update score
        scoreRef.current += coin.value;
        setDisplayScore(scoreRef.current);

        // Animate score display
        if (scoreDisplayRef.current) {
          gsap.fromTo(
            scoreDisplayRef.current,
            { scale: 1.5, color: '#ffec00' },
            { scale: 1, color: '#190f0a', duration: 0.35, ease: 'back.out(3)' }
          );
        }

        // Confetti
        const relX = centerX;
        const relY = centerY;
        spawnConfetti(relX, relY, coin.value);

        // Audio
        playKaChing();

        // Happy piggy state
        triggerHappyState();

        toRemove.push(coin.id);
      }
    }

    if (toRemove.length > 0) {
      coinsRef.current = coinsRef.current.filter(c => !toRemove.includes(c.id));
    }

    rafRef.current = requestAnimationFrame(collisionLoop);
  }, [spawnConfetti, playKaChing, triggerHappyState]);

  // ---------------------------------------------------------------------------
  // Progressive difficulty
  // ---------------------------------------------------------------------------

  const updateDifficulty = useCallback((elapsed: number) => {
    const t = elapsed / GAME_DURATION;
    difficultyRef.current = Math.min(1.0, Math.pow(t, 1.5));
  }, []);

  // ---------------------------------------------------------------------------
  // Spawn rate scheduler
  // ---------------------------------------------------------------------------

  const startSpawnScheduler = useCallback(() => {
    let elapsed = 0;
    const tick = () => {
      if (phaseRef.current !== 'playing') return;
      spawnCoin();
      elapsed += 1;
      updateDifficulty(elapsed);
      const difficulty = difficultyRef.current;
      const interval = Math.round(lerp(800, 200, difficulty));
      spawnIntervalRef.current = setTimeout(tick, interval);
    };
    spawnIntervalRef.current = setTimeout(tick, 800);
  }, [spawnCoin, updateDifficulty]);

  // ---------------------------------------------------------------------------
  // Cleanup
  // ---------------------------------------------------------------------------

  const stopGame = useCallback(() => {
    if (spawnIntervalRef.current) {
      clearTimeout(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (happyTimeoutRef.current) {
      clearTimeout(happyTimeoutRef.current);
      happyTimeoutRef.current = null;
    }

    // Kill all coin tweens and remove from DOM
    for (const coin of coinsRef.current) {
      coin.tween?.kill();
      coin.el?.parentNode?.removeChild(coin.el);
    }
    coinsRef.current = [];

    // Remove confetti
    for (const p of confettiPoolRef.current) {
      gsap.killTweensOf(p.el);
      p.el?.parentNode?.removeChild(p.el);
    }
    confettiPoolRef.current = [];

    draggableRef.current?.disable();
  }, []);

  // ---------------------------------------------------------------------------
  // Setup Draggable
  // ---------------------------------------------------------------------------

  const setupDraggable = useCallback(() => {
    const piggyWrap = piggyWrapRef.current;
    const area = gameAreaRef.current;
    if (!piggyWrap || !area) return;

    if (draggableRef.current) {
      draggableRef.current.kill();
      draggableRef.current = null;
    }

    const instances = Draggable.create(piggyWrap, {
      type: 'x',
      bounds: area,
      inertia: false,
      onDragStart() {
        setPiggyState('moving');
      },
      onDrag() {
        const currentX = this.x;
        const delta = currentX - lastPiggyXRef.current;
        if (Math.abs(delta) > 1) {
          dragDirectionRef.current = delta > 0 ? 'right' : 'left';
          const moving = piggyMovingRef.current;
          if (moving) {
            moving.style.transform = delta > 0 ? 'scaleX(1)' : 'scaleX(-1)';
          }
        }
        lastPiggyXRef.current = currentX;
      },
      onDragEnd() {
        if (piggyStateRef.current !== 'happy') {
          setPiggyState('default');
        }
      },
    });

    draggableRef.current = instances[0];
  }, [setPiggyState]);

  // ---------------------------------------------------------------------------
  // Start game (after countdown)
  // ---------------------------------------------------------------------------

  const startGameplay = useCallback(() => {
    scoreRef.current = 0;
    timeRef.current = GAME_DURATION;
    difficultyRef.current = 0;
    coinsRef.current = [];
    setDisplayScore(0);
    setDisplayTime(GAME_DURATION);
    setPhase('playing');

    // Reset piggy position
    const piggyWrap = piggyWrapRef.current;
    if (piggyWrap) {
      gsap.set(piggyWrap, { x: 0 });
    }

    setupDraggable();
    setPiggyState('default');

    // Collision loop
    rafRef.current = requestAnimationFrame(collisionLoop);

    // Timer
    timerIntervalRef.current = setInterval(() => {
      timeRef.current -= 1;
      setDisplayTime(timeRef.current);

      if (timeRef.current <= 0) {
        // Game over
        stopGame();
        setFinalScore(scoreRef.current);
        setPhase('over');
      }
    }, 1000);

    // Coin spawner
    startSpawnScheduler();
  }, [setupDraggable, setPiggyState, collisionLoop, stopGame, startSpawnScheduler]);

  // ---------------------------------------------------------------------------
  // Countdown sequence
  // ---------------------------------------------------------------------------

  const runCountdown = useCallback(() => {
    setPhase('countdown');
    const labels = ['3', '2', '1', 'GO!'];
    let i = 0;

    const next = () => {
      if (i >= labels.length) {
        startGameplay();
        return;
      }
      setCountdownLabel(labels[i]);
      i++;
      setTimeout(next, 850);
    };
    next();
  }, [startGameplay]);

  // ---------------------------------------------------------------------------
  // Handle "Play" click
  // ---------------------------------------------------------------------------

  const handlePlay = useCallback(() => {
    const intro = introRef.current;
    if (!intro) { runCountdown(); return; }

    gsap.to(intro, {
      opacity: 0,
      scale: 0.85,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: runCountdown,
    });
  }, [runCountdown]);

  // ---------------------------------------------------------------------------
  // Handle "Play Again"
  // ---------------------------------------------------------------------------

  const handleReplay = useCallback(() => {
    const modal = modalRef.current;
    if (modal) {
      gsap.to(modal, {
        opacity: 0,
        scale: 0.9,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setPhase('intro');
          setDisplayScore(0);
          setDisplayTime(GAME_DURATION);
          // Re-show intro after a tick
          requestAnimationFrame(() => {
            const introEl = introRef.current;
            if (introEl) {
              gsap.fromTo(introEl, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' });
            }
          });
        },
      });
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Animate HUD in when gameplay starts
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (phase === 'playing') {
      const hud = hudRef.current;
      if (hud) {
        gsap.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    }
  }, [phase]);

  // ---------------------------------------------------------------------------
  // Animate modal in when game over
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (phase === 'over') {
      const modal = modalRef.current;
      if (modal) {
        gsap.fromTo(
          modal,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2)' }
        );
      }
    }
  }, [phase]);

  // ---------------------------------------------------------------------------
  // Cleanup on unmount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    return () => {
      stopGame();
      draggableRef.current?.kill();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [stopGame]);

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  const styles = {
    section: {
      backgroundColor: '#ffec00',
      color: '#190f0a',
      fontFamily: 'Montserrat, sans-serif',
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      minHeight: '600px',
      position: 'relative' as const,
      overflow: 'hidden',
    } as React.CSSProperties,

    heading: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 'clamp(2rem, 6vw, 4rem)',
      fontWeight: 900,
      letterSpacing: '-0.02em',
      color: '#190f0a',
      margin: '0 0 16px',
      textTransform: 'uppercase' as const,
      textAlign: 'center' as const,
    } as React.CSSProperties,

    intro: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '20px',
      maxWidth: '520px',
      textAlign: 'center' as const,
      zIndex: 10,
      position: 'relative' as const,
    } as React.CSSProperties,

    description: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
      fontWeight: 500,
      lineHeight: 1.6,
      color: '#190f0a',
      margin: 0,
    } as React.CSSProperties,

    playBtn: {
      background: '#190f0a',
      color: '#ffec00',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 800,
      fontSize: '1.1rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      padding: '14px 48px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'transform 0.15s ease, background 0.15s ease',
    } as React.CSSProperties,

    countdownOverlay: {
      position: 'fixed' as const,
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      pointerEvents: 'none' as const,
    } as React.CSSProperties,

    countdownLabel: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(5rem, 20vw, 12rem)',
      color: '#190f0a',
      lineHeight: 1,
      textShadow: '0 4px 24px rgba(0,0,0,0.12)',
      animation: 'countdownPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
    } as React.CSSProperties,

    gameWrapper: {
      position: 'relative' as const,
      width: '100%',
      maxWidth: '700px',
    } as React.CSSProperties,

    hud: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '0 4px 12px',
      opacity: phase === 'playing' ? 1 : 0,
    } as React.CSSProperties,

    hudScore: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(1.4rem, 4vw, 2rem)',
      color: '#190f0a',
      letterSpacing: '-0.02em',
    } as React.CSSProperties,

    hudTime: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(1.4rem, 4vw, 2rem)',
      color: displayTime <= 5 ? '#cc2200' : '#190f0a',
      letterSpacing: '-0.02em',
      transition: 'color 0.3s ease',
    } as React.CSSProperties,

    gameArea: {
      position: 'relative' as const,
      width: '100%',
      height: 'clamp(320px, 55vw, 480px)',
      background: 'rgba(25, 15, 10, 0.06)',
      border: '2px solid rgba(25, 15, 10, 0.15)',
      borderRadius: '16px',
      overflow: 'hidden',
    } as React.CSSProperties,

    piggyWrap: {
      position: 'absolute' as const,
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${PIGGY_WIDTH}px`,
      height: `${PIGGY_WIDTH}px`,
      cursor: 'grab',
      userSelect: 'none' as const,
      touchAction: 'none',
      zIndex: 30,
    } as React.CSSProperties,

    piggyImg: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none' as const,
      userSelect: 'none' as const,
      display: 'block',
    } as React.CSSProperties,

    modalOverlay: {
      position: 'absolute' as const,
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      background: 'rgba(255, 236, 0, 0.85)',
      backdropFilter: 'blur(4px)',
      borderRadius: '14px',
    } as React.CSSProperties,

    modalBox: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '20px',
      padding: '36px 32px',
      textAlign: 'center' as const,
    } as React.CSSProperties,

    modalTitle: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
      color: '#190f0a',
      margin: 0,
      textTransform: 'uppercase' as const,
      letterSpacing: '-0.02em',
    } as React.CSSProperties,

    modalScoreLabel: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      color: '#190f0a',
      opacity: 0.7,
      margin: 0,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
    } as React.CSSProperties,

    modalScore: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(3rem, 10vw, 5rem)',
      color: '#190f0a',
      lineHeight: 1,
      margin: 0,
    } as React.CSSProperties,

    replayBtn: {
      background: '#190f0a',
      color: '#ffec00',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 800,
      fontSize: '1rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      padding: '12px 36px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'transform 0.15s ease',
    } as React.CSSProperties,

    ctaLink: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
      fontSize: '0.85rem',
      color: '#190f0a',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      letterSpacing: '0.02em',
    } as React.CSSProperties,
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section ref={sectionRef} style={styles.section}>

      {/* Keyframe injection for countdown pop */}
      <style>{`
        @keyframes countdownPop {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* ---- INTRO SCREEN ---- */}
      {(phase === 'intro') && (
        <div ref={introRef} style={styles.intro}>
          <h2 style={styles.heading}>Cash Cascade</h2>
          <p style={styles.description}>
            Get ready for Cash Cascade! Steer your trusty piggy bank left and right
            to scoop up as much change as you can in just 30 seconds, and watch your
            score soar!
          </p>
          <button
            style={styles.playBtn}
            onClick={handlePlay}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
          >
            Play
          </button>
        </div>
      )}

      {/* ---- COUNTDOWN OVERLAY ---- */}
      {phase === 'countdown' && (
        <div style={styles.countdownOverlay}>
          <span key={countdownLabel} style={styles.countdownLabel}>
            {countdownLabel}
          </span>
        </div>
      )}

      {/* ---- GAME WRAPPER (HUD + Area) — rendered while playing or over ---- */}
      {(phase === 'playing' || phase === 'over') && (
        <div style={styles.gameWrapper}>

          {/* HUD */}
          <div ref={hudRef} style={styles.hud} data-game-hud>
            <div style={styles.hudScore} data-game-score>
              <span style={{ opacity: 0.6, fontWeight: 700, fontSize: '0.7em', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '6px' }}>Score</span>
              <span ref={scoreDisplayRef}>{displayScore}</span>
            </div>
            <div style={styles.hudTime} data-game-time>
              <span style={{ opacity: 0.6, fontWeight: 700, fontSize: '0.7em', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '6px' }}>Time</span>
              <span>{displayTime}s</span>
            </div>
          </div>

          {/* Game Area */}
          <div ref={gameAreaRef} style={styles.gameArea} data-game-area>

            {/* Piggy Bank */}
            <div ref={piggyWrapRef} style={styles.piggyWrap} data-game-piggy-wrap>
              <img
                ref={piggyDefaultRef}
                src="/images/game/piggy.svg"
                alt="Piggy bank"
                style={styles.piggyImg}
                data-game-piggy-default
                draggable={false}
              />
              <img
                ref={piggyHappyRef}
                src="/images/game/piggy-alt.svg"
                alt="Happy piggy bank"
                style={{ ...styles.piggyImg, display: 'none' }}
                data-game-piggy-happy
                draggable={false}
              />
              <img
                ref={piggyMovingRef}
                src="/images/game/piggy-walking.svg"
                alt="Moving piggy bank"
                style={{ ...styles.piggyImg, display: 'none' }}
                data-game-piggy-moving
                draggable={false}
              />
            </div>

            {/* Game Over Modal (inside game area) */}
            {phase === 'over' && (
              <div ref={modalRef} style={styles.modalOverlay} data-game-modal>
                <div style={styles.modalBox}>
                  <p style={styles.modalTitle}>Time&apos;s Up!</p>
                  <p style={styles.modalScoreLabel}>Your Score</p>
                  <p style={styles.modalScore} data-game-final-score>{finalScore}</p>
                  <button
                    style={styles.replayBtn}
                    onClick={handleReplay}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                    data-game-retry
                  >
                    Play Again
                  </button>
                  <a href="/tickets" style={styles.ctaLink}>
                    Ready for Real-Life Cash Grab? Book Your MoMoney Tickets!
                  </a>
                </div>
              </div>
            )}

          </div>
          {/* end game area */}

        </div>
      )}

    </section>
  );
}
