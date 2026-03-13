# Museum of Money (museumofmoney.com) - Complete Page Structure Analysis

> Source: https://www.museumofmoney.com/
> Platform: Webflow
> Font: Montserrat (all weights 100-900, normal + italic)
> Analytics: TikTok Pixel (D67T7FBC77UA8BRTS3AG), Intellimize (117814131)
> Animation Library: GSAP + ScrollTrigger + Draggable + Physics2DPlugin + Flip

---

## 1. SECTION MAP (Top to Bottom)

### 1.1 Notification Banner
- **Purpose:** Promotional announcement bar at the very top of the page
- **Structure:**
  ```
  .notification_wrap
    .notification_content
      [headline text]
      [detail text]
      .btn_secondary_wrap [data-copy-button]
        "Claim 50% off"
  ```
- **CSS Classes:** `.notification_wrap`, `.notification_content`, `.btn_secondary_wrap`
- **Content:** "Last day to get 50% off | Online exclusive" / "Book online and get 50% off your General Admission tickets, available this weekend only (February 20 - 22)."
- **CTA:** "Claim 50% off" button linking to `/tickets/general-admission`
- **Interactive:** `[data-copy-button]` - copies a code/link, shows "Copied!" feedback state
- **Animations:** None specific (static bar)

---

### 1.2 Navigation / Header
- **Purpose:** Primary site navigation with logo, links, cart, and mobile menu
- **Structure:**
  ```
  .nav_component [data-scrolling-direction] [data-scrolling-started]
    .nav_desktop (visible > 56em)
      [logo / homepage link]
        .logo_tagline_svg (fades out on scroll)
      [nav links]
        a[href="/exhibits"] "Exhibits"
        a[href="/contact"] "Contact"
        a[href="/blog"] "Blog"
      .btn_main_wrap a[href="/tickets/general-admission"] "Book Tickets"
      .cart_icon_wrap a[href="/checkout"] [cart count: "0"]
    .nav_mobile (visible <= 56em)
      .mobile_menu_btn [data-menu-btn]
      [data-menu-wrap]
        [data-menu-overlay]
        [data-menu-base]
          [data-menu-close] (X icon)
          [data-menu-link-list]
            a[href="/tickets"] "Book Tickets"
            a[href="/exhibits"] "exhibits"
            a[href="/find-us"] "Find us"
            a[href="/contact"] "contact"
            a[href="/blog"] "Blog"
            a[href="/events"] "Events"
            a[href="/money-lab"] "Money Lab"
            a[href="/gift-shop"] "Gift Shop"
            a[href="/about"] "About"
            a[href="/faq"] "FAQ"
  ```
- **CSS Classes:** `.nav_component`, `.nav_desktop`, `.nav_mobile`, `.mobile_menu_btn`, `.cart_icon_wrap`, `.logo_tagline_svg`
- **Data Attributes:**
  - `data-scrolling-direction` - tracks scroll direction ("up" / "down")
  - `data-scrolling-started` - boolean, triggers nav shrink/hide
  - `data-menu-btn` - hamburger trigger
  - `data-menu-wrap` - mobile menu container
  - `data-menu-overlay` - backdrop overlay
  - `data-menu-base` - menu panel
  - `data-menu-close` - close button
  - `data-menu-link-list` - link container
- **Animations:**
  - Nav hides on scroll down, shows on scroll up
  - `.logo_tagline_svg` fades to opacity 0 when `[data-scrolling-started="true"]`
  - Mobile menu opens/closes with elastic scale/transform GSAP timeline
  - Menu overlay fades in/out
  - ESC key closes menu

---

### 1.3 Hero Section
- **Purpose:** Main homepage banner with headline, subtext, CTA, and video/visual element
- **Structure:**
  ```
  section.hero_section
    [data-flip-element="wrapper"]
      .hero_content
        h1 "Get to know your dough"
        p "We PUT THE FUN IN FUNDS"
        p "Money: it's all about change. Discover its story at MoMoney, the interactive Museum of Money."
        .btn_main_wrap a[href="/tickets/general-admission"] "Book Tickets"
      [data-flip-element="target"]
        .scaling_video_contain
          .pixel_overlay
            svg path (pixel flicker effect)
          [video/visual content]
  ```
