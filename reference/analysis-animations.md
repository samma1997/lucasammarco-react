# Animation Analysis — Museum of Money (museumofmoney.com)

## Overview
The site uses 10 GSAP plugins, Matter.js for physics, Lenis for smooth scrolling, and Flickity for carousels. All custom animations respect `prefers-reduced-motion`. The site runs on Webflow.

---

## 1. Interactive Grid Trail (Block 1)
**Description:** Canvas-based grid that responds to mouse movement with a fading color trail effect.

**GSAP Plugins:** Core only
**Trigger:** `mousemove` (desktop only, no touch)
**Selector:** `[data-grid]`

| Property | Value |
|----------|-------|
| Trail fade-in duration | 0.1s |
| Trail fade-out duration | 2s |
| Fade-out delay | 0.5s |
| Grid size desktop | 32 columns |
| Grid size mobile | 12 columns |
| Trail length | 6 cells with decreasing opacity: 0.15, 0.12, 0.10, 0.07, 0.05, 0.03 |

**Notes:** Uses canvas 2D rendering with `requestAnimationFrame`. Colors derived from CSS custom property `--_theme---text`. Debounced resize handler at 200ms.

---

## 2. Scroll Direction Detection (Block 2)
**Description:** Detects scroll direction and updates `data-scrolling-direction` (up/down) and `data-scrolling-started` (true/false) attributes on elements.

**GSAP Plugins:** None (vanilla JS)
**Trigger:** `scroll` event
**Threshold:** 10px for direction change, 50px for "started"

---

## 3. Navigation Menu Animation (Block 3)
**Description:** Full-screen menu open/close animation with overlay, scaling panel, rotating close icon, and staggered link reveals.

**GSAP Plugins:** Core, matchMedia
**Trigger:** Click on `[data-menu-btn]`, close via `[data-menu-close]`, `[data-menu-overlay]`, or Escape key
**Selector:** `.nav_component`

### Open Timeline (no-preference):
| Step | Target | Properties | Duration | Ease | Position |
|------|--------|-----------|----------|------|----------|
| 1 | overlay | `autoAlpha: 0 -> 1` | 0.4s | `none` | 0 |
| 2 | base panel | `scaleX: 0 -> 1` | 0.8s | `elastic.out(0.75, 0.6)` | `<50%` |
| 3 | close icons | `scale: 0, rotate: -270` | 0.8s | `elastic.out(0.75, 0.6)` | `<+25%` |
| 4 | nav links | `autoAlpha: 0, yPercent: 20` | 0.8s | `elastic.out(0.75, 0.6)` | `<+25%` |

- Links stagger: `0.05s`
- Close reverse: `timeScale(1.5)`
- Lenis stops on open, resumes on close

### Reduced Motion Variant:
All properties use `autoAlpha: 0`, duration 0.4s, ease `none`.

---

## 4. Flip on Scroll / Video Scaling (Blocks 5 & 6)
**Description:** Element morphs position between multiple wrapper targets using GSAP Flip, synchronized to scroll. On scroll-leave, SVG pixel overlay paths flicker on with random stagger.

**GSAP Plugins:** Flip, ScrollTrigger
**Trigger:** Scroll (scrub)
**Selector:** `[data-flip-element='wrapper']`, `[data-flip-element='target']`

### ScrollTrigger Config:
| Property | Value |
|----------|-------|
| start | `bottom center-=100` |
| end | `top center` (of last wrapper) |
| scrub | 0.25 |
| onLeave | flickerOn() |
| onEnterBack | flickerOff() |

### Pixel Flicker:
| Property | Value |
|----------|-------|
| Target | `.scaling_video_contain .pixel_overlay svg path` |
| Duration | 0.05s |
| Stagger | `each: 0.02, from: "random"` |
| Ease | `none` |

---

## 5. Card Stack Horizontal Scroll (Block 7)
**Description:** Horizontal scrolling card stack pinned to viewport. Cards rotate and drift as they scroll. Intro fades out, outro fades in.

