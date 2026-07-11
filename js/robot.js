/**
 * 山海机甲战队 — 机器人详情渲染器
 * 通过 URL 参数 ?id=xxx 渲染对应机器人的技术栈与战术定位。
 * 新增/修改机器人：在下方 ROBOT_DATA 中加一条即可，无需改动结构。
 *
 * 字段说明：
 *   name    机器人中文名
 *   en      英文副标题
 *   img     图片路径（source/robots/ 下）
 *   tagline 一句话简介
 *   role    战术定位（一段说明它在赛场中的作用/打法）
 *   specs   顶部标签（沿用首页卡片风格）
 *   stack   技术栈，按小组分组：[{ group:'机械', items:[...] }, ...]
 *
 * 注：以下技术栈与战术定位为按 RoboMaster 常识填写的初稿，
 *     请战队按真实配置修改。
 */
(function () {
  'use strict';

  var ROBOT_DATA = {
    infantry: {
      name: '步兵机器人',
      en: 'Infantry',
      img: 'source/robots/infantry.jpg',
      tagline: '全向轮底盘 + 下供弹系统，搭载自瞄算法，灵活机动，队伍中坚力量。',
      role: '步兵是赛场上数量最多、参与对抗最频繁的主力兵种。凭借全向轮底盘的高机动性，负责占领增益点、争夺资源岛与前线火力压制，是团队进攻与防守的核心输出，也是大部分战术套路的执行者。',
      specs: ['全向移动', '自瞄系统', '下供弹'],
      stack: [
        { group: '机械', items: ['麦克纳姆全向底盘', '下供弹拨弹机构', '双摩擦轮发射', '云台二自由度'] },
        { group: '电控', items: ['DJI C 板 / STM32', 'ThreadX RTOS', '云台 PID 串级控制', 'CAN 总线通信', '功率控制'] },
        { group: '视觉', items: ['OpenCV 装甲板识别', '自瞄弹道解算', '卡尔曼滤波预测', 'ONNX 推理'] }
      ]
    },
    hero: {
      name: '英雄机器人',
      en: 'Hero',
      img: 'source/robots/hero.jpg',
      tagline: '双摩擦轮发射，全自主作战方案，拥有更强火力输出与更厚装甲防护。',
      role: '英雄发射 42mm 大弹丸，单发伤害与经济收益远高于步兵，是团队的核心火力点。主要负责吊射基地、集火敌方关键单位与关键节点的高价值输出，通常配合步兵形成火力梯队。',
      specs: ['双摩擦轮', '全自主', '重装甲'],
      stack: [
        { group: '机械', items: ['42mm 大弹丸发射', '大容量弹仓', '重载全向底盘', '强化装甲结构'] },
        { group: '电控', items: ['DJI C 板 / STM32', '双摩擦轮转速闭环', '云台 PID 串级控制', 'CAN 总线通信'] },
        { group: '视觉', items: ['装甲板识别', '吊射弹道解算', '重力补偿模型', '目标预测'] }
      ]
    },
    sentry: {
      name: '哨兵机器人',
      en: 'Sentry',
      img: 'source/robots/sentry.jpg',
      tagline: '全自动哨兵系统，搭载导航与识别算法，自动巡逻守护基地安全。',
      role: '哨兵是完全自主作战单位，无需人工操作。负责巡逻防区、守卫基地与前哨站，自动搜索并打击进入范围的敌方单位，是团队后防线的智能守门员，也是自主决策与导航技术的集中体现。',
      specs: ['全自动', '导航系统', '智能识别'],
      stack: [
        { group: '机械', items: ['双云台 / 双枪管', '全向底盘', '轨道 / 地面移动'] },
        { group: '电控', items: ['DJI C 板 / STM32', 'ThreadX RTOS', '云台自动瞄准控制', 'CAN 总线'] },
        { group: '视觉 / 导航', items: ['ROS2', '激光雷达 SLAM 建图', '自主导航与路径规划', '装甲板识别自瞄', '自主决策 (行为树)'] }
      ]
    },
    engineer: {
      name: '工程机器人',
      en: 'Engineer',
      img: 'source/robots/engineer.jpg',
      tagline: '战场救援与补给核心，负责维修友方机器人、获取弹药并支援团队作战。',
      role: '工程是团队的资源与后勤枢纽。负责兑换资源岛矿石、为队友补充弹药与经济、救援被击倒的机器人并帮助其复活。虽不直接参与火力对抗，却直接决定团队的经济运营与续航能力。',
      specs: ['救援维修', '弹药补给', '地形适应'],
      stack: [
        { group: '机械', items: ['多自由度机械臂', '矿石取放夹爪', '救援 / 拖拽机构', '越障悬挂底盘'] },
        { group: '电控', items: ['DJI C 板 / STM32', '机械臂多关节控制', '自定义控制器', 'CAN 总线'] },
        { group: '视觉', items: ['矿石位姿识别', '兑换站视觉对位', '辅助操作手动 / 半自动'] }
      ]
    },
    dart: {
      name: '飞镖机器人',
      en: 'Dart',
      img: 'source/robots/dart.jpg',
      tagline: '远程精准打击单位，发射飞镖弹攻击敌方前哨站与基地，战术突破利器。',
      role: '飞镖是固定式远程打击装置，在己方发射区发射制导飞镖，攻击敌方前哨站与基地。命中可造成大量伤害，是打破僵局、快速削减敌方基地血量的战略性突破手段。',
      specs: ['远程打击', '高精度', '快速装填'],
      stack: [
        { group: '机械', items: ['飞镖发射架', '导轨蓄能机构', '自动装填系统', '气动 / 弹射结构'] },
        { group: '电控', items: ['发射角度 / 力度调节', '闭环张紧控制', '发射时序控制'] },
        { group: '制导 / 视觉', items: ['飞镖舵机制导', '弹道标定与修正', '目标坐标解算'] }
      ]
    },
    drone: {
      name: '无人机',
      en: 'Aerial',
      img: 'source/robots/drone.jpg',
      tagline: '空中侦察与支援单位，提供战场全局视野，可进行空中打击与信息干扰。',
      role: '无人机从空中视角提供战场全局信息，为操作手与哨兵提供敌方位置情报。同时具备空中火力打击能力，可对暴露的敌方单位进行压制，是团队的空中之眼与机动支援力量。',
      specs: ['空中侦察', '全局视野', '快速机动'],
      stack: [
        { group: '机械', items: ['多旋翼机架', '云台相机挂载', '机载发射机构'] },
        { group: '电控', items: ['飞控系统', '姿态稳定控制', '图传 / 数传链路'] },
        { group: '视觉', items: ['空中目标识别', '第一视角图传', '战场态势感知'] }
      ]
    }
  };

  var ORDER = ['infantry', 'hero', 'sentry', 'engineer', 'dart', 'drone'];

  document.addEventListener('DOMContentLoaded', function () {
    var mount = document.getElementById('robot-detail');
    if (!mount) return;

    var id = new URLSearchParams(location.search).get('id');
    var robot = id && ROBOT_DATA[id];

    if (!robot) {
      renderNotFound(mount);
      return;
    }

    document.title = robot.name + ' | 山海机甲';
    render(mount, id, robot);
  });

  // --- 渲染详情 ---
  function render(mount, id, robot) {
    var idx = ORDER.indexOf(id);
    var prevId = idx > 0 ? ORDER[idx - 1] : ORDER[ORDER.length - 1];
    var nextId = idx < ORDER.length - 1 ? ORDER[idx + 1] : ORDER[0];

    var html = '';
    html += '<section class="page-header-section">';
    html += '<div class="section-eyebrow">' + esc(robot.en) + '</div>';
    html += '<h2 class="section-title">' + esc(robot.name) + '</h2>';
    html += '<p class="section-desc" style="margin:0 auto;">' + esc(robot.tagline) + '</p>';
    html += '</section>';

    html += '<section class="section" style="padding-top:40px;"><div class="section-container robot-detail-container">';

    // 大图
    html += '<div class="robot-detail-hero">';
    html += '<img src="' + esc(robot.img) + '" alt="' + esc(robot.name) + '"' +
      ' onerror="this.parentElement.classList.add(\'robot-visual-fallback\');this.style.display=\'none\'">';
    html += '</div>';

    // 顶部标签
    if (robot.specs && robot.specs.length) {
      html += '<div class="robot-specs robot-detail-specs">';
      robot.specs.forEach(function (s) { html += '<span>' + esc(s) + '</span>'; });
      html += '</div>';
    }

    // 战术定位
    html += '<div class="robot-block card robot-role">';
    html += '<h3 class="robot-block-title">战术定位</h3>';
    html += '<p>' + esc(robot.role) + '</p>';
    html += '</div>';

    // 技术栈
    html += '<div class="robot-block card robot-stack">';
    html += '<h3 class="robot-block-title">技术栈</h3>';
    (robot.stack || []).forEach(function (grp) {
      html += '<div class="robot-stack-group">';
      html += '<span class="robot-stack-label">' + esc(grp.group) + '</span>';
      html += '<div class="robot-specs">';
      (grp.items || []).forEach(function (it) { html += '<span>' + esc(it) + '</span>'; });
      html += '</div></div>';
    });
    html += '</div>';

    // 底部导航
    html += '<div class="robot-detail-nav">';
    html += '<a href="robot.html?id=' + prevId + '" class="btn btn-outline btn-sm">← ' + esc(ROBOT_DATA[prevId].name) + '</a>';
    html += '<a href="index.html#robots" class="btn btn-outline btn-sm">返回机器人</a>';
    html += '<a href="robot.html?id=' + nextId + '" class="btn btn-outline btn-sm">' + esc(ROBOT_DATA[nextId].name) + ' →</a>';
    html += '</div>';

    html += '</div></section>';

    mount.innerHTML = html;
  }

  // --- 未找到 ---
  function renderNotFound(mount) {
    mount.innerHTML =
      '<section class="page-header-section">' +
      '<div class="section-eyebrow">Not Found</div>' +
      '<h2 class="section-title">未找到该机器人</h2>' +
      '<p class="section-desc" style="margin:0 auto;">链接可能有误，请返回机器人列表重新选择。</p>' +
      '<div style="margin-top:28px;">' +
      '<a href="index.html#robots" class="btn btn-primary">返回机器人列表</a>' +
      '</div></section>';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