- **CSS Classes:** `.hero_section`, `.hero_content`, `.scaling_video_contain`, `.pixel_overlay`
- **Content:**
  - Headline: "Get to know your dough"
  - Subheadline: "We PUT THE FUN IN FUNDS"
  - Body: "Money: it's all about change. Discover its story at MoMoney, the interactive Museum of Money."
  - CTA: "Book Tickets" -> `/tickets/general-admission`
- **Animations:**
  - `[data-flip-element]` - GSAP Flip plugin scroll-triggered morph animation between wrapper and target states
  - Pixel overlay SVG paths animate opacity with 0.02s stagger (forward-flicker effect)
  - `gsap.set('.scaling_video_contain .pixel_overlay svg path', { opacity: 0 })` initializes all paths invisible
  - On scroll trigger: paths animate to opacity 1 with random stagger
  - On scroll back: reverse animation

---

### 1.4 Featured Exhibits - Card Stack (Horizontal Scroll)
- **Purpose:** Horizontally scrollable card carousel showcasing 6 exhibits
- **Structure:**
  ```
  section.ft_exhibits_wrap [data-card-stack-wrap]
    [data-card-stack-intro]
      [intro text - fades out during scroll]
    [data-card-stack-list]
      [data-card-stack-card] x6
        img (exhibit image)
        .card_title
        .card_description
    [data-card-stack-outro]
      .btn_main_wrap a[href="/exhibits"] "Explore our exhibits"
  ```
- **CSS Classes:** `.ft_exhibits_wrap`, `.card_title`, `.card_description`
- **Data Attributes:** `data-card-stack-wrap`, `data-card-stack-intro`, `data-card-stack-list`, `data-card-stack-card`, `data-card-stack-outro`
- **Content (6 cards):**

  | # | Exhibit | Image File | Description |
  |---|---------|-----------|-------------|
  | 1 | Dex Diamondhands | `exhibit_placeholder-5.avif` | "Our 80s AI dude reads your financial future--bring your wildest questions!" |
  | 2 | Currency Designer | `exhibit_placeholder-9.avif` | "Design your own dough--from your face to your wildest style. Debut your masterpiece live and take it home." |
  | 3 | Bull vs Bear Bell Bash | `exhibit_placeholder-7.avif` | "Ring the bell, watch the battle, and learn why bulls and bears are always fighting on Wall Street." |
  | 4 | Penny Thinkers | `exhibit_placeholder-1.avif` | "Mind tricks and money: discover quirky ways your brain messes with your wallet." |
  | 5 | Cash Shower Splash | `exhibit_placeholder-6.avif` | "Hop into a tub full of dollars and strike your richest pose." |
  | 6 | Ask MoAI | `exhibit_placeholder-2.avif` | "Chat with our super-friendly AI for personal finance life-hacks." |

- **CTA:** "Explore our exhibits" -> `/exhibits`
- **Animations:**
  - Horizontal scroll via `gsap.to(cardsContainer, { x: -distance })` with `scrollTrigger: { pin: true }`
  - Each card animates individually with `gsap.fromTo()` (rotation, x/yPercent transforms)
  - Container height set to `distance + window.innerHeight` to create scroll distance
  - Physics2D stagger effects on cards
  - Intro fades out, outro fades in at boundaries
  - Reduced-motion: disables 3D transforms

---

### 1.5 Interactive Exhibits Showcase (FLIP Sections)
- **Purpose:** Large full-width exhibit feature sections with scroll-triggered FLIP animations
- **Structure (repeated for each exhibit):**
  ```
  section.exhibit_showcase
    [data-flip-element="wrapper"]
      .exhibit_image_wrap
        img (large photo)
      .exhibit_info
        h2 [exhibit name]
        p [description]
    [data-flip-element="target"]
      .scaling_video_contain
        .pixel_overlay svg
  ```
