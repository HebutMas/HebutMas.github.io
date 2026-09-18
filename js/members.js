/**
 * 山海机甲战队 — 成员页面渲染器
 * 添加成员：放入照片 + 在下方 MEMBER_DATA 中加一条记录
 */
(function () {
  'use strict';

  // 相对站点根目录的路径：线上（域名根）与本地 file:// 双击打开都能正常加载
  // 注意不要写成 '../source/...'，那会跳出站点目录，导致本地预览时头像全部 404
  var PHOTO_BASE = 'source/photos/members/';

  // ============================================================
  // 成员数据 — 在此处添加/修改成员
  // 现任队员字段: name, role, major, bio, photo, intro
  // 往届队员字段: name, role, major, bio, destination, photo, intro
  // photo 为照片文件名（放在 source/photos/members/ 下）
  // 没有照片时 photo 留空，会显示名字首字作为头像
  // intro 为详细自我介绍（点击卡片弹出）：可为一段文字，或多段文字组成的数组
  //   例: intro: '我是……'  或  intro: ['第一段……', '第二段……']
  //   留空时弹窗会回退显示 bio / destination
  // ============================================================
  var MEMBER_DATA = {
    // 正式队员 — 按兵种分组
    // 数据来源：山海机甲战队正式队员信息收集表.xlsx（吉时雨一条由本人直接提供）
    // role 为所属兵种/部门（并入重装的张晨、胡浩哲已按现兵种改写为「重装」）
    // major 为班级，bio 为寄语
    current: [
      {
        group: '步兵',
        members: [
          { name: '康佳宏', role: '步兵', major: '物理2412', bio: '热爱不止于想象，答案永远在下一次迭代，能跑就上，不能跑就修', photo: 'kangjiahong.jpg' },
          { name: '张世杰', role: '步兵组', major: '机电242', bio: '我要成为旮旯给木高手', photo: 'zhangshijie.jpg' },
          { name: '冷瑞寒', role: '步兵电控', major: '物联网241', bio: '调车车，不小心撞烂车车，机械修车车，接着调车车…', photo: 'lengruihan.jpg' }
        ]
      },
      {
        group: '重装',
        members: [
          { name: '孟庆翔', role: '重装', major: '机电241', bio: '', photo: 'mengqingxiang.jpg' },
          { name: '崔昊雨', role: '串腿 重装', major: '测控244', bio: '保持山海，共赴热爱。', photo: 'cuihaoyu.jpg' },
          { name: '王圣尧', role: '重装', major: '机设242', bio: '那些没有天赋的人呢?他们的人生从一开始就浪费了吗?', photo: 'wangshengyao.jpg' },
          { name: '张召朋', role: '重装机械', major: '智造241', bio: '会赢的', photo: 'zhangzhaopeng.jpg' },
          { name: '赵彦顺', role: '重装电控', major: '自动化242', bio: '恍恍昨日桃花依旧，看花的人了却因果尽头', photo: 'zhaoyanshun.jpg' },
          // 原「英雄」「工程」两组已并入重装；张晨原表写「英雄组」、胡浩哲原表写「工程电控」，role 已随现兵种统一
          { name: '张晨', role: '重装', major: '机设245', bio: '英雄被删了，zdjd🤔', photo: 'zhangchen.jpg' },
          { name: '胡浩哲', role: '重装', major: '车辆244', bio: '', photo: 'huhaozhe.jpg' }
        ]
      },
      {
        group: '哨兵',
        members: [
          { name: '吉时雨', role: '哨兵组', major: '电技243', bio: '今年哨兵会出家的', photo: 'jishiyu.jpg' }
        ]
      },
      {
        group: '飞镖 · 无人机',
        members: [
          { name: '高士昂', role: '飞镖，无人机', major: '机设242', bio: '测测镖', photo: 'gaoshiang.jpg' },
          { name: '王鑫港', role: '电控组', major: '电子2414', bio: '保持热爱，共赴山海', photo: 'wangxingang.jpg' }
        ]
      },
      {
        group: '硬件',
        members: [
          { name: '旷朝阳', role: '硬件组', major: '智能242', bio: '穷究原理，洞悉本质，脚踏实地，实事求是。', photo: 'kuangzhaoyang.jpg' }
        ]
      }
    ],
    alumni: [
      { name: '赵晴', role: '2021级 · 机械组', major: '智能制造工程', bio: '曾参与2023-2025赛季', destination: '深圳市安克创新科技股份有限公司 结构工程师 ', photo: 'zhaoqing.jpg' },
      { name: '殷超磊', role: '2021级 · 机械组', major: '车辆工程智能网联', bio: '曾参与2023-2024赛季', destination: '深圳市大疆创新科技有限公司 行业无人机结构工程师', photo: 'yinchaolei.jpg' },
      { name: '潘璇岳', role: '2020级 · 电控组', major: '电子科学与技术', bio: '曾参与2023赛季', destination: '现于北京大学深造<br>个人GitHub仓库: https://github.com/Sirius-RX', photo: 'panxuanyue.jpg',},
      { name: '刘一可', role: '2020级 · 机械组', major: '机械设计制造及其自动化', bio: '曾参与2023-2024赛季', destination: '深圳万色智匠智能科技有限公司 机械工程师', photo: 'liuyike.jpg' },
      { name: '张腾', role: '2021级 · 机械＆飞手', major: '测控技术与仪器', bio: '曾参与2022-2025赛季', destination: '山东重工集团潍柴雷沃智慧农业科技股份有限公司 CAE强度分析工程师', photo: 'zhangteng.jpg' },
      { name: '韩瑞琪', role: '2023级 · 电控组', major: '物联网工程', bio: '曾参与2024-2025赛季', destination: '', photo: 'hanruiqi.jpg' },
      { name: '刘浩', role: '2023级 · 电控组', major: '软件工程', bio: '曾参与2024-2025赛季', destination: '', photo: 'liuhao.jpg' },
      {name: '郭帅', role: '2023级 · 机械组', major: '机械电子工程专业', bio: '曾参与2024-2025赛季', destination: '', photo: 'guoshuai.jpg' },
      {name: '杨梓栋', role: '2023级 · 硬件组', major: '自动化', bio: '曾参与2025赛季', destination: '', photo: 'yangzidong.jpg' },
      {name: '侯秉均 ', role: '2023级 · 机械组 飞镖系统组长', major: '机械电子工程专业', bio: '曾参与2024-2025赛季', destination: '', photo: 'houbingjun.jpg' },
      {name: '侯佳正 ' , role: '2023级 · 算法组', major: '测控技术与仪器专业', bio: '曾参与2024-2025赛季', destination: '', photo: 'houjiazheng.jpg' },
      {name: '邱浚宇 ', role: '2023级 · 硬件组', major: '智能制造工程专业', bio: '曾参与2024-2025赛季', destination: '', photo: 'qiujunyu.jpg' },
      {name: '张振龙', role: '2023级 · 机械组', major: '机械电子工程专业', bio: '曾参与2025赛季', destination: '', photo: 'zhangzhenlong.jpg' },
      {name: '丁峰', role: '2023级 · 机械组', major: '机械设计制造及自动化', bio: '曾参与2024-2025赛季', destination: '', photo: 'dingfeng.jpg' },
    ]
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    var currentSection = document.getElementById('current-members');
    var alumniSection = document.getElementById('alumni-members');

    if (!currentSection && !alumniSection) return;

    if (currentSection && MEMBER_DATA.current) {
      renderCurrentMembers(currentSection, MEMBER_DATA.current);
    }
    if (alumniSection && MEMBER_DATA.alumni) {
      renderAlumni(alumniSection, MEMBER_DATA.alumni);
    }

    setupModal();
  });

  // --- 渲染现任队员 ---
  function renderCurrentMembers(container, groups) {
    groups.forEach(function (group) {
      var label = document.createElement('h3');
      label.className = 'group-label';
      label.textContent = '— ' + group.group + ' —';
      container.appendChild(label);

      var grid = document.createElement('div');
      grid.className = 'members-grid';

      group.members.forEach(function (m) {
        grid.appendChild(createMemberCard(m, false));
      });

      container.appendChild(grid);
    });
  }

  // --- 渲染往届队员 ---
  function renderAlumni(container, alumni) {
    var grid = document.createElement('div');
    grid.className = 'members-grid';

    alumni.forEach(function (m) {
      grid.appendChild(createMemberCard(m, true));
    });

    container.appendChild(grid);
  }

  // --- 创建单张成员卡片 ---
  function createMemberCard(member, isAlumni) {
    var card = document.createElement('div');
    card.className = 'member-card card is-clickable' + (isAlumni ? ' alumni-card' : '');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', member.name + ' — 查看详细介绍');

    // 点击 / 回车 / 空格 打开详情弹窗
    card.addEventListener('click', function () {
      openModal(member, isAlumni);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(member, isAlumni);
      }
    });

    // 头像
    var avatar = document.createElement('div');
    avatar.className = 'member-avatar';

    if (member.photo) {
      var img = document.createElement('img');
      img.src = PHOTO_BASE + member.photo;
      img.alt = member.name;
      img.loading = 'lazy';
      img.onerror = function () {
        img.style.display = 'none';
        var fallback = document.createElement('span');
        fallback.className = 'avatar-placeholder';
        fallback.textContent = member.name.charAt(0);
        avatar.appendChild(fallback);
      };
      avatar.appendChild(img);
    } else {
      var placeholder = document.createElement('span');
      placeholder.className = 'avatar-placeholder';
      placeholder.textContent = member.name.charAt(0);
      avatar.appendChild(placeholder);
    }

    // 信息区
    var info = document.createElement('div');
    info.className = 'member-info';

    var nameEl = document.createElement('h3');
    nameEl.textContent = member.name;

    var roleEl = document.createElement('p');
    roleEl.className = 'member-role';
    roleEl.textContent = member.role;

    // 专业（所有成员）
    var majorEl = document.createElement('p');
    majorEl.className = 'member-major';
    majorEl.textContent = member.major || '';

    info.appendChild(nameEl);
    info.appendChild(roleEl);
    if (member.major) info.appendChild(majorEl);

    if (isAlumni) {
      // 往届队员：显示毕业去向
      if (member.destination) {
        var destEl = document.createElement('p');
        destEl.className = 'member-destination';
        destEl.innerHTML = member.destination;
        info.appendChild(destEl);
      }
    } else {
      // 现任队员：显示个人简介
      var bioEl = document.createElement('p');
      bioEl.className = 'member-bio';
      bioEl.textContent = member.bio || '';
      info.appendChild(bioEl);
    }

    card.appendChild(avatar);
    card.appendChild(info);

    return card;
  }

  // ============================================================
  //  成员详情弹窗
  // ============================================================
  var modal, modalPanel, modalOverlay, modalClose,
      modalAvatar, modalName, modalRole, modalMajor, modalBody,
      lastFocused;

  function setupModal() {
    modal = document.getElementById('member-modal');
    if (!modal) return;

    modalPanel = modal.querySelector('.member-modal-panel');
    modalOverlay = document.getElementById('member-modal-overlay');
    modalClose = document.getElementById('member-modal-close');
    modalAvatar = document.getElementById('member-modal-avatar');
    modalName = document.getElementById('member-modal-name');
    modalRole = document.getElementById('member-modal-role');
    modalMajor = document.getElementById('member-modal-major');
    modalBody = document.getElementById('member-modal-body');

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  function openModal(member, isAlumni) {
    if (!modal) return;
    lastFocused = document.activeElement;

    // 头像
    modalAvatar.innerHTML = '';
    if (member.photo) {
      var img = document.createElement('img');
      img.src = PHOTO_BASE + member.photo;
      img.alt = member.name;
      img.onerror = function () {
        img.style.display = 'none';
        modalAvatar.appendChild(makePlaceholder(member.name));
      };
      modalAvatar.appendChild(img);
    } else {
      modalAvatar.appendChild(makePlaceholder(member.name));
    }

    // 基本信息（均用 textContent，防止注入）
    modalName.textContent = member.name;
    modalRole.textContent = member.role || '';
    modalMajor.textContent = member.major || '';
    modalMajor.style.display = member.major ? '' : 'none';

    // 正文：优先 intro；否则回退 bio / destination
    modalBody.innerHTML = '';
    var paragraphs = collectIntro(member, isAlumni);
    paragraphs.forEach(function (text) {
      var p = document.createElement('p');
      appendTextWithBreaks(p, text);   // 安全渲染，仅把换行/<br> 转成 <br>
      modalBody.appendChild(p);
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  // 汇总要展示的段落文本
  function collectIntro(member, isAlumni) {
    var out = [];
    if (member.intro) {
      if (Array.isArray(member.intro)) {
        member.intro.forEach(function (t) { if (t) out.push(t); });
      } else {
        out.push(member.intro);
      }
    }
    if (out.length === 0) {
      if (member.bio) out.push(member.bio);
      if (isAlumni && member.destination) out.push('毕业去向：' + member.destination);
    }
    if (out.length === 0) out.push('这位队员还没有留下更多介绍。');
    return out;
  }

  function makePlaceholder(name) {
    var span = document.createElement('span');
    span.className = 'avatar-placeholder';
    span.textContent = (name || '?').charAt(0);
    return span;
  }

  // 把字符串安全地写入元素：支持字面 "\n" 与 "<br>" 作为换行，其余按纯文本处理
  function appendTextWithBreaks(el, text) {
    var parts = String(text).split(/<br\s*\/?>|\n/i);
    parts.forEach(function (part, i) {
      if (i > 0) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(part));
    });
  }
})();
