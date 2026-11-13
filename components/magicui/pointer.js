/**
 * Magic UI - Pointer Component (Vanilla JS Version)
 * Based on https://magicui.design/docs/components/pointer
 */

function initPointer(targetSelector, options = {}) {
  const elements = typeof targetSelector === 'string'
    ? Array.from(document.querySelectorAll(targetSelector))
    : (Array.isArray(targetSelector) ? targetSelector : [targetSelector]);

  if (!elements.length) return null;

  const {
    label = "",
    iconColor = "#d5fc78", // Nexo green
    glow = true,           // Radiant glow effect
    glowColor = "#d5fc78", // Nexo green glow
    badgeBg = "#182016",
    badgeText = "#f4f5ef",
    badgeBorder = "#323b2e",
    customContent = null,
  } = options;

  // Create single follower element
  const follower = document.createElement('div');
  follower.className = 'magic-pointer-follower fixed z-[9999] pointer-events-none select-none transition-transform duration-100 ease-out';
  follower.style.opacity = '0';
  follower.style.transform = 'translate(-2px, -2px) scale(0)';
  follower.style.willChange = 'transform, left, top';

  const glowFilter = glow 
    ? `filter: drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 14px ${glowColor}88);`
    : 'filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));';

  if (customContent) {
    follower.innerHTML = customContent;
  } else {
    follower.innerHTML = `
      <div class="pointer-wrapper relative flex items-center gap-2.5">
        <!-- Minimalist Glowing Halo behind the cursor tip -->
        ${glow ? `
          <div class="absolute -top-2.5 -left-2.5 w-8 h-8 rounded-full pointer-events-none" 
               style="background: radial-gradient(circle, ${glowColor}40 0%, ${glowColor}10 50%, transparent 75%); filter: blur(2px);">
          </div>
        ` : ''}

        <!-- Custom SVG Pointer with Nexo Green Glow -->
        <svg stroke="#0e110e" stroke-width="1.2" viewBox="0 0 16 16" height="24" width="24" 
             class="rotate-[-70deg] transition-all duration-150 transform" 
             style="color: ${iconColor}; fill: ${iconColor}; ${glowFilter}">
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>

        <!-- Optional Badge -->
        ${label ? `
          <div class="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-2xl border backdrop-blur-md" 
               style="background-color: ${badgeBg}; color: ${badgeText}; border-color: ${badgeBorder};">
            ${label}
          </div>
        ` : ''}
      </div>
    `;
  }

  document.body.appendChild(follower);

  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let rafId = null;
  let isHovered = false;

  function render() {
    // Smooth lerp following
    currentX += (targetX - currentX) * 0.38;
    currentY += (targetY - currentY) * 0.38;

    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;

    if (isHovered) {
      rafId = requestAnimationFrame(render);
    }
  }

  elements.forEach(el => {
    el.style.cursor = 'none';

    el.addEventListener('mouseenter', (e) => {
      isHovered = true;
      targetX = e.clientX;
      targetY = e.clientY;
      currentX = e.clientX;
      currentY = e.clientY;

      follower.style.opacity = '1';
      follower.style.transform = 'translate(-2px, -2px) scale(1)';

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    });

    el.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    el.addEventListener('mouseleave', () => {
      isHovered = false;
      follower.style.opacity = '0';
      follower.style.transform = 'translate(-2px, -2px) scale(0)';
      cancelAnimationFrame(rafId);
    });

    el.addEventListener('mousedown', () => {
      follower.style.transform = 'translate(-2px, -2px) scale(0.85)';
    });

    el.addEventListener('mouseup', () => {
      follower.style.transform = 'translate(-2px, -2px) scale(1)';
    });
  });

  return {
    destroy: () => {
      cancelAnimationFrame(rafId);
      follower.remove();
      elements.forEach(el => el.style.cursor = '');
    }
  };
}

if (typeof window !== 'undefined') {
  window.initPointer = initPointer;
}
