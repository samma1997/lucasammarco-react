# MeritFirst.us - Complete Site Analysis

**URL:** https://www.meritfirst.us/
**Title:** MeritFirst | Skills-Based Hiring Assessments
**Tech Stack:** Next.js (App Router, React Server Components), Tailwind CSS v4, Lenis smooth scroll, PostHog analytics
**Theme:** Dark mode default
**Fonts:** Geist (sans), Geist Mono (mono) - variable weight 100-900

---

## 1. COMPLETE CSS DESIGN SYSTEM

### 1.1 CSS Custom Properties (--mf-* tokens)

```css
/* Backgrounds */
--mf-bg-base: #0a0a0a;
--mf-surface: #111;
--mf-surface-hover: #1a1a1a;

/* Borders */
--mf-border: #262626;
--mf-border-subtle: #404040;
--mf-border-light: #e5e5e5;

/* Text */
--mf-text-heading: #fff;
--mf-text-foreground: #171717;
--mf-text-body: #d4d4d4;
--mf-text-muted: #a3a3a3;
--mf-text-dim: #737373;
--mf-text-scramble-dim: #333;

/* Brand */
--mf-brand-red: #dc2626;
--mf-brand-blue: #3b82f6;
--mf-accent-indigo: #6366f1;

/* Chart Colors */
--mf-chart-blue: #1e40af;
--mf-chart-red: #bc0029;

/* Emphasis Red Gradient */
--mf-emphasis-red-start: #ab0003;
--mf-emphasis-red-via: #ff2e32;
--mf-emphasis-red-end: #a90008;

/* Typography Scale (responsive clamp) */
--mf-text-page-heading: clamp(28px, 5vw + 1rem, 72px);
--mf-text-section-heading: clamp(24px, 4vw + .5rem, 56px);

/* Letter Spacing */
--mf-tracking-hero: -.02em;
--mf-tracking-section-heading: -.025em;
--mf-tracking-subheading: -.02em;

/* Content Widths */
--mf-content-width: 1400px;
--mf-content-narrow: 1265px;
--mf-content-compact: 1100px;
--mf-content-prose: 800px;

/* Z-Index */
--mf-z-header: 50;
--mf-z-modal: 60;
```

### 1.2 Tailwind Theme Tokens (from compiled CSS)

```css
/* Spacing base */
--spacing: .25rem;

/* Text Scale */
--text-xs: .75rem;        /* line-height: calc(1/.75) */
--text-sm: .875rem;       /* line-height: calc(1.25/.875) */
--text-base: 1rem;        /* line-height: calc(1.5/1) */
--text-lg: 1.125rem;      /* line-height: calc(1.75/1.125) */
--text-xl: 1.25rem;       /* line-height: calc(1.75/1.25) */
--text-2xl: 1.5rem;       /* line-height: calc(2/1.5) */
--text-3xl: 1.875rem;     /* line-height: calc(2.25/1.875) */
--text-4xl: 2.25rem;      /* line-height: calc(2.5/2.25) */
--text-5xl: 3rem;         /* line-height: 1 */
--text-6xl: 3.75rem;      /* line-height: 1 */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;

/* Tracking */
--tracking-tighter: -.05em;
--tracking-tight: -.025em;
--tracking-normal: 0em;
--tracking-wide: .025em;
--tracking-wider: .05em;
--tracking-widest: .1em;

/* Leading */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;

/* Border Radius */
--radius-xs: .125rem;
--radius-2xl: 1rem;
--radius-3xl: 1.5rem;

/* Blur Scale */
--blur-xs: 4px;
--blur-sm: 8px;
--blur-md: 12px;
--blur-lg: 16px;
--blur-xl: 24px;
--blur-2xl: 40px;
--blur-3xl: 64px;

/* Easings */
--ease-in: cubic-bezier(.4,0,1,1);
--ease-out: cubic-bezier(0,0,.2,1);
--ease-in-out: cubic-bezier(.4,0,.2,1);

/* Transitions */
--default-transition-duration: .15s;
--default-transition-timing-function: cubic-bezier(.4,0,.2,1);

/* Shadows */
--drop-shadow-sm: 0 1px 2px #00000026;
--button-shadow-neutral-hover: 0px 1px 2px 0px #0e121b0f, inset 0 0 0 1px #d4d4d4;
--button-shadow-primary-hover: 0px 1px 2px 0px #0e121b0f, inset 0 0 0 1px #335cff;

/* Breakpoints */
--breakpoint-sm: 40rem;   /* 640px */
--breakpoint-md: 48rem;   /* 768px */
--breakpoint-lg: 64rem;   /* 1024px */
--breakpoint-xl: 80rem;   /* 1280px */
--breakpoint-2xl: 96rem;  /* 1536px */

/* Container Sizes */
--container-xs: 20rem;
--container-sm: 24rem;
--container-md: 28rem;
--container-lg: 32rem;
--container-xl: 36rem;
--container-2xl: 42rem;
--container-3xl: 48rem;
--container-4xl: 56rem;
--container-5xl: 64rem;
--container-6xl: 72rem;
--container-7xl: 80rem;
```

