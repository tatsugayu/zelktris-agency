/* ============================================================
   ZELKTRIS AGENCY — Premium Animations Engine
   GSAP + ScrollTrigger · Custom Cursor · Magnetic Buttons
   Preloader · Hero Entrance · Marquee · Horizontal Scroll
============================================================ */

/* ── Guard: GSAP doit être chargé avant ce fichier ── */
if (typeof gsap === 'undefined') {
  console.warn('[ZELKTRIS] GSAP not loaded — animations disabled');
}

/* ── Helpers ── */
const isMobile = () => window.innerWidth < 768;
const isTouch  = () => ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================================================================
   1. PRELOADER
================================================================ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const preLogo = preloader.querySelector('.pre-logo');
  const preLine = preloader.querySelector('.pre-line');

  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.pointerEvents = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  /* Garde le body bloqué pendant le preloader */
  document.body.style.overflow = 'hidden';

  tl.from(preloader, { opacity: 0, duration: 0.01 })
    .from(preLogo, {
      yPercent: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from(preLine, {
      scaleX: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      transformOrigin: 'left center'
    }, '-=0.3')
    .to(preLine, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power4.inOut',
      transformOrigin: 'right center'
    }, '+=0.4')
    .to(preloader, {
      yPercent: -105,
      duration: 0.9,
      ease: 'power4.inOut'
    }, '+=0.2');
}

/* ================================================================
   2. CUSTOM CURSOR (desktop uniquement)
================================================================ */
function initCursor() {
  if (isTouch()) return;

  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(dot, {
      x: mouseX,
      y: mouseY,
      duration: 0.08,
      ease: 'none'
    });
  });

  /* Ring suit avec un léger lag pour l'effet "traîne" */
  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  /* Hover sur liens / boutons : cursor grossit */
  const hoverTargets = document.querySelectorAll(
    'a, button, .btn-magnetic, .service-panel, .process-step, .nav-cta'
  );

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(ring, {
        width: 60,
        height: 60,
        opacity: 0.6,
        borderColor: 'var(--gold)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(ring, {
        width: 36,
        height: 36,
        opacity: 1,
        borderColor: 'var(--blue)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, { opacity: 1, duration: 0.2 });
    });
  });

  /* Invisible quand cursor quitte la fenêtre */
  document.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
  });
}

