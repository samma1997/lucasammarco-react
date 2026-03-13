// ============================================================
// INLINE SCRIPT BLOCK 1
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === "undefined") return; // Hard fail if GSAP isn't loaded

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    }
  }

  function hexToRgb(hex) {
    let h = hex.trim().replace(/^#/, '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const num = parseInt(h, 16);
    return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
  }

  function initGrid(el) {
    const defaults = {
      gridBackground: "transparent",
      gridSizeDesktop: 32,
      gridSizeMobile: 12,
      gridBorderSize: 0,
      gridBorderColor: "transparent"
    };

    const gridBackground  = el.getAttribute("data-grid-background")     || defaults.gridBackground;
    const gridSizeDesktop = parseInt(el.getAttribute("data-grid-size-desktop")) || defaults.gridSizeDesktop;
    const gridSizeMobile  = parseInt(el.getAttribute("data-grid-size-mobile"))  || defaults.gridSizeMobile;
    const gridBorderSize  = parseFloat(el.getAttribute("data-grid-border-size"))|| defaults.gridBorderSize;
    const gridBorderColor = el.getAttribute("data-grid-border-color")   || defaults.gridBorderColor;

    const opacities = [0.15, 0.12, 0.10, 0.07, 0.05, 0.03];
    let gridColors = [], colorPointer = 0, trailQueue = [];

    function resolveColors() {
      let hex = getComputedStyle(document.body).getPropertyValue('--_theme---text').trim()
             || getComputedStyle(document.documentElement).getPropertyValue('--_theme---text').trim();
      if (!hex) hex = "#000";
      const [r,g,b] = hexToRgb(hex);
      gridColors = opacities.map(a => `rgba(${r},${g},${b},${a})`);
    }
    resolveColors();

    const obs = new MutationObserver(debounce(resolveColors, 100));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class','style'] });
    obs.observe(document.body,           { attributes: true, attributeFilter: ['class','style'] });

    el.style.backgroundColor = gridBackground;
    const canvas = document.createElement("canvas");
    el.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let cols, rows, squareSize, blocks, lastHovered = null;

    function setupGrid() {
      canvas.width  = el.clientWidth;
      canvas.height = el.clientHeight;
      cols       = window.innerWidth < 768 ? gridSizeMobile : gridSizeDesktop;
      squareSize = canvas.width / cols;
      rows       = Math.ceil(canvas.height / squareSize);
      blocks     = [];
      trailQueue.length = 0;
      lastHovered = null;
      colorPointer = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          blocks.push({ x: x * squareSize, y: y * squareSize, color: "#fff", alpha: 0 });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blocks.forEach(b => {
        ctx.fillStyle   = b.color;
        ctx.globalAlpha = b.alpha;
        ctx.fillRect(b.x, b.y, squareSize, squareSize);
        ctx.globalAlpha = 1;
        if (gridBorderSize > 0) {
          ctx.lineWidth   = gridBorderSize;
          ctx.strokeStyle = gridBorderColor;
          ctx.strokeRect(b.x, b.y, squareSize, squareSize);
        }
      });
      requestAnimationFrame(draw);
    }

    function fadeOut(b) {
      gsap.to(b, { alpha: 0, duration: 2, delay: 0.5 });
    }

    function supportsTouch() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 1;
    }

    if (!supportsTouch()) {
      document.addEventListener('mousemove', function onPointerMove(e) {
        const r = canvas.getBoundingClientRect();
        const mx = e.clientX, my = e.clientY;
        if (mx < r.left || mx > r.right || my < r.top || my > r.bottom) return;
        const xIdx = Math.floor((mx - r.left) / squareSize);
        const yIdx = Math.floor((my - r.top)  / squareSize);
        const idx  = yIdx * cols + xIdx;
        if (idx !== lastHovered) {
          const b = blocks[idx];
          b.color = gridColors[colorPointer];
          colorPointer = (colorPointer + 1) % gridColors.length;
          gsap.to(b, { alpha: 1, duration: 0.1, overwrite: true });
          fadeOut(b);
          trailQueue.push(b);
          if (trailQueue.length > gridColors.length) {
            const old = trailQueue.shift();
            gsap.killTweensOf(old);
            old.alpha = 0;
          }
          lastHovered = idx;
        }
      });
    }

    window.addEventListener('resize', debounce(setupGrid, 200));
    setupGrid();
    draw();
  }

  function initGrids() {
    if (prefersReducedMotion.matches) return;
    document.querySelectorAll('[data-grid]').forEach(initGrid);
  }

  prefersReducedMotion.addEventListener('change', e => {
    if (e.matches) {
      document.querySelectorAll('[data-grid] canvas').forEach(c => c.remove());
      gsap.globalTimeline.clear();
    } else {
      initGrids();
    }
  });

  initGrids();
});


// ============================================================
// INLINE SCRIPT BLOCK 2
// ============================================================
function initDetectScrollingDirection() {
  let lastScrollTop = 0;
  const threshold = 10;
  const thresholdTop = 50;

  window.addEventListener('scroll', () => {
    const nowScrollTop = window.scrollY;

    if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
      // Update Scroll Direction
      const direction = nowScrollTop > lastScrollTop ? 'down' : 'up';
      document.querySelectorAll('[data-scrolling-direction]').forEach(el => 
        el.setAttribute('data-scrolling-direction', direction)
      );

      // Update Scroll Started
      const started = nowScrollTop > thresholdTop;
      document.querySelectorAll('[data-scrolling-started]').forEach(el => 
        el.setAttribute('data-scrolling-started', started ? 'true' : 'false')
      );

      lastScrollTop = nowScrollTop;
    }
  });
}

// Initialize Detect Scrolling Direction
document.addEventListener('DOMContentLoaded', () => {
  initDetectScrollingDirection();
});


// ============================================================
// INLINE SCRIPT BLOCK 3
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav_component").forEach((element) => {
    if (element.dataset.scriptInitialized) return;
    element.dataset.scriptInitialized = "true";
    
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded');
      return;
    }
    
    // Find elements within this nav_component
    const openButtons = element.querySelectorAll('[data-menu-btn]');
    const closeIcons = element.querySelectorAll('[data-menu-close]');
    const closeTriggers = element.querySelectorAll('[data-menu-close],[data-menu-overlay]');
    const menu = element.querySelector('[data-menu-wrap]');
    const overlay = element.querySelector('[data-menu-overlay]');
    const base = element.querySelector('[data-menu-base]');
    const links = element.querySelectorAll('[data-menu-link-list]');
    
    // Check if required elements exist
    if (!menu || !overlay || !base || openButtons.length === 0) {
      console.warn('Required menu elements not found in nav_component');
      return;
    }
    
    let isActive = false;
    let tl; // timeline must be scoped per instance
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      tl = gsap.timeline({ paused: true });
      // Make sure the menu container is flex when playing
      tl.set(menu, { display: "flex" });
      tl
        .from(overlay, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "none"
        })
        .from(base, {
          scaleX: 0,
          duration: 0.8,
          ease: "elastic.out(0.75, 0.6)"
        }, "<50%")
        .from(closeIcons, {
          scale: 0,
          rotate: -270,
          duration: 0.8,
          ease: "elastic.out(0.75, 0.6)"
        }, "<+25%")
        .from(links, {
          autoAlpha: 0,
          yPercent: 20,
          duration: 0.8,
          stagger: 0.05,
          ease: "elastic.out(0.75, 0.6)"
        }, "<+25%");
    });
    
    mm.add("(prefers-reduced-motion: reduce)", () => {
      tl = gsap.timeline({ paused: true });
      tl.set(menu, { display: "flex" });
      tl
        .from(overlay, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "none"
        })
        .from(base, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "none"
        }, "<50%")
        .from(closeIcons, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "none"
        }, "<")
        .from(links, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "none"
        }, "<");
    });
    
    // OPEN: loop through all open-buttons
    openButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (!tl) return; // guard in case timeline is not set
        if (!isActive) {
          if (typeof lenis !== 'undefined') lenis.stop();
          tl.timeScale(1).play();
        } else {
          tl.timeScale(1.5).reverse();
        }
        isActive = !isActive;
      });
    });
    
    // CLOSE: all triggers
    closeTriggers.forEach(btn => {
      btn.addEventListener("click", () => {
        if (!tl || !isActive) return;
        tl.timeScale(1.5).reverse();
        isActive = false;
      });
    });
    
    // Restart Lenis once reversed fully
    const setLenisResume = () => {
      if (typeof lenis !== 'undefined') lenis.start();
    };
    
    (() => {
      const waitForTl = () => {
        if (tl) {
          tl.eventCallback("onReverseComplete", setLenisResume);
        } else {
          requestAnimationFrame(waitForTl);
        }
      };
      waitForTl();
    })();
    
    // ESC key closes the menu (scoped to this instance)
    const handleEscKey = (e) => {
      if (!tl) return;
      if (e.key === "Escape" && isActive) {
        tl.timeScale(1.5).reverse();
        isActive = false;
      }
    };
    
    // Add ESC key listener
    document.addEventListener("keydown", handleEscKey);
    
    // Store cleanup function on element for potential future cleanup
    element._menuCleanup = () => {
      document.removeEventListener("keydown", handleEscKey);
      if (tl) {
        tl.kill();
      }
      mm.kill();
    };
  });
});


