/**
 * 山海机甲战队 — 组别详情渲染器
 * 通过 URL 参数 ?id=xxx 渲染对应技术组别的职责、技能与工作内容。
 * 新增/修改组别：在下方 GROUP_DATA 中加一条即可，无需改动结构。
 *
 * 字段说明：
 *   name    组别中文名
 *   en      英文副标题（沿用首页卡片的 "CODE · English" 格式）
 *   icon    组别图标标识（对应 group-card-icon--xxx 配色）
 *   svg     图标 SVG 内部路径（沿用首页 group-card 图标）
 *   tagline 一句话简介
 *   role    职责详情（一段说明该组在战队中的定位与工作重心）
 *   specs   顶部技能标签（沿用首页卡片的 group-skill-tag）
 *   work    工作内容，按方向分组：[{ group:'方向', items:[...] }, ...]
 *
 * 注：以下内容为按 RoboMaster 战队常识填写的初稿，
 *     请战队按真实情况修改。
 */
(function () {
  'use strict';

  var GROUP_DATA = {
    mech: {
      name: '机械架构组',
      en: 'MEST · Mechanical Structure',
      icon: 'mech',
      svg: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>',
      tagline: '负责机器人底盘、武器系统、机械部件的设计与制造，涵盖从 3D 建模到 CNC 加工的全流程。',
      role: '机械架构组是每一台机器人的骨架与形态的缔造者。从整车方案设计、结构建模到零件加工与装配调试，机械组决定了机器人的机动性、稳定性与可靠性。他们需要在有限的重量、尺寸与成本约束下，反复迭代设计方案，与电控、硬件、视觉各组紧密配合，最终把图纸变成能在赛场上奔跑对抗的机器人。',
      specs: ['3D 建模', 'CAD 出图', 'CNC 加工', '结构分析', '装配测试'],
      work: [
        { group: '设计', items: ['整车方案设计', 'SolidWorks 建模', '底盘 / 云台结构', '发射机构设计'] },
        { group: '仿真', items: ['结构强度分析', '运动学仿真', '轻量化优化', '干涉检查'] },
        { group: '加工装配', items: ['CNC / 3D 打印', '钣金 / 车铣', '整车装配', '调试与迭代'] }
      ]
    },
    elec: {
      name: '电控组',
      en: 'ELCT · Electronic Control',
      icon: 'elec',
      svg: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
      tagline: '负责机器人嵌入式系统开发、运动控制算法与实时软件架构，实现机器人的智能行为。',
      role: '电控组是机器人的神经与大脑。他们编写运行在主控板上的嵌入式程序，通过控制算法让电机、云台、发射机构精准协调地运转，把操作手的指令与视觉的解算结果转化为机器人的实际动作。从底盘运动、云台随动到功率控制与多机通信，电控组保证机器人在激烈对抗中依然稳定、跟手、可靠。',
      specs: ['嵌入式开发', '控制算法', 'CAN 总线', 'RTOS', '传感器融合'],
      work: [
        { group: '嵌入式', items: ['STM32 / DJI C 板', 'ThreadX RTOS', 'HAL / 寄存器开发', 'CAN 总线通信'] },
        { group: '控制算法', items: ['PID 串级控制', '云台随动 / 自瞄接口', '底盘运动解算', '功率控制'] },
        { group: '系统', items: ['多机通信', '裁判系统交互', '遥控 / 图传链路', '故障保护'] }
      ]
    },
    hw: {
      name: '硬件组',
      en: 'HDWR · Hardware Design',
      icon: 'hw',
      svg: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
      tagline: '负责机器人电路系统设计、功率管理与配电方案，打造稳定可靠的硬件平台。',
      role: '硬件组为机器人构建可靠的电力与电路基础。他们设计各类主控与功能 PCB、规划整车配电与功率方案，并处理超级电容、电池管理与电磁兼容等关键问题。硬件组的工作直接关系到机器人在高功率对抗下的稳定性与安全性，是电控算法得以发挥的物理保障。',
      specs: ['PCB 设计', '功率电子', '超级电容', '电池管理', 'EMC 防护'],
      work: [
        { group: '电路设计', items: ['原理图设计', 'PCB Layout', '主控 / 功能板', '接口标准化'] },
        { group: '功率', items: ['整车配电', '超级电容管理', '电机驱动', '功率回路优化'] },
        { group: '可靠性', items: ['电池管理 (BMS)', 'EMC / EMI 防护', '散热设计', '硬件测试'] }
      ]
    },
    vis: {
      name: '视觉算法组',
      en: 'VSAG · Vision & Algorithm',
      icon: 'vis',
      svg: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
      tagline: '开发计算机视觉与 AI 系统，使机器人实现自主感知、目标识别与智能决策。',
      role: '视觉算法组赋予机器人"看见"与"思考"的能力。他们开发装甲板识别、自动瞄准、能量机关击打等视觉算法，并在哨兵等自主单位上实现 SLAM 建图、导航与自主决策。从图像处理、深度学习模型训练到弹道解算与目标预测，视觉组让机器人从"被操控"走向"自主作战"。',
      specs: ['目标检测', '目标跟踪', 'ML 训练', '实时处理', 'SLAM'],
      work: [
        { group: '视觉', items: ['OpenCV 装甲板识别', '自瞄弹道解算', '能量机关识别', '卡尔曼滤波预测'] },
        { group: '深度学习', items: ['数据集标注', '模型训练', 'ONNX / TensorRT 部署', '实时推理优化'] },
        { group: '导航决策', items: ['ROS2', '激光雷达 SLAM', '自主导航与路径规划', '行为树决策'] }
      ]
    },
    comm: {
      name: '宣传筹划组',
      en: 'PRAM · Promotion & Admin',
      icon: 'comm',
      svg: '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>',
      tagline: '管理品牌宣传、社交媒体、外联招商，同时负责赛季规划与开发平台运维。',
      role: '宣传筹划组是战队面向外界的窗口与内部运转的中枢。他们负责品牌视觉、新媒体内容与赛事宣传，塑造战队形象；同时承担外联招商、赞助对接与赛季规划等运营工作，并维护战队官网与协作平台。技术之外，宣传筹划组让战队的努力被更多人看见，也让团队的日常运转有序高效。',
      specs: ['视觉设计', '新媒体运营', '招商引资', '平台运维', '项目管理'],
      work: [
        { group: '品牌宣传', items: ['视觉设计', '视频剪辑', '新媒体运营', '赛事直播 / 记录'] },
        { group: '运营外联', items: ['招商引资', '赞助对接', '活动策划', '对外交流'] },
        { group: '统筹', items: ['赛季规划', '项目管理', '官网 / 平台运维', '文档沉淀'] }
      ]
    }
  };

  var ORDER = ['mech', 'elec', 'hw', 'vis', 'comm'];

  document.addEventListener('DOMContentLoaded', function () {
    var mount = document.getElementById('group-detail');
    if (!mount) return;

    var id = new URLSearchParams(location.search).get('id');
    var group = id && GROUP_DATA[id];

    if (!group) {
      renderNotFound(mount);
      return;
    }

    document.title = group.name + ' | 山海机甲';
    render(mount, id, group);
  });

  // --- 渲染详情 ---
  function render(mount, id, group) {
    var idx = ORDER.indexOf(id);
    var prevId = idx > 0 ? ORDER[idx - 1] : ORDER[ORDER.length - 1];
    var nextId = idx < ORDER.length - 1 ? ORDER[idx + 1] : ORDER[0];

    var html = '';
    html += '<section class="page-header-section">';
    html += '<div class="section-eyebrow">' + esc(group.en) + '</div>';
    html += '<h2 class="section-title">' + esc(group.name) + '</h2>';
    html += '<p class="section-desc" style="margin:0 auto;">' + esc(group.tagline) + '</p>';
    html += '</section>';

    html += '<section class="section" style="padding-top:40px;"><div class="section-container robot-detail-container">';

    // 组别图标
    html += '<div class="group-detail-badge">';
    html += '<div class="group-card-icon group-card-icon--' + esc(group.icon) + '">';
    html += '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + group.svg + '</svg>';
    html += '</div></div>';

    // 顶部技能标签
    if (group.specs && group.specs.length) {
      html += '<div class="robot-specs robot-detail-specs">';
      group.specs.forEach(function (s) { html += '<span>' + esc(s) + '</span>'; });
      html += '</div>';
    }

    // 职责详情
    html += '<div class="robot-block card robot-role">';
    html += '<h3 class="robot-block-title">组别职责</h3>';
    html += '<p>' + esc(group.role) + '</p>';
    html += '</div>';

    // 工作内容
    html += '<div class="robot-block card robot-stack">';
    html += '<h3 class="robot-block-title">工作内容</h3>';
    (group.work || []).forEach(function (grp) {
      html += '<div class="robot-stack-group">';
      html += '<span class="robot-stack-label">' + esc(grp.group) + '</span>';
      html += '<div class="robot-specs">';
      (grp.items || []).forEach(function (it) { html += '<span>' + esc(it) + '</span>'; });
      html += '</div></div>';
    });
    html += '</div>';

    // 底部导航
    html += '<div class="robot-detail-nav">';
    html += '<a href="group.html?id=' + prevId + '" class="btn btn-outline btn-sm">← ' + esc(GROUP_DATA[prevId].name) + '</a>';
    html += '<a href="index.html#team-groups" class="btn btn-outline btn-sm">返回团队架构</a>';
    html += '<a href="group.html?id=' + nextId + '" class="btn btn-outline btn-sm">' + esc(GROUP_DATA[nextId].name) + ' →</a>';
    html += '</div>';

    html += '</div></section>';

    mount.innerHTML = html;
  }

  // --- 未找到 ---
  function renderNotFound(mount) {
    mount.innerHTML =
      '<section class="page-header-section">' +
      '<div class="section-eyebrow">Not Found</div>' +
      '<h2 class="section-title">未找到该组别</h2>' +
      '<p class="section-desc" style="margin:0 auto;">链接可能有误，请返回团队架构重新选择。</p>' +
      '<div style="margin-top:28px;">' +
      '<a href="index.html#team-groups" class="btn btn-primary">返回团队架构</a>' +
      '</div></section>';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
