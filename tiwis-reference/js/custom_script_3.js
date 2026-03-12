window.addEventListener("load", () => {
  const section  = document.querySelector(".horizontal-section");
  const wrapper  = section?.querySelector(".horizontal-wrapper");
  const track    = section?.querySelector(".track");
  const textPin  = document.querySelector(".horizontal-text-pin");

  if (!section || !wrapper || !track) return;

  const isMobile = window.matchMedia("(max-width: 479px)").matches;

  // ===== SPLIT TEXT =====
  const splitElems = document.querySelectorAll(".split-timeline");
  let allLines = [];
  let splitPlayed = false;

  if (splitElems.length && typeof SplitText !== "undefined") {
    const splits = [];

    splitElems.forEach(el => {
      const split = new SplitText(el, { type: "lines", mask: "lines" });
      splits.push(split);
    });

    allLines = splits.flatMap(s => s.lines);

    gsap.set(allLines, { y: "140%", opacity: 0 });
  }

  // ===== FIRST ARROW =====
  const firstSlide  = section.querySelector(".h-slide");
  const firstArrows = firstSlide?.querySelectorAll(".h-arrow");

  if (firstArrows?.length) {
    gsap.set(firstArrows, { yPercent: 150 });
  }

  function playIntroAnim() {
    if (splitPlayed) return;
    splitPlayed = true;

    if (allLines.length) {
      gsap.to(allLines, {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05
      });
    }

    if (firstArrows?.length) {
      gsap.to(firstArrows, {
        yPercent: 0,
        duration: 0.7,
        ease: "power3.out"
      });
    }
  }

  // ===================== MOBILE =====================
  if (isMobile) {
    gsap.set(wrapper, { scale: 1, x: 0, y: 0 });
    gsap.set(track, { x: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: playIntroAnim
    });

    return;
  }

  // ===================== DESKTOP =====================
  const getTotalDistance = () => track.scrollWidth - window.innerWidth;

  gsap.set(wrapper, { scale: 0, x: 0, y: 0 });
  gsap.set(track, { x: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => "+=" + (getTotalDistance() + window.innerHeight * 0.5),
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    },
    defaults: { ease: "none" }
  });

  // LABELS
  tl.addLabel("scaleStart");

  tl.to(wrapper, {
    scale: 1,
    x: "50vw",
    duration: 0.3
  });

  tl.call(playIntroAnim, null, ">");

  tl.addLabel("scaleEnd");

  tl.to(wrapper, {
    x: "0vw",
    duration: 0.2
  });

  tl.to(track, {
    x: () => -getTotalDistance(),
    duration: 0.5
  });

  tl.to({}, { duration: 0.15 });

  // ===================== PIN TEXTE (70% DU SCALE) =====================
  if (textPin) {
    ScrollTrigger.create({
      trigger: section,
      start: "top 20%",
      end: () => {
        const st = tl.scrollTrigger;
        const scaleStart = st.start + tl.labels.scaleStart * (st.end - st.start);
        const scaleEnd   = st.start + tl.labels.scaleEnd   * (st.end - st.start);

        const scaleDuration = scaleEnd - scaleStart;
        return scaleStart + scaleDuration * 0.7; // ⬅️ 30% plus court
      },
      pin: textPin,
      pinSpacing: false,
      scrub: true,
      anticipatePin: 1
    });
  }
});