- **6 Featured Exhibits:**

  | # | Exhibit | Image File | Description |
  |---|---------|-----------|-------------|
  | 1 | Dex Diamondhands | `02 BB MoMoney Museum-BAT09910-2.avif` | (no text, visual only) |
  | 2 | Snap & Flex | `21. Snap & Flex 2.avif` | "Step into our low-key luxe zone, where the stakes feel high, the fantasy runs richer, and every photo cashes out as pure boss-level bragging rights." |
  | 3 | Laser Maze Heist | `16. Lazer Maze.avif` | "Dodge lasers, channel your inner thief, and beat your friends to the loot." |
  | 4 | Catch the Counterfeits | `9. Catch the Counterfeits.avif` | "Can you spot the fakes? Flip panels, test your eye, and outwit the forgers." |
  | 5 | Cash Shower Splash | `02 BB MoMoney Museum-BAT08798.avif` | (no text, visual only) |
  | 6 | Marketplace Shuffle | `5. Marketplace Shuffle.avif` | "Swap and barter your way to the goods you need; no money allowed! Can you crack the ancient market code?" |

- **Animations:** Same FLIP + pixel overlay pattern as hero section. Scroll-triggered morph between wrapper/target states.

---

### 1.6 Reviews / Testimonials
- **Purpose:** Social proof section with visitor quotes
- **Structure:**
  ```
  section.reviews_section
    .review_card x6
      img.reviewer_avatar
      .reviewer_name
      .review_text
  ```
- **Content (6 reviews):**

  | Reviewer | Image | Quote |
  |----------|-------|-------|
  | Jordan G. | `MM_Male_C.avif` | "Bull, Bear or Bust was an adrenaline rush--taking a spin at the stock market simulator taught me more..." |
  | Rebecca B. | `MM_Female_C.avif` | "Fake bills, real skills! The Catch the Counterfeits exhibit had me squinting for imperfections..." |
  | Margo H. | `MM_Female_B.avif` | "I hit the motherlode of fun in the Hoard of Gold--diving into coins and bars was a blissful chase..." |
  | Alex R. | `MM_Male_A.avif` | "Bull, Bear or Bust was an adrenaline rush--taking a spin at the stock market simulator taught me more..." |
  | Mark T. | `MM_Male_B.avif` | "Fake bills, real skills! The Catch the Counterfeits exhibit had me squinting for imperfections..." |
  | Jessica L. | `MM_Female_A.avif` | "I hit the motherlode of fun in the Hoard of Gold--diving into coins and bars was a blissful chase..." |

- **Schema:** Structured as `@type: Review` with `author` and `reviewBody` in JSON-LD
- **Animations:** None documented (likely fade-in on scroll)

---

### 1.7 Story / About Section (Gallery Slideshow)
- **Purpose:** Museum narrative with photo gallery slideshow
- **Structure:**
  ```
  section.story_wrap [data-slideshow="wrap"]
    .story_headline
      h2 "Once upon a dime (or a Benjamin... maybe even a Bitcoin) MoMoney was born"
    .story_text
      p "Picture diving headfirst into your wallet, where crisp dollar bills mingle
         with shimmering crypto keys. At MoMoney, you'll design your own currency,
         snap a selfie in a vault of gold, and take a spin on our stock-market wheel.
         Through playful, hands-on exhibits and data-driven storytelling, we trace
         money's journey from minting presses to blockchain nodes. Laugh, learn, and
         leave richer in every sense because every dollar holds a story, and here,
         you're the storyteller."
    .slideshow_container
      .slideshow_slides
        .slide x9 [data-slideshow="slide"]
          img (gallery image)
      .slideshow_thumbs
        .thumb x9 [data-slideshow="thumb"]
          img (thumbnail)
    .btn_main_wrap a[href="/exhibits"] "Discover what's on"
  ```
