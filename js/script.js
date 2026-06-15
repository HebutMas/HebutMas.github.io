/**
 * 山海机甲战队 — 全局脚本
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // ========== 联系表单拦截 ==========
    var contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = contactForm.querySelector('.submit-btn');
        if (!btn) return;
        var originalText = btn.textContent;
        btn.textContent = '发送中...';
        btn.disabled = true;

        // 如果你之后接入了 Formspree 或其他服务，把 URL 换掉即可
        // 当前仅做演示提示，不会真正发送
        setTimeout(function () {
          btn.textContent = '✓ 消息已收到（演示）';
          btn.style.background = '#16a34a';
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
            contactForm.reset();
          }, 2500);
        }, 800);
      });
    }
  });
})();