// ============================================================
// INLINE SCRIPT BLOCK 4
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".notification_wrap").forEach((element) => {
    if (element.dataset.scriptInitialized) return;
    element.dataset.scriptInitialized = "true";
    
    // Initialize copy email functionality within this section
    const buttons = element.querySelectorAll('.copy_code_btn');
    if (!buttons.length) return;
    
    const copyEmail = (button) => {
      // Email to copy to clipboard is taking from the button itself, or if that's empty,
      // from a text element inside the button
      const email =
        button.getAttribute('data-copy-email') ||
        button.querySelector('[data-copy-element]').textContent.trim();
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          button.setAttribute('data-copy-button', 'copied');
          button.setAttribute('aria-label', 'Code copied to clipboard!');
        });
      }
    };
    
    const handleInteraction = (e) => {
      if (
        e.type === 'click' ||
        (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))
      ) {
        e.preventDefault();
        copyEmail(e.currentTarget);
      }
    };
    
    buttons.forEach((button) => {
      button.addEventListener('click', handleInteraction);
      button.addEventListener('keydown', handleInteraction);
      button.addEventListener('mouseleave', () => {
        // Remove 'active' attribute to reset color and text transform
        button.removeAttribute('data-copy-button');
        // Remove focus on mouseleave to clear keyboard focus styling
        button.blur();
        button.setAttribute('aria-label', 'Copy code to clipboard');
      });
      button.addEventListener('blur', () => {
        button.removeAttribute('data-copy-button');
        button.setAttribute('aria-label', 'Copy code to clipboard');
      });
    });
  });
});


// ============================================================
// INLINE SCRIPT BLOCK 5
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    // 1) start everything hidden
    gsap.set('.scaling_video_contain .pixel_overlay svg path', { opacity: 0 });

    function initFlipOnScroll() {
      const wrappers = document.querySelectorAll("[data-flip-element='wrapper']");
      const target = document.querySelector("[data-flip-element='target']");

      // Early return if elements don't exist
      if (!wrappers.length || !target) {
        console.warn('Flip elements not found');
        return;
      }

      // forward‐flicker: 
      function flickerOn() {
        const paths = document.querySelectorAll('.scaling_video_contain .pixel_overlay svg path');
        if (paths.length) {
          gsap.to(paths, {
            opacity: 1,
            duration: 0.05,
            ease: "none",
            stagger: { each: 0.02, from: "random" }
          });
        }
      }

      // reverse‐flicker:
      function flickerOff() {
        const paths = document.querySelectorAll('.scaling_video_contain .pixel_overlay svg path');
        if (paths.length) {
          gsap.to(paths, {
            opacity: 0,
            duration: 0.05,
            ease: "none",
            stagger: { each: 0.02, from: "random" }
          });
        }
      }

      let tl;

      function buildTimeline() {
        // Kill existing timeline and clear properties
        if (tl) {
          tl.kill();
          gsap.set(target, { clearProps: "all" });
        }

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrappers[0],
            start: "bottom center-=100",
            endTrigger: wrappers[wrappers.length - 1],
            end: "top center",
            scrub: 0.25,
            onLeave: flickerOn,
            onEnterBack: flickerOff
          }
        });

        wrappers.forEach((el, i) => {
          const next = wrappers[i + 1];
          if (!next) return;

          const thisCenter = el.getBoundingClientRect().top + window.pageYOffset + el.offsetHeight /
                2;
          const nextCenter = next.getBoundingClientRect().top + window.pageYOffset + next
          .offsetHeight / 2;
          const offset = nextCenter - thisCenter;

          tl.add(Flip.fit(target, next, {
            duration: offset,
            ease: "none"
          }));
        });
      }

      // Initial build
      buildTimeline();

      // Debounced resize handler
      let resizeTimer;

      function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildTimeline, 100);
      }

      window.addEventListener("resize", handleResize);

      // Return cleanup function for Slater
      return () => {
        if (tl) {
          tl.kill();
        }
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
      };
    }

    // Initialize immediately (Slater handles DOM ready state)
    const cleanup = initFlipOnScroll();

    // Export cleanup function for Slater
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = { cleanup };
    }
  });


// ============================================================
// INLINE SCRIPT BLOCK 6
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    // 1) start everything hidden
    gsap.set('.scaling_video_contain .pixel_overlay svg path', { opacity: 0 });

    function initFlipOnScroll() {
      const wrappers = document.querySelectorAll("[data-flip-element='wrapper']");
      const target = document.querySelector("[data-flip-element='target']");

      // Early return if elements don't exist
      if (!wrappers.length || !target) {
        console.warn('Flip elements not found');
        return;
      }

      // forward‐flicker: 
      function flickerOn() {
        const paths = document.querySelectorAll('.scaling_video_contain .pixel_overlay svg path');
        if (paths.length) {
          gsap.to(paths, {
            opacity: 1,
            duration: 0.05,
            ease: "none",
            stagger: { each: 0.02, from: "random" }
          });
        }
      }

      // reverse‐flicker:
      function flickerOff() {
        const paths = document.querySelectorAll('.scaling_video_contain .pixel_overlay svg path');
        if (paths.length) {
          gsap.to(paths, {
            opacity: 0,
            duration: 0.05,
            ease: "none",
            stagger: { each: 0.02, from: "random" }
          });
        }
      }

      let tl;

      function buildTimeline() {
        // Kill existing timeline and clear properties
        if (tl) {
          tl.kill();
          gsap.set(target, { clearProps: "all" });
        }

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrappers[0],
            start: "bottom center-=100",
            endTrigger: wrappers[wrappers.length - 1],
            end: "top center",
            scrub: 0.25,
            onLeave: flickerOn,
            onEnterBack: flickerOff
          }
        });

        wrappers.forEach((el, i) => {
          const next = wrappers[i + 1];
          if (!next) return;

          const thisCenter = el.getBoundingClientRect().top + window.pageYOffset + el.offsetHeight /
                2;
          const nextCenter = next.getBoundingClientRect().top + window.pageYOffset + next
          .offsetHeight / 2;
          const offset = nextCenter - thisCenter;

          tl.add(Flip.fit(target, next, {
            duration: offset,
            ease: "none"
          }));
        });
      }

      // Initial build
      buildTimeline();

      // Debounced resize handler
      let resizeTimer;

      function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildTimeline, 100);
      }

      window.addEventListener("resize", handleResize);

      // Return cleanup function for Slater
      return () => {
        if (tl) {
          tl.kill();
        }
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
      };
    }

    // Initialize immediately (Slater handles DOM ready state)
    const cleanup = initFlipOnScroll();

    // Export cleanup function for Slater
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = { cleanup };
    }
  });


// ============================================================
// INLINE SCRIPT BLOCK 7
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".ft_exhibits_wrap").forEach((element) => {
    if (element.dataset.scriptInitialized) return;
    element.dataset.scriptInitialized = "true";
    
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      return;
    }
    
    // Check if this element is the container, or find it within
    let container = element.querySelector('[data-card-stack-wrap]');
    if (!container && element.hasAttribute('data-card-stack-wrap')) {
      container = element;
    }
    
    if (!container) {
      console.warn('Card stack container not found');
      return;
    }
    
    const cardsContainer = container.querySelector('[data-card-stack-list]');
    const cards = container.querySelectorAll('[data-card-stack-card]');
    const intro = container.querySelector('[data-card-stack-intro]');
    const outro = container.querySelector('[data-card-stack-outro]');
    
    // Check if required elements exist
    if (!cardsContainer || cards.length === 0) {
      console.warn('Required card stack elements not found');
      return;
    }
    
    const distance = cardsContainer.scrollWidth - window.innerWidth;
    
    // Calculate container height to create proper scroll distance
    container.style.height = distance + window.innerHeight + 'px';
    
    // Main scroll tween with pinSpacing disabled
    const scrollTween = gsap.to(cardsContainer, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
        start: 'top top',
        end: '+=' + distance,
        anticipatePin: 1,
        pinSpacing: false,
        invalidateOnRefresh: true
      }
    });
    
    // Use matchMedia to handle motion preferences
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      // Full animations for users without motion preferences
      cards.forEach(card => {
        const values = {
          x: (Math.random() * 20 + 30) * (Math.random() < 0.5 ? 1 : -1),
          y: (Math.random() * 6 + 10) * (Math.random() < 0.5 ? 1 : -1),
          rotation: (Math.random() * 10 + 10) * (Math.random() < 0.5 ? 1 : -1)
        };
        gsap.fromTo(card, {
          rotation: values.rotation,
          xPercent: values.x,
          yPercent: values.y
        }, {
          rotation: -values.rotation,
          xPercent: -values.x,
          yPercent: -values.y,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 120%',
            end: 'right -20%',
            scrub: true
          }
        });
      });
    });
    
    gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
      cards.forEach(card => {
        gsap.set(card, {
          rotation: 0,
          xPercent: 0,
          yPercent: 0
        });
      });
    });
    
    // Intro fade out when first card starts moving
    if (cards.length > 0 && intro) {
      gsap.to(intro, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          containerAnimation: scrollTween,
          trigger: cards[0],
          start: 'left 100%',
          end: 'left 50%',
          scrub: true
        }
      });
    }
    
    // Outro fade in when last card approaches
    if (cards.length > 0 && outro) {
      gsap.set(outro, { autoAlpha: 0, visibility: 'visible' });
      gsap.fromTo(outro, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          containerAnimation: scrollTween,
          trigger: cards[cards.length - 1],
          start: 'right 80%',
          end: 'right 20%',
          scrub: true
        }
      });
    }
  });
});


