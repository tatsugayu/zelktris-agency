/* ============================================================
   ZELKTRIS — Galaxy Canvas + Global Interactions
============================================================ */

// ── Galaxy Background ──────────────────────────────────────
(function initGalaxy() {
  const canvas = document.getElementById('galaxy-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars = [], nebulae = [], animId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function initStars() {
    stars = [];
    const count = Math.floor(W * H / 3000);
    for (let i = 0; i < count; i++) {
      const tier = Math.random();
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: tier < 0.6 ? randomBetween(0.3, 1.2) : tier < 0.9 ? randomBetween(1.2, 2.5) : randomBetween(2.5, 4),
        alpha: randomBetween(0.3, 1),
        speed: randomBetween(0.0002, 0.001),
        offset: Math.random() * Math.PI * 2,
        color: tier < 0.5 ? '#ffffff' : tier < 0.75 ? '#a0aaff' : tier < 0.9 ? '#FFD700' : '#ff88ff',
      });
    }

    nebulae = [];
    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * W,
        y: Math.random() * H,
        rx: randomBetween(200, 500),
        ry: randomBetween(100, 300),
        color: i % 2 === 0 ? '0,102,255' : '139,0,255',
        alpha: randomBetween(0.04, 0.1),
        angle: Math.random() * Math.PI * 2,
      });
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;

    // background gradient
    const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H));
    bg.addColorStop(0, 'rgba(20,0,40,1)');
    bg.addColorStop(0.5, 'rgba(8,0,20,1)');
    bg.addColorStop(1, 'rgba(4,0,10,1)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // nebulae
    nebulae.forEach(n => {
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.angle + t * 0.01);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx);
      grad.addColorStop(0, `rgba(${n.color},${n.alpha})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.scale(1, n.ry / n.rx);
      ctx.beginPath();
      ctx.arc(0, 0, n.rx, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });

    // stars
    stars.forEach(s => {
      const twinkle = 0.5 + 0.5 * Math.sin(t + s.offset / s.speed * 0.01);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha * twinkle;
      ctx.fill();

      // glow for big stars
      if (s.r > 2.5) {
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
        glow.addColorStop(0, s.color.replace('#', 'rgba(').replace(/(..)(..)(..)/, (m, r, g, b) => `${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)},0.3)`));
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.globalAlpha = s.alpha * twinkle * 0.5;
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    initStars();
    draw();
  });

  resize();
  initStars();
  draw();
})();

// ── Navbar scroll ──────────────────────────────────────────
(function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── Mobile menu ────────────────────────────────────────────
(function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const open = mobileMenu.classList.contains('open');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform=''; s.style.opacity=''; });
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }));
})();

// ── Scroll reveal ──────────────────────────────────────────
(function() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  // Révéler immédiatement les éléments déjà dans le viewport au chargement
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => { if (!el.classList.contains('visible')) obs.observe(el); });
})();

// ── Number counter animation ───────────────────────────────
(function() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el   = e.target;
      const end  = parseFloat(el.dataset.count);
      const suff = el.dataset.suffix || '';
      const dur  = 2000;
      const step = end / (dur / 16);
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = (cur % 1 !== 0 ? cur.toFixed(1) : Math.round(cur)) + suff;
        if (cur >= end) clearInterval(timer);
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();

// ── FAQ accordion ──────────────────────────────────────────
(function() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── Smooth active nav link ─────────────────────────────────
(function() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Cursor glow (desktop only) ─────────────────────────────
(function() {
  if (window.innerWidth < 900) return;
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;
    background:radial-gradient(circle,rgba(139,0,255,0.06),transparent 70%);
    transform:translate(-50%,-50%);transition:left 0.15s,top 0.15s;z-index:0;
  `;
  document.body.appendChild(glow);
  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
})();

// ── Testimonials drag scroll ───────────────────────────────
(function() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => { isDown=true; startX=e.pageX-track.offsetLeft; scrollLeft=track.scrollLeft; track.style.cursor='grabbing'; });
  track.addEventListener('mouseleave', () => { isDown=false; track.style.cursor=''; });
  track.addEventListener('mouseup', () => { isDown=false; track.style.cursor=''; });
  track.addEventListener('mousemove', e => {
    if (!isDown) return; e.preventDefault();
    track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX);
  });
})();