**GSAP Plugins:** ScrollTrigger
**Trigger:** Scroll (scrub, pinned)
**Selector:** `.ft_exhibits_wrap`, `[data-card-stack-wrap]`

### Main ScrollTrigger:
| Property | Value |
|----------|-------|
| pin | true |
| scrub | true |
| start | `top top` |
| end | `+= scrollWidth - windowWidth` |
| anticipatePin | 1 |
| pinSpacing | false |

### Card Parallax (per card, no-preference):
| Property | Range |
|----------|-------|
| rotation | random 10-20 deg (both directions) |
| xPercent | random 30-50% (both directions) |
| yPercent | random 10-16% (both directions) |
| ease | `none` |
| containerAnimation | scrollTween |
| start | `left 120%` |
| end | `right -20%` |

### Intro Fade:
- Trigger: first card, `left 100%` to `left 50%`
- Property: `autoAlpha: 0`

### Outro Fade:
- Trigger: last card, `right 80%` to `right 20%`
- Property: `autoAlpha: 0 -> 1`

---

## 6. Slideshow / Gallery with Thumbnails (Block 8)
**Description:** Full-width image slideshow with parallax wipe transitions, infinite thumbnail carousel, touch/wheel navigation.

**GSAP Plugins:** Observer, CustomEase
**Trigger:** Touch swipe, pointer drag, horizontal wheel, thumbnail click
**Selector:** `.story_wrap`, `[data-slideshow="wrap"]`

### Custom Ease:
```
CustomEase.create("slideshow-wipe", "0.6, 0.08, 0.02, 0.99")
```

### Slide Transition:
| Property | Value |
|----------|-------|
| Duration | 0.9s |
| Ease | `slideshow-wipe` (custom) |
| Current slide out | `xPercent: -direction * 100` |
| Current inner parallax | `xPercent: direction * 50` |
| Incoming slide | `xPercent: direction * 100 -> 0` |
| Incoming inner parallax | `xPercent: -direction * 50 -> 0` |

### Thumbnail Carousel:
- Uses `horizontalLoop()` helper (infinite loop with center snapping)
- Speed: 0.5
- Sync to slide: duration 0.6s, ease `power2.out`

### Observer Config:
- Types: `touch, pointer`
- Wheel tolerance: deltaX > 50px
- wheelSpeed: -1
- tolerance: 10

---

## 7. Cash Cascade Game (Block 9)
**Description:** Interactive coin-catching game with draggable piggy bank, falling coins, physics confetti, progressive difficulty, Web Audio sound effects, and 30-second timer.

**GSAP Plugins:** Draggable, Physics2DPlugin, TextPlugin
**Trigger:** Click start button

### Draggable Config:
| Property | Value |
|----------|-------|
| type | `x` |
| bounds | game area |
| inertia | true |

### Coin Fall Animation:
| Property | Value |
|----------|-------|
| Base duration | 2-4s (random) |
| Speed multiplier | 1.0 -> 2.5 (progressive) |
| Rotation | 360-720 deg |
| Ease | `none` |

### Progressive Difficulty:
| Property | Start | End |
|----------|-------|-----|
| Spawn rate | 800ms | 200ms |
| Fall speed multiplier | 1.0 | 2.5 |
| Progression curve | exponential (power 1.5) |
| Update interval | every 1s |

### Confetti (Physics2DPlugin):
| Property | Value |
|----------|-------|
| Particles per catch | 15 |
| Velocity | 200-400 |
| Angle | random 0-360 |
| Gravity | 500 |
| Fade duration | 1.5s |

### Confetti Colors by Coin:
- 1 cent: light beige (hue 48)
- 5 cent: orange (hue 25)
- 10 cent: yellow (hue 56)
- 25 cent: pink (hue 299)

### Countdown Animation:
- TextPlugin: 3 -> 0 over 3s, snapped to integers
- Ease: `none`

### UI Transitions:
- Intro fade: scale 0.5, opacity 0, duration 0.75s
- HUD/area reveal: opacity 1, duration 0.75s
- End modal: opacity 1, duration 0.75s

---

## 8. Marquee with Scroll Direction (Block 10)
**Description:** Infinite horizontal marquee that reverses direction based on scroll direction, with scroll-speed parallax offset.

