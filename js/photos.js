/**
 * 山海机甲战队 — 战队图集渲染器
 * 添加照片：放入 source/photos/gallery/ + 在下方 GALLERY_DATA 中加一条
 */
(function () {
  'use strict';

  var PHOTO_BASE = '../source/photos/gallery/';

  // ============================================================
  // 图集数据 — 在此处添加/修改照片
  // src:  照片文件名（放在 source/photos/gallery/ 下）
  // title: 照片标题
  // cat:  分类（可选，用于未来筛选功能）
  // ============================================================
  var GALLERY_DATA = [
    { src: 'match2023_1.jpg', title: '2023赛季 · 比赛现场一', cat: '比赛现场' },
    { src: 'match2023_2.jpg', title: '2023赛季 · 比赛现场二', cat: '比赛现场' },
    { src: 'match2023_3.jpg', title: '2023赛季 · 比赛现场三', cat: '比赛现场' },
    { src: 'match2023_4.jpg', title: '2023赛季 · 比赛现场四', cat: '比赛现场' }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('gallery-grid');
    var lightbox = document.getElementById('gallery-lightbox');
    var lightboxImg = document.getElementById('gallery-lightbox-img');
    var lightboxTitle = document.getElementById('gallery-lightbox-title');
    var lightboxClose = document.getElementById('gallery-lightbox-close');

    if (!grid) return;

    // --- 渲染照片卡片 ---
    renderGallery(grid);

    // --- 灯箱逻辑 ---
    if (!lightbox) return;

    // 点击卡片打开灯箱
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

    // 关闭灯箱
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
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  });

  // --- 渲染图集 ---
  function renderGallery(grid) {
    grid.innerHTML = '';

    if (GALLERY_DATA.length === 0) {
      grid.innerHTML =
        '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px;">' +
        '📷 暂无照片，敬请期待</p>';
      return;
    }

    GALLERY_DATA.forEach(function (photo) {
      var item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-src', photo.src);
      item.setAttribute('data-title', photo.title);

      if (photo.src) {
        // 有照片：显示图片
        var img = document.createElement('img');
        img.src = PHOTO_BASE + photo.src;
        img.alt = photo.title;
        img.loading = 'lazy';
        item.appendChild(img);

        // 悬停标题覆盖层
        var overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.textContent = photo.title;
        item.appendChild(overlay);
      } else {
        // 无照片：显示占位符（放照片后会自动替换）
        var placeholder = document.createElement('div');
        placeholder.className = 'gallery-placeholder';
        placeholder.textContent = '📷 ' + photo.title;
        item.appendChild(placeholder);
      }

      grid.appendChild(item);
    });
  }
})();