- **CSS Classes:** `.story_wrap`, `.story_headline`, `.story_text`, `.slideshow_container`, `.slideshow_slides`, `.slideshow_thumbs`
- **Data Attributes:** `data-slideshow="wrap"`, `data-slideshow="slide"`, `data-slideshow="thumb"`
- **Gallery Images (9 slides):**
  1. `1. What even is money.avif`
  2. `20. Bank Bosses-2.avif`
  3. `5. Marketplace Shuffle.avif`
  4. `14. Money Gallery 1.avif`
  5. `16. Lazer Maze.avif`
  6. `18. Vault Posedown.avif`
  7. `02 BB MoMoney Museum-BAT08313.avif`
  8. `21. Snap & Flex 2.avif`
  9. (repeat of slide 1)
- **Animations:**
  - Horizontal loop with GSAP Observer (touch/wheel/pointer detection)
  - Custom ease: `CustomEase("slideshow-wipe", "0.6, 0.08, 0.02, 0.99")`
  - Thumbnail navigation click handlers
  - Continuous loop wrapping

---

### 1.8 Cash Cascade Game Section
- **Purpose:** Playable browser mini-game (catch falling coins with piggy bank)
- **Structure:**
  ```
  section.game_section
    [data-game-wrap]
      [data-game-intro]
        h2 "Cash Cascade"
        p "Get ready for Cash Cascade! Steer your trusty piggy bank left and right
           to scoop up as much change as you can in just 30 seconds, and watch your
           score soar!"
        button[data-game-start] "Play"
      [data-game-countdown-wrap].hidden
        [data-game-countdown] (displays 3, 2, 1, GO!)
      [data-game-hud]
        [data-game-score] (live score)
        [data-game-time] (countdown timer from 30)
      [data-game-area]
        .coin x(dynamic) (spawned coins falling)
        .confetti x(dynamic) (particle effects)
      [data-game-piggy-wrap]
        img[data-game-piggy-default] (Piggy.svg)
        img[data-game-piggy-happy] (Piggy_alt.svg)
        img[data-game-piggy-moving] (Piggy_walking.svg)
      [data-game-modal].hidden
        [data-game-final-score]
        button[data-game-retry] "Play Again"
        .btn_main_wrap a[href="/tickets"] "Ready for Real-Life Cash Grab? Book Your MoMoney Tickets!"
  ```
- **CSS Classes:** `.game_section`, `.coin`, `.confetti`, `.hidden`
- **Data Attributes:** `data-game-wrap`, `data-game-intro`, `data-game-start`, `data-game-countdown-wrap`, `data-game-countdown`, `data-game-hud`, `data-game-score`, `data-game-time`, `data-game-area`, `data-game-piggy-wrap`, `data-game-piggy-default`, `data-game-piggy-happy`, `data-game-piggy-moving`, `data-game-modal`, `data-game-final-score`, `data-game-retry`
- **Game Assets:**
  - Piggy default: `Piggy.svg`
  - Piggy happy: `Piggy_alt.svg`
  - Piggy walking: `Piggy_walking.svg`
  - Coins: `coin-1.svg` (1pt), `coin-5.svg` (5pt), `coin-10.svg` (10pt), `coin-25.svg` (25pt)
  - Audio: `ka-ching.mp3` (volume 0.3)
- **Game Mechanics:**
  - Duration: 30 seconds
  - Spawn rate: starts at 800ms, decreases to 200ms (progressive difficulty)
  - Fall speed multiplier: starts at 1.0x, increases to 2.5x
  - Collision detection: runs every 16ms
  - Draggable piggy bank (GSAP Draggable, bounds constrained)
  - Confetti effects with coin-specific HSL colors
  - Piggy state changes: default -> moving (during drag) -> happy (on coin catch)
  - Countdown overlay: 3, 2, 1, GO!
