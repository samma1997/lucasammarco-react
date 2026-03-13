import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const OUTPUT_DIR = '/Users/mac/lucasammarco-react/scripts/scrape-output'
const URL = 'https://festivent.ca/'

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function scrape() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log('🚀 Launching browser...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  })

  const page = await browser.newPage()

  // Intercept and save CSS/JS files
  const cssFiles = []
  const jsFiles = []
  page.on('response', async (response) => {
    const url = response.url()
    const contentType = response.headers()['content-type'] || ''
    try {
      if (contentType.includes('text/css') || url.endsWith('.css')) {
        const text = await response.text()
        cssFiles.push({ url, content: text })
      }
      if ((contentType.includes('javascript') || url.endsWith('.js')) && url.includes('festivent.ca')) {
        const text = await response.text()
        jsFiles.push({ url, content: text })
      }
    } catch (e) { /* ignore */ }
  })

  console.log('📡 Loading page...')
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

  // Wait for animations to load
  await sleep(3000)

  // Scroll through entire page to trigger all scroll-based animations
  console.log('📜 Scrolling through page to trigger all animations...')
  await autoScroll(page)
  await sleep(2000)

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(1000)

  // Screenshot full page
  console.log('📸 Taking full page screenshot...')
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'full-page.png'), fullPage: true })

  // Screenshot viewport sections
  const viewportHeight = 900
  const totalHeight = await page.evaluate(() => document.body.scrollHeight)
  const sections = Math.ceil(totalHeight / viewportHeight)

  for (let i = 0; i < Math.min(sections, 15); i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * viewportHeight)
    await sleep(500)
    await page.screenshot({ path: path.join(OUTPUT_DIR, `section-${i}.png`) })
  }

  // Extract the full rendered HTML
  console.log('🔍 Extracting rendered DOM...')
  const renderedHTML = await page.evaluate(() => document.documentElement.outerHTML)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'rendered.html'), renderedHTML)

  // Extract computed styles for all major sections
  console.log('🎨 Extracting computed styles for every section...')
  const sectionData = await page.evaluate(() => {
    const result = []

    // Get ALL elements with their computed styles
    const allElements = document.querySelectorAll('header, nav, section, footer, main, [class*="section"], [class*="hero"], [class*="banner"], [class*="card"], [class*="artist"], [class*="carousel"], [class*="gallery"]')

    allElements.forEach((el, index) => {
      const computed = window.getComputedStyle(el)
      const rect = el.getBoundingClientRect()

      result.push({
        index,
        tag: el.tagName.toLowerCase(),
        classes: el.className,
        id: el.id,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        text: el.textContent?.slice(0, 200),
        innerHTML: el.innerHTML?.slice(0, 500),
        styles: {
          display: computed.display,
          position: computed.position,
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          textTransform: computed.textTransform,
          letterSpacing: computed.letterSpacing,
          lineHeight: computed.lineHeight,
          padding: computed.padding,
          margin: computed.margin,
          border: computed.border,
          borderRadius: computed.borderRadius,
          boxShadow: computed.boxShadow,
          background: computed.background,
          backgroundImage: computed.backgroundImage,
          overflow: computed.overflow,
          zIndex: computed.zIndex,
          opacity: computed.opacity,
          transform: computed.transform,
          transition: computed.transition,
          gap: computed.gap,
          gridTemplateColumns: computed.gridTemplateColumns,
          flexDirection: computed.flexDirection,
          alignItems: computed.alignItems,
          justifyContent: computed.justifyContent,
          width: computed.width,
          height: computed.height,
          maxWidth: computed.maxWidth,
          minHeight: computed.minHeight,
          aspectRatio: computed.aspectRatio,
          backdropFilter: computed.backdropFilter,
          filter: computed.filter,
          cursor: computed.cursor,
          textDecoration: computed.textDecoration,
          whiteSpace: computed.whiteSpace,
          objectFit: computed.objectFit,
        },
        childCount: el.children.length,
        children: Array.from(el.children).slice(0, 10).map(child => ({
          tag: child.tagName.toLowerCase(),
          classes: child.className,
          text: child.textContent?.slice(0, 100),
        })),
      })
    })

    return result
  })
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sections.json'), JSON.stringify(sectionData, null, 2))

  // Extract EVERY element with class in the page body
  console.log('📋 Extracting full page structure...')
  const pageStructure = await page.evaluate(() => {
    function extractElement(el, depth = 0) {
      if (depth > 6) return null
      const computed = window.getComputedStyle(el)
      const rect = el.getBoundingClientRect()

      // Skip tiny/invisible elements
      if (rect.width < 2 && rect.height < 2) return null

      const children = []
      for (const child of el.children) {
        const extracted = extractElement(child, depth + 1)
        if (extracted) children.push(extracted)
      }

      return {
        tag: el.tagName.toLowerCase(),
        classes: el.className || undefined,
        id: el.id || undefined,
        text: el.children.length === 0 ? el.textContent?.trim()?.slice(0, 300) : undefined,
        src: el.getAttribute('src') || undefined,
        href: el.getAttribute('href') || undefined,
        alt: el.getAttribute('alt') || undefined,
        rect: { w: Math.round(rect.width), h: Math.round(rect.height), y: Math.round(rect.y) },
        bg: computed.backgroundColor !== 'rgba(0, 0, 0, 0)' ? computed.backgroundColor : undefined,
        color: depth < 3 ? computed.color : undefined,
        font: depth < 3 ? computed.fontFamily?.split(',')[0]?.trim() : undefined,
        fontSize: depth < 3 ? computed.fontSize : undefined,
        fontWeight: depth < 3 ? computed.fontWeight : undefined,
        textTransform: computed.textTransform !== 'none' ? computed.textTransform : undefined,
        display: computed.display,
        position: computed.position !== 'static' ? computed.position : undefined,
        borderRadius: computed.borderRadius !== '0px' ? computed.borderRadius : undefined,
        overflow: computed.overflow !== 'visible' ? computed.overflow : undefined,
        children: children.length > 0 ? children : undefined,
      }
    }

    const body = document.querySelector('body')
    const mainSections = []
    for (const child of body.children) {
      const extracted = extractElement(child)
      if (extracted) mainSections.push(extracted)
    }
    return mainSections
  })
  fs.writeFileSync(path.join(OUTPUT_DIR, 'structure.json'), JSON.stringify(pageStructure, null, 2))

  // Extract all animation-related CSS
  console.log('🎬 Extracting animation CSS...')
  const animationCSS = await page.evaluate(() => {
    const animations = []
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.cssText || ''
          if (text.includes('@keyframes') || text.includes('transition') ||
              text.includes('transform') || text.includes('animation') ||
              text.includes('opacity') || text.includes('will-change')) {
            animations.push(text)
          }
        }
      } catch (e) { /* cross-origin */ }
    }
    return animations
  })
  fs.writeFileSync(path.join(OUTPUT_DIR, 'animations.css'), animationCSS.join('\n\n'))

  // Extract all images with their actual rendered sizes
  console.log('🖼️  Extracting all images...')
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      renderedWidth: img.getBoundingClientRect().width,
      renderedHeight: img.getBoundingClientRect().height,
      classes: img.className,
      parentClasses: img.parentElement?.className,
    }))
  })
  fs.writeFileSync(path.join(OUTPUT_DIR, 'images.json'), JSON.stringify(images, null, 2))

  // Save CSS files
  console.log(`💾 Saving ${cssFiles.length} CSS files and ${jsFiles.length} JS files...`)
  cssFiles.forEach((file, i) => {
    fs.writeFileSync(path.join(OUTPUT_DIR, `css-${i}.css`), `/* ${file.url} */\n${file.content}`)
  })
  jsFiles.forEach((file, i) => {
    fs.writeFileSync(path.join(OUTPUT_DIR, `js-${i}.js`), `/* ${file.url} */\n${file.content}`)
  })

  // Extract all fonts used
  console.log('🔤 Extracting fonts...')
  const fonts = await page.evaluate(() => {
    const fontFaces = []
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            fontFaces.push(rule.cssText)
          }
        }
      } catch (e) { /* cross-origin */ }
    }
    return fontFaces
  })
  fs.writeFileSync(path.join(OUTPUT_DIR, 'fonts.css'), fonts.join('\n\n'))

  await browser.close()
  console.log(`\n✅ Scraping complete! Output in ${OUTPUT_DIR}`)
  console.log(`   - rendered.html (full rendered DOM)`)
  console.log(`   - structure.json (page structure with computed styles)`)
  console.log(`   - sections.json (detailed section analysis)`)
  console.log(`   - animations.css (all animation rules)`)
  console.log(`   - images.json (all images with sizes)`)
  console.log(`   - fonts.css (all @font-face rules)`)
  console.log(`   - ${cssFiles.length} CSS files, ${jsFiles.length} JS files`)
  console.log(`   - full-page.png + ${Math.min(sections, 15)} section screenshots`)
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0
      const distance = 300
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 150)
    })
  })
}

scrape().catch(console.error)
