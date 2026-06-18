/**
 * La Familia Restaurante — script.js
 * Features:
 *  - Smooth scroll for nav links (anchors)
 *  - Header gets solid dark background when scrolled past 80px
 *  - Hamburger menu toggle for mobile
 *  - Intersection Observer fade-in for .fade-in elements
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. SMOOTH SCROLL
     (CSS scroll-behavior: smooth handles most cases, but this
      also closes the mobile menu and works on older browsers)
     --------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        // Close mobile nav if open
        closeNav();

        // Offset for fixed header height
        var headerHeight = document.getElementById('header').offsetHeight;
        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ---------------------------------------------------------
     2. HEADER SCROLL BEHAVIOUR
     Adds/removes .scrolled class when user scrolls past 80px
     --------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById('header');
    var SCROLL_THRESHOLD = 80;

    function updateHeader() {
      if (window.pageYOffset > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Run on load in case page is already scrolled
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---------------------------------------------------------
     3. HAMBURGER MENU
     --------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var isNavOpen = false;

  function openNav() {
    isNavOpen = true;
    nav.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!isNavOpen) return;
    isNavOpen = false;
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  function initHamburger() {
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function () {
      if (isNavOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (isNavOpen && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeNav();
      }
    });

    // Close nav on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isNavOpen) {
        closeNav();
        hamburger.focus();
      }
    });

    // Close nav when resizing to desktop width
    window.addEventListener('resize', function () {
      if (window.innerWidth > 680 && isNavOpen) {
        closeNav();
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     4. INTERSECTION OBSERVER — FADE-IN
     Adds .visible to .fade-in elements when they enter viewport
     --------------------------------------------------------- */
  function initFadeIn() {
    var fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      fadeElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible — no need to re-trigger
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------
     5. INIT
     --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initSmoothScroll();
    initHeader();
    initHamburger();
    initFadeIn();
  });

})();
