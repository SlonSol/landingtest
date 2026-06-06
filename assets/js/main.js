document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Listener ---
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      if (isLight) {
        document.documentElement.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // --- Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.header-nav a');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('nav-toggle-active');
      navMenu.classList.toggle('nav-menu-active');
      document.body.classList.toggle('menu-open'); // Prevent scrolling behind menu
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('nav-menu-active')) {
          toggleMenu();
        }
      });
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerPanel = item.querySelector('.faq-answer');

    if (questionButton && answerPanel) {
      questionButton.addEventListener('click', () => {
        const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherButton = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherButton && otherAnswer) {
              otherButton.setAttribute('aria-expanded', 'false');
              otherAnswer.style.maxHeight = null;
              otherItem.classList.remove('faq-item-active');
            }
          }
        });

        // Toggle current item
        questionButton.setAttribute('aria-expanded', !isExpanded);
        item.classList.toggle('faq-item-active');

        if (!isExpanded) {
          answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
        } else {
          answerPanel.style.maxHeight = null;
        }
      });
    }
  });

  // --- Smooth Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('reveal-visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
});
