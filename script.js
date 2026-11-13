// ==========================================================================
// NEXO — Interactive & Responsive Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header background blur on scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle & Accessibility
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenuBtn.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    mobileMenu.classList.remove('-translate-y-[120%]', 'opacity-0', 'pointer-events-none');
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    mobileMenu.classList.add('-translate-y-[120%]', 'opacity-0', 'pointer-events-none');
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenuBtn.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside header / mobile menu
    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // 3. FAQ Accordion (Clean Single/Multi toggle with smooth state updates)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      // Close all other items for a clean single-open accordion
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.classList.add('hidden');
          otherAnswer.classList.remove('block');
          otherIcon.textContent = '＋';
        }
      });

      // Toggle current item
      if (isExpanded) {
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.classList.add('hidden');
        answer.classList.remove('block');
        icon.textContent = '＋';
      } else {
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.classList.remove('hidden');
        answer.classList.add('block');
        icon.textContent = '−';
      }
    });
  });

  // 4. Modal Dialog Functionality
  window.openContactModal = function() {
    closeMobileMenu();
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
      }, 150);
    }
  };

  window.closeContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeContactModal();
      closeMobileMenu();
    }
  });

  // Close modal when clicking backdrop
  const contactModal = document.getElementById('contactModal');
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        window.closeContactModal();
      }
    });
  }

  // Handle contact form submission
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const name = nameInput ? nameInput.value : 'Cliente';
    alert(`Obrigado pelo contato, ${name}! Recebemos sua mensagem e entraremos em contato.`);
    window.closeContactModal();
    e.target.reset();
  };

  // 5. Kokonut UI Topo Background Initialization
  if (typeof initTopoBackground === 'function') {
    initTopoBackground('.hero-section', {
      speed: 0.75,
      interval: 0.07,
      interactive: true,
      seed: 28,
      labels: true,
      color: '#d5fc78', // Nexo brand green for high-visibility contrast
      minorAlpha: 0.22,
      majorAlpha: 0.58
    });
  }

  // 6. Kokonut UI Scroll Index Initialization
  if (typeof initScrollIndex === 'function') {
    initScrollIndex({
      selector: "section[data-index-title]",
      scroller: "window",
      railHeight: 280,
      accentColor: "#d5fc78",
      activeColor: "#d5fc78",
      passedColor: "#a7b09f",
      aheadColor: "#323b2e"
    });
  }

  // 7. Magic UI Pointer Initialization
  if (typeof initPointer === 'function') {
    // Flow card cursor
    initPointer('#projectFlow', {
      label: 'Flow · Gestão Financeira ↗',
      iconColor: '#d5fc78',
      badgeBg: '#172419',
      badgeText: '#e4f7d1',
      badgeBorder: '#34452e'
    });

    // Forma card cursor
    initPointer('#projectForma', {
      label: 'Forma · Arquitetura ↗',
      iconColor: '#e4d5b7',
      badgeBg: '#413e33',
      badgeText: '#f8f5ec',
      badgeBorder: '#ded9cc'
    });
  }
});
