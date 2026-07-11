/*
 * @Author: sji733055-glitch sji733055@gmail.com
 * @Date: 2026-07-09 21:39:53
 * @LastEditors: sji733055-glitch sji733055@gmail.com
 * @LastEditTime: 2026-07-11 14:54:44
 * @FilePath: \web\js\ghost.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 山海机甲战队 — 鬼图区（隐藏彩蛋页）
 * 存放比赛/训练的搞笑名场面。
 * 添加鬼图：把图片放进 source/photos/ghost/ ，然后在下方 GHOST_DATA 里加一条。
 */
(function () {
  'use strict';

  var PHOTO_BASE = 'source/photos/ghost/';

  // ============================================================
  //  鬼图数据 — 在此处添加/修改
  //  src:    图片文件名（放在 source/photos/ghost/ 下）
  //  title:  一句话吐槽 / 名场面标题
  // ============================================================
  var GHOST_DATA = [
    { src: 'ghost_01.jpg', title: '鬼图 · 01' },
    { src: 'ghost_02.jpg', title: '鬼图 · 02' },
    { src: 'ghost_03.jpg', title: '鬼图 · 03' },
    { src: 'ghost_04.jpg', title: '鬼图 · 04' },
    { src: 'ghost_05.jpg', title: '鬼图 · 05' },
    { src: 'ghost_06.jpg', title: '鬼图 · 06' },
    { src: 'ghost_07.jpg', title: '鬼图 · 07' },
    { src: 'ghost_08.jpg', title: '鬼图 · 08' },
    { src: 'ghost_09.jpg', title: '鬼图 · 09' },
    { src: 'ghost_10.jpg', title: '鬼图 · 10' },
    { src: 'ghost_11.jpg', title: '鬼图 · 11' },
    { src: 'ghost_12.jpg', title: '鬼图 · 12' },
    { src: 'ghost_13.jpg', title: '鬼图 · 13' },
    { src: 'ghost_14.jpg', title: '鬼图 · 14' },
    { src: 'ghost_15.jpg', title: '鬼图 · 15' },
    { src: 'ghost_16.jpg', title: '鬼图 · 16' },
    { src: 'ghost_17.jpg', title: '鬼图 · 17' },
    { src: 'ghost_18.jpg', title: '鬼图 · 18' },
    { src: 'ghost_19.jpg', title: '鬼图 · 19' },
    { src: 'ghost_20.jpg', title: '鬼图 · 20' },
    { src: 'ghost_21.jpg', title: '鬼图 · 21' },
    { src: 'ghost_22.jpg', title: '鬼图 · 22' },
    { src: 'ghost_23.jpg', title: '鬼图 · 23' },
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('ghost-grid');
    var lightbox = document.getElementById('ghost-lightbox');
    var lightboxImg = document.getElementById('ghost-lightbox-img');
    var lightboxTitle = document.getElementById('ghost-lightbox-title');
    var lightboxClose = document.getElementById('ghost-lightbox-close');

    if (!grid) return;

    renderGhost(grid);

    if (!lightbox) return;

    grid.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery-item');
      if (!item) return;
      var src = item.getAttribute('data-src');
      var title = item.getAttribute('data-title');
      if (!src) return;
      lightboxImg.src = PHOTO_BASE + src;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  });

  // --- 渲染鬼图 ---
  function renderGhost(grid) {
    grid.innerHTML = '';

    if (GHOST_DATA.length === 0) {
      grid.innerHTML =
        '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:60px 20px;">' +
        '👻 鬼图收集中……<br>把名场面丢进 <code>source/photos/ghost/</code> 就能显灵了</p>';
      return;
    }

    GHOST_DATA.forEach(function (photo) {
      var item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-src', photo.src);
      item.setAttribute('data-title', photo.title);

      if (photo.src) {
        var img = document.createElement('img');
        img.src = PHOTO_BASE + photo.src;
        img.alt = photo.title;
        img.loading = 'lazy';
        item.appendChild(img);

        var overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.textContent = photo.title;
        item.appendChild(overlay);
      } else {
        var placeholder = document.createElement('div');
        placeholder.className = 'gallery-placeholder';
        placeholder.textContent = '👻 ' + photo.title;
        item.appendChild(placeholder);
      }

      grid.appendChild(item);
    });
  }
})();
