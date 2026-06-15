/**
 * 山海机甲战队 — 全局脚本
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ===== 1. 导航栏滚动 =====
    var header = document.getElementById('navbar');
    var navLinks = document.querySelectorAll('#nav-links a');
    var allSections = document.querySelectorAll('section[id], .hero-section');

    function updateNavOnScroll() {
      var scrollY = window.scrollY;
      if (header) {
        header.classList.toggle('scrolled', scrollY > 50);
      }

      var current = '';
      allSections.forEach(function (sec) {
        var id = sec.getAttribute('id');
        if (!id) return;
        if (scrollY >= sec.offsetTop - 150 && scrollY < sec.offsetTop + sec.offsetHeight - 100) {
          current = id;
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('nav-active');
        var href = link.getAttribute('href') || '';
        if (href === 'index.html#' + current || href === '#' + current ||
            (href === 'index.html' && current === 'home')) {
          link.classList.add('nav-active');
        }
      });
    }
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
    updateNavOnScroll();

    // ===== 2. 移动端菜单 =====
    var menuToggle = document.getElementById('menu-toggle');
    var navList = document.getElementById('nav-links');
    if (menuToggle && navList) {
      menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
      });
      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          menuToggle.classList.remove('active');
          navList.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    // ===== 3. 滚动指示器 =====
    var scrollIndicator = document.querySelector('.scroll-hint');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', function () {
        var about = document.getElementById('about');
        if (about) about.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // ===== 4. 滚动入场动画 =====
    var animEls = document.querySelectorAll('.group-card, .ach-card, .robot-card, .partner-card, .contact-row, .join-card, .highlight-item, .tech-card, .member-card, .forum-card, .repo-card');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.08 });

    animEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
      observer.observe(el);
    });

  });
})();