// ============================================================
// INLINE SCRIPT BLOCK 8
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  // Check if GSAP and required plugins are available
  if (typeof gsap === 'undefined' || typeof Observer === 'undefined' || typeof CustomEase === 'undefined') {
    console.warn('GSAP, Observer, or CustomEase not loaded');
    return;
  }
  
  // Register GSAP plugins once globally
  gsap.registerPlugin(Observer, CustomEase);
  CustomEase.create("slideshow-wipe", "0.6, 0.08, 0.02, 0.99");
  
  // Define horizontalLoop function globally
  function horizontalLoop(items, config) {
    let timeline;
    items = gsap.utils.toArray(items);
    config = config || {};
    gsap.context(() => {
      let onChange = config.onChange,
        lastIndex = 0,
        tl = gsap.timeline({
          repeat: config.repeat,
          onUpdate: onChange && function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        spaceBefore = [],
        xPercents = [],
        curIndex = 0,
        indexIsDirty = false,
        center = config.center,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
        timeOffset = 0,
        container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] ||
        items[0].parentNode,
        totalWidth,
        getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[
          length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap
        .getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0),
        populateWidths = () => {
          let b1 = container.getBoundingClientRect(),
            b2;
          items.forEach((el, i) => {
            widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] *
              100 + gsap.getProperty(el, "xPercent"));
            b2 = el.getBoundingClientRect();
            spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
            b1 = b2;
          });
          gsap.set(items, {
            xPercent: i => xPercents[i]
          });
          totalWidth = getTotalWidth();
        },
        timeWrap,
        populateOffsets = () => {
          timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
          center && times.forEach((t, i) => {
            times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 /
              totalWidth - timeOffset);
          });
        },
        getClosest = (values, value, wrap) => {
          let i = values.length,
            closest = 1e10,
            index = 0,
            d;
          while (i--) {
            d = Math.abs(values[i] - value);
            if (d > wrap / 2) {
              d = wrap - d;
            }
            if (d < closest) {
              closest = d;
              index = i;
            }
          }
          return index;
        },
        populateTimeline = () => {
          let i, item, curX, distanceToStart, distanceToLoop;
          tl.clear();
          for (i = 0; i < length; i++) {
            item = items[i];
            curX = xPercents[i] / 100 * widths[i];
            distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
            distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
            tl.to(item, {
                xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
                duration: distanceToLoop / pixelsPerSecond
              }, 0)
              .fromTo(item, {
                  xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] *
                    100)
                }, {
                  xPercent: xPercents[i],
                  duration: (curX - distanceToLoop +
                    totalWidth - curX) / pixelsPerSecond,
                  immediateRender: false
                },
                distanceToLoop / pixelsPerSecond)
              .add("label" + i, distanceToStart / pixelsPerSecond);
            times[i] = distanceToStart / pixelsPerSecond;
          }
          timeWrap = gsap.utils.wrap(0, tl.duration());
        },
        refresh = (deep) => {
          let progress = tl.progress();
          tl.progress(0, true);
          populateWidths();
          deep && populateTimeline();
          populateOffsets();
          deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(
            progress, true);
        },
        onResize = () => refresh(true),
        proxy;
      gsap.set(items, { x: 0 });
      populateWidths();
      populateTimeline();
      populateOffsets();
      window.addEventListener("resize", onResize);
      function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length :
          length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex && index !== curIndex) {
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        if (time < 0 || time > tl.duration()) {
          vars.modifiers = { time: timeWrap };
        }
        curIndex = newIndex;
        vars.overwrite = true;
        gsap.killTweensOf(proxy);
        return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
      }
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.closestIndex = setCurrent => {
        let index = getClosest(times, tl.time(), tl.duration());
        if (setCurrent) {
          curIndex = index;
          indexIsDirty = false;
        }
        return index;
      };
      tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
      tl.next = vars => toIndex(tl.current() + 1, vars);
      tl.previous = vars => toIndex(tl.current() - 1, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true);
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      tl.closestIndex(true);
      lastIndex = curIndex;
      onChange && onChange(items[curIndex], curIndex);
      timeline = tl;
      return () => window.removeEventListener("resize", onResize);
    });
    return timeline;
  }
  
  // Define initSlideShow function globally  
  function initSlideShow(el) {
    // Save all elements in an object for easy reference
    const ui = {
      el,
      slides: Array.from(el.querySelectorAll('[data-slideshow="slide"]')),
      inner: Array.from(el.querySelectorAll('[data-slideshow="parallax"]')),
      thumbs: Array.from(el.querySelectorAll('[data-slideshow="thumb"]'))
    };
    let current = 0;
    const length = ui.slides.length;
    let animating = false;
    let observer;
    let animationDuration = 0.9;
    let thumbsLoop;
    let activeThumb;
    let syncingThumbs = false;
    
    if (ui.slides.length === 0) {
      return;
    }
    
    // Set data-index attributes
    ui.slides.forEach((slide, index) => {
      slide.setAttribute('data-index', index);
    });
    ui.thumbs.forEach((thumb, index) => {
      thumb.setAttribute('data-index', index);
    });
    // Set initial current states
    ui.slides[current].classList.add('is--current');
    if (ui.thumbs[current]) {
      ui.thumbs[current].classList.add('is--current');
      activeThumb = ui.thumbs[current];
    }
    
    // Initialize infinite thumbnail carousel with centering
    if (ui.thumbs.length > 0) {
      thumbsLoop = horizontalLoop(ui.thumbs, {
        paused: true,
        center: true,
        speed: 0.5,
        onChange: (element, index) => {
          if (activeThumb) activeThumb.classList.remove('is--current');
          element.classList.add('is--current');
          activeThumb = element;
          if (!syncingThumbs && !animating) {
            const thumbIndex = parseInt(element.getAttribute('data-index'));
            if (thumbIndex !== current) {
              syncSlideToThumb(thumbIndex);
            }
          }
        }
      });
      thumbsLoop.toIndex(current, { duration: 0 });
    }
    function syncSlideToThumb(thumbIndex) {
      const direction = thumbIndex > current ? 1 : -1;
      navigate(direction, thumbIndex);
    }
    function navigate(direction, targetIndex = null) {
      if (animating) return;
      animating = true;
      if (observer) observer.disable();
      const previous = current;
      current =
        targetIndex !== null && targetIndex !== undefined ?
        targetIndex :
        direction === 1 ?
        current < length - 1 ?
        current + 1 :
        0 :
        current > 0 ?
        current - 1 :
        length - 1;
      const currentSlide = ui.slides[previous];
      const currentInner = ui.inner[previous];
      const upcomingSlide = ui.slides[current];
      const upcomingInner = ui.inner[current];
      gsap.timeline({
          defaults: {
            duration: animationDuration,
            ease: 'slideshow-wipe'
          },
          onStart: function () {
            upcomingSlide.classList.add('is--current');
            if (thumbsLoop) {
              syncingThumbs = true;
              thumbsLoop.toIndex(current, {
                duration: 0.6,
                ease: "power2.out"
              });
            }
          },
          onComplete: function () {
            currentSlide.classList.remove('is--current');
            animating = false;
            syncingThumbs = false;
            setTimeout(() => {
              if (observer) observer.enable();
            }, 100);
          }
        })
        .to(currentSlide, { xPercent: -direction * 100 }, 0)
        .to(currentInner, { xPercent: direction * 50 }, 0)
        .fromTo(upcomingSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
        .fromTo(upcomingInner, { xPercent: -direction * 50 }, { xPercent: 0 }, 0);
    }
    function onClick(event) {
      const targetIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
      if (targetIndex === current || animating) return;
      const direction = targetIndex > current ? 1 : -1;
      navigate(direction, targetIndex);
    }
    // Add click listeners to thumbnails
    ui.thumbs.forEach(thumb => {
      thumb.addEventListener('click', onClick);
    });
    // Create observer for touch/wheel interactions
    if (ui.el) {
      observer = Observer.create({
        target: ui.el,
        type: 'touch,pointer',
        onLeft: () => { if (!animating) navigate(1); },
        onRight: () => { if (!animating) navigate(-1); },
        onWheel: (event) => {
          if (animating) return;
          if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
            if (event.deltaX > 50) {
              navigate(1);
            } else if (event.deltaX < -50) {
              navigate(-1);
            }
          }
        },
        wheelSpeed: -1,
        tolerance: 10
      });
    }
    
    return {
      destroy: function () {
        if (observer) observer.kill();
        if (thumbsLoop) thumbsLoop.kill();
        ui.thumbs.forEach(thumb => {
          thumb.removeEventListener('click', onClick);
        });
      }
    };
  }
  
  // Now initialize for each story_wrap
  document.querySelectorAll(".story_wrap").forEach((element) => {
    if (element.dataset.scriptInitialized) return;
    element.dataset.scriptInitialized = "true";
    
    const slideshowWraps = element.querySelectorAll('[data-slideshow="wrap"]');
    slideshowWraps.forEach(wrap => initSlideShow(wrap));
  });
});


// ============================================================
// INLINE SCRIPT BLOCK 9
// ============================================================
// Check if GSAP is available
if (typeof gsap === 'undefined') {
  console.error('GSAP is not loaded. Please include GSAP library before this script.');
} else {
  // Register GSAP plugins once (outside the forEach loop)
  gsap.registerPlugin(Draggable, Physics2DPlugin);
}

