window.addEventListener("load", () => {
  const slides = gsap.utils.toArray(".h-slide");
  if (!slides.length) return;

  // Map slide -> { lines, svgPaths, arrows, isFirst, played }
  const slideDataMap = new Map();

  // 1) Préparation slide par slide
  slides.forEach((slide, index) => {
    const targets  = slide.querySelectorAll(".split-horizontal");
    const svgPaths = slide.querySelectorAll(".svg-draw path");
    const arrows   = slide.querySelectorAll(".h-arrow");
    const isFirst  = index === 0;

    if (!targets.length && !svgPaths.length && !arrows.length) return;

    // --- SPLIT TEXT ---
    let lines = [];
    if (targets.length) {
      const splits = [];

      targets.forEach((el) => {
        const split = new SplitText(el, {
          type: "lines",
          mask: "lines"
        });
        splits.push(split);
      });

      lines = splits.flatMap(s => s.lines);

      gsap.set(lines, {
        y: "140%",
        opacity: 0
      });
    }

    // --- SVG DRAW ---
    if (svgPaths.length) {
      svgPaths.forEach(path => {
        const length = path.getTotalLength();

        gsap.set(path, {
          stroke: "#ffffff",      // adapte si besoin
          strokeWidth: 1,
          fill: "none",
          strokeDasharray: length,
          strokeDashoffset: length
        });
      });
    }

    // --- H-ARROW (dans leur .div-hide) ---
    if (arrows.length) {
      gsap.set(arrows, {
        yPercent: 150 // cachées vers le bas dans leur div-hide
        // opacity: 0 si tu veux aussi un fade
      });
    }

    slideDataMap.set(slide, {
      lines,
      svgPaths,
      arrows,
      isFirst,
      played: false
    });
  });

  if (!slideDataMap.size) return;

  // 2) IntersectionObserver : déclenche quand la slide est ~100% visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const slide = entry.target;
      const data  = slideDataMap.get(slide);
      if (!data) return;

      if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;

      // 🔒 Cas spécial : première slide → on attend le signal du timeline horizontal
      if (data.isFirst && !document.body.classList.contains("h-slide-1-ready")) {
        return;
      }

      if (data.played) return;
      data.played = true;

      // ---- Anim texte ----
      if (data.lines && data.lines.length) {
        gsap.to(data.lines, {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05
        });
      }

      // ---- Anim SVG (dessin du trait) ----
      if (data.svgPaths && data.svgPaths.length) {
        gsap.to(data.svgPaths, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power3.inOut",
        });
      }

      // ---- Anim H-ARROW ----
      if (data.arrows && data.arrows.length) {
        gsap.to(data.arrows, {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.out"
          // opacity: 1 si tu actives le fade
        });
      }

      observer.unobserve(slide);
    });
  }, {
    threshold: [0.5]
  });

  slideDataMap.forEach((_, slide) => observer.observe(slide));
});