/* ================================================================
   3. HERO ENTRANCE ANIMATION
================================================================ */
function initHeroEntrance() {
  const lines    = document.querySelectorAll('.display-line');
  const eyebrow  = document.querySelector('.hero-eyebrow');
  const heroSub  = document.querySelector('.hero-cin-sub');
  const heroCta  = document.querySelector('.hero-cin-cta');
  const heroStats = document.querySelector('.hero-cin-stats');

  if (!lines.length) return;

  /* Durée délai = durée preloader (~2.2s) */
  const delay = 2.3;

  const tl = gsap.timeline({ delay });

  if (eyebrow) {
    tl.from(eyebrow, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    });
  }

  tl.from(lines, {
    yPercent: 110,
    opacity: 0,
    duration: 1.0,
    stagger: 0.12,
    ease: 'power4.out'
  }, eyebrow ? '-=0.3' : 0);

  if (heroSub) {
    tl.from(heroSub, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.4');
  }

  if (heroCta) {
    tl.from(heroCta.children, {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');
  }

  if (heroStats) {
    tl.from(heroStats.children, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3');
  }
}

/* ================================================================
   4. MARQUEE INFINITE LOOP
================================================================ */
function initMarquee() {
  const tracks = document.querySelectorAll('.marquee-track');

  tracks.forEach(track => {
    const items = track.innerHTML;
    /* Duplique pour loop sans gap visible */
    track.innerHTML = items + items;

    const totalWidth = track.scrollWidth / 2;
    const dir = track.dataset.dir === 'rtl' ? totalWidth : -totalWidth;
    const speed = parseFloat(track.dataset.speed) || 25; /* secondes */

    /* Garde une référence au tween pour contrôler timeScale */
    const tween = gsap.to(track, {
      x: dir,
      duration: speed,
      ease: 'none',
      repeat: -1
    });

    /* Ralentit au survol — méthode correcte : .timeScale() sur le tween */
    track.addEventListener('mouseenter', () => {
      gsap.to(tween, { timeScale: 0.3, duration: 0.4, ease: 'power2.out' });
    });
    track.addEventListener('mouseleave', () => {
      gsap.to(tween, { timeScale: 1, duration: 0.4, ease: 'power2.in' });
    });
  });
}

/* ================================================================
   5. HORIZONTAL SCROLL — Services Journey
================================================================ */
function initHorizontalScroll() {
  const wrapper = document.querySelector('.services-h-wrapper');
  const track   = document.querySelector('.services-h-track');

  if (!wrapper || !track || isMobile()) return;

  const panels = track.querySelectorAll('.service-panel');
  if (!panels.length) return;

  /* Largeur totale à parcourir */
  const totalWidth = track.scrollWidth - window.innerWidth;

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(track, {
    x: () => -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      pin: true,
      scrub: 1.2,
      end: () => '+=' + (track.scrollWidth - window.innerWidth),
      invalidateOnRefresh: true
    }
  });

  /* Anime chaque panel au moment où il entre dans le viewport */
  panels.forEach((panel, i) => {
    const title    = panel.querySelector('.sp-title');
    const number   = panel.querySelector('.sp-number');
    const desc     = panel.querySelector('.sp-desc');
    const tag      = panel.querySelector('.sp-tag');

    gsap.from([number, title, desc, tag].filter(Boolean), {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: panel,
        containerAnimation: gsap.utils.toArray('.services-h-track > *')[0]
          ? ScrollTrigger.getAll().find(st => st.trigger === wrapper)
          : undefined,
        start: 'left 80%',
        horizontal: true
      }
    });
  });
}

/* ================================================================
   6. MAGNETIC BUTTONS
================================================================ */
function initMagneticButtons() {
  if (isTouch()) return;

  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.35;
      const dy   = (e.clientY - cy) * 0.35;

      gsap.to(btn, {
        x: dx,
        y: dy,
        duration: 0.3,
        ease: 'power3.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

/* ================================================================
   7. SCROLL REVEALS — Sections
================================================================ */
function initScrollReveals() {
  gsap.registerPlugin(ScrollTrigger);

  /* Section titles */
  document.querySelectorAll('.reveal-title').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
  });

  /* Process steps */
  const steps = document.querySelectorAll('.process-step-v2');
  if (steps.length) {
    gsap.from(steps, {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: steps[0].parentElement,
        start: 'top 80%'
      }
    });
  }

  /* CTA section */
  const ctaHeadline = document.querySelector('.cta-headline');
  if (ctaHeadline) {
    gsap.from(ctaHeadline, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaHeadline,
        start: 'top 80%'
      }
    });
  }

  /* Stats counter */
  document.querySelectorAll('.stat-counter').forEach(el => {
    const target = parseFloat(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const isFloat = el.dataset.float === 'true';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = (isFloat
              ? this.targets()[0].val.toFixed(1)
              : Math.round(this.targets()[0].val)) + suffix;
          }
        });
      }
    });
  });
}

/* ================================================================
   8. GSAP — Text Glitch on Logo Hover
================================================================ */
function initLogoGlitch() {
  const logo = document.querySelector('.nav-logo');
  if (!logo || isTouch()) return;

  const original = logo.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%';

  logo.addEventListener('mouseenter', () => {
    let iteration = 0;
    const interval = setInterval(() => {
      logo.textContent = original
        .split('')
        .map((char, idx) => {
          if (idx < iteration) return original[idx];
          return char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      if (iteration >= original.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 35);
  });
}

/* ================================================================
   9. PARALLAX — Hero background orbs
================================================================ */
function initHeroParallax() {
  const orbs = document.querySelectorAll('.cin-orb');
  if (!orbs.length || prefersReducedMotion()) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 18;
      gsap.to(orb, {
        x: dx * depth,
        y: dy * depth,
        duration: 1.2,
        ease: 'power2.out'
      });
    });
  });
}

/* ================================================================
   10. NAVBAR — hide on scroll down, show on scroll up
================================================================ */
function initSmartNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > lastScroll && current > 120) {
      /* Scrolling DOWN — hide navbar */
      gsap.to(navbar, {
        yPercent: -110,
        duration: 0.4,
        ease: 'power3.out'
      });
    } else {
      /* Scrolling UP — show navbar */
      gsap.to(navbar, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
    }

    lastScroll = current < 0 ? 0 : current;
  }, { passive: true });
}

/* ================================================================
   INIT ALL
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* Reduced motion : désactive toutes les animations non essentielles */
  if (prefersReducedMotion()) {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.remove();
    document.body.style.overflow = 'auto';
    return;
  }

  initPreloader();
  initCursor();
  initHeroEntrance();
  initMarquee();
  initHorizontalScroll();
  initMagneticButtons();
  initScrollReveals();
  initLogoGlitch();
  initHeroParallax();
  initSmartNavbar();

  /* Refresh ScrollTrigger après resize */
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});