- **Animations:**
  - Coins fall with Physics2D gravity
  - Confetti particles burst on coin catch
  - Piggy bank flips horizontally based on drag direction
  - Score counter animates on increment
  - End modal slides in with final score

---

### 1.9 Location / Hours Section
- **Purpose:** Museum visit info with address, hours, and map link
- **Structure:**
  ```
  section.location_section
    .location_content
      .location_bg_image
        img (background photo: 060A4190-2.avif)
      .location_info
        h2 [location heading]
        .address "501 Elm St, Dallas, TX 75202"
        .hours "Sun - Thu: 10AM to 8PM / Fri & Sat: 10AM to 9PM"
        a[href="https://maps.app.goo.gl/ngVA3AWMYgd6GAKVA"] "Get Directions"
  ```
- **CSS Classes:** `.location_section`, `.location_content`, `.location_bg_image`, `.location_info`
- **Background Image:** `27683d5ab5dc16b03e4c73cb049604dd_060A4190-2.avif`
- **Map Link:** `https://maps.app.goo.gl/ngVA3AWMYgd6GAKVA`

---

### 1.10 Grid / Particle Canvas
- **Purpose:** Decorative interactive canvas element that responds to mouse movement
- **Structure:**
  ```
  [data-grid]
    canvas (rendered dynamically)
  ```
- **Data Attributes:** `data-grid`, `data-grid-background`, `data-grid-border-size`, `data-grid-border-color`
- **Behavior:**
  - Canvas-based rendering (no DOM grid items)
  - Grid cell size: 32px desktop, 12px mobile
  - Colors derived from `--_theme---text` CSS variable
  - Mouse trail with opacity array: `[0.15, 0.12, 0.10, 0.07, 0.05, 0.03]` (fade trail)
  - Particles follow cursor position
  - Renders on `mousemove` / `touchmove`

---

## 2. NAVIGATION STRUCTURE (Detailed)

### Desktop Navigation (visible > 56em)
- Container: `.nav_component`
- Logo: Homepage link with `.logo_tagline_svg` (SVG-based, fades on scroll)
- Links (left-to-right):
  1. `/exhibits` - "Exhibits"
  2. `/contact` - "Contact"
  3. `/blog` - "Blog"
- CTA: `.btn_main_wrap` -> `/tickets/general-admission` - "Book Tickets"
- Cart: `.cart_icon_wrap` -> `/checkout` showing item count badge ("0")

### Mobile Navigation (visible <= 56em)
- Hamburger: `.mobile_menu_btn` with `[data-menu-btn]`
- Full-screen overlay menu with `[data-menu-wrap]`
- Close button: `[data-menu-close]`
- Links (top-to-bottom):
  1. `/tickets` - "Book Tickets"
  2. `/exhibits` - "exhibits"
  3. `/find-us` - "Find us"
  4. `/contact` - "contact"
  5. `/blog` - "Blog"
  6. `/events` - "Events"
  7. `/money-lab` - "Money Lab"
  8. `/gift-shop` - "Gift Shop"
  9. `/about` - "About"
  10. `/faq` - "FAQ"

### Scroll Behavior
- `[data-scrolling-started]` - set to `"true"` once user begins scrolling
- `[data-scrolling-direction]` - set to `"up"` or `"down"`
- Nav hides on scroll down, appears on scroll up
- Logo tagline SVG fades to opacity 0 when scrolling started

### Mobile Menu Animation
- GSAP timeline with elastic easing
- Overlay fades in
- Menu panel scales/transforms in from right
- Links stagger in
- ESC key or overlay click closes menu

---

## 3. FOOTER STRUCTURE

### Footer Links (same as mobile nav)
| Link | Text |
|------|------|
| `/tickets` | Book Tickets |
| `/exhibits` | Exhibits |
| `/find-us` | Find us |
| `/contact` | Contact |
| `/blog` | Blog |
| `/events` | Events |
| `/money-lab` | Money Lab |
| `/gift-shop` | Gift Shop |
| `/about` | About |
| `/faq` | FAQ |