function initializeGames() {
  document.querySelectorAll("[data-game-wrap]").forEach((gameRoot) => {
    if (gameRoot.dataset.scriptInitialized) return;
    gameRoot.dataset.scriptInitialized = "true";
    
    // Initialize the game for this specific element
    initGameForElement(gameRoot);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGames);
} else {
  initializeGames();
}

function initGameForElement(root) {
  // —— Element refs via data-attributes with null checks (scoped to this root) ——
  if (!root) {
    console.error('Game wrap element not found');
    return;
  }
  
  const intro = root.querySelector('[data-game-intro]');
  const startBtn = intro?.querySelector('[data-game-start]');
  const overlay = root.querySelector('[data-game-countdown-wrap]');
  const countdown = overlay?.querySelector('[data-game-countdown]');
  const hud = root.querySelector('[data-game-hud]');
  const area = root.querySelector('[data-game-area]');
  const piggyWrap = root.querySelector('[data-game-piggy-wrap]');
  const endModal = root.querySelector('[data-game-modal]');
  const finalEl = endModal?.querySelector('[data-game-final-score]');
  const retryBtn = endModal?.querySelector('[data-game-retry]');
  const scoreEl = hud?.querySelector('[data-game-score]');
  const timeEl = hud?.querySelector('[data-game-time]');
  
  // Check for required elements
  const requiredElements = [intro, startBtn, overlay, countdown, hud, area, piggyWrap, endModal,
    finalEl, retryBtn, scoreEl, timeEl
  ];
  const missingElements = requiredElements.filter(el => !el);
  if (missingElements.length > 0) {
    console.error('Missing required game elements:', missingElements);
    return;
  }
  
  // —— State & assets ——
  let score = 0;
  let timeLeft = 30;
  let spawnInt, collInt, timerInt, difficultyInt;
  let lastX = 0;
  let threshold = 10;
  let dragInst = null;
  let gameActive = false;
  let piggyResetTimeout = null;
  
  // ✨ NEW: Progressive difficulty variables
  let currentSpawnRate = 800; // Start slower (800ms between spawns)
  let currentFallSpeed = 1.0; // Speed multiplier for falling (1.0 = normal)
  const maxSpawnRate = 200; // Fastest spawn rate (200ms between spawns)
  const maxFallSpeed = 2.5; // Maximum fall speed multiplier
  
  // Find piggy image element and store original src
  const piggyImg = piggyWrap.querySelector('img');
  const originalPiggySrc = piggyImg ? piggyImg.src : null;
  
  // TODO: Replace this URL with your actual happy/excited piggy image
  const happyPiggySrc =
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/686798bedff796666b730825_Piggy_alt.svg';
  
  // TODO: Replace this URL with your actual moving piggy image
  const movingPiggySrc =
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/686be7847339dde89347d7b3_Piggy_walking.svg';
  
  // Track piggy state for proper image management
  let piggyState = 'default'; // 'default', 'moving', 'happy'
  
  const coinImgs = {
    1: 'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/6866e01b2ca0b50d70f77b20_coin-1.svg',
    5: 'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/6866e01b42c6e69fc34a6ea9_coin-5.svg',
    10: 'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/6866e01b84a30e2e4a77356e_coin-10.svg',
    25: 'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/6866e01bc5b82dd8cf229ef9_coin-25.svg'
  };
  
  // Confetti colors for each coin value
  const confettiColors = {
    1: { hue: 48, sat: 25, baseLight: 94 }, // #F1F0EC - light beige
    5: { hue: 25, sat: 100, baseLight: 58 }, // #FF7C24 - orange
    10: { hue: 56, sat: 100, baseLight: 50 }, // #FFEC00 - yellow
    25: { hue: 299, sat: 89, baseLight: 73 } // #F580DB - pink
  };
  
  const coinSndURL = 'https://cdn.jsdelivr.net/gh/madebykin/momoney/ka-ching.mp3';
  
  // —— Preload & decode coin sound with Web Audio ——
  let audioCtx = null;
  let coinBuffer = null;
  let audioReady = false;
  
  function initAudio() {
    try {
      audioCtx = new(window.AudioContext || window.webkitAudioContext)();
      fetch(coinSndURL)
        .then(res => res.arrayBuffer())
        .then(buf => audioCtx.decodeAudioData(buf))
        .then(decoded => {
          coinBuffer = decoded;
          audioReady = true;
        })
        .catch(err => console.error('Audio decode failed:', err));
    } catch (err) {
      console.warn('Web Audio API not supported:', err);
    }
  }
  
  // —— Utility functions ——
  function clearAllIntervals() {
    if (spawnInt) clearInterval(spawnInt);
    if (collInt) clearInterval(collInt);
    if (timerInt) clearInterval(timerInt);
    if (difficultyInt) clearInterval(difficultyInt);
    spawnInt = collInt = timerInt = difficultyInt = null;
  }
  
  // ✨ NEW: Calculate difficulty progression
  function updateDifficulty() {
    if (!gameActive) return;
    
    // Calculate how much time has passed (0 to 1, where 1 = full game time)
    const timeProgress = (30 - timeLeft) / 30;
    
    // Exponential progression for more dramatic difficulty increase
    const difficultyFactor = Math.pow(timeProgress, 1.5);
    
    // Update spawn rate (faster spawning)
    const newSpawnRate = currentSpawnRate - (currentSpawnRate - maxSpawnRate) * difficultyFactor;
    
    // Update fall speed (faster falling)
    currentFallSpeed = 1.0 + (maxFallSpeed - 1.0) * difficultyFactor;
    
    // Only update spawn interval if the rate changed significantly
    if (Math.abs(newSpawnRate - currentSpawnRate) > 50) {
      currentSpawnRate = newSpawnRate;
      // Restart spawn interval with new rate
      if (spawnInt) {
        clearInterval(spawnInt);
        spawnInt = setInterval(spawnCoin, currentSpawnRate);
      }
    }
  }
  
  // —— Change piggy image based on state ——
  function setPiggyImage(state) {
    if (!piggyImg) return;
    piggyState = state;
    switch (state) {
    case 'moving':
      piggyImg.src = movingPiggySrc;
      break;
    case 'happy':
      piggyImg.src = happyPiggySrc;
      break;
    case 'default':
    default:
      if (originalPiggySrc) {
        piggyImg.src = originalPiggySrc;
      }
      break;
    }
  }
  
  // —— Change piggy image temporarily for collision ——
  function changePiggyImage() {
    if (!piggyImg || !originalPiggySrc) return;
    
    // Clear any existing timeout
    if (piggyResetTimeout) {
      clearTimeout(piggyResetTimeout);
    }
    
    // Change to happy piggy
    setPiggyImage('happy');
    
    // Reset back to appropriate state after 1 second
    piggyResetTimeout = setTimeout(() => {
      // If still dragging, go back to moving, otherwise default
      const appropriateState = dragInst && dragInst.isDragging ? 'moving' : 'default';
      setPiggyImage(appropriateState);
      piggyResetTimeout = null;
    }, 300);
  }
  
  // —— Make piggy draggable & flip wrapper only ——
  function initDraggable() {
    if (dragInst) {
      dragInst.kill();
    }
    
    dragInst = Draggable.create(piggyWrap, {
      type: 'x',
      bounds: area,
      inertia: true,
      onPress() {
        lastX = this.x;
        // Enable audio on first interaction
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        // Change to moving image when drag starts
        if (piggyState !== 'happy') { // Don't override happy state
          setPiggyImage('moving');
        }
      },
      onDrag() {
        const dx = this.x - lastX;
        // FIXED: Reversed logic since piggy faces left by default
        if (dx > threshold) {
          piggyWrap.classList.add('is-flipped'); // moving right flips to face right
        } else if (dx < -threshold) {
          piggyWrap.classList.remove('is-flipped'); // moving left faces left (default)
        }
        lastX = this.x;
      },
      onRelease() {
        // Return to default image when drag ends (unless in happy state)
        if (piggyState !== 'happy') {
          setPiggyImage('default');
        }
      }
    })[0];
  }
  
  // ✨ UPDATED: Spawn a coin from the top with dynamic speed
  function spawnCoin() {
    if (!gameActive) return;
    
    const vals = Object.keys(coinImgs).map(Number);
    const val = vals[Math.floor(Math.random() * vals.length)];
    
    const c = document.createElement('img');
    c.className = 'coin';
    c.src = coinImgs[val];
    c.dataset.value = val;
    c.alt = `${val} coin`;
    area.appendChild(c);
    
    const w = area.clientWidth;
    const h = area.clientHeight;
    
    // Set initial position
    gsap.set(c, {
      x: Math.random() * (w - 96),
      y: 0,
      opacity: 1,
      rotation: 0
    });
    
    // ✨ UPDATED: Dynamic fall duration based on current difficulty
    const baseDuration = 2 + Math.random() * 2; // 2-4 seconds base
    const adjustedDuration = baseDuration / currentFallSpeed; // Faster as game progresses
    
    // Animate falling with continuous rotation
    gsap.to(c, {
      duration: adjustedDuration,
      y: h + 50,
      rotation: 360 + (Math.random() * 360), // 1-2 full rotations
      ease: 'none',
      onComplete: () => {
        if (c.parentNode) c.remove();
      }
    });
  }
  
  // —— Handle catch: play sound + confetti ——
  function handleCatch(cx, cy, coinValue) {
    // ▶ Play "ka-ching" with reduced volume via Web Audio
    if (audioReady && coinBuffer && audioCtx) {
      try {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const src = audioCtx.createBufferSource();
        const gainNode = audioCtx.createGain();
        src.buffer = coinBuffer;
        gainNode.gain.value = 0.3; // Reduce volume to 30% of original
        src.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        src.start(0);
      } catch (err) {
        console.warn('Audio playback failed:', err);
      }
    }
    
    // 🎉 Confetti squares with coin-specific colors
    const colorConfig = confettiColors[coinValue];
    for (let i = 0; i < 15; i++) {
      const sq = document.createElement('div');
      sq.className = 'confetti';
      area.appendChild(sq);
      
      // Create tints by varying lightness
      const lightVariation = Math.random() * 30 - 15; // ±15% variation
      const light = Math.max(10, Math.min(95, colorConfig.baseLight + lightVariation));
      const color = `hsl(${colorConfig.hue}, ${colorConfig.sat}%, ${light}%)`;
      
      gsap.set(sq, {
        x: cx,
        y: cy,
        background: color,
      });
      
      gsap.to(sq, {
        physics2D: {
          velocity: 200 + Math.random() * 200,
          angle: Math.random() * 360,
          gravity: 500
        },
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          if (sq.parentNode) sq.remove();
        }
      });
    }
  }
  
  // —— Collision detection piggy ↔ coins ——
  function checkCollision() {
    if (!gameActive) return;
    
    area.querySelectorAll('.coin').forEach(c => {
      try {
        const r1 = c.getBoundingClientRect();
        const r2 = piggyWrap.getBoundingClientRect();
        
        if (
          r1.right > r2.left &&
          r1.left < r2.right &&
          r1.bottom > r2.top &&
          r1.top < r2.bottom
        ) {
          const v = parseInt(c.dataset.value, 10);
          const cx = r2.left + r2.width / 2;
          const cy = r2.top - 5; // top-center of piggy
          
          c.remove();
          score += v;
          scoreEl.textContent = score;
          
          // Change piggy image on collision
          changePiggyImage();
          handleCatch(cx, cy, v); // Pass coin value for confetti colors
        }
      } catch (err) {
        console.warn('Collision detection error:', err);
      }
    });
  }
  
  // ✨ NEW: Start countdown sequence (extracted to be reusable)
  function startCountdownSequence() {
    // Clean up any existing game state
    gameActive = false;
    clearAllIntervals();
    
    // ✨ Reset score and time immediately (before fade out)
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = 0;
    timeEl.textContent = 30;
    
    // Clear piggy image timeout
    if (piggyResetTimeout) {
      clearTimeout(piggyResetTimeout);
      piggyResetTimeout = null;
    }
    
    // Reset piggy image to original
    if (piggyImg && originalPiggySrc) {
      setPiggyImage('default');
    }
    
    if (dragInst) {
      dragInst.kill();
      dragInst = null;
    }
    
    // Clear any remaining coins
    area.querySelectorAll('.coin').forEach(c => c.remove());
    
    // Hide intro and end modal if visible
    intro.style.visibility = 'hidden';
    endModal.classList.add('hidden');
    endModal.style.visibility = 'hidden';
    endModal.style.opacity = 0;
    
    // ✨ First fade out piggy and HUD if they're visible
    const elementsToFadeOut = [piggyWrap, hud].filter(el =>
      el.style.visibility !== 'hidden' && el.style.opacity !== '0'
    );
    
    if (elementsToFadeOut.length > 0) {
      // Fade out piggy and HUD first
      gsap.to(elementsToFadeOut, {
        duration: 0.5,
        opacity: 0,
        onComplete: showCountdown
      });
    } else {
      // No elements to fade out, go straight to countdown
      showCountdown();
    }
    
    function showCountdown() {
      // Show countdown overlay
      overlay.classList.remove('hidden');
      overlay.style.visibility = 'visible';
      gsap.to(overlay, { duration: 0.5, opacity: 1 });
      
      // Animate 3→2→1
      gsap.fromTo(countdown, { textContent: 3 }, {
        duration: 3,
        textContent: 0,
        snap: { textContent: 1 },
        ease: 'none',
        onUpdate() {
          const current = Math.ceil(this.targets()[0].textContent);
          countdown.textContent = current > 0 ? current : 'GO!';
        },
        onComplete() {
          overlay.style.visibility = 'hidden';
          
          // Reveal HUD, game area, and piggy
          [hud, area, piggyWrap].forEach(el => {
            el.classList.remove('hidden');
            el.style.visibility = 'visible';
            gsap.to(el, { duration: 0.75, opacity: 1 });
          });
          
          // Add small delay before starting
          setTimeout(startGame, 200);
        }
      });
    }
  }
  
  // —— Intro → Countdown → Reveal → Start ——
  function startSeq() {
    gsap.to(intro, {
      duration: 0.75,
      scale: 0.5,
      opacity: 0,
      onComplete() {
        startCountdownSequence();
      }
    });
  }
  
  // ✨ UPDATED: Game loops with progressive difficulty
  function startGame() {
    // Clear any existing intervals
    clearAllIntervals();
    
    // Reset game state (score and time already reset in startCountdownSequence)
    gameActive = true;
    
    // ✨ Reset difficulty variables
    currentSpawnRate = 800; // Start slower
    currentFallSpeed = 1.0; // Normal speed
    
    // Reset piggy direction only (keep current position)
    piggyWrap.classList.remove('is-flipped'); // Start facing left (default)
    
    // Initialize draggable
    initDraggable();
    
    // Start game loops
    spawnInt = setInterval(spawnCoin, currentSpawnRate);
    collInt = setInterval(checkCollision, 16);
    
    // ✨ NEW: Difficulty progression every second
    difficultyInt = setInterval(updateDifficulty, 1000);
    
    timerInt = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }
  
  function endGame() {
    gameActive = false;
    clearAllIntervals();
    
    // Clear piggy image timeout
    if (piggyResetTimeout) {
      clearTimeout(piggyResetTimeout);
      piggyResetTimeout = null;
    }
    
    // Reset piggy image to original
    if (piggyImg && originalPiggySrc) {
      setPiggyImage('default');
    }
    
    if (dragInst) {
      dragInst.kill();
      dragInst = null;
    }
    
    area.querySelectorAll('.coin').forEach(c => c.remove());
    finalEl.textContent = score;
    
    endModal.classList.remove('hidden');
    endModal.style.visibility = 'visible';
    gsap.to(endModal, { duration: 0.75, opacity: 1 });
  }
  
  function resetGame() {
    gameActive = false;
    clearAllIntervals();
    
    // Clear piggy image timeout
    if (piggyResetTimeout) {
      clearTimeout(piggyResetTimeout);
      piggyResetTimeout = null;
    }
    
    // Reset piggy image to original
    if (piggyImg && originalPiggySrc) {
      setPiggyImage('default');
    }
    
    if (dragInst) {
      dragInst.kill();
      dragInst = null;
    }
    
    // Reset intro
    gsap.set(intro, { clearProps: 'all', scale: 1, opacity: 1 });
    intro.style.visibility = 'visible';
    
    // Hide HUD, game area, modal
    [hud, area, endModal].forEach(el => {
      el.classList.add('hidden');
      el.style.visibility = 'hidden';
      el.style.opacity = 0;
    });
    
    // Reset piggy direction only (keep position for smooth transition)
    piggyWrap.classList.remove('is-flipped');
  }
  
  // —— Button hooks ——
  startBtn.addEventListener('click', startSeq);
  retryBtn.addEventListener('click', () => {
    // Go directly to countdown instead of intro
    startCountdownSequence();
  });
  
  // Initialize audio
  initAudio();
}


