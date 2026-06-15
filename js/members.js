/**
 * 山海机甲战队 — 成员页面渲染器
 * 添加成员：放入照片 + 在下方 MEMBER_DATA 中加一条记录
 */
(function () {
  'use strict';

  var PHOTO_BASE = '../source/photos/members/';

  // ============================================================
  // 成员数据 — 在此处添加/修改成员
  // 现任队员字段: name, role, major, bio, photo
  // 往届队员字段: name, role, major, bio, destination, photo
  // photo 为照片文件名（放在 source/photos/members/ 下）
  // 没有照片时 photo 留空，会显示名字首字作为头像
  // ============================================================
  var MEMBER_DATA = {
    current: [
      {
        group: '管理层',
        members: [
          { name: '队长名字', role: '队长', major: '', bio: '统筹团队战略与日常管理', photo: 'captain.jpg' },
          { name: '副队长名字', role: '副队长', major: '', bio: '协助队长管理，分管技术方向', photo: 'vice-captain.jpg' },
          { name: '项管名字', role: '项目管理', major: '', bio: '项目进度跟踪与资源协调', photo: 'pm.jpg' }
        ]
      },
      {
        group: '机械组',
        members: [
          { name: '机械组长', role: '机械组 · 组长', major: '', bio: '机器人底盘与发射机构设计', photo: 'mech-lead.jpg' },
          { name: '队员名字', role: '机械组 · 结构设计', major: '', bio: '机器人结构建模与仿真分析', photo: 'mech-structure.jpg' },
          { name: '队员名字', role: '机械组 · 加工制造', major: '', bio: 'CNC加工与3D打印零件生产', photo: 'mech-fab.jpg' },
          { name: '队员名字', role: '机械组 · 装配测试', major: '', bio: '机器人整机装配与机械性能测试', photo: 'mech-assembly.jpg' }
        ]
      },
      {
        group: '硬件组',
        members: [
          { name: '硬件组长', role: '硬件组 · 组长', major: '', bio: 'PCB设计与硬件系统架构', photo: 'hw-lead.jpg' },
          { name: '队员名字', role: '硬件组 · 电路设计', major: '', bio: '原理图设计、元器件选型与电路仿真', photo: 'hw-circuit.jpg' },
          { name: '队员名字', role: '硬件组 · 电源管理', major: '', bio: '电池管理系统与功率变换电路', photo: 'hw-power.jpg' }
        ]
      },
      {
        group: '电控组',
        members: [
          { name: '电控组长', role: '电控组 · 组长', major: '', bio: '嵌入式系统与运动控制算法', photo: 'ctrl-lead.jpg' },
          { name: '队员名字', role: '电控组 · 嵌入式开发', major: '', bio: 'STM32底层驱动与CAN总线通信', photo: 'ctrl-embedded.jpg' },
          { name: '队员名字', role: '电控组 · 控制算法', major: '', bio: 'PID控制、云台稳定与运动规划', photo: 'ctrl-algorithm.jpg' }
        ]
      },
      {
        group: '视觉组',
        members: [
          { name: '视觉组长', role: '视觉组 · 组长', major: '', bio: '计算机视觉与自动瞄准系统', photo: 'vis-lead.jpg' },
          { name: '队员名字', role: '视觉组 · 目标检测', major: '', bio: '装甲板识别、能量机关检测算法', photo: 'vis-detection.jpg' },
          { name: '队员名字', role: '视觉组 · 模型部署', major: '', bio: '神经网络训练与嵌入式端推理部署', photo: 'vis-deploy.jpg' }
        ]
      },
      {
        group: '运营组',
        members: [
          { name: '运营组长', role: '运营组 · 组长', major: '', bio: '战队宣传、赞助对接与外联事务', photo: 'ops-lead.jpg' },
          { name: '队员名字', role: '运营组 · 宣传设计', major: '', bio: '海报设计、视频剪辑与新媒体运营', photo: 'ops-media.jpg' },
          { name: '队员名字', role: '运营组 · 财务后勤', major: '', bio: '经费管理、物资采购与出行安排', photo: 'ops-finance.jpg' }
        ]
      }
    ],
    alumni: [
      { name: '赵晴', role: '2021级 · 机械组', major: '智能制造工程', bio: '曾参与2023-2025赛季', destination: '深圳市安克创新科技股份有限公司 结构工程师 ', photo: 'zhaoqing.jpg' },
      { name: '殷超磊', role: '2021级 · 机械组', major: '车辆工程智能网联', bio: '曾参与2023-2024赛季', destination: '深圳市大疆创新科技有限公司 行业无人机结构工程师', photo: 'yinchaolei.jpg' },
      { name: '潘璇岳', role: '2020级 · 电控组', major: '电子科学与技术', bio: '曾参与2023赛季', destination: '', photo: 'panxuanyue.jpg' },
      { name: '刘一可', role: '2020级 · 机械组', major: '机械设计制造及其自动化', bio: '曾参与2023-2024赛季', destination: '深圳万色智匠智能科技有限公司 机械工程师', photo: 'liuyike.jpg' },
      { name: '往届队员', role: '2021级 · 硬件组', major: '', bio: '曾参与2022-2025赛季', destination: '', photo: 'alumni-04.jpg' },
      { name: '韩瑞琪', role: '2023级 · 电控组', major: '物联网工程', bio: '曾参与2024-2025赛季', destination: '', photo: 'hanruiqi.jpg' },
      { name: '刘浩', role: '2023级 · 电控组', major: '软件工程', bio: '曾参与2024-2025赛季', destination: '', photo: 'liuhao.jpg' }
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
    card.className = 'member-card card' + (isAlumni ? ' alumni-card' : '');

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
        destEl.textContent = member.destination;
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
})();
