document.addEventListener("DOMContentLoaded", () => {
  // 👇 Déclare tous les couples trigger / dropdown que tu veux animer
  const dropdownConfigs = [
    {
      triggerSelector: ".nav-link--offre",
      dropdownSelector: ".nav-dropdown--offre",
    },
    {
      triggerSelector: ".nav-link--expertise",
      dropdownSelector: ".nav-dropdown--expertise",
    }
  ];

  dropdownConfigs.forEach(({ triggerSelector, dropdownSelector }) => {
    const trigger  = document.querySelector(triggerSelector);
    const dropdown = document.querySelector(dropdownSelector);

    if (!trigger || !dropdown) return;

    const items = dropdown.querySelectorAll(".split-nav");
    if (!items.length) return;

    // SplitText sur chaque item
    const splitInstances = [];
    items.forEach((el) => {
      const split = new SplitText(el, {
        type: "lines",
        mask: "lines",
      });
      splitInstances.push(split);

      gsap.set(split.lines, {
        yPercent: 120,
        opacity: 0,
      });
    });

    // Timeline d'apparition du dropdown (uniquement pour Y + texte)
    const showTl = gsap.timeline({ paused: true })
      .fromTo(
        dropdown,
        { y: 8 },
        { y: 0, duration: 0.3, ease: "quart.out" },
        0
      )
      .to(
        splitInstances.map((s) => s.lines),
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "quart.out",
          stagger: 0.05,
        },
        0
      );

    let hideTimeout;

    function openDropdown() {
      clearTimeout(hideTimeout);
      dropdown.classList.add("is-open");   // 🔥 déclenche le fade CSS
      showTl.play();
    }

    function closeDropdown() {
      hideTimeout = setTimeout(() => {
        dropdown.classList.remove("is-open");  // 🔥 fade-out CSS
        showTl.reverse();
      }, 80); // petit délai pour laisser le temps de passer du lien au menu
    }

    // Hover sur le lien principal
    trigger.addEventListener("mouseenter", openDropdown);
    trigger.addEventListener("mouseleave", closeDropdown);

    // Hover sur le dropdown lui-même
    dropdown.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
    });

    dropdown.addEventListener("mouseleave", closeDropdown);
  });
});