**GSAP Plugins:** ScrollTrigger
**Trigger:** Scroll (continuous + scrub)
**Selector:** `.marquee_cta_wrap`, `[data-marquee-scroll-direction-target]`

### Marquee Animation:
| Property | Value |
|----------|-------|
| xPercent | -100 (loop) |
| repeat | -1 (infinite) |
| ease | `linear` |
| Speed | configurable via `data-marquee-speed` |

### Speed Multipliers:
- Mobile (<479px): 0.25x
- Tablet (<991px): 0.5x
- Desktop: 1x

### Scroll Direction Reversal:
- ScrollTrigger: `top bottom` to `bottom top`
- Reverses `timeScale` on scroll direction change

### Scroll Parallax Offset:
- Scrub: 0
- fromTo `x` based on `data-marquee-scroll-speed` attribute (vw units)

---

## 9. Matter.js Falling Coins Physics (Block 11)
**Description:** 2D physics simulation with bouncing coin bodies inside a walled container, triggered on scroll into view.

**Physics Engine:** Matter.js 0.19.0
**GSAP Plugins:** ScrollTrigger (trigger only)
**Trigger:** ScrollTrigger `onEnter`, once
**Selector:** `#canvas-target`

### Matter.js Config:
| Property | Value |
|----------|-------|
| Gravity Y | 2 |
| Object count | 15 |
| Object size | canvasWidth / 9 |
| Restitution (bounciness) | 0.75 |
| Pixel ratio | 2 |
| Background | transparent |
| Wireframes | false |
| Spawn delay | 100ms between each |

### Bodies:
- 4 static wall rectangles (top, bottom, left, right)
- 15 circular coin bodies (chamfer radius = size/2)
- 6 different coin SVG textures cycled sequentially

### Mouse Interaction:
- MouseConstraint with stiffness 0.2
- Invisible constraint rendering

### ScrollTrigger:
| Property | Value |
|----------|-------|
| trigger | `#canvas-target` |
| start | `top 10%` |
| end | `bottom 90%` |
| once | true |

### Resize Handling:
- Mobile: only refreshes on width change >50px or height change >100px
- Desktop: refreshes on any change >20px
- Debounce: 500ms mobile, 250ms desktop
- Full cleanup and rebuild on resize

---

## 10. Word Reveal / SplitText Animation (Block 17)
**Description:** Words animate in from below with elastic bounce, optional sticker elements scale in after.

**GSAP Plugins:** SplitText, ScrollTrigger
**Trigger:** ScrollTrigger
**Selector:** `[data-word-reveal='true']`

### SplitText Config:
- Type: `words, chars`
- Classes: `.word`, `.char`

### ScrollTrigger:
| Property | Value |
|----------|-------|
| start | `top bottom` |
| end | `top 80%` |
| toggleActions | `none play none reset` |

### Word Animation:
| Property | Value |
|----------|-------|
| autoAlpha | 0 -> 1 |
| yPercent | 100 -> 0 |
| scaleY | 0 -> 1 |
| rotate | 10 -> 0 |
| delay | 0.2s |
| duration | 1s |
| ease | `elastic.out(0.75, 0.6)` |
| stagger | `each: 0.035` |

### Sticker Reveal:
| Property | Value |
|----------|-------|
| scale | 0 -> 1 |
| duration | 0.4s |
| ease | `back.out(3)` |
| stagger | 0.2s |
| position | `<+35%` |

---

## 11. Sticker Inertia on Hover (Block 18)
**Description:** Sticker elements react to mouse hover with inertia-based displacement and wiggle rotation, using cursor velocity.

**GSAP Plugins:** InertiaPlugin
**Trigger:** `mouseenter`
**Selector:** `[data-sticker-inertia]`

### Inertia Config:
| Property | Value |
|----------|-------|
| x velocity | `deltaX * 20`, end: 0 |
| y velocity | `deltaY * 20`, end: 0 |
| timeScale | 1.2 |

