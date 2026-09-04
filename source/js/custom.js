/* =========================================================
   Dr1ft0 博客自定义 JS
   ========================================================= */

(function () {
  'use strict';

  // ---------- 页面加载完成后的初始化 ----------
  document.addEventListener('DOMContentLoaded', function () {
    initBackToTop();
    initArticleHover();
    initCopyButton();
  });

  // ---------- 返回顶部按钮增强 ----------
  function initBackToTop() {
    var goUp = document.getElementById('go-up');
    if (!goUp) return;

    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        goUp.style.opacity = '1';
        goUp.style.visibility = 'visible';
      } else {
        goUp.style.opacity = '0';
        goUp.style.visibility = 'hidden';
      }
    });
  }

  // ---------- 文章卡片悬浮效果 ----------
  function initArticleHover() {
    var cards = document.querySelectorAll('#recent-posts > .recent-post-item');
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
      });
    });
  }

  // ---------- 代码复制按钮增强 ----------
  function initCopyButton() {
    // 监听复制事件，添加提示
    document.addEventListener('copy', function (e) {
      // 如果复制的是代码块内容，可以在这里添加额外处理
    });
  }

  // ---------- 页面访问时间统计 ----------
  function initVisitTime() {
    var startTime = new Date();
    window.addEventListener('beforeunload', function () {
      var endTime = new Date();
      var visitTime = (endTime - startTime) / 1000;
      // 可以在这里记录访问时长
    });
  }

  // ---------- 键盘快捷键 ----------
  document.addEventListener('keydown', function (e) {
    // Ctrl + / 打开搜索
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      var searchInput = document.querySelector('#local-search input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });

  // ---------- 图片点击放大（配合 fancybox） ----------
  // Butterfly 主题已内置 fancybox，这里做额外增强
  function enhanceImages() {
    var images = document.querySelectorAll('#post img');
    images.forEach(function (img) {
      img.addEventListener('click', function () {
        // fancybox 会自动处理，这里留空
      });
    });
  }

  // ---------- 文章阅读进度条 ----------
  function initReadingProgress() {
    var progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'height: 3px',
      'background: linear-gradient(90deg, #49b1f5, #00c4b6)',
      'z-index: 9999',
      'width: 0%',
      'transition: width 0.1s ease'
    ].join(';');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // 只在文章页显示阅读进度条
  if (document.querySelector('#post')) {
    initReadingProgress();
  }

  // ---------- 侧边栏作者卡片打字效果 ----------
  function initAuthorTyping() {
    var desc = document.querySelector('#aside-content .card-info .card-info-data');
    if (!desc) return;
  }

  // ---------- 页面标题动态效果 ----------
  var originalTitle = document.title;
  var isHidden = false;

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      isHidden = true;
      document.title = '👋 别走，快回来！';
    } else {
      isHidden = false;
      document.title = originalTitle;
    }
  });

  // ---------- 控制台欢迎信息 ----------
  console.log(
    '%c Dr1ft0 的博客 %c',
    'background: linear-gradient(120deg, #49b1f5, #00c4b6); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 16px;',
    'color: #49b1f5; font-size: 12px;'
  );
  console.log('%c 记录运维路上的每一步 🚀', 'color: #00c4b6; font-size: 14px;');

})();