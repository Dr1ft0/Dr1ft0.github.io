/* =========================================================
   Dr1ft0 博客自定义 JS
   ========================================================= */

(function () {
  'use strict';

  // =========================================================
  // 访问密码验证（输入 panyishuo 才能浏览）
  // =========================================================
  var ACCESS_PASSWORD = 'panyishuo'; // 访问密码
  var STORAGE_KEY = 'dr1ft0_blog_access'; // localStorage 存储键
  var STORAGE_EXPIRE = 7 * 24 * 60 * 60 * 1000; // 验证有效期 7 天

  // 检查是否已通过验证
  function isAuthorized() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data && data.authorized && data.expire > Date.now()) {
        return true;
      }
    } catch (e) {
      // 解析失败视为未授权
    }
    return false;
  }

  // 记录验证状态
  function setAuthorized() {
    try {
      var data = {
        authorized: true,
        expire: Date.now() + STORAGE_EXPIRE
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage 不可用时忽略
    }
  }

  // 创建密码验证遮罩层
  function createAccessOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'access-overlay';
    overlay.innerHTML = [
      '<div class="access-box">',
      '  <div class="access-icon">🔒</div>',
      '  <h2 class="access-title">访问验证</h2>',
      '  <p class="access-desc">请输入访问密码以继续浏览</p>',
      '  <input type="password" id="access-password" class="access-input" placeholder="请输入访问密码" autocomplete="off">',
      '  <button type="button" id="access-submit" class="access-btn">进入博客</button>',
      '  <p class="access-error" id="access-error" style="display:none;">密码错误，请重试</p>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
    return overlay;
  }

  // 初始化访问控制
  function initAccessControl() {
    // 如果已通过验证，直接返回
    if (isAuthorized()) {
      return;
    }

    // 创建遮罩层
    var overlay = createAccessOverlay();
    var passwordInput = document.getElementById('access-password');
    var submitBtn = document.getElementById('access-submit');
    var errorMsg = document.getElementById('access-error');

    // 验证密码
    function verifyPassword() {
      var input = passwordInput.value.trim();
      if (input === ACCESS_PASSWORD) {
        setAuthorized();
        overlay.classList.add('access-success');
        setTimeout(function () {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
        }, 500);
      } else {
        errorMsg.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        passwordInput.classList.add('access-input-error');
        setTimeout(function () {
          passwordInput.classList.remove('access-input-error');
        }, 500);
      }
    }

    // 绑定事件
    submitBtn.addEventListener('click', verifyPassword);
    passwordInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        verifyPassword();
      }
    });

    // 锁定页面滚动
    document.body.style.overflow = 'hidden';
    passwordInput.focus();
  }

  // 立即执行访问控制（在页面渲染前）
  initAccessControl();

  // =========================================================
  // 本地浏览量统计（作为不蒜子的补充，基于 localStorage）
  // =========================================================
  var VIEW_KEY_PREFIX = 'dr1ft0_blog_view_';

  function initLocalViewCount() {
    // 获取当前页面路径作为唯一标识
    var pageKey = window.location.pathname;
    var storageKey = VIEW_KEY_PREFIX + pageKey;

    try {
      // 读取当前页面的浏览量并 +1
      var count = parseInt(localStorage.getItem(storageKey) || '0', 10);
      count += 1;
      localStorage.setItem(storageKey, String(count));

      // 如果页面没有 busuanzi 浏览量元素，则显示本地统计
      var busuanziPv = document.getElementById('busuanzi_value_page_pv');
      if (!busuanziPv) {
        var customPv = document.querySelectorAll('.post-meta-pv-cv');
        customPv.forEach(function (el) {
          el.textContent = count;
        });
      }
    } catch (e) {
      // localStorage 不可用时忽略
    }
  }

  // ---------- 页面加载完成后的初始化 ----------
  document.addEventListener('DOMContentLoaded', function () {
    initBackToTop();
    initArticleHover();
    initCopyButton();
    initLocalViewCount();
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