import puppeteer from 'puppeteer'
import fs from 'fs'

const OUTPUT = '/Users/mac/lucasammarco-react/scripts/scrape-output'
const URL = 'https://festivent.ca/'
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function scrapeAnimations() {
  console.log('🚀 Launching browser for animation capture...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  })

  const page = await browser.newPage()

  console.log('📡 Loading page...')
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

  // 1. Capture curtain/loading animation states
  console.log('🎬 Capturing curtain animation...')
  const curtainData = await page.evaluate(() => {
    const curtain = document.querySelector('.c-curtain')
    if (!curtain) return null
    const computed = window.getComputedStyle(curtain)
    return {
      classes: curtain.className,
      display: computed.display,
      opacity: computed.opacity,
      zIndex: computed.zIndex,
      transition: computed.transition,
      innerHTML: curtain.innerHTML.slice(0, 2000),
      progress: curtain.style.getPropertyValue('--progress'),
    }
  })
  fs.writeFileSync(`${OUTPUT}/curtain-data.json`, JSON.stringify(curtainData, null, 2))

  // 2. Capture hero section structure with ALL computed transforms
  console.log('🎯 Capturing hero section transforms...')
  const heroData = await page.evaluate(() => {
    const hero = document.querySelector('.c-hero')
    if (!hero) return null

    const bg = hero.querySelector('.c-hero_background')
    const bgImages = bg ? Array.from(bg.querySelectorAll('img')).map((img, i) => {
      const cs = window.getComputedStyle(img)
      const pcs = window.getComputedStyle(img.parentElement)
      return {
        index: i,
        src: img.src,
        width: cs.width,
        height: cs.height,
        position: cs.position,
        top: cs.top,
        left: cs.left,
        right: cs.right,
        bottom: cs.bottom,
        transform: cs.transform,
        transformOrigin: cs.transformOrigin,
        opacity: cs.opacity,
        filter: cs.filter,
        animation: cs.animation,
        animationName: cs.animationName,
        animationDuration: cs.animationDuration,
        zIndex: cs.zIndex,
        parentTransform: pcs.transform,
        parentPosition: pcs.position,
        parentWidth: pcs.width,
        parentHeight: pcs.height,
      }
    }) : []

    const inner = hero.querySelector('.c-hero_inner')
    const innerCs = inner ? window.getComputedStyle(inner) : null

    const overline = hero.querySelector('.c-hero_overline')
    const overlineChildren = overline ? Array.from(overline.children).map(c => ({
      tag: c.tagName,
      text: c.textContent?.trim(),
      classes: c.className,
      transform: window.getComputedStyle(c).transform,
      fontSize: window.getComputedStyle(c).fontSize,
      fontFamily: window.getComputedStyle(c).fontFamily,
    })) : []

    const title = hero.querySelector('.c-hero_title')
    const titleSvg = title?.querySelector('svg')
    const titleSvgHtml = titleSvg?.outerHTML?.slice(0, 5000)

    const partners = hero.querySelector('.c-hero_parners')
    const partnersHtml = partners?.innerHTML?.slice(0, 2000)

    const link = hero.querySelector('.c-hero_link')
    const linkCs = link ? window.getComputedStyle(link) : null

    const video = hero.querySelector('.c-hero_video')
    const videoEl = video?.querySelector('video')
    const videoCs = video ? window.getComputedStyle(video) : null

    return {
      heroCs: {
        height: window.getComputedStyle(hero).height,
        minHeight: window.getComputedStyle(hero).minHeight,
        position: window.getComputedStyle(hero).position,
        overflow: window.getComputedStyle(hero).overflow,
      },
      bgImages,
      innerCs: innerCs ? {
        display: innerCs.display,
        gridTemplateColumns: innerCs.gridTemplateColumns,
        gap: innerCs.gap,
        padding: innerCs.padding,
        alignItems: innerCs.alignItems,
        justifyItems: innerCs.justifyItems,
      } : null,
      overlineChildren,
      titleSvgHtml,
      partnersHtml,
      link: link ? {
        text: link.textContent?.trim(),
        href: link.getAttribute('href'),
        fontSize: linkCs.fontSize,
        height: linkCs.height,
        borderRadius: linkCs.borderRadius,
        border: linkCs.border,
        padding: linkCs.padding,
      } : null,
      video: video ? {
        videoSrc: videoEl?.querySelector('source')?.src || videoEl?.src,
        containerBorderRadius: videoCs.borderRadius,
        containerOverflow: videoCs.overflow,
        containerWidth: videoCs.width,
        containerHeight: videoCs.height,
        containerTransform: videoCs.transform,
        containerClipPath: videoCs.clipPath,
      } : null,
    }
  })
  fs.writeFileSync(`${OUTPUT}/hero-data.json`, JSON.stringify(heroData, null, 2))

  // 3. Capture bulge/video section
  console.log('📹 Capturing video/bulge section...')
  const bulgeData = await page.evaluate(() => {
    const bulges = document.querySelectorAll('.c-bulge')
    return Array.from(bulges).map((b, i) => {
      const cs = window.getComputedStyle(b)
      return {
        index: i,
        classes: b.className,
        borderRadius: cs.borderRadius,
        overflow: cs.overflow,
        width: cs.width,
        height: cs.height,
        transform: cs.transform,
        clipPath: cs.clipPath,
        position: cs.position,
        innerHTML: b.innerHTML.slice(0, 500),
        hasVideo: !!b.querySelector('video'),
        videoSrc: b.querySelector('video source')?.src || b.querySelector('video')?.src || null,
      }
    })
  })
  fs.writeFileSync(`${OUTPUT}/bulge-data.json`, JSON.stringify(bulgeData, null, 2))

  // 4. Capture ALL GSAP-related inline styles and data attributes
  console.log('⚡ Capturing GSAP inline styles...')
  const gsapData = await page.evaluate(() => {
    const elements = document.querySelectorAll('[style*="transform"], [style*="opacity"], [style*="clip-path"], [data-parallax-speed]')
    return Array.from(elements).slice(0, 100).map(el => {
      const cs = window.getComputedStyle(el)
      return {
        tag: el.tagName,
        classes: el.className?.toString()?.slice(0, 200),
        id: el.id,
        inlineStyle: el.getAttribute('style')?.slice(0, 500),
        parallaxSpeed: el.getAttribute('data-parallax-speed'),
        computedTransform: cs.transform,
        computedOpacity: cs.opacity,
        computedClipPath: cs.clipPath,
        willChange: cs.willChange,
      }
    })
  })
  fs.writeFileSync(`${OUTPUT}/gsap-data.json`, JSON.stringify(gsapData, null, 2))

  // 5. Take screenshots at specific scroll positions to see animation states
  console.log('📸 Taking scroll-state screenshots...')
  const scrollPositions = [0, 100, 300, 500, 800]
  for (const pos of scrollPositions) {
    await page.evaluate(y => window.scrollTo(0, y), pos)
    await sleep(600)
    await page.screenshot({ path: `${OUTPUT}/scroll-${pos}.png` })
  }

  // 6. Extract the hero SVG logo
  console.log('🎨 Extracting hero SVG logo...')
  const svgLogo = await page.evaluate(() => {
    const svg = document.querySelector('.c-hero_title svg')
    return svg ? svg.outerHTML : null
  })
  if (svgLogo) {
    fs.writeFileSync(`${OUTPUT}/hero-logo.svg`, svgLogo)
  }

  // 7. Extract all CSS custom properties
  console.log('🔧 Extracting CSS custom properties...')
  const cssVars = await page.evaluate(() => {
    const styles = window.getComputedStyle(document.documentElement)
    const vars = {}
    for (const prop of document.documentElement.style) {
      if (prop.startsWith('--')) {
        vars[prop] = styles.getPropertyValue(prop)
      }
    }
    // Also get from :root
    const sheets = document.styleSheets
    for (const sheet of sheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText === ':root' || rule.selectorText === 'html') {
            for (const prop of rule.style) {
              if (prop.startsWith('--')) {
                vars[prop] = rule.style.getPropertyValue(prop)
              }
            }
          }
        }
      } catch {}
    }
    return vars
  })
  fs.writeFileSync(`${OUTPUT}/css-vars.json`, JSON.stringify(cssVars, null, 2))

  await browser.close()
  console.log('✅ Animation scraping complete!')
}

scrapeAnimations().catch(console.error)