// ============================================================
// INLINE SCRIPT BLOCK 10
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".marquee_cta_wrap").forEach((element) => {
    if (element.dataset.scriptInitialized) return;
    element.dataset.scriptInitialized = "true";
    
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded');
      return;
    }
    
    // Slater Marquee Scroll Direction Script
    const marquees = element.querySelectorAll('[data-marquee-scroll-direction-target]');
    marquees.forEach((marquee) => {
      // Query marquee elements
      const marqueeContent = marquee.querySelector('[data-marquee-collection-target]');
      const marqueeScroll = marquee.querySelector('[data-marquee-scroll-target]');
      if (!marqueeContent || !marqueeScroll) return;
      
      // Get data attributes
      const {
        marqueeSpeed: speed,
        marqueeDirection: direction,
        marqueeDuplicate: duplicate,
        marqueeScrollSpeed: scrollSpeed
      } = marquee.dataset;
      
      // Convert data attributes to usable types
      const marqueeSpeedAttr = parseFloat(speed) || 1;
      const marqueeDirectionAttr = direction === 'right' ? 1 : -1;
      const duplicateAmount = parseInt(duplicate || 0);
      const scrollSpeedAttr = parseFloat(scrollSpeed) || 0;
      
      // Responsive speed multiplier
      const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
      let marqueeSpeed = marqueeSpeedAttr * (marqueeContent.offsetWidth / window.innerWidth) *
        speedMultiplier;
      
      // Precompute styles for the scroll container
      marqueeScroll.style.marginLeft = `${scrollSpeedAttr * -1}%`;
      marqueeScroll.style.width = `${(scrollSpeedAttr * 2) + 100}%`;
      
      // Duplicate marquee content
      if (duplicateAmount > 0) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < duplicateAmount; i++) {
          fragment.appendChild(marqueeContent.cloneNode(true));
        }
        marqueeScroll.appendChild(fragment);
      }
      
      // GSAP animation for marquee content
      const marqueeItems = marquee.querySelectorAll('[data-marquee-collection-target]');
      if (marqueeItems.length === 0) return;
      
      const animation = gsap.to(marqueeItems, {
        xPercent: -100,
        repeat: -1,
        duration: marqueeSpeed,
        ease: 'linear'
      }).totalProgress(0.5);
      
      // Initialize marquee in the correct direction
      gsap.set(marqueeItems, {
        xPercent: marqueeDirectionAttr === 1 ? 100 : -100
      });
      
      animation.timeScale(marqueeDirectionAttr);
      animation.play();
      
      // Set initial marquee status
      marquee.setAttribute('data-marquee-status', 'normal');
      
      // ScrollTrigger logic (only if ScrollTrigger is available)
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: marquee,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const isInverted = self.direction === 1;
            const currentDirection = isInverted ? -marqueeDirectionAttr :
              marqueeDirectionAttr;
            animation.timeScale(currentDirection);
            marquee.setAttribute('data-marquee-status', isInverted ? 'normal' : 'inverted');
          }
        });
        
        // Extra speed effect on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: marquee,
            start: '0% 100%',
            end: '100% 0%',
            scrub: 0
          }
        });
        
        const scrollStart = marqueeDirectionAttr === -1 ? scrollSpeedAttr : -scrollSpeedAttr;
        const scrollEnd = -scrollStart;
        
        tl.fromTo(
          marqueeScroll, { x: `${scrollStart}vw` }, { x: `${scrollEnd}vw`, ease: 'none' }
        );
      }
    });
  });
});