### Wiggle Rotation:
| Property | Value |
|----------|-------|
| angle | random +/-15 deg from current |
| duration | 0.4s |
| yoyo | true |
| repeat | 1 |
| ease | `power1.inOut` |

---

## 12. Pixel Frame Reveal (Block 19)
**Description:** SVG pixel art elements reveal with random staggered path opacity animation on scroll.

**GSAP Plugins:** ScrollTrigger
**Trigger:** ScrollTrigger
**Selector:** `[data-pixel-frame]`, `[data-pixel-el]`

### ScrollTrigger:
| Property | Value |
|----------|-------|
| start | `top bottom` |
| end | `top 70%` |
| toggleActions | `none play none reset` |

### Animation:
| Step | Target | Duration | Stagger | Ease |
|------|--------|----------|---------|------|
| 1 | pixel containers | 0.1s (opacity 1) | none | `none` |
| 2 | SVG paths | 0.05s (opacity 1) | `each: 0.02, from: "random"` | `none` |

---

## 13. Popup System (Block 20)
**Description:** Date-range-based popup modals with localStorage daily dismissal tracking. Close animation scales down with back ease.

**GSAP Plugins:** Core
**Trigger:** Auto-show based on date range, close on click
**Selector:** `[data-popup-wrap]`

### Close Animation:
| Property | Value |
|----------|-------|
| Target | `[data-popup-modal]` |
| scale | 1 -> 0 |
| duration | 0.6s |
| ease | `back.in(1.4)` |

---

## 14. Color Theme Transitions (Block 15)
**Description:** Animates body CSS custom properties to match theme when scrolling into themed sections.

**GSAP Plugins:** ScrollTrigger
**Trigger:** ScrollTrigger toggle
**Selector:** `[data-animate-theme-to]`

### ScrollTrigger:
| Property | Value |
|----------|-------|
| start | `top center` |
| end | `bottom center` |
| onToggle | applies theme via `gsap.to("body", { ...colorThemes.getTheme(theme) })` |

---

## 15. Lenis Smooth Scroll (Block 14)
**Description:** Global smooth scrolling initialization.

```js
const lenis = new Lenis({ autoRaf: true });
```

---

## 16. Copy to Clipboard (Block 4)
**Description:** Copy promo code/email to clipboard with state management. Not animation-heavy, mainly UI state toggling.

**Selector:** `.notification_wrap`, `.copy_code_btn`

---

## 17. Form Validation (Block 12)
**Description:** Advanced form validation with real-time field validation, radio/checkbox groups, spam detection (5s minimum), and focus management. No GSAP animations.

**Selector:** `[data-form-validate]`

---

## 18. UTM Parameter Tracking (Block 21)
**Description:** Captures UTM parameters from URL and populates hidden form fields.

---

## 19. Kiosk Mode (Block 22)
**Description:** Physical kiosk mode activated via `?kiosk=1` URL parameter. Hides nav/footer, adds loading overlay, back button, and auto-redirect timer (20s) on order confirmation.

---

## Summary of Easing Functions Used

| Ease | Used In |
|------|---------|
| `none` / `linear` | Marquee, scrub animations, flip, coin fall |
| `elastic.out(0.75, 0.6)` | Menu open, word reveal |
| `back.out(3)` | Sticker reveal |
| `back.in(1.4)` | Popup close |
| `power1.inOut` | Sticker wiggle |
| `power2.out` | Thumbnail carousel sync |
| `slideshow-wipe` (custom: `0.6, 0.08, 0.02, 0.99`) | Slideshow transitions |

## GSAP Plugin Usage Summary

| Plugin | Used In |
|--------|---------|
| ScrollTrigger | Card stack, flip scroll, marquee, Matter.js trigger, word reveal, pixel frames, color themes |
| Flip | Video scaling / position morphing |
| SplitText | Word reveal animations |
| Draggable | Cash Cascade game piggy bank |
| InertiaPlugin | Sticker hover, piggy bank drag |
| Physics2DPlugin | Confetti particles in game |
| Observer | Slideshow touch/wheel navigation |
| CustomEase | Slideshow wipe transition |
| TextPlugin | Game countdown (3-2-1) |
