/*
window.addEventListener("load", () => {
  const section  = document.querySelector(".horizontal-section");
  const wrapper  = section?.querySelector(".horizontal-wrapper");
  const track    = section?.querySelector(".track");
  if (!section || !wrapper || !track) return;

  const isMobile = window.matchMedia("(max-width: 479px)").matches;

  // ===== SPLIT TEXT SUR .split-timeline =====
  const splitElems = document.querySelectorAll(".split-timeline");
  let allLines = [];
  let splitPlayed = false; // pour éviter de rejouer 50 fois

  if (splitElems.length && typeof SplitText !== "undefined") {
    const splits = [];

    splitElems.forEach(el => {
      const split = new SplitText(el, {
        type: "lines",
        mask: "lines"
      });
      splits.push(split);
    });

    allLines = splits.flatMap(s => s.lines);

    // état initial : caché en bas
    gsap.set(allLines, {
      y: "140%",
      opacity: 0
    });
  }

  // ===== PREMIÈRE H-SLIDE → H-ARROW =====
  const firstSlide  = section.querySelector(".h-slide");
  const firstArrows = firstSlide ? firstSlide.querySelectorAll(".h-arrow") : null;

  if (firstArrows && firstArrows.length) {
    gsap.set(firstArrows, {
      yPercent: 150
      // opacity: 0 si tu veux aussi un fade
    });
  }

  // Fonction qui joue l'anim texte + flèche (utilisée sur desktop ET mobile)
  function playIntroAnim() {
    if (splitPlayed) return;
    splitPlayed = true;

    // Texte split
    if (allLines && allLines.length) {
      gsap.to(allLines, {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05
      });
    }

    // Première flèche .h-arrow de la première slide
    if (firstArrows && firstArrows.length) {
      gsap.to(firstArrows, {
        yPercent: 0,
        // opacity: 1,
        duration: 0.7,
        ease: "power3.out"
      });
    }
  }

  // ===================== BRANCHE MOBILE =====================
  if (isMobile) {
    // Pas de scale ni de scroll horizontal sur mobile
    gsap.set(wrapper, {
      scale: 1,
      x: 0,
      y: 0,
      transformOrigin: "100% 100%"
    });

    gsap.set(track, { x: 0 });

    // On déclenche juste l'anim texte/flèche à l'apparition
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: playIntroAnim
    });

    return; // on ne crée PAS la timeline horizontale
  }

  // ===================== BRANCHE DESKTOP =====================

  // Slides .h-slide = 50vw → le track est plus large que le viewport
  const getTotalDistance = () => track.scrollWidth - window.innerWidth;

  // ÉTAT DE DÉPART
  gsap.set(wrapper, {
    scale: 0,
    x: 0,
    y: 0,
    transformOrigin: "100% 100%" // coin bas-droite
  });

  gsap.set(track, { x: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      // un peu de marge après la fin du scroll horizontal pour éviter le "drop"
      end: () => "+=" + (getTotalDistance() + window.innerHeight * 0.5),
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
    defaults: { ease: "none" }
  });

  // PHASE 1 → scale 0 → 1 + x: 50vw
  tl.to(wrapper, {
    scale: 1,
    x: "50vw",
    y: 0,
    duration: 0.3,
  });

  // 🔔 déclenche l’anim SplitText + première h-arrow une fois
  tl.call(playIntroAnim, null, ">"); // juste après le scale

  // PHASE 2 → wrapper revient au centre (x: 0)
  tl.to(wrapper, {
    x: "0vw",
    duration: 0.2,
  });

  // PHASE 3 → scroll horizontal du track
  tl.to(track, {
    x: () => -getTotalDistance(),
    ease: "none",
    duration: 0.5
  });

  // PHASE 4 → léger "pin" en fin de séquence (rien ne bouge, mais le pin reste)
  tl.to({}, {
    duration: 0.15
  });
});*/