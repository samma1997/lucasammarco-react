window.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".use-case__wrapper");
  if (!wrappers.length) return;

  function initScrollAnim(wrapper) {
    const masks = wrapper.querySelectorAll(".use-case__img-mask");
    if (!masks.length) return;

    // État de départ pour tous les masks
    gsap.set(masks, { clipPath: "inset(30%)" });

    // Timeline liée au scroll, avec petit scrub + stagger
    gsap.timeline({
      scrollTrigger: {
        trigger: masks,
        start: "top bottom",   // la section commence à entrer dans le viewport
        end: "30% bottom",     // la section sort complètement
        scrub: 1,              // petit scrub fluide
        //markers: true,
      }
    })
    .to(masks, {
      clipPath: "inset(0%)",
      ease: "none",
      stagger: 0.1         // léger décalage entre les .use-case__item
    });
  }

  // Observer : dès que le wrapper commence à être visible, on crée la timeline
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const wrapper = entry.target;
        initScrollAnim(wrapper);

        // on ne ré-initialise pas plusieurs fois
        observer.unobserve(wrapper);
      });
    },
    {
      threshold: 0.01 // dès que la section commence à être visible
    }
  );

  wrappers.forEach((wrapper) => observer.observe(wrapper));
});