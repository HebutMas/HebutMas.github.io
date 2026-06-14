/**
 * 山海机甲战队 — GitHub 开源项目加载器 + RoboMaster 论坛开源链接
 * 通过 GitHub API 拉取组织仓库并渲染为卡片列表
 */
(function () {
  'use strict';

  var GITHUB_ORG = 'HebutMas'; // GitHub 组织名
  var API_URL = 'https://api.github.com/orgs/' + GITHUB_ORG + '/repos?sort=updated&per_page=30';

  // --- 外部精选 GitHub 仓库（不通过 API 拉取，手动精选） ---
  // 格式: { name, description, html_url, language, stargazers_count, forks_count, updated_at }
  var FEATURED_REPOS = [
    {
      name: 'SP_Ultra_CAP',
      description: '山海机甲超级电容开源项目，包含硬件原理图与嵌入式固件',
      html_url: 'https://github.com/Sirius-RX/SP_Ultra_CAP',
      language: 'C',
      stargazers_count: '—',
      forks_count: '—',
      updated_at: null
    }
  ];

  // --- RoboMaster 论坛开源链接 ---
  // 在此数组中添加/修改论坛开源链接，每条记录包含 title、description、url、category
  var FORUM_LINKS = [
    {
      title: 'RM2025 半舵步兵开源',
      description: '半舵步兵完整三维图纸与说明文档，包含机械结构设计',
      url: 'https://bbs.robomaster.com/article/811147',
      category: '机械'
    },
    {
      title: 'RM2024-2025 山海机甲各兵种电控代码开源',
      description: '2024-2025赛季各兵种电控代码开源，包含步兵、英雄、哨兵等机器人嵌入式软件与控制算法',
      url: 'https://bbs.robomaster.com/article/810719?source=8',
      category: '电控'

    },
    {
      title: 'RM2025 平衡步兵完全开源',
      description: '平衡步兵完整形态技术文档与软件设计开源',
      url: 'https://bbs.robomaster.com/article/810688',
      category: '电控'
    },
    {
      title: 'RM2024 步兵电控代码开源',
      description: '2024赛季步兵电控代码，含控制算法与嵌入式软件',
      url: 'https://bbs.robomaster.com/article/83867',
      category: '电控'
    },
    {
      title: '2023RMUC 赛季规划开源',
      description: '2023赛季规划文档，战队建设与参赛策略参考',
      url: 'https://bbs.robomaster.com/article/9212',
      category: '赛季规划'
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var listEl = document.getElementById('projects-list');
    var searchInput = document.getElementById('repo-search-input');
    var forumListEl = document.getElementById('forum-links-list');

    // --- 渲染论坛链接 ---
    if (forumListEl) {
      renderForumLinks(forumListEl);
    }

    if (!listEl) return;

    var allRepos = [];

    // --- 渲染论坛链接卡片 ---
    function renderForumLinks(container) {
      container.innerHTML = '';

      if (FORUM_LINKS.length === 0) {
        container.innerHTML =
          '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:24px;' +
          'border:1px dashed var(--card-border);border-radius:var(--border-radius);">' +
          '📭 暂无论坛开源链接，敬请期待</p>';
        return;
      }

      FORUM_LINKS.forEach(function (link) {
        var card = document.createElement('a');
        card.className = 'forum-card';
        card.href = link.url;
        card.target = '_blank';
        card.rel = 'noopener';

        card.innerHTML =
          '<div class="forum-card-icon">📄</div>' +
          '<div class="forum-card-content">' +
            '<div class="forum-card-title">' +
              escapeHtml(link.title) +
              (link.category ? '<span class="forum-tag">' + escapeHtml(link.category) + '</span>' : '') +
            '</div>' +
            '<p class="forum-card-desc">' + escapeHtml(link.description || '暂无描述') + '</p>' +
          '</div>';

        container.appendChild(card);
      });
    }

    // --- 渲染 GitHub 卡片 ---
    function renderCards(repos) {
      listEl.innerHTML = '';

      if (repos.length === 0) {
        listEl.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px;">没有找到匹配的项目</p>';
        return;
      }

      repos.forEach(function (repo) {
        var card = document.createElement('a');
        card.className = 'repo-card';
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener';

        var isFeatured = repo.updated_at === null; // 外部精选仓库

        var langTag = repo.language
          ? '<span class="repo-lang">' + escapeHtml(repo.language) + '</span>'
          : '';

        var starsDisplay = typeof repo.stargazers_count === 'number'
          ? '⭐ ' + repo.stargazers_count
          : '⭐ —';
        var forksDisplay = typeof repo.forks_count === 'number'
          ? '🔄 ' + repo.forks_count
          : '🔄 —';
        var updatedDisplay = isFeatured
          ? '<span class="repo-updated">外部仓库</span>'
          : '<span class="repo-updated">' + formatDate(repo.updated_at) + '</span>';

        card.innerHTML =
          '<div class="repo-card-inner">' +
            '<h3 class="repo-name">' + (repo.fork ? '🍴 ' : '📦 ') + escapeHtml(repo.name) +
              (isFeatured ? '<span class="external-tag">精选</span>' : '') +
            '</h3>' +
            '<p class="repo-desc">' + escapeHtml(repo.description || '暂无描述') + '</p>' +
            '<div class="repo-meta">' +
              langTag +
              '<span>' + starsDisplay + '</span>' +
              '<span>' + forksDisplay + '</span>' +
              updatedDisplay +
            '</div>' +
          '</div>';

        listEl.appendChild(card);
      });
    }

    // --- 搜索过滤 ---
    function filterRepos() {
      var query = (searchInput && searchInput.value || '').trim().toLowerCase();
      if (!query) {
        renderCards(allRepos);
        return;
      }
      var filtered = allRepos.filter(function (repo) {
        var name = repo.name.toLowerCase();
        var desc = (repo.description || '').toLowerCase();
        return name.indexOf(query) !== -1 || desc.indexOf(query) !== -1;
      });
      renderCards(filtered);
    }

    if (searchInput) {
      searchInput.addEventListener('input', debounce(filterRepos, 300));
    }

    // --- 加载仓库 ---
    function loadRepos() {
      listEl.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px;">正在加载项目...</p>';

      fetch(API_URL)
        .then(function (res) {
          if (!res.ok) throw new Error('GitHub API error: ' + res.status);
          return res.json();
        })
        .then(function (repos) {
          allRepos = FEATURED_REPOS.concat(repos);
          renderCards(allRepos);
        })
        .catch(function (err) {
          console.warn('GitHub 仓库加载失败:', err.message);
          // 外部精选仓库不受 API 影响，回退时仍然展示
          if (FEATURED_REPOS.length > 0) {
            allRepos = FEATURED_REPOS;
            renderCards(FEATURED_REPOS);
            // 在列表末尾追加错误提示
            var errorNote = document.createElement('p');
            errorNote.style.cssText =
              'text-align:center;color:var(--text-muted);grid-column:1/-1;padding:16px;font-size:0.9rem;';
            errorNote.innerHTML =
              '⚠️ 无法加载 GitHub 组织仓库（可能是 API 限流，请稍后刷新页面）<br>' +
              '<a href="https://github.com/' + GITHUB_ORG + '" target="_blank" rel="noopener" ' +
              'style="color:var(--accent-color);font-weight:500;">直接在 GitHub 上查看 →</a>';
            listEl.appendChild(errorNote);
          } else {
            listEl.innerHTML =
              '<div style="text-align:center;grid-column:1/-1;padding:40px;color:var(--text-muted);">' +
                '<p>⚠️ 无法加载 GitHub 仓库（可能是 API 限流，请稍后刷新页面）</p>' +
                '<p style="margin-top:12px;">' +
                  '<a href="https://github.com/' + GITHUB_ORG + '" target="_blank" rel="noopener" ' +
                     'style="color:var(--accent-color);font-weight:500;">直接在 GitHub 上查看 →</a>' +
                '</p>' +
              '</div>';
          }
        });
    }

    loadRepos();
  });

  // --- 工具函数 ---
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var now = new Date();
    var diff = now - d;
    var days = Math.floor(diff / 86400000);
    if (days < 1) return '今天';
    if (days < 30) return days + ' 天前';
    if (days < 365) return Math.floor(days / 30) + ' 个月前';
    return Math.floor(days / 365) + ' 年前';
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }
})();