### Social Media Links
| Platform | URL |
|----------|-----|
| Facebook | `https://www.facebook.com/profile.php?id=61577223339262` |
| Instagram | `https://www.instagram.com/momoneymuseum/` |
| YouTube | `https://www.youtube.com/@MoMoneyMuseum` |
| TikTok | `https://www.tiktok.com/@momoneymuseum` |

### Schema.org Structured Data (JSON-LD)
```json
{
  "@type": "Museum",
  "name": "MoMoney",
  "alternateName": "Museum of Money",
  "openingHours": "Mo-Su 10:00-20:00",
  "address": { "streetAddress": "501 Elm St", "addressLocality": "Dallas", "addressRegion": "TX", "postalCode": "75202" },
  "sameAs": ["facebook", "instagram", "youtube", "tiktok"]
}
```

---

## 4. INTERACTIVE ELEMENTS

### Buttons (Two Variants)

#### Primary Button (`.btn_main_wrap`)
```
.btn_main_wrap
  .btn_main_bg (background layer)
  .btn_main_front (default visible face)
    .btn_main_inner
    .btn_main_icon_wrap
    .btn_main_divider
    .btn_main_text
  .btn_main_back (revealed on hover - 3D flip)
```
- **Hover:** `.btn_main_front` translates `-2rem -6rem` with `rotate: 1 0 0 85deg` (X-axis 3D rotation). `.btn_main_back` simultaneously appears.
- **Active:** `scaleX(0.955) scaleY(0.954)` compression
- **Easing:** `--elastic-ease-out: linear(...)` custom elastic curve, duration 0.65-0.85s
- **Theme colors:** `--_theme---button--background`, `--_theme---button--text`

#### Secondary Button (`.btn_secondary_wrap`)
- Identical structure with `.btn_secondary_bg`, `.btn_secondary_front`, `.btn_secondary_back`
- Same 3D flip hover effect

### Custom Cursors
The site uses custom cursor SVGs replacing the default cursor:
- **Default pointer:** `Cursor_ Pointer.svg`
- **Text cursor:** `Cursor_ Text.svg`
- **Link hover:** `Cursor_ Pointer Links.svg`
- **Grab (draggable):** `Cursor_ Grab.svg`
- **Dragging (active):** `Cursor_ Dragging.svg`
- **Flip cursor:** `Flip Cursor.svg`

### Cart Sidebar
```
.cart_wrap (toggle: .is-visible)
  .cart_empty_message "No items found"
  .cart_items
    .cart_item
      .product_title "Product title goes here"
      .product_price "$19.95"
      [remove button]
  .cart_subtotal "$ 83.50"
  .btn_main_wrap "Go To Checkout"
  a "Continue Shopping"
  .cart_error "Checkout is not currently set up. Please contact us to fix it."
```

### Copy-to-Clipboard (Notification Bar)
- `[data-copy-button]` attribute on notification CTA
- Changes text to "Copied!" on click

---

## 5. RESPONSIVE BEHAVIOR

### Breakpoints
| Breakpoint | Target |
|-----------|--------|
| `max-width: 479px` | Extra small (mobile) |
| `max-width: 48em` (768px) | Tablet / medium |
| `max-width: 56em` (896px) | Desktop threshold |

### Container Queries
- `@container (width <= 56em)` - switches nav desktop/mobile
- `@container (width < 48em)` - smaller container breakpoint
- Named thresholds: `threshold-large`, `threshold-medium`, `threshold-small`

### Responsive Classes
| Class | Behavior |
|-------|----------|
| `.nav_desktop` | Hidden at <= 56em |
| `.nav_mobile` | Shown at <= 56em |
| `.u-grid-above` | Conditional display based on grid |
| `.u-grid-below` | Conditional display based on grid |
| `.u-hide-if-empty` | Hides element when empty |