### 1.3 Complete Color Palette (Tailwind neutral scale used extensively)

```css
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a1a1a1;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0a0a0a;
--color-black: #000;
--color-white: #fff;

/* Red scale (brand emphasis) */
--color-red-500: #fb2c36;
--color-red-600: #e40014;
--color-red-700: #bf000f;

/* Blue scale */
--color-blue-500: #3080ff;
--color-blue-600: #155dfc;

/* Gray scale */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5dc;
--color-gray-400: #99a1af;
--color-gray-500: #6a7282;
--color-gray-600: #4a5565;
--color-gray-700: #364153;
--color-gray-800: #1e2939;
--color-gray-900: #101828;
--color-gray-950: #030712;
```

---

## 2. ANIMATIONS

### 2.1 textShimmer (inline in page)
```css
@keyframes textShimmer {
  0% { background-position: 250% center; }
  100% { background-position: -50% center; }
}
```
**Usage:** Applied to text with `background-clip: text` and a gradient background to create a shimmering highlight effect on headings.

### 2.2 gradient-flash (in custom CSS file)
```css
@keyframes gradient-flash {
  0% { background-position: 100%; }
  to { background-position: 0%; }
}
```

### 2.3 Built-in Tailwind animations
```css
--animate-spin: spin 1s linear infinite;
--animate-ping: ping 1s cubic-bezier(0,0,.2,1) infinite;
--animate-pulse: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
--animate-bounce: bounce 1s infinite;
```

### 2.4 "HIRING IS BROKEN" / "FIX IT OR FAIL" Scrolling Text
- Text is statically repeated ~48 times across multiple rows in the DOM
- Creates a visual wall/manifesto effect
- Likely uses CSS `overflow: hidden` with horizontal scroll animation or is purely visual repetition

### 2.5 Company Logo Carousel
- Logo list is duplicated 3 times in the DOM for seamless infinite loop
- CSS animation-based horizontal scroll (translateX)
- Three parallel rows scrolling simultaneously

### 2.6 Smooth Scroll
- Uses **Lenis** library for smooth scrolling
- Classes: `.lenis.lenis-smooth` sets `scroll-behavior: auto !important`
- `.lenis.lenis-stopped` sets `overflow: hidden`
- `[data-lenis-prevent]` gets `overscroll-behavior: contain`

---

## 3. CUSTOM CSS CLASSES

```css
.link-underline {
  position: relative;
}
.link-underline:after {
  content: "";
  background: currentColor;
  width: 0;
  height: 1px;
  transition: width .3s;
  position: absolute;
  bottom: -1px;
  left: 0;
}
.link-underline:hover:after {
  width: 100%;
}

.marketing-v2 {
  background-color: var(--mf-bg-base);
  overflow-wrap: normal !important;
  word-break: normal !important;
  -webkit-hyphens: none !important;
  hyphens: none !important;
}

.force-break {
  overflow-wrap: break-word !important;
  word-break: break-word !important;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## 4. TYPOGRAPHY SYSTEM

### Fonts
- **Primary:** Geist (variable, 100-900 weight), fallback: Arial
- **Mono:** Geist Mono (variable, 100-900 weight), fallback: Arial
- **CSS vars:** `--font-geist-sans`, `--font-geist-mono`

### Fallback Metrics (Geist)
```css
font-family: Geist Fallback; src: local(Arial);
ascent-override: 95.94%; descent-override: 28.16%;
line-gap-override: 0.0%; size-adjust: 104.76%;
```

### Fallback Metrics (Geist Mono)
```css
font-family: Geist Mono Fallback; src: local(Arial);
ascent-override: 74.67%; descent-override: 21.92%;
line-gap-override: 0.0%; size-adjust: 134.59%;
```

### Body classes
```
geist_variable geist_mono_variable antialiased
```

---

## 5. SECTION-BY-SECTION BREAKDOWN (top to bottom)

### Section 1: Header / Navigation
- **Position:** Fixed/sticky (z-index: var(--mf-z-header) = 50)
- **Background:** Transparent or --mf-bg-base with backdrop blur
- **Content:**
  - Logo (IconMark component - custom SVG)
  - Nav links: "For Candidates", "Manifesto", "We're Hiring!", "Login"
  - CTA button: "Book a Demo"
- **Layout:** Flex, space-between, items-center
- **Max-width:** var(--mf-content-width) = 1400px

### Section 2: Hero - "HIRING IS BROKEN" Text Wall
- **Background:** var(--mf-bg-base) = #0a0a0a
- **Content:** "HIRING IS BROKEN." repeated ~48 times in 6 rows
- **Typography:** Large, bold, uppercase
- **Color:** White with possible opacity variation creating depth
- **Decorative:** blur-sm.png overlay image for glow/blur effect
- **Overflow:** overflow-x-clip on page

### Section 3: Hero - "FIX IT OR FAIL" Text Wall
- **Content:** "FIX IT OR FAIL." repeated ~48 times in 8 rows
- **Same treatment** as "HIRING IS BROKEN" section
- **Visual:** Creates an overwhelming manifesto wall effect

### Section 4: Value Proposition
- **Headline:** "You don't have to be lucky, you just have to be good."
- **Sub-text:** "Can you diagnose the problem?"
- **Background:** var(--mf-bg-base)
- **Typography:** var(--mf-text-page-heading) with --mf-tracking-hero

### Section 5: Diagnostic Assessment (Interactive)
- **Layout:** 3 numbered cards/steps
- **Card 1:** "01" - "You get 3 questions to investigate. No more. Ask the right ones."
- **Card 2:** "02" - "The answer is hidden. You have to ask for it. Think before you dig."
- **Card 3:** "03" - "Deliver your diagnosis and plan of action. What went wrong, and what should they do?"
- **CTA:** "Start Assessment" button
- **Styling:** Cards likely have --mf-border borders, --mf-surface background
- **Interactive:** Click triggers assessment flow (React state-driven)

### Section 6: Meritocracy Value Prop
- **Headline:** "Choose meritocracy. Try it yourself."
- **Sub-headline:** "Skills-based hiring assessments -- hire on merit, not history"
- **Vertical text element:** "Opportunity Promised. Outcomes Earned."
- **CTA:** "Try An Assessment"
- **Typography:** textShimmer animation applied to heading text
- **Background:** var(--mf-bg-base)

### Section 7: Capabilities - Dual Audience
- **Layout:** Two-column or stacked split
- **Left/Top - "For Companies":**
  - "Skills-based assessments that reveal who can do the job, not just who looks good on paper."
- **Right/Bottom - "For Candidates":**
  - "Skip the resume lottery. Prove your skills and get hired for what you can actually do."

### Section 8: Capabilities - Feature Tabs
- **Header:** "Capabilities"
- **Tab items:** AI Test Creation, Evaluation, Integrity, ATS Integration, Candidate Experience
- **Active tab content (AI Test Creation):**
  - Title: "AI Test Creation"
  - Description: "Build work-sample evaluations tailored to the role and company."
  - Detail: "Design evaluations that mirror real work in minutes. AI generates tailored questions based on the role, level, and skills that matter to your team. Supports text, audio, video, code challenges, multiple choice, and document uploads."
  - Image: capabilities_ai-test-creation.png
- **Sub-text:** "Focus on what actually matters."

### Section 9: Companies / Candidates Split
- **Layout:** Two cards/columns
- **Companies card:**
  - "Companies"
  - "Build the best team and discover hidden talent. Evaluate candidates at scale, surface key insights, and protect your team's time."
  - CTA: "Book a Demo"
- **Candidates card:**
  - "Candidates"
  - "Stop submitting resumes into a black hole. Show what you can do and get hired for your real abilities, not just your credentials."
  - CTA: "Discover Opportunities"

### Section 10: Social Proof - Logo Carousel
- **Header:** "We are building for the courageous"
- **Layout:** 3 rows of horizontally scrolling logos
- **Companies (18 total):**
  - PNG logos: Avila, Bronco, FieldGuide, Candid, StandardMetrics, Clay
  - SVG logos: HelloPatient, Ramp, Patlytics, FitLabs, Loop, Promise, Julius, Opto, Vals, Edia, Numeric, LightLabs
- **Animation:** Infinite horizontal scroll, logos duplicated 3x for seamless loop

### Section 11: Footer CTA
- **Headline:** "Choose meritocracy."
- **Sub-text:** "America's frontier is in unlocking our hidden talent."
- **CTA:** "Book a Demo"

### Section 12: Footer
- **Layout:** Multi-column grid
- **Columns:**
  - Platform: "For Candidates"
  - Company: "Manifesto", "Newsroom", "We're Hiring!"
  - Legal: "Terms & Conditions", "Privacy Policy"
  - Connect: LinkedIn (https://www.linkedin.com/company/meritfirst/), X/Twitter (https://x.com/MeritFirstUS)
- **Backed by:** 8VC logo (svg/8vc-logo.svg), Slow Ventures logo (svg/slow-ventures-logo.svg)
- **Location badge:** "Built in Texas" with Texas outline SVG (svg/texas-outline.svg)
- **Copyright:** "(c) 2026 MeritFirst, Inc. All rights reserved."

---

## 6. ASSET INVENTORY

### Images (downloaded to images/)
| File | Dimensions | Purpose |
|------|-----------|---------|
| blur-sm.png | 768x744 | Decorative blur/glow overlay in hero |
| capabilities_ai-test-creation.png | 2880x1800 | Feature screenshot for AI Test Creation tab |
| opengraph-image.png | 1200x630 | OG/social sharing image |
| favicon.ico | 256x256 | Browser favicon |
| icon-white.png | 188x188 | Logo mark (white, for dark backgrounds) |
| icon-black.png | 188x188 | Logo mark (black, for light backgrounds) |
| avila.png | 1500x844 | Company logo |
| bronco.png | 4608x1500 | Company logo |
| fieldguide-color.png | 3508x628 | Company logo |
| candid.png | 802x104 | Company logo |
| standardmetrics.png | 733x90 | Company logo |
| clay.png | 426x246 | Company logo |

### SVGs (downloaded to svg/)
| File | Purpose |
|------|---------|
| 8vc-logo.svg | Investor logo (8VC) |
| slow-ventures-logo.svg | Investor logo (Slow Ventures) |
| texas-outline.svg | Texas state outline for "Built in Texas" badge |
| hellopatient.svg | Company logo |
| ramp.svg | Company logo |
| patlytics.svg | Company logo |
| fitlabs.svg | Company logo |
| loop.svg | Company logo |
| promise.svg | Company logo |
| julius.svg | Company logo |
| opto.svg | Company logo |
| vals.svg | Company logo |
| edia.svg | Company logo |
| numeric.svg | Company logo |
| lightlabs.svg | Company logo |

---

## 7. META & SEO

```html
<html lang="en" translate="no" suppressHydrationWarning>
<title>MeritFirst | Skills-Based Hiring Assessments</title>
```
- OG Image: /opengraph-image.png (1200x630)
- Favicon: /favicon.ico (256x256 PNG)
- Dark/Light icon variants: icon-white.png, icon-black.png

---

## 8. THIRD-PARTY INTEGRATIONS

- **Analytics:** PostHog
- **Consent Management:** @c15t/nextjs
- **Video:** HLS.js (dynamic import)
- **Forms:** TypeForm (dynamic import)
- **Smooth Scroll:** Lenis

---

## 9. INTERACTIVE BEHAVIORS

### Buttons
- **Primary (CTA):** "Book a Demo", "Start Assessment" - likely solid background with --button-shadow-primary-hover on hover
- **Secondary:** "Try An Assessment", "Discover Opportunities" - likely outlined or ghost style with --button-shadow-neutral-hover on hover
- **Link underline:** `.link-underline` class creates animated underline on hover (width 0 to 100%, 0.3s transition)

### Navigation
- Responsive: likely hamburger menu on mobile (component-based, not visible in SSR)
- Links use `.link-underline` hover effect

### Assessment Flow
- 3-step diagnostic flow triggered by "Start Assessment"
- State managed in React components
- Likely uses TypeForm embed or custom form

### Theme
- Dark mode default via `class="dark"` on html element
- Theme provider with localStorage persistence
- System preference detection supported

---

## 10. KEY DESIGN PATTERNS

### Color Usage
- **Background:** Nearly black (#0a0a0a) - creates premium, serious feel
- **Surfaces:** Slightly lighter (#111, #1a1a1a) for cards/elevated elements
- **Borders:** Very subtle (#262626, #404040)
- **Text hierarchy:** White (#fff) for headings, light gray (#d4d4d4) for body, medium gray (#a3a3a3) for muted, dim gray (#737373) for tertiary
- **Accent:** Red (#dc2626) for brand emphasis, Blue (#3b82f6) for interactive elements
- **Red gradient:** #ab0003 -> #ff2e32 -> #a90008 for emphasis text

### Layout Pattern
- Full-width sections with max-width containers (1400px, 1265px, 1100px, 800px)
- overflow-x-clip on body to prevent horizontal scroll from animations
- Generous vertical spacing between sections

### Typography Pattern
- Responsive heading sizes via clamp()
- Tight letter-spacing on headings (-.02em to -.025em)
- Geist sans for all text, Geist Mono for code/monospace elements
- Antialiased rendering

---

## 11. MANIFESTO PAGE (/manifesto)

**Primary Heading:** "America's frontier is in unlocking our hidden talent"

**Key Arguments:**
1. Companies rely on outdated credential filters (Ivy League degrees, prestigious employer experience)
2. These proxies poorly predict actual capability
3. No systematic method exists to discover exceptional people outside traditional molds
4. Solution: objective assessments measuring critical thinking, problem-solving, adaptability

**Historical Reference:** Manhattan Project as example of merit-based talent identification

**Tagline:** "Choose meritocracy. America's frontier is in unlocking our hidden talent."

**Signatories:** Joe Lonsdale, Sam Lessin, and Zack Ganieany

---

## 12. LINKS & NAVIGATION MAP

- / (Homepage)
- /manifesto (Manifesto page)
- /candidates (For Candidates)
- /newsroom (Newsroom)
- /careers (We're Hiring!)
- /login (Login)
- /terms (Terms & Conditions)
- /privacy (Privacy Policy)
- /demo (Book a Demo - likely TypeForm)
- https://www.linkedin.com/company/meritfirst/ (LinkedIn)
- https://x.com/MeritFirstUS (X/Twitter)
