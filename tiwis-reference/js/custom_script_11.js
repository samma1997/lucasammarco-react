gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".button-big");   // ton bouton-cursor
  const hero = document.querySelector(".home-hero");    // section où il remplace le curseur
  const nav  = document.querySelector(".navigation");

  // Desktop only + sécurité éléments
  if (!root || !hero) return;
  if (/Mobi|Android/i.test(navigator.userAgent)) return;

  const ACTIVATION_DELAY = 1000; // 2s
  let delayOver = false;
  setTimeout(() => { delayOver = true; }, ACTIVATION_DELAY);

  // Suivi smooth
  const setX = gsap.quickTo(root, "x", { duration: 0.3, ease: "power3.out" });
  const setY = gsap.quickTo(root, "y", { duration: 0.3, ease: "power3.out" });

  let isOverNav = false;

  // Au départ : invisible
  gsap.set(root, {
    scale: 0,
    pointerEvents: "none" // important: ne bloque pas les clics en dessous
  });

  // Ratio de visibilité de la home-hero
  function getHeroVisibleRatio() {
    const rect = hero.getBoundingClientRect();
    const vh   = window.innerHeight || document.documentElement.clientHeight;
    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    const clamped = Math.max(0, Math.min(visible, rect.height));
    return rect.height > 0 ? clamped / rect.height : 0;
  }

  // Conditions pour activer le faux curseur
  function shouldBeActive() {
    if (!delayOver) return false;        // pas avant 2s
    if (isOverNav) return false;        // pas sur la nav
    const ratio = getHeroVisibleRatio();
    return ratio >= 0.5;                // au moins 50% du hero visible
  }

  function activateCursor() {
    if (!shouldBeActive()) return;
    hero.classList.add("cursor-replaced"); // cache le vrai curseur (CSS)
    gsap.to(root, {
      scale: 1,
      duration: 0.5,
      ease: "quart.out"
    });
  }

  function deactivateCursor() {
    hero.classList.remove("cursor-replaced");
    gsap.to(root, {
      scale: 0,
      duration: 0.4,
      ease: "quart.out"
    });
  }

  // Gestion nav : dès qu'on passe dessus → on cache le faux curseur
  if (nav) {
    nav.addEventListener("mouseenter", () => {
      isOverNav = true;
      deactivateCursor();
    });

    nav.addEventListener("mouseleave", () => {
      isOverNav = false;
      // la réactivation se fera au prochain déplacement si shouldBeActive() est true
    });
  }

  // Mouvement pointer via ScrollTrigger.observe
  const observer = ScrollTrigger.observe({
    type: "pointer",
    onMove: (self) => {
      const { x, y } = self; // ✅ ici c'est bien x/y, pas clientX/clientY

      if (!shouldBeActive()) {
        deactivateCursor();
        return;
      }

      setX(x);
      setY(y);
      activateCursor();
    }
  });

  // Scroll : si le hero n'est plus assez visible → on cache
  window.addEventListener("scroll", () => {
    if (!shouldBeActive()) {
      deactivateCursor();
    }
  });

  // Click dans la home-hero → on suit le href du bouton
  const targetHref = root.getAttribute("href") || root.dataset.href;
  if (targetHref) {
    hero.addEventListener("click", (e) => {
      if (!shouldBeActive()) return;

      // Si clique sur un vrai <a> ou <button>, on laisse le comportement normal
      const interactive = e.target.closest("a, button");
      if (interactive) return;

      window.location.href = targetHref;
    });
  }
});