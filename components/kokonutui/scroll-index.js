/**
 * Kokonut UI - Scroll Index (Vanilla JS Version)
 * Based on @dorianbaffier (https://kokonutui.com/r/scroll-index.json)
 */

function initScrollIndex(options = {}) {
  const {
    selector = "h2, section[id]",
    scroller = "window",
    container = document.body,
    railHeight = 280,
    accentColor = "#d5fc78",
    activeColor = "#d5fc78",
    passedColor = "#a7b09f",
    aheadColor = "#323b2e",
  } = options;

  const OFFSET = 80;
  const SWELL = 1.6;
  const REACH = 26;
  const SNAP = 18;
  const FLASH = 900;

  // Create rail element
  let nav = document.querySelector('.kokonut-scroll-index');
  if (nav) nav.remove();

  nav = document.createElement('nav');
  nav.className = 'kokonut-scroll-index fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end select-none';
  nav.setAttribute('aria-label', 'Índice de seções');

  const rail = document.createElement('div');
  rail.className = 'relative w-12 cursor-pointer touch-none';
  rail.style.height = `${railHeight}px`;

  // Reader head marker
  const head = document.createElement('span');
  head.className = 'pointer-events-none absolute top-0 right-0 h-[2.5px] w-6 -translate-y-1/2 rounded-full will-change-transform transition-colors duration-200 shadow-sm';
  head.style.backgroundColor = accentColor;

  // Floating label tooltip
  const label = document.createElement('span');
  label.className = 'pointer-events-none absolute top-0 right-9 whitespace-nowrap rounded-md border border-[#323b2e] bg-[#1b211a] px-2.5 py-1 font-medium text-[11px] text-[#f4f5ef] opacity-0 shadow-xl transition-all duration-150 ease-out z-50';

  rail.appendChild(head);
  rail.appendChild(label);
  nav.appendChild(rail);
  document.body.appendChild(nav);

  let sections = [];
  let tickBtns = [];
  let start = 0;
  let end = 1;
  let active = -1;
  let flashTimer = 0;
  let drag = null;

  const getScroll = () => window.scrollY;
  const setScroll = (val) => window.scrollTo({ top: val, behavior: 'smooth' });

  function measure() {
    const scroll = getScroll();
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    start = 0;
    end = Math.max(docHeight - winHeight, 1);

    const elements = Array.from(document.querySelectorAll(selector)).filter(el => {
      // Exclude hidden elements or modals
      return el.offsetParent !== null && !el.closest('#contactModal') && !el.closest('#mobileMenu');
    });

    sections = elements.map(el => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + scroll - OFFSET;
      let text = el.getAttribute('data-index-title') || el.innerText || el.id;
      // Clean up text
      text = text.split('\n')[0].trim();
      if (text.length > 30) text = text.substring(0, 28) + '…';
      return {
        el,
        text,
        at: Math.max(top, 0),
        pos: Math.min(Math.max(top / end, 0), 1)
      };
    });

    // Rebuild tick buttons
    rail.querySelectorAll('button.scroll-tick').forEach(b => b.remove());
    tickBtns = [];

    sections.forEach((sec, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'scroll-tick absolute right-0 h-4 -translate-y-1/2 outline-none group flex items-center justify-end';
      btn.style.width = '24px';
      btn.style.top = `${(sec.pos * 100).toFixed(2)}%`;
      btn.setAttribute('aria-label', sec.text);

      const bar = document.createElement('span');
      bar.className = 'tick-bar h-[2px] rounded-full transition-all duration-200 origin-right';
      bar.style.width = '14px';
      bar.style.backgroundColor = aheadColor;
      bar.style.transform = 'scaleX(1)';

      btn.appendChild(bar);
      rail.appendChild(btn);
      tickBtns.push(btn);

      btn.addEventListener('click', () => jump(idx));
      btn.addEventListener('mouseenter', () => show(idx));
      btn.addEventListener('mouseleave', hideLabel);
    });

    update();
  }

  function show(idx) {
    if (!sections[idx]) return;
    label.innerText = sections[idx].text;
    label.style.top = `${sections[idx].pos * railHeight}px`;
    label.style.opacity = '1';
    label.style.transform = 'translateY(-50%) translateX(0)';
    clearTimeout(flashTimer);
  }

  function hideLabel() {
    label.style.opacity = '0';
    label.style.transform = 'translateY(-50%) translateX(4px)';
  }

  function jump(idx) {
    if (!sections[idx]) return;
    setScroll(sections[idx].at);
    show(idx);
    clearTimeout(flashTimer);
    flashTimer = setTimeout(hideLabel, FLASH);
  }

  function update() {
    if (sections.length === 0) return;
    const scroll = getScroll();
    const t = Math.min(Math.max((scroll - start) / (end - start), 0), 1);

    // Update reader head position
    head.style.transform = `translateY(${t * railHeight}px)`;

    // Find active section
    let curr = 0;
    for (let i = 0; i < sections.length; i++) {
      if (scroll >= sections[i].at - 10) {
        curr = i;
      }
    }

    if (curr !== active) {
      active = curr;
      tickBtns.forEach((btn, i) => {
        const bar = btn.querySelector('.tick-bar');
        if (!bar) return;
        if (i === active) {
          bar.style.backgroundColor = activeColor;
          bar.style.width = '22px';
        } else if (i < active) {
          bar.style.backgroundColor = passedColor;
          bar.style.width = '14px';
        } else {
          bar.style.backgroundColor = aheadColor;
          bar.style.width = '14px';
        }
      });
    }
  }

  // Pointer hover swell effect (Dock-like)
  rail.addEventListener('pointermove', (e) => {
    const rect = rail.getBoundingClientRect();
    const y = e.clientY - rect.top;

    tickBtns.forEach((btn, i) => {
      const tickY = sections[i].pos * railHeight;
      const dist = Math.abs(y - tickY);
      const bar = btn.querySelector('.tick-bar');
      if (!bar) return;

      if (dist < REACH) {
        const factor = 1 + (SWELL - 1) * Math.cos((dist / REACH) * (Math.PI / 2));
        bar.style.transform = `scaleX(${factor.toFixed(2)})`;
      } else {
        bar.style.transform = 'scaleX(1)';
      }
    });
  });

  rail.addEventListener('pointerleave', () => {
    tickBtns.forEach(btn => {
      const bar = btn.querySelector('.tick-bar');
      if (bar) bar.style.transform = 'scaleX(1)';
    });
    hideLabel();
  });

  // Dragging support on the rail
  rail.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    rail.setPointerCapture(e.pointerId);
    drag = { id: e.pointerId };

    const onPointerMove = (moveEvent) => {
      if (!drag) return;
      const rect = rail.getBoundingClientRect();
      const y = Math.min(Math.max(moveEvent.clientY - rect.top, 0), railHeight);
      const frac = y / railHeight;
      window.scrollTo(0, frac * end);

      // Show closest section label
      let closestIdx = 0;
      let minDist = Infinity;
      sections.forEach((sec, idx) => {
        const d = Math.abs(sec.pos - frac);
        if (d < minDist) {
          minDist = d;
          closestIdx = idx;
        }
      });
      show(closestIdx);
    };

    const onPointerUp = (upEvent) => {
      rail.releasePointerCapture(upEvent.pointerId);
      drag = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      clearTimeout(flashTimer);
      flashTimer = setTimeout(hideLabel, FLASH);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  });

  // Listeners
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', measure);

  // Initialize
  measure();
  update();

  console.log('[ScrollIndex] Initialized with', sections.length, 'sections');

  return {
    destroy: () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      nav.remove();
    },
    refresh: measure
  };
}

if (typeof window !== 'undefined') {
  window.initScrollIndex = initScrollIndex;
}