// ============================================================
// INLINE SCRIPT BLOCK 11
// ============================================================
function initFalling2DMatterJS() {
  const canvas = document.querySelector("#canvas-target");
  // Check if canvas is on page
  if (!canvas) {
    return;
  }
  const canvasWidth = canvas.clientWidth + 2;
  const canvasHeight = canvas.clientHeight + 2;
  const canvasWallDepth = canvasWidth / 4;
  const smileyAmount = 15; // Amount of objects added to the canvas
  const smileySize = canvasWidth / 9; // Size of objects
  const smileySizeTexture = 256; // Size of object texture in pixels
  const smileySizeScale = smileySize / smileySizeTexture;
  const smileyRestitution = 0.75; // Bounciness
  const worldGravity = 2; // Gravity
  // Modules
  let { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;
  // Create an engine
  let engine = Engine.create();
  engine.world.gravity.y = worldGravity;
  
  // Create a renderer
  currentRender = Render.create({
    element: canvas,
    engine: engine,
    options: {
      background: "transparent",
      wireframes: false,
      width: canvasWidth,
      height: canvasHeight,
      pixelRatio: 2,
      border: "none",
    }
  });
  // Store references globally for cleanup
  currentEngine = engine;
  // Generate a random number between min (inclusive) and max (exclusive)
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  let min = smileySize / 2; // min value
  let max = canvasWidth - (smileySize / 2); // max value
  // Textures
  let textureArray = [
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/68500b015e489278a1f453e8_6660302437fad51a15047774144cb0eb_Coin-1.svg',
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/68500b01d5b32e70dba1c344_c120bb012f9e846b6e19d89c22ece11d_Coin-2.svg',
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/68500b012e8d4edeb4ddf056_dff61cf24b235c84e776e3d634c93644_Coin-3.svg',
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/68500b0189f1de7b422274fe_e4ed11d1f4c46ea54339301f139ea046_Coin-4.svg',
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/68500b01c890b45085fa31f1_69ed5c45f0a9b5eb1d84d9ca06d31ba0_Coin-5.svg',
    'https://cdn.prod.website-files.com/684433cbdb896cfecac10c42/68500b01a0e5270554093e49_d6de64f5633563d0c54f3129b0f41f06_Coin-6.svg'
  ];
  
  // Function to loop trough all textures
  let textureIndex = 0;
  function getNextTexture() {
    const texture = textureArray[textureIndex];
    textureIndex = (textureIndex + 1) % textureArray.length;
    return texture;
  }
  // Function to get a random texture
  function getRandomTexture() {
    const randomIndex = Math.floor(Math.random() * textureArray.length);
    return textureArray[randomIndex];
  }
  // Create smiley
  const smileyCreate = () => {
    let smiley = Bodies.rectangle(getRandomNumber(min, max), smileySize, smileySize,
      smileySize, {
        chamfer: { 
          radius: smileySize / 2
        },
        restitution: smileyRestitution,
        render: {
          sprite: {
            texture: getNextTexture(), // Replace with "getRandomTexture()" to get random textures
            xScale: smileySizeScale,
            yScale: smileySizeScale
          }
        }
      });
    Composite.add(engine.world, smiley);
  };
  // Create a box with rectangle(x, y, width, height)
  let boxTop = Bodies.rectangle(canvasWidth / 2 + (canvasWallDepth * 2), canvasHeight +
    canvasWallDepth, canvasWidth + (canvasWallDepth * 4), (canvasWallDepth * 2), {
      isStatic: true
    });
  let boxLeft = Bodies.rectangle((canvasWallDepth * -1), canvasHeight / 2, (canvasWallDepth * 2),
    canvasHeight, {
      isStatic: true
    });
  let boxRight = Bodies.rectangle(canvasWidth + canvasWallDepth, canvasHeight / 2, (
    canvasWallDepth * 2), canvasHeight, {
    isStatic: true
  });
  let boxBottom = Bodies.rectangle(canvasWidth / 2 + (canvasWallDepth * 2), (canvasWallDepth * -1),
    canvasWidth + (canvasWallDepth * 4), (canvasWallDepth * 2), {
      isStatic: true
    });
  // Add all of the bodies to the world
  Composite.add(engine.world, [boxTop, boxLeft, boxRight, boxBottom]);
  // Run the renderer
  Render.run(currentRender);
  // Create runner
  currentRunner = Runner.create();
  // Run the engine
  Matter.Runner.run(currentRunner, engine);
  // Create mouse
  let mouse = Mouse.create(currentRender.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });
  Composite.add(engine.world, mouseConstraint);
  // Custom Function: 
  // To run the function X amount of times
  function repeatedFunction(count, maxCount) {
    if (count < maxCount) {
      smileyCreate();
      setTimeout(() => {
        repeatedFunction(count + 1, maxCount);
      }, 100); // Delay in milliseconds
    }
  }
  // Return the function to trigger smiley creation
  return () => {
    repeatedFunction(0, 15);
  };
}

// Global variables to track the current setup
let currentEngine = null;
let currentRender = null;
let currentRunner = null;
let currentScrollTrigger = null;
// Mobile resize detection variables
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Function to clean up existing Matter.js setup
function cleanupMatterJS() {
  if (currentEngine) {
    // Stop the runner
    if (currentRunner) {
      Matter.Runner.stop(currentRunner);
      currentRunner = null;
    }
    
    // Stop the render
    if (currentRender) {
      Matter.Render.stop(currentRender);
      // Remove the canvas element
      if (currentRender.canvas && currentRender.canvas.parentNode) {
        currentRender.canvas.parentNode.removeChild(currentRender.canvas);
      }
      currentRender = null;
    }
    
    // Clear the world
    Matter.World.clear(currentEngine.world);
    Matter.Engine.clear(currentEngine);
    currentEngine = null;
  }
  
  // Kill existing ScrollTrigger
  if (currentScrollTrigger) {
    currentScrollTrigger.kill();
    currentScrollTrigger = null;
  }
}

// Function to determine if resize should trigger refresh
function shouldRefreshOnResize() {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  
  if (isMobile) {
    // On mobile, only refresh if width changes significantly (orientation change)
    // or if height changes by more than 100px (keyboard show/hide)
    const widthChanged = Math.abs(currentWidth - lastWidth) > 50;
    const significantHeightChange = Math.abs(currentHeight - lastHeight) > 100;
    
    // Update stored dimensions
    lastWidth = currentWidth;
    lastHeight = currentHeight;
    
    return widthChanged || significantHeightChange;
  } else {
    // On desktop, refresh on any significant size change
    const widthChanged = Math.abs(currentWidth - lastWidth) > 20;
    const heightChanged = Math.abs(currentHeight - lastHeight) > 20;
    
    // Update stored dimensions
    lastWidth = currentWidth;
    lastHeight = currentHeight;
    
    return widthChanged || heightChanged;
  }
}

// Function to setup Matter.js and ScrollTrigger
function setupMatterJSWithScrollTrigger() {
  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP and ScrollTrigger must be loaded before this script');
    return;
  }
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Only run the animation if user doesn't have reduced motion enabled
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    // Clean up any existing setup
    cleanupMatterJS();
    
    // Initialize the Matter.js setup and get the trigger function
    const triggerSmileys = initFalling2DMatterJS();
    
    if (triggerSmileys) {
      // Create ScrollTrigger and store reference
      currentScrollTrigger = ScrollTrigger.create({
        trigger: "#canvas-target",
        start: "top 10%",
        end: "bottom 90%",
        onEnter: () => {
          triggerSmileys();
        },
        once: true
      });
    }
  });
  
  // For users with reduced motion - do nothing
  // The canvas will remain empty and no physics will run
}

// Initialize with GSAP ScrollTrigger
document.addEventListener('DOMContentLoaded', function() {
  setupMatterJSWithScrollTrigger();
});

// Handle window resize with mobile optimization
window.addEventListener('resize', function() {
  // Only proceed if this is a significant resize
  if (!shouldRefreshOnResize()) {
    return;
  }
  
  // Debounce the resize event to avoid excessive calls
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    setupMatterJSWithScrollTrigger();
    
    // Refresh ScrollTrigger to recalculate positions
    ScrollTrigger.refresh();
  }, isMobile ? 500 : 250); // Longer debounce on mobile
});


