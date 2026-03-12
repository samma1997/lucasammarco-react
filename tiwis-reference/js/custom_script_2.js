document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navigation");
  if (!nav) return;

  const navLinks          = document.querySelectorAll(".nav-link");
  const whiteSections     = document.querySelectorAll(".bg-white");
  const footer            = document.querySelector(".footer");
  const followSection     = document.querySelector(".home-hero");
  const horizontalSection = document.querySelector(".horizontal-section");

  const btnCenters = document.querySelectorAll(".navigation .button-small__center");
  const btnArrows  = document.querySelectorAll(".navigation .button-small__arrow");
  const btnBlocks  = [...btnCenters, ...btnArrows];

  const logoSvgs = document.querySelectorAll(".logo svg *");
	const arrowSvgs = document.querySelectorAll(".navigation .button-small__arrow svg *");

  const path = window.location.pathname.replace(/\/$/, ""); // enlève le trailing slash
	const isHome = path === "" || path === "/" || path === "/fr" || path === "/en";
  const isOffresDesign = path.includes("offres-design");

  // ✅ CONDITION AJOUTÉE : sur ces pages, la nav ne doit JAMAIS passer en noir
  const isContactPage = path === "/fr/contactez-nous" || path === "/en/contactez-nous";

  let lastScroll       = 0;
  const scrollThreshold = 10;
  const navHeight      = nav.offsetHeight;
  let navHidden        = false;

  // ========== UTILS VISIBILITÉ ==========
  const isVisible = (el, offsetPx = 0) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > offsetPx;
  };

  // ========== ANIM D'ENTRÉE NAV ==========
  requestAnimationFrame(() => {
    nav.classList.add("is-ready");
  });

  if (isHome) {
    nav.classList.add("with-logo");
  } else {
    nav.classList.remove("with-logo");
  }

  // ========== COULEURS NAV ==========
  function updateNavColors() {
    // Si le menu mobile est ouvert → on ne touche pas aux couleurs
    if (nav.classList.contains("menu-open")) return;

    const footerRect = footer ? footer.getBoundingClientRect() : null;
    const footerVisible = footerRect
      ? footerRect.top <= window.innerHeight && footerRect.bottom >= 0
      : false;

    let onWhite = false;
    whiteSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navHeight && rect.bottom >= 0) {
        onWhite = true;
      }
    });

    // ✅ Override : sur la page Contactez-nous, on ignore le mode "onWhite" (donc jamais noir)
    if (isContactPage) onWhite = false;

    nav.classList.toggle("is-on-white", onWhite && !footerVisible);

    if (footerVisible) {
      gsap.to(navLinks, { color: "#fff", duration: 0.25, ease: "power2.out" });
      gsap.to(logoSvgs, { fill: "#fff", duration: 0.25, ease: "power2.out" });
      gsap.to(arrowSvgs, { fill: "#fff", duration: 0.25, ease: "power2.out" });

      gsap.to(btnBlocks, {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.25,
        ease: "power2.out"
      });
    } else if (onWhite) {
      gsap.to(navLinks, { color: "#000", duration: 0.25, ease: "power2.out" });
      gsap.to(logoSvgs, { fill: "#000", duration: 0.25, ease: "power2.out" });
      gsap.to(arrowSvgs, { fill: "#000", duration: 0.25, ease: "power2.out" });

      gsap.to(btnBlocks, {
        backgroundColor: "rgba(204, 229, 255, 0.35)",
        duration: 0.25,
        ease: "power2.out"
      });
    } else {
      gsap.to(navLinks, { color: "#fff", duration: 0.25, ease: "power2.out" });
      gsap.to(logoSvgs, { fill: "#fff", duration: 0.25, ease: "power2.out" });
      gsap.to(arrowSvgs, { fill: "#fff", duration: 0.25, ease: "power2.out" });

      gsap.to(btnBlocks, {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.25,
        ease: "power2.out"
      });
    }
  }

  // ========== SCROLL (hide/show) ==========
  window.addEventListener("scroll", () => {
    if (nav.classList.contains("menu-open")) return;

    const currentScroll   = window.pageYOffset || document.documentElement.scrollTop;
    const inFollowSection = isVisible(followSection, window.innerHeight * 0.1);
    const inHorizontal    = isOffresDesign && isVisible(horizontalSection, 0);

    if (inHorizontal) {
      nav.style.transform = "translateY(-100%)";
      navHidden = true;
    } else if (!inFollowSection) {
      if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
        if (currentScroll > lastScroll && currentScroll > 100) {
          nav.style.transform = "translateY(-100%)";
          navHidden = true;
        } else {
          nav.style.transform = "translateY(0)";
          navHidden = false;

          if (isHome) {
            if (currentScroll > window.innerHeight) {
              nav.classList.remove("with-logo");
            } else {
              nav.classList.add("with-logo");
            }
          }
        }
        lastScroll = currentScroll;
      }
    } else {
      nav.style.transform = "translateY(0)";
      navHidden = false;
      if (isHome) nav.classList.add("with-logo");
    }

    updateNavColors();
  });

  // ========== REVEAL À LA SOURIS (DESKTOP) ==========
  window.addEventListener("mousemove", (e) => {
    const inHorizontal = isOffresDesign && isVisible(horizontalSection, 0);
    if (inHorizontal) return;

    if (nav.classList.contains("menu-open")) return;

    if (e.clientY < 40 && navHidden) {
      nav.style.transform = "translateY(0)";
      navHidden = false;

      if (isHome) {
        nav.classList.remove("with-logo");
      }
    }
  });

 
  setTimeout(updateNavColors, 50);

  // ========== BURGER + PANEL MOBILE ==========
  const burger = document.querySelector(".nav-burger");
  const panel  = document.querySelector(".nav-mobile-panel");

  const mobileLinks      = document.querySelectorAll(".nav-mobile__link");
  const subMobileLinks   = document.querySelectorAll(".nav-submobile__link");
  let mobileSplit = null;
  let subMobileSplit = null;

  if (typeof SplitText !== "undefined") {
    if (mobileLinks.length) {
      mobileSplit = new SplitText(mobileLinks, {
        type: "lines",
        mask: "lines"
      });
      gsap.set(mobileSplit.lines, { yPercent: 100, opacity: 1 });
    }
    if (subMobileLinks.length) {
      subMobileSplit = new SplitText(subMobileLinks, {
        type: "lines",
        mask: "lines"
      });
      gsap.set(subMobileSplit.lines, { yPercent: 100, opacity: 1 });
    }
  }

  function animateMobileLinksIn() {
    if (!mobileSplit) return;
    gsap.to(mobileSplit.lines, {
      yPercent: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.05,
      delay: 0.6
    });
  }

  function animateMobileLinksOut() {
    if (!mobileSplit) return;
    gsap.to(mobileSplit.lines, {
      yPercent: 100,
      duration: 0.4,
      ease: "power3.in"
    });
  }

  function animateSubmenuLinksIn(submenu) {
    if (!subMobileSplit) return;
    const links = submenu.querySelectorAll(".nav-submobile__link");
    if (!links.length) return;

    const lines = [];
    links.forEach(link => {
      subMobileSplit.lines.forEach(line => {
        if (line.closest(".nav-submobile__link") === link) {
          lines.push(line);
        }
      });
    });

    gsap.set(lines, { yPercent: 100 });
    gsap.to(lines, {
      yPercent: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.05,
      delay: 0.5
    });
  }

  function animateSubmenuLinksOut(submenu) {
    if (!subMobileSplit) return;
    const links = submenu.querySelectorAll(".nav-submobile__link");
    if (!links.length) return;

    const lines = [];
    links.forEach(link => {
      subMobileSplit.lines.forEach(line => {
        if (line.closest(".nav-submobile__link") === link) {
          lines.push(line);
        }
      });
    });

    gsap.to(lines, {
      yPercent: 100,
      duration: 0.3,
      ease: "power3.in"
    });
  }

  // ========== SOUS-MENUS MOBILE (OFFRES / EXPERTISE) ==========
  const subMenuOffres    = document.querySelector(".nav-mobile__submenu.nav-mobile__submenu-offres");
  const subMenuExpertise = document.querySelector(".nav-mobile__submenu.nav-mobile__submenu-expertise");
  const subMenus         = [subMenuOffres, subMenuExpertise].filter(Boolean);

  function openSubMenu(sub) {
    if (!sub) return;

    
    subMenus.forEach(s => {
      if (s !== sub) {
        s.classList.remove("is-open");
        animateSubmenuLinksOut(s);
      }
    });

    if (panel) {
      panel.classList.add("has-submenu-open");
    }

    sub.classList.add("is-open");
    animateSubmenuLinksIn(sub);
  }

  function closeSubMenu(sub) {
    if (!sub) return;
    sub.classList.remove("is-open");
    animateSubmenuLinksOut(sub);
    if (panel) {
      panel.classList.remove("has-submenu-open");
    }
  }

  if (burger && panel) {
    const svg = burger.querySelector("svg");

    const bottomPolyline = svg ? svg.querySelector("#globalnav-menutrigger-bread-bottom") : null;
    const topPolyline    = svg ? svg.querySelector("#globalnav-menutrigger-bread-top") : null;

    let bottomOpen, bottomClose, topOpen, topClose;

    if (bottomPolyline) {
      const anims = bottomPolyline.querySelectorAll("animate");
      bottomOpen  = anims[0];
      bottomClose = anims[1];
    }
    if (topPolyline) {
      const anims = topPolyline.querySelectorAll("animate");
      topOpen  = anims[0];
      topClose = anims[1];
    }

    let isOpen = false;

    
    const triggerOffres    = panel.querySelector(".nav-mobile__link-offres");
    const triggerExpertise = panel.querySelector(".nav-mobile__link-expertise");

    if (triggerOffres && subMenuOffres) {
      triggerOffres.addEventListener("click", (e) => {
        e.preventDefault();
        openSubMenu(subMenuOffres);
      });
    }

    if (triggerExpertise && subMenuExpertise) {
      triggerExpertise.addEventListener("click", (e) => {
        e.preventDefault();
        openSubMenu(subMenuExpertise);
      });
    }

    const submenuBackButtons = document.querySelectorAll(".nav-mobile__submenu-back");
    submenuBackButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const submenu = btn.closest(".nav-mobile__submenu");
        closeSubMenu(submenu);
      });
    });

    burger.addEventListener("click", () => {
      isOpen = !isOpen;

      panel.classList.toggle("is-open", isOpen);
      burger.classList.toggle("is-open", isOpen);
      nav.classList.toggle("menu-open", isOpen);

      document.body.classList.toggle("no-scroll", isOpen);

      if (!isOpen) {
        subMenus.forEach(sm => {
          sm.classList.remove("is-open");
          animateSubmenuLinksOut(sm);
        });
        if (panel) {
          panel.classList.remove("has-submenu-open");
        }
        animateMobileLinksOut();
        updateNavColors();
      } else {
        animateMobileLinksIn();
      }

      if (topOpen && bottomOpen && topClose && bottomClose) {
        if (isOpen) {
          topOpen.beginElement();
          bottomOpen.beginElement();
        } else {
          topClose.beginElement();
          bottomClose.beginElement();
        }
      }
    });
  }
});