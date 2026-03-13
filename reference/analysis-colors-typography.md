# Museum of Money - CSS Design System Analysis

Source: https://www.museumofmoney.com/
CSS: `momoney-989864.webflow.shared.c67100866.min.css` (Webflow)

---

## 1. Color Palette

### Primary Swatch Colors (Hex)

| Token | Hex | Usage |
|---|---|---|
| `--swatch--black` | `#190f0a` | Primary dark/text |
| `--swatch--white` | `#f1f0ec` | Primary light (warm off-white) |
| `--swatch--green-bg` | `#00592b` | Green theme background |
| `--swatch--green-text` | `#1ce585` | Green theme text |
| `--swatch--blue-bg` | `#9eb5ff` | Blue theme background |
| `--swatch--blue-text` | `#0023d1` | Blue theme text |
| `--swatch--red-bg` | `#ff0037` | Red accent background |
| `--swatch--yellow-bg` | `#ffec00` | Yellow accent background |
| `--swatch--pink-bg` | `#f580db` | Pink accent/sticker |
| `--swatch--orange-bg` | `#ff7c24` | Orange accent background |
| `--swatch--theme-text` | `#401011` | Theme text (dark maroon) |
| `--swatch--transparent` | `transparent` | Transparent utility |

### Opacity Variants (via `color-mix`)

- `--swatch--white-o10` / `--swatch--white-o20` - 10%/20% white
- `--swatch--black-o10` / `--swatch--black-o20` - 10%/20% black
- `--swatch--green-text-o10` / `--swatch--green-text-o20` - 10%/20% green text
- `--swatch--blue-text-o10` / `--swatch--blue-text-o20` - 10%/20% blue text
- `--swatch--theme-text-o10` / `--swatch--theme-text-020` - 10%/20% theme text

### Theme System

Six color themes are defined, each setting background, text, border, button, link, logo, sticker, and selection colors:

| Theme Class | Background | Text | Sticker | Button BG |
|---|---|---|---|---|
| `u-theme-green` (default) | `#00592b` | `#1ce585` | `#f580db` | `#f1f0ec` |
| `u-theme-blue` | `#9eb5ff` | `#0023d1` | `#ffec00` | `#f1f0ec` |
| `u-theme-pink` | `#f580db` | `#401011` | `#1ce585` | `#f1f0ec` |
| `u-theme-yellow` | `#ffec00` | `#401011` | (inherited) | `#190f0a` |
| `u-theme-light` | `#f1f0ec` | `#190f0a` | (inherited) | `#f1f0ec` |
| `u-theme-dark` | `#190f0a` | `#f1f0ec` | (inherited) | `#f1f0ec` |

### Other Colors Found in CSS

| Hex | Context |
|---|---|
| `#004923` | Dark green variant |
| `#036734` | Medium green variant |
| `#131313` | Near-black |
| `#2f2b2d` | Dark gray-brown |
| `#333` | Default body text (Webflow base) |
| `#3898ec` | Webflow default blue |
| `#0082f3` / `#2895f7` | Link blues |
| `#ea384c` | Error red |
| `#ffdede` | Error background |

---

## 2. Typography System

### Font Families

| Token | Font Stack | Usage |
|---|---|---|
| `--font--primary` | **Aileron**, Arial, sans-serif | Body text, default |
| `--font--secondary` | **Bueno**, Impact, sans-serif | Display/H1/H2 headings |
| `--font--tertiary` | **Facultyglyphic**, "Palatino Linotype", sans-serif | H3 headings (serif-like) |
| `--font--quaternary` | **Robotocondensed**, Arial, sans-serif | H4/H5/H6 headings (condensed) |
| (additional) | **Montserrat**, sans-serif | Used in cart/checkout |

### Font Sizes (Fluid with `clamp()`)

All sizes use fluid typography via `clamp()` scaling between `--screen-size--min: 20rem` (320px) and `--screen-size--max: 150rem` (2400px):

| Token | Min | Max | Approx px range |
|---|---|---|---|
| `--font-size--display` | `3.75rem` | `17.676rem` | 60px - 283px |
| `--font-size--h1` | `3.5rem` | `13.716rem` | 56px - 219px |
| `--font-size--h2` | `3rem` | `8.574rem` | 48px - 137px |
| `--font-size--h3` | `1.375rem` | `2.534rem` | 22px - 41px |
| `--font-size--h4` | `1.125rem` | `1.591rem` | 18px - 25px |
| `--font-size--h5` | `0.875rem` | `1.108rem` | 14px - 18px |
| `--font-size--h6` | `0.875rem` | `1.108rem` | 14px - 18px |
| `--font-size--text-large` | `1.125rem` | `1.358rem` | 18px - 22px |
| `--font-size--text-main` | `0.9375rem` | `1.1705rem` | 15px - 19px |
| `--font-size--text-small` | `0.75rem` | `0.983rem` | 12px - 16px |

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `--font--primary-regular` | `400` | Body text |
| `--font--primary-semibold` | `600` | Semi-bold emphasis |
| `--font--primary-bold` | `700` | Bold emphasis |
| `--font--secondary-bold` | `700` | Display/headings |
| `--font--tertiary-regular` | `400` | H3 (Facultyglyphic) |
| `--font--quaternary-medium` | `500` | H4-H6 (Roboto Condensed) |

### Line Heights

| Token | Value |
|---|---|
| `--line-height--0-8` | `0.8` (display/headings, very tight) |
| `--line-height--1-2` | `1.2` (headings) |
| `--line-height--1-4` | `1.4` (body text) |

### Letter Spacing

| Token | Value |
|---|---|
| `--letter-spacing--0em` | `0em` (display/headings) |
| `--letter-spacing--0-01em` | `0.01em` (small text) |
| `--letter-spacing--0-02em` | `0.02em` (body text default) |

### Text Transforms

- `none` (default)
- `uppercase` (display headings, H1, H2)
- `capitalize`
- `lowercase`

### Text Style Classes (Heading Hierarchy)

| Class | Font | Size | Weight | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|---|
| `.u-text-style-display` | Bueno (secondary) | display | 700 | 0.8 | 0em | uppercase |
| `.u-text-style-h1` | Bueno (secondary) | h1 | 700 | 0.8 | 0em | uppercase |
| `.u-text-style-h2` | Bueno (secondary) | h2 | 700 | 0.8 | 0em | uppercase |
| `.u-text-style-h3` | Facultyglyphic (tertiary) | h3 | 400 | 1.2 | 0em | none |
| `.u-text-style-h4` | Robotocondensed (quaternary) | h4 | 500 | 1.2 | 0em | none |
| `.u-text-style-h5` | Robotocondensed (quaternary) | h5 | 500 | 1.4 | 0.02em | none |
| `.u-text-style-main` | Aileron (primary) | text-main | 400 | 1.4 | 0.02em | none |
| `.u-text-style-small` | Aileron (primary) | text-small | 400 | 1.4 | 0.01em | none |

### Text Trim (Cap-height adjustment)

- Primary (Aileron): trim-top `.41em`, trim-bottom `.34em`
- Secondary (Bueno): trim-top `.45em`, trim-bottom `.28em`
- Tertiary (Facultyglyphic): trim-top `.39em`, trim-bottom `.39em`
- Quaternary (Roboto Condensed): trim-top `.37em`, trim-bottom `.34em`

---

## 3. Spacing System

### Element Spacing (Fluid with `clamp()`)

| Token | Min | Max | Approx px range |
|---|---|---|---|
| `--space--0-75rem` | `0.6875rem` | `0.804rem` | 11px - 13px |
| `--space--1rem` | `0.9375rem` | `1.054rem` | 15px - 17px |
| `--space--1-5rem` | `1.375rem` | `1.608rem` | 22px - 26px |
| `--space--2rem` | `1.625rem` | `2.324rem` | 26px - 37px |
| `--space--2-5rem` | `2.25rem` | `2.716rem` | 36px - 43px |
| `--space--3rem` | `2rem` | `3.858rem` | 32px - 62px |
| `--space--4rem` | `3rem` | `4.858rem` | 48px - 78px |
| `--space--6rem` | `4rem` | `7.716rem` | 64px - 123px |

### Section Spacing (Fluid)

| Token | Min | Max | Approx px range |
|---|---|---|---|
| `--section-space--none` | `0px` | `0px` | 0 |
| `--section-space--small` | `2.5rem` | `7.142rem` | 40px - 114px |
| `--section-space--main` | `3.5rem` | `10rem` | 56px - 160px |
| `--section-space--large` | `5rem` | `16.142rem` | 80px - 258px |
| `--section-space--page-top` | `9rem` | `20.142rem` | 144px - 322px |

### Site Margin

- `--site--margin`: `clamp(1rem, ..., 1.25rem)` (16px - 20px)

### Gap System

Uses the same spacing tokens via `--_gap---size`:
- `0rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `2.5rem`, `3rem`, `4rem`, `6rem`

### Most Common Fixed Spacing Values

- Margins: `auto` (93x), `0` (48x), `10px` (17x), `20px` (7x), `5px` (5x)
- Paddings: `0` (25x), `1.25rem` (11x), `1rem` (8x), `20px` (6x), `10px` (5x)

---

## 4. Responsive Breakpoints

### Webflow Standard Breakpoints

| Breakpoint | Media Query | Description |
|---|---|---|
| Desktop | Default (no query) | > 991px |
| Tablet | `@media screen and (max-width: 991px)` | 768px - 991px |
| Mobile Landscape | `@media screen and (max-width: 767px)` | 480px - 767px |
| Mobile Portrait | `@media screen and (max-width: 479px)` | < 480px |

### Additional Queries

| Query | Count | Purpose |
|---|---|---|
| `@media (hover: hover) and (pointer: fine)` | 22 | Mouse/trackpad interactions |
| `@media (hover: none) or (pointer: coarse)` | 16 | Touch device interactions |
| `@media (hover: hover)` | 3 | Generic hover capability |
| `@media (min-width: 768px)` | 1 | Tablet-up |

### Fluid Scaling Range

- `--screen-size--min: 20` (20rem = 320px)
- `--screen-size--max: 150` (150rem = 2400px)
- `--screen-size--design: 90` (90rem = 1440px design viewport)

---

## 5. Layout System

### Grid

- 24-column grid (`--site--column-count: 24`)
- Gutter: `0.75rem` (12px)
- Container max: `100vw` (`--site--width: 100`)
- Container small: `100rem` (1600px)
- Container full: `100vw`
- Column width: calculated dynamically via formula

### Key Layout Classes

- `.u-container` - Main container
- `.u-grid-above` / `.u-grid-autofit` - Grid variants
- `.u-column-full` - `grid-column: 1/-1` (spans all)
- `.u-column-indent` - `grid-column: 2/-2` (indented)
- `.u-column-custom` - `grid-column: auto/span 1`
- `.u-column-1` through `.u-column-12` - Span 1-12 columns

---

## 6. CSS Class Naming Patterns

### Prefix Conventions

| Prefix | Count | Purpose |
|---|---|---|
| `u-` | 826 | **Utility classes** (text styles, layout, spacing, colors, visibility) |
| `w-` | 584 | **Webflow system classes** (nav, slider, form, tabs, etc.) |
| `btn_` | 350 | **Button components** (main, secondary, with wrap/front/back/bg/text/icon) |
| `is-` | 212 | **State modifiers** (is-active, is-visible, is-open, etc.) |
| `form_` | 120 | **Form components** |
| `cart_` / `cg-` | 73 each | **Cart/checkout components** |
| `card_` | 68 | **Card components** (flip cards with stickers) |
| `events_` / `event_` | 54/37 | **Events section** |
| `exhibit_` | 53 | **Exhibits section** |
| `title_` | 52 | **Title components** (with stickers) |
| `tickets_` | 45 | **Ticketing section** |
| `hero_` | 35 | **Hero section** |
| `nav_` | 30 | **Navigation** |
| `footer_` | 23 | **Footer** |
| `contact_` | 23 | **Contact section** |
| `blog_` / `article_` | 30 each | **Blog/article components** |
| `shop_` / `prod_` / `product_` | 30/22/36 | **E-commerce/shop** |
| `stacked-cards_` | - | **Stacked cards interaction** |

### Component Structure Pattern

Components follow a BEM-like nesting with underscores:
```
.component_wrapper
.component_inner
.component_content
.component_item
.component_text
.component_icon
.component_bg
.component_front / .component_back  (for flip effects)
```

### Button Architecture

Two button types with complex layered structure:
- `.btn_main_wrap` > `.btn_main_inner` > `.btn_main_front` / `.btn_main_back` / `.btn_main_bg` / `.btn_main_text` / `.btn_main_icon_wrap` / `.btn_main_divider`
- `.btn_secondary_wrap` > `.btn_secondary_front` / `.btn_secondary_back` / `.btn_secondary_bg` / `.btn_secondary_text`

### Utility Class Categories

- **Text**: `.u-text-style-h1` through `.u-text-style-small`, `.u-text-wrap-default`, `.u-text-trim-off`
- **Color**: `.u-color-faded`, `.u-theme-light`, `.u-theme-dark`, `.u-theme-green`, etc.
- **Layout**: `.u-container`, `.u-grid-above`, `.u-grid-autofit`, `.u-column-*`, `.u-alignment-*`
- **Spacing**: `.u-min-height-screen`
- **Weight**: `.u-weight-semibold`, `.u-weight-bold`
