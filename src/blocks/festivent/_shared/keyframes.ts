export const KEYFRAMES = `
  /* Marquees */
  @keyframes fv-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fv-marquee-artists {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fv-marquee-partners {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Hero balloon fly animations */
  @keyframes fv-hero-fly-1 {
    0% { bottom: 0; right: 0; transform: rotate(-4deg) translate(100%, 100%); }
    50% { bottom: 100%; right: 20%; transform: rotate(-4deg) translate(0, 0); }
    100% { bottom: 100%; right: 20%; transform: rotate(-4deg) translate(0, 0); }
  }
  @keyframes fv-hero-fly-2 {
    0% { bottom: 0; left: 0; transform: rotate(1deg) translate(-25%, 100%); }
    10% { bottom: 0; left: 0; transform: rotate(1deg) translate(-25%, 100%); }
    60% { bottom: 100%; left: 0; transform: rotate(1deg) translate(-20%, 0); }
    100% { bottom: 100%; left: 0; transform: rotate(1deg) translate(-20%, 0); }
  }
  @keyframes fv-hero-fly-3 {
    0% { bottom: 0; left: 0; transform: translate(-35%, 100%) rotate(1deg); }
    50% { bottom: 0; left: 0; transform: translate(-35%, 100%) rotate(1deg); }
    100% { bottom: 100%; left: 0; transform: translate(-35%, 0) rotate(1deg); }
  }
  @keyframes fv-hero-fly-4 {
    0% { bottom: 0; left: 45%; transform: translateY(100%) rotate(4deg); }
    30% { bottom: 0; left: 45%; transform: translateY(100%) rotate(4deg); }
    80% { bottom: 100%; left: 45%; transform: translateY(0) rotate(4deg); }
    100% { bottom: 100%; left: 45%; transform: translateY(0) rotate(4deg); }
  }

  /* Artist cards float */
  @keyframes artists-float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-1rem); }
  }

  /* Ferris wheel spin */
  @keyframes fv-footer-spin {
    0% { transform: translate(-50%, 7.5%) rotate(0deg); }
    100% { transform: translate(-50%, 7.5%) rotate(360deg); }
  }

  /* Section shape fly */
  @keyframes section-fly {
    0% { transform: translate(0); }
    100% { transform: translate(-60rem, -60rem); }
  }

  /* Legacy float */
  @keyframes fv-float-1 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes fv-float-2 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-1.5deg); }
  }
  @keyframes fv-float-3 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-25px); }
  }
`
