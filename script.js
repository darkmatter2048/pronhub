// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 年龄验证页面功能
    const noticeBtn = document.querySelector('.btn-notice');
    if (noticeBtn) {
        noticeBtn.addEventListener('click', function() {
            alert('重要提示：本网站仅用于语言学习目的，专注于代词的教学和应用。');
        });
    }

    // 导航标签切换功能
    const navTabs = document.querySelectorAll('.nav-tab');
    if (navTabs.length > 0) {
        navTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的active类
                navTabs.forEach(t => t.classList.remove('active'));
                // 为当前点击的标签添加active类
                this.classList.add('active');
                
                // 显示对应内容（实际应用中可能需要加载不同内容）
                alert(`您选择了"${this.textContent}"分类，即将加载相关学习内容。`);
            });
        });
    }

    // 分类标签点击功能
    const categories = document.querySelectorAll('.category');
    if (categories.length > 0) {
        categories.forEach(category => {
            category.addEventListener('click', function() {
                alert(`您选择了"${this.textContent}"分类，即将筛选相关学习内容。`);
            });
        });
    }

    // 内容卡片点击功能
    const contentCards = document.querySelectorAll('.content-card');
    if (contentCards.length > 0) {
        contentCards.forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.card-title').textContent;
                alert(`您选择了"${title}"课程，即将开始学习。`);
            });
        });
    }

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`正在搜索"${searchTerm}"相关的代词学习内容...`);
                }
            }
        });
    }

    // AI学习助手按钮功能
    const aiButton = document.querySelector('.ai-button');
    if (aiButton) {
        aiButton.addEventListener('click', function() {
            alert('AI学习助手已启动，可以回答您关于代词用法的任何问题！');
        });
    }

    // 用户图标点击功能
    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            alert('请登录以访问您的个人学习中心、收藏课程和学习进度。');
        });
    }

    // 菜单图标点击功能
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            alert('侧边菜单将包含更多学习资源、课程分类和学习工具。');
        });
    }
});