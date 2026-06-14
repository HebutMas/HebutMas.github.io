/**
 * 山海机甲战队 — 导航栏交互
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('nav ul');
    var header = document.querySelector('header');
    var navLinks = document.querySelectorAll('nav ul li a');

    // ========== 汉堡菜单逻辑 ==========
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    document.addEventListener('click', function (e) {
      if (!navMenu.classList.contains('active')) return;
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 968 && navMenu.classList.contains('active')) {
          closeMenu();
        }
      }, 150);
    });

    function closeMenu() {
      if (!navMenu.classList.contains('active')) return;
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    // ========== 导航栏滚动阴影 ==========
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  });
})();