### Game Responsiveness
- Grid cell size changes: 32px (desktop) -> 12px (mobile)
- Draggable piggy bank bounds adapt to viewport
- Coin spawn positions use percentage of game area width

### Motion Preference
- `prefers-reduced-motion` is respected
- Disables 3D transforms on card stack
- Simplifies scroll animations

---

## 6. CSS THEME VARIABLES

| Variable | Purpose |
|----------|---------|
| `--_theme---background` | Page background color |
| `--_theme---text` | Primary text color, grid particle color source |
| `--_theme---button--background` | Button background on hover/active |
| `--_theme---button--text` | Button text color on hover/active |
| `--_theme---selection--background` | Text selection highlight background |
| `--_theme---selection--text` | Text selection highlight text color |

### Currency Settings (Webflow E-commerce)
```
--currencyCode: "USD"
--symbol: "$"
--decimal: "."
--fractionDigits: 2
--group: ","
```

### Custom Easing
```
--elastic-ease-out: linear(...) (custom elastic curve)
CustomEase("slideshow-wipe", "0.6, 0.08, 0.02, 0.99")
```

---

## 7. ANIMATION FRAMEWORK SUMMARY

### GSAP Plugins Used
1. **ScrollTrigger** - Scroll-based animations, pinning, scrubbing
2. **Flip** - Morph/layout animations between states (`data-flip-element`)
3. **Draggable** - Piggy bank game interaction
4. **Physics2DPlugin** - Coin falling, confetti particles, card stacking
5. **Observer** - Touch/wheel/pointer detection for slideshow
6. **CustomEase** - Named easing curves

### Animation Patterns by Section

| Section | Trigger | Animation Type |
|---------|---------|---------------|
| Nav | Scroll direction | Show/hide, logo fade |
| Hero | ScrollTrigger | FLIP morph + pixel flicker |
| Card Stack | ScrollTrigger (pin) | Horizontal scroll, card rotation |
| Exhibit Showcase | ScrollTrigger | FLIP morph + pixel flicker |
| Story Slideshow | Observer (touch/wheel) | Horizontal loop, thumbnail nav |
| Game | User interaction | Physics2D, Draggable, confetti |
| Grid | Mouse movement | Canvas particle trail |
| Buttons | Hover/active | 3D flip, elastic ease, scale |
| Mobile Menu | Click | Elastic scale, stagger links |

---

## 8. COMPLETE PAGE FLOW (Section Order)

1. Notification Banner (promotional bar)
2. Navigation Header (desktop + mobile)
3. Hero Section (headline + FLIP visual)
4. Featured Exhibits Card Stack (horizontal scroll, 6 cards)
5. Interactive Exhibits Showcase (6 FLIP sections)
6. Reviews / Testimonials (6 reviewer cards)
7. Story / About Section (gallery slideshow, 9 slides)
8. Cash Cascade Game (interactive mini-game)
9. Location / Hours (address, map link)
10. Footer (links + social)
11. Cart Sidebar (hidden, toggled)
12. Grid Canvas Overlay (decorative, mouse-reactive)

---

## 9. CDN BASE URLS

- **Site assets:** `https://cdn.prod.website-files.com/6846d87a35249ce8a8e70716/`
- **Global/shared assets:** `https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/`
- **Webflow plugins:** `https://cdn.prod.website-files.com/plugins/Basic/assets/`
- **External CDN (audio):** `https://cdn.jsdelivr.net/gh/madebykin/momoney/`

---

## 10. TECHNICAL NOTES

- **Platform:** Webflow with custom GSAP animations
- **Rendering:** Client-side with heavy JavaScript animation layer
- **E-commerce:** Webflow native e-commerce (cart, checkout)
- **Ticketing:** External widget via `widgets.tickxcore.com`
- **Font loading:** Google Fonts (Montserrat, all weights)
- **Image format:** Predominantly AVIF for photos, SVG for icons/game assets
- **No visible cookie banner or loading screen** in the HTML source
