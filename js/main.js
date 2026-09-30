/* -------------------------------------------------------------
   GAMING VAULT - MAIN UI INTERACTIVITY ENGINE
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initRoomFilters();
  initFAQAccordion();
  initScrollAnimations();
});

// Sticky header styling on scroll
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('bg-opacity-95', 'shadow-lg', 'border-b', 'border-cyan-500/30');
      } else {
        navbar.classList.remove('shadow-lg', 'border-cyan-500/30');
      }
    });
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Room category tab filtering
function initRoomFilters() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const roomCards = document.querySelectorAll('.room-card');

  if (!tabBtns.length || !roomCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.dataset.filter;

      roomCards.forEach(card => {
        if (filterCategory === 'all' || card.dataset.category === filterCategory) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// FAQ Accordion Toggle
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all active items first
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Intersection Observer for scroll reveal micro-animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.reveal-on-scroll');
  animateElements.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-6');
    observer.observe(el);
  });
}
