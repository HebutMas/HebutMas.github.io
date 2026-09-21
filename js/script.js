/**
 * 山海机甲战队 — 全局脚本
 *
 * 约定：
 * - 入场动画只加/删 .reveal / .is-visible 类，不写内联样式（内联 transform 会压掉 :hover）
 * - 所有动效在 prefers-reduced-motion: reduce 下一律跳过
 * - 移动端菜单只有这一处实现（不要再引入第二份绑定逻辑）
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  document.addEventListener('DOMContentLoaded', function () {

    // ===== 1. 导航栏滚动状态 + 当前区块高亮 =====
    var header = document.querySelector('header');
    var navLinks = document.querySelectorAll('#nav-links a');
    var allSections = document.querySelectorAll('section[id], .hero-section');

    function updateNavOnScroll() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (header) header.classList.toggle('scrolled', scrollY > 50);

      var current = '';
      allSections.forEach(function (sec) {
        var id = sec.getAttribute('id');
        if (!id) return;
        if (scrollY >= sec.offsetTop - 150 && scrollY < sec.offsetTop + sec.offsetHeight - 100) {
          current = id;
        }
      });

      navLinks.forEach(function (link) {
        var href = link.getAttribute('href') || '';
        // 只管理页内锚点的当前态；子页面上静态写的 aria-current="page" 不动
        if (href.indexOf('#') === -1) return;
        var isActive = href === 'index.html#' + current || href === '#' + current ||
          (href === 'index.html' && current === 'home');
        link.classList.toggle('nav-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current') === 'true') {
          link.removeAttribute('aria-current');
        }
      });
    }
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
    updateNavOnScroll();

    // ===== 2. 移动端菜单 =====
    var menuToggle = document.getElementById('menu-toggle');
    var navList = document.getElementById('nav-links');

    if (menuToggle && navList) {
      var setMenu = function (open) {
        menuToggle.classList.toggle('active', open);
        navList.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
          var first = navList.querySelector('a');
          if (first) first.focus();
        }
      };

      menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setMenu(!navList.classList.contains('active'));
      });

      navLinks.forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
      });

      document.addEventListener('click', function (e) {
        if (!navList.classList.contains('active')) return;
        if (!navList.contains(e.target) && !menuToggle.contains(e.target)) setMenu(false);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
          setMenu(false);
          menuToggle.focus();
        }
      });

      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (window.innerWidth > 768 && navList.classList.contains('active')) setMenu(false);
        }, 150);
      });
    }

    // ===== 3. 向下探索按钮 =====
    var scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
      scrollHint.addEventListener('click', function () {
        var about = document.getElementById('about');
        if (about) about.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      });
    }

    // ===== 4. 背景视频控制 =====
    setupHeroVideo();

    // ===== 5. 留言表单（静态站点，没有后端） =====
    // 不假装提交成功：合法提交后如实说明并给出替代路径。
    document.querySelectorAll('form[data-static-form]').forEach(function (form) {
      var status = form.querySelector('[data-form-status]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (status) {
          status.dataset.state = 'ok';
          status.textContent = '这是纯静态站点，留言没有接入后端。请直接发邮件至 sji733055@gmail.com，我们会尽快回复。';
        }
      });
    });

    // ===== 6. 隐藏彩蛋：鬼图区入口 =====
    setupGhostEasterEgg();

  });

  /**
   * 背景视频：可暂停（WCAG 2.2.2），离开视口或页面隐藏时停播。
   * 移动端与「减弱动态效果」下不加载视频（源码里 preload="none"），只显示封面图。
   */
  function setupHeroVideo() {
    var video = document.querySelector('.hero-video');
    var toggle = document.querySelector('.hero-media-toggle');
    if (!video) return;

    var isSmallScreen = window.matchMedia
      ? window.matchMedia('(max-width: 640px)').matches
      : false;

    if (reduceMotion.matches || isSmallScreen) {
      try { video.pause(); } catch (err) { /* 忽略 */ }
      video.removeAttribute('autoplay');
      var src = video.querySelector('source');
      if (src) src.removeAttribute('src');   // 断开下载，省流量
      try { video.load(); } catch (err) { /* 忽略 */ }
      if (toggle) toggle.remove();           // 没有视频就不需要控制按钮
      return;
    }

    if (toggle) {
      toggle.hidden = false;
      toggle.setAttribute('aria-pressed', 'false');
      toggle.addEventListener('click', function () {
        if (video.paused) {
          var p = video.play();
          if (p && typeof p.catch === 'function') p.catch(function () { /* 自动播放被拒时静默 */ });
          toggle.setAttribute('aria-pressed', 'false');
          toggle.setAttribute('aria-label', '暂停背景视频');
        } else {
          video.pause();
          toggle.setAttribute('aria-pressed', 'true');
          toggle.setAttribute('aria-label', '播放背景视频');
        }
      });
    }

    // 进入视口才开始播放（同时触发加载），离开视口暂停
    var p0 = video.play();
    if (p0 && typeof p0.catch === 'function') p0.catch(function () { /* 忽略 */ });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (toggle && toggle.getAttribute('aria-pressed') !== 'true') {
              var p = video.play();
              if (p && typeof p.catch === 'function') p.catch(function () { /* 忽略 */ });
            }
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.1 }).observe(video);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) video.pause();
    });
  }

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
    var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
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