// ============================================================
// INLINE SCRIPT BLOCK 12
// ============================================================
function initAdvancedFormValidation() {
  const forms = document.querySelectorAll('[data-form-validate]');
  forms.forEach((formContainer) => {
    const startTime = new Date().getTime();
    const form = formContainer.querySelector('form');
    if (!form) return;
    const validateFields = form.querySelectorAll('[data-validate]');
    const dataSubmit = form.querySelector('[data-submit]');
    if (!dataSubmit) return;
    const realSubmitInput = dataSubmit.querySelector('input[type="submit"]');
    if (!realSubmitInput) return;

    function isSpam() {
      const currentTime = new Date().getTime();
      return currentTime - startTime < 5000;
    }

    // Convert HH:MM or minutes to minutes
    const toMinutes = (time) => {
      if (!time) return null;
      if (time.includes(':')) {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
      }
      return parseInt(time, 10);
    };

    function isValid(fieldGroup) {
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
      if (radioCheckGroup) {
        const inputs = radioCheckGroup.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        const checkedInputs = radioCheckGroup.querySelectorAll('input:checked');
        const min = parseInt(radioCheckGroup.getAttribute('min')) || 1;
        const max = parseInt(radioCheckGroup.getAttribute('max')) || inputs.length;
        const checkedCount = checkedInputs.length;
        return inputs[0].type === 'radio' ? checkedCount >= 1 : (checkedCount >= min && checkedCount <= max);
      } else {
        const input = fieldGroup.querySelector('input, textarea, select');
        if (!input) return false;
        const value = input.value.trim();
        let valid = true;

        if (input.tagName.toLowerCase() === 'select') {
          if (value === '' || value === 'disabled' || value === 'null' || value === 'false') valid = false;
        } else if (input.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          valid = emailPattern.test(value);
        } else if (input.type === 'time') {
          if (!value) return false;
          const minAttr = input.getAttribute('min');
          const maxAttr = input.getAttribute('max');
          const valMinutes = toMinutes(value);
          const minMinutes = toMinutes(minAttr);
          const maxMinutes = toMinutes(maxAttr);
          if (minMinutes !== null && valMinutes < minMinutes) valid = false;
          if (maxMinutes !== null && valMinutes > maxMinutes) valid = false;
        } else {
          const min = parseInt(input.getAttribute('min')) || 0;
          const max = parseInt(input.getAttribute('max')) || Infinity;
          if (input.hasAttribute('min') && value.length < min) valid = false;
          if (input.hasAttribute('max') && value.length > max) valid = false;
        }
        return valid;
      }
    }

    function updateFieldStatus(fieldGroup) {
      const errorDiv = fieldGroup.querySelector('[data-error-message]');
      const valid = isValid(fieldGroup);
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
      
      if (radioCheckGroup) {
        const checkedInputs = radioCheckGroup.querySelectorAll('input:checked');
        fieldGroup.classList.toggle('is--filled', checkedInputs.length > 0);
      } else {
        const input = fieldGroup.querySelector('input, textarea, select');
        if (!input) return;
        fieldGroup.classList.toggle('is--filled', !!input.value.trim());
      }

      if (valid) {
        fieldGroup.classList.add('is--success');
        fieldGroup.classList.remove('is--error');
        if (errorDiv) errorDiv.style.display = 'none';
      } else {
        fieldGroup.classList.remove('is--success');
        const started = radioCheckGroup
          ? Array.from(radioCheckGroup.querySelectorAll('input')).some(i => i.__validationStarted)
          : fieldGroup.querySelector('input, textarea, select').__validationStarted;
        if (started) {
          fieldGroup.classList.add('is--error');
          if (errorDiv) errorDiv.style.display = 'block';
        } else {
          fieldGroup.classList.remove('is--error');
          if (errorDiv) errorDiv.style.display = 'none';
        }
      }
    }

    function validateAndStartLiveValidationForAll() {
      let allValid = true;
      let firstInvalidField = null;
      validateFields.forEach(fieldGroup => {
        const input = fieldGroup.querySelector('input, textarea, time, select');
        const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
        if (input) input.__validationStarted = true;
        if (radioCheckGroup) {
          radioCheckGroup.__validationStarted = true;
          radioCheckGroup.querySelectorAll('input').forEach(i => (i.__validationStarted = true));
        }
        updateFieldStatus(fieldGroup);
        if (!isValid(fieldGroup)) {
          allValid = false;
          if (!firstInvalidField) firstInvalidField = input || radioCheckGroup.querySelector('input');
        }
      });
      if (!allValid && firstInvalidField) firstInvalidField.focus();
      return allValid;
    }

    validateFields.forEach(fieldGroup => {
      const input = fieldGroup.querySelector('input, textarea, select');
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
      if (radioCheckGroup) {
        radioCheckGroup.querySelectorAll('input').forEach(input => {
          input.__validationStarted = false;
          input.addEventListener('change', () => {
            requestAnimationFrame(() => {
              if (!input.__validationStarted) {
                const checkedCount = radioCheckGroup.querySelectorAll('input:checked').length;
                const min = parseInt(radioCheckGroup.getAttribute('min')) || 1;
                if (checkedCount >= min) input.__validationStarted = true;
              }
              if (input.__validationStarted) updateFieldStatus(fieldGroup);
            });
          });
          input.addEventListener('blur', () => {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        });
      } else if (input) {
        input.__validationStarted = false;
        if (input.tagName.toLowerCase() === 'select') {
          input.addEventListener('change', () => {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        } else {
          input.addEventListener('input', () => {
            if (!input.__validationStarted && isValid(fieldGroup)) input.__validationStarted = true;
            if (input.__validationStarted) updateFieldStatus(fieldGroup);
          });
          input.addEventListener('blur', () => {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        }
      }
    });

    dataSubmit.addEventListener('click', () => {
      if (validateAndStartLiveValidationForAll()) {
        if (isSpam()) {
          alert('Form submitted too quickly. Please try again.');
          return;
        }
        realSubmitInput.click();
      }
    });

    form.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
        if (validateAndStartLiveValidationForAll()) {
          if (isSpam()) {
            alert('Form submitted too quickly. Please try again.');
            return;
          }
          realSubmitInput.click();
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".form_main_wrap").forEach((element) => {
    if (element.dataset.scriptInitialized) return;
    element.dataset.scriptInitialized = "true";
    initAdvancedFormValidation();
  });
});


// ============================================================
// INLINE SCRIPT BLOCK 13
// ============================================================
gsap.registerPlugin(Flip,ScrollTrigger,SplitText,Draggable,InertiaPlugin,Observer,Physics2DPlugin,CustomEase,TextPlugin);


// ============================================================
// INLINE SCRIPT BLOCK 14
// ============================================================
// Lenis
const lenis = new Lenis({
  autoRaf: true,
});


// ============================================================
// INLINE SCRIPT BLOCK 15
// ============================================================
document.addEventListener("colorThemesReady", () => {
  document
    .querySelectorAll("[data-animate-theme-to]")
    .forEach((el) => {
      const theme = el.getAttribute("data-animate-theme-to");
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end:   "bottom center",
        onToggle: ({ isActive }) => {
          if (isActive) 
            gsap.to("body", { ...colorThemes.getTheme(theme) });
        }
      });
    });
});


// ============================================================
// INLINE SCRIPT BLOCK 16
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
	if (typeof window.gsap === "undefined") document.documentElement.classList.add("gsap-not-found");
	gsap.registerPlugin(ScrollTrigger, Flip, SplitText);
});


// ============================================================
// INLINE SCRIPT BLOCK 17
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    ScrollTrigger.matchMedia({
      "(prefers-reduced-motion: reduce)": () => {
        document.querySelectorAll("[data-word-reveal='true']").forEach(text => {
          text.style.visibility = "visible";
          text.querySelectorAll(".word, .char").forEach(el => {
            el.style.visibility = "visible";
          });
          const sticker = text.querySelector("[data-sticker-reveal]");
          if (sticker) sticker.style.visibility = "visible";
        });
      },

      "(prefers-reduced-motion: no-preference)": () => {
        document.querySelectorAll("[data-word-reveal='true']").forEach((text) => {
          const sticker = text.querySelectorAll("[data-sticker-reveal]");

          const split = SplitText.create(text, {
            type: "words, chars",
            wordsClass: "word",
            charsClass: "char",
          });

          // ensure container is visible before animating
          gsap.set(text, { visibility: "visible" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: text,
              start: "top bottom",
              end: "top 80%",
              toggleActions: "none play none reset",
            },
          });

          tl.from(split.words, {
            autoAlpha: 0,
            yPercent: 100,
            scaleY: 0,
            rotate: 10,
            delay: 0.2,
            duration: 1,
            ease: "elastic.out(0.75, 0.6)",
            stagger: { each: 0.035 },
          });

          if (sticker) {
            tl.from(
              sticker,
              {
                scale: 0,
                duration: 0.4,
                ease: "back.out(3)",
                stagger: 0.2,
              },
              "<+35%"
            );
          }
        });
      }
    });
  });


// ============================================================
// INLINE SCRIPT BLOCK 18
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
  // Check if GSAP and InertiaPlugin are available
  if (typeof gsap === 'undefined' || typeof InertiaPlugin === 'undefined') {
    console.warn('GSAP or InertiaPlugin not loaded');
    return;
  }

  const mm = gsap.matchMedia();
  gsap.registerPlugin(InertiaPlugin);
  
  let oldX = 0,
    oldY = 0,
    deltaX = 0,
    deltaY = 0;
    
  document.addEventListener('mousemove', e => {
    deltaX = e.clientX - oldX;
    deltaY = e.clientY - oldY;
    oldX = e.clientX;
    oldY = e.clientY;
  });
  
  function getCurrentRotation(el) {
    const st = window.getComputedStyle(el),
      tr = st.getPropertyValue('transform');
    if (tr === 'none') return 0;
    const [a, b] = tr
      .match(/matrix\(([^)]+)\)/)[1]
      .split(',')
      .map(parseFloat);
    return Math.atan2(b, a) * (180 / Math.PI);
  }
  
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    document.querySelectorAll('[data-sticker-inertia]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.killTweensOf(el);
        const startRot = getCurrentRotation(el);
        const tl = gsap.timeline({
          timeScale: 1.2,
          onComplete: () => tl.kill()
        });
        tl.to(el, {
          inertia: {
            x: { velocity: deltaX * 20, end: 0 },
            y: { velocity: deltaY * 20, end: 0 }
          }
        });
        const wiggleAngle = (Math.random() - 0.5) * 30;
        tl.fromTo(
          el, { rotation: startRot },
          {
            duration: 0.4,
            rotation: startRot + wiggleAngle,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut'
          },
          '<'
        );
      });
    });
    return () => {
      mm.revert();
    };
  });
});


// ============================================================
// INLINE SCRIPT BLOCK 19
// ============================================================
(function() {
  function initPixelAnimations() {
    // Check dependencies
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      return;
    }

    const pixelFrames = document.querySelectorAll('[data-pixel-frame]');
    if (pixelFrames.length > 0) {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        // Only run animations when user doesn't have reduced motion enabled
        pixelFrames.forEach((el) => {
          const pixels = el.querySelectorAll('[data-pixel-el]');
          if (pixels.length === 0) return;
          gsap.set(pixels, { opacity: 0 });
          let allPaths = [];
          pixels.forEach(p => {
            const paths = p.querySelectorAll('svg path');
            if (paths.length > 0) {
              gsap.set(paths, { opacity: 0 });
              allPaths.push(...paths);
            }
          });
          if (allPaths.length === 0) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'top 70%',
              toggleActions: 'none play none reset'
            }
          });
          tl.to(pixels, {
              opacity: 1,
              duration: 0.1,
              ease: 'none'
            })
            .to(allPaths, {
              opacity: 1,
              duration: 0.05,
              ease: 'none',
              stagger: {
                each: 0.02,
                from: 'random'
              }
            }, '-=0.05');
        });
      });
      // Optional: Provide a fallback for users with reduced motion
      gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
        // Simply show all elements without animation
        pixelFrames.forEach((el) => {
          const pixels = el.querySelectorAll('[data-pixel-el]');
          const allPaths = el.querySelectorAll('[data-pixel-el] svg path');
          gsap.set([pixels, allPaths], { opacity: 1 });
        });
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPixelAnimations);
  } else {
    initPixelAnimations();
  }
})();


