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

    // ===== 5. 隐藏彩蛋：鬼图区入口 =====
    setupGhostEasterEgg();

  });

  // 计算 ghost.html 的相对路径（子目录页面也能正确跳转）
  function ghostUrl() {
    var path = location.pathname.replace(/\\/g, '/');
    var inHtmlDir = /\/html\/[^/]*$/.test(path);
    return (inHtmlDir ? '../' : '') + 'ghost.html';
  }

  function setupGhostEasterEgg() {
    // 已经在鬼图页就不再绑定
    if (/ghost\.html$/i.test(location.pathname)) return;

    // --- 触发方式 A: Konami 秘籍 ↑↑↓↓←→←→ B A ---
    var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var pos = 0;
    document.addEventListener('keydown', function (e) {
      var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = (key === KONAMI[pos]) ? pos + 1 : (key === KONAMI[0] ? 1 : 0);
      if (pos === KONAMI.length) {
        pos = 0;
        location.href = ghostUrl();
      }
    });

    // --- 触发方式 B: 连点页脚的 ❤ 七次 ---
    var heart = document.querySelector('.footer-bottom .heart');
    if (heart) {
      var taps = 0, timer;
      heart.style.cursor = 'default';
      heart.addEventListener('click', function () {
        taps++;
        clearTimeout(timer);
        timer = setTimeout(function () { taps = 0; }, 1500);
        if (taps >= 7) {
          taps = 0;
          location.href = ghostUrl();
        }
      });
    }
  }
})();