// ============================================================
// INLINE SCRIPT BLOCK 20
// ============================================================
(function() {
  if (window.popupsInitialized) return;
  window.popupsInitialized = true;
  
  function initPopups() {
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayString = todayDate.toISOString().split('T')[0];
    
    // Get all popups and group by ID to detect duplicates
    const allPopups = document.querySelectorAll('[data-popup-wrap]');
    const seenIds = new Set();
    
    allPopups.forEach(popup => {
      const popupId = popup.querySelector('[data-popup-id]')?.getAttribute('data-popup-id') || 'default-popup';
      
      // Remove duplicate popups
      if (seenIds.has(popupId)) {
        popup.remove();
        return;
      }
      seenIds.add(popupId);
      
      // Skip if already processed
      if (popup.hasAttribute('data-popup-initialized')) return;
      popup.setAttribute('data-popup-initialized', 'true');
      
      const startStr = popup.querySelector('[data-popup-start]')?.getAttribute('data-popup-start');
      const endStr = popup.querySelector('[data-popup-end]')?.getAttribute('data-popup-end');
      
      if (!startStr || !endStr) {
        popup.style.display = 'none';
        return;
      }
      
      const startDate = new Date(startStr);
      const endDate = new Date(endStr);
      const storageKey = `popup-shown-${popupId}-${todayString}`;
      
      const shouldShow = todayDate >= startDate && 
                         todayDate <= endDate && 
                         !localStorage.getItem(storageKey);
      
      if (!shouldShow) {
        popup.style.display = 'none';
        gsap.set(popup, { autoAlpha: 0 });
        return;
      }
      
      popup.style.display = 'flex';
      gsap.set(popup, { autoAlpha: 1, y: 0 });
      
      const closeBtn = popup.querySelector('[data-pop-close]');
      if (!closeBtn) return;
      
      closeBtn.addEventListener('click', () => {
        gsap.timeline({
          onComplete: () => {
            popup.style.display = 'none';
            localStorage.setItem(storageKey, 'true');
          }
        })
        .to(popup.querySelector('[data-popup-modal]'), {
          scale: 0,
          duration: 0.6,
          ease: 'back.in(1.4)'
        })
        .set(popup, { autoAlpha: 0 });
      }, { once: true });
    });
  }
  
  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopups, { once: true });
  } else {
    initPopups();
  }
  
  // Also run when URL changes (to catch iframe-triggered duplications)
  let lastUrl = location.href;
  const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      // Small delay to let the DOM settle after URL change
      setTimeout(initPopups, 100);
    }
  });
  
  urlObserver.observe(document.body, { childList: true, subtree: true });
})();


// ============================================================
// INLINE SCRIPT BLOCK 21
// ============================================================
(function(){
  function qp(n){ try { return new URL(window.location.href).searchParams.get(n) || ""; } catch(e){ return ""; } }
  function setAll(name,val){
    document.querySelectorAll('input[name="'+name+'"]').forEach(function(el){ el.value = val; });
  }
  document.addEventListener('DOMContentLoaded', function(){
    setAll('PAGE_URL', window.location.href);
    setAll('UTM_SOURCE',  qp('utm_source'));
    setAll('UTM_MEDIUM',  qp('utm_medium'));
    setAll('UTM_CAMPAIGN',qp('utm_campaign'));
    setAll('UTM_CONTENT', qp('utm_content'));
    setAll('UTM_TERM',    qp('utm_term'));
  });
})();


// ============================================================
// INLINE SCRIPT BLOCK 22
// ============================================================
(function() {
  if (window.location.search.indexOf('kiosk=1') !== -1) {
    try { sessionStorage.setItem('momoney_kiosk', '1'); } catch(e) {}
  }

  try {
    if (sessionStorage.getItem('momoney_kiosk') !== '1') return;
  } catch(e) { return; }

  var KIOSK_HOME = 'https://momoney-kiosks.vercel.app/front-kiosk-attract.html';

  var css = document.createElement('style');
  css.id = 'momoney-kiosk-css';
  css.textContent = [
    'nav, .w-nav, .w-nav-overlay, .w-nav-button, [role="navigation"] { display: none !important; }',
    'header, .header { display: none !important; }',
    'footer, .footer { display: none !important; }',
    '.w-commerce-commercecartcontainerwrapper, .w-commerce-commercecartcontainer { display: none !important; }',
    '.notification_wrap { display: none !important; }'
  ].join('\n');
  document.head.appendChild(css);

  function hideExtras() {
    var blocked = ['/exhibits','/contact','/blog','/events','/money-lab','/gift-shop','/about','/faq','/find-us','/legal','/checkout'];
    document.querySelectorAll('a').forEach(function(a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      for (var i = 0; i < blocked.length; i++) {
        if (href.indexOf(blocked[i]) !== -1) {
          var c = a.closest('section, nav, header, footer');
          if (c && c !== document.body) c.style.setProperty('display', 'none', 'important');
          break;
        }
      }
    });
    document.querySelectorAll('section, div[class*="banner"], div[class*="promo"], div[class*="announcement"]').forEach(function(el) {
      var t = (el.textContent || '').toLowerCase();
      if (t.length < 600 && (t.indexOf('exclusive') !== -1 || t.indexOf('claim') !== -1)) {
        el.style.setProperty('display', 'none', 'important');
      }
    });
  }
  setTimeout(hideExtras, 300);
  setTimeout(hideExtras, 1200);

  var path = window.location.pathname.toLowerCase();
  var isSubPage = path.indexOf('/tickets/') !== -1;
  var isConfirmation = window.location.href.indexOf('order-confirmation') !== -1;

  if (isSubPage && !isConfirmation) {
    var overlay = document.createElement('div');
    overlay.id = 'kiosk-loading-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity 0.5s ease;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif';
    var loadText = document.createElement('p');
    loadText.textContent = 'Loading booking calendar...';
    loadText.style.cssText = 'color:#D4AF37;font-size:20px;font-weight:300;letter-spacing:2px;margin-top:32px';
    var spinner = document.createElement('div');
    spinner.style.cssText = 'width:36px;height:36px;border:3px solid rgba(212,175,55,0.25);border-top-color:#D4AF37;border-radius:50%;margin-top:24px';
    var spinStyle = document.createElement('style');
    spinStyle.textContent = '@keyframes ksk-spin{to{transform:rotate(360deg)}}#kiosk-loading-overlay div{animation:ksk-spin 0.8s linear infinite}';
    overlay.appendChild(loadText);
    overlay.appendChild(spinner);
    document.head.appendChild(spinStyle);
    document.documentElement.appendChild(overlay);

    var dismissed = false;
    function dismissOverlay() {
      if (dismissed) return;
      dismissed = true;
      overlay.style.opacity = '0';
      setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 500);
    }

    var observer = new MutationObserver(function() {
      var iframe = document.querySelector('iframe[src*="tickx"], iframe[src*="tixtrack"]');
      if (iframe) {
        observer.disconnect();
        iframe.addEventListener('load', function() {
          setTimeout(dismissOverlay, 1500);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(function() {
      observer.disconnect();
      dismissOverlay();
    }, 15000);

    var back = document.createElement('a');
    back.href = KIOSK_HOME;
    back.id = 'kiosk-back-btn';
    back.textContent = '\u2190  Back to Ticket Selection';
    back.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:2147483646;padding:14px 24px;background:rgba(0,0,0,0.92);color:#D4AF37;border:1px solid #D4AF37;border-radius:8px;font-size:15px;font-weight:400;letter-spacing:0.5px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;-webkit-tap-highlight-color:transparent';
    document.body.appendChild(back);
  }

  var doneShown = false;
  setInterval(function() {
    if (window.location.href.indexOf('order-confirmation') !== -1 && !doneShown) {
      doneShown = true;
      var bk = document.getElementById('kiosk-back-btn');
      if (bk) bk.style.display = 'none';
      var w = document.createElement('div');
      w.style.cssText = 'position:fixed;bottom:0;left:0;right:0;padding:28px 20px;text-align:center;background:rgba(0,0,0,0.96);border-top:3px solid #D4AF37;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif';
      var h = document.createElement('p');
      h.textContent = 'Booking Complete!';
      h.style.cssText = 'color:#fff;font-size:22px;margin-bottom:16px;font-weight:300;letter-spacing:1px';
      var b = document.createElement('button');
      b.textContent = 'Start New Booking';
      b.style.cssText = 'background:#000;color:#D4AF37;border:2px solid #D4AF37;padding:18px 56px;font-size:19px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:6px;font-weight:400;-webkit-tap-highlight-color:transparent';
      b.addEventListener('touchstart', function() {
        try { sessionStorage.removeItem('momoney_kiosk'); } catch(e) {}
        window.location.href = KIOSK_HOME;
      }, { passive: true });
      b.addEventListener('click', function() {
        try { sessionStorage.removeItem('momoney_kiosk'); } catch(e) {}
        window.location.href = KIOSK_HOME;
      });
      var cd = document.createElement('p');
      cd.style.cssText = 'color:#888;font-size:14px;margin-top:14px;font-weight:300';
      w.appendChild(h); w.appendChild(b); w.appendChild(cd);
      document.body.appendChild(w);
      var sec = 20;
      cd.textContent = 'Returning to start in ' + sec + ' seconds';
      setInterval(function() {
        sec--;
        if (sec > 0) { cd.textContent = 'Returning to start in ' + sec + ' second' + (sec !== 1 ? 's' : ''); }
        else {
          try { sessionStorage.removeItem('momoney_kiosk'); } catch(e) {}
          window.location.href = KIOSK_HOME;
        }
      }, 1000);
    }
  }, 1000);
})();

