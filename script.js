// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载内容卡片数据
    loadContentCards();
    
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

// 从list.json加载内容卡片数据并动态展示
function loadContentCards() {
    const contentGrid = document.querySelector('.content-grid');
    
    // 清空现有的内容卡片
    if (contentGrid) {
        contentGrid.innerHTML = '';
        // 显示加载中提示
        contentGrid.innerHTML = '<div class="loading-message">正在加载内容，请稍候...</div>';
    }
    
    // 使用fetch API加载JSON数据
    fetch('list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            if (data.cards && Array.isArray(data.cards)) {
                // 清空加载中提示
                contentGrid.innerHTML = '';
                
                // 遍历卡片数据并直接创建卡片元素
                data.cards.forEach(card => {
                    const cardElement = createCardElement(card);
                    contentGrid.appendChild(cardElement);
                });
                
                // 为新创建的卡片添加点击事件
                addCardClickEvents();
            }
        })
        .catch(error => {
            console.error('加载内容卡片数据失败:', error);
            // 如果加载失败，显示错误信息或默认内容
            contentGrid.innerHTML = '<p class="error-message">加载内容失败，请稍后再试。</p>';
        });
}

// 获取Bilibili视频链接
function getBilibiliVideoUrl(bvid) {
    return `https://www.bilibili.com/video/${bvid}`;
}

// 创建单个卡片元素的函数
function createCardElement(cardData) {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.dataset.id = cardData.id;
    card.dataset.bvid = cardData.bvid;
    
    // 使用预定义的数据
    const title = cardData.title;
    const views = cardData.views;
    const rating = cardData.rating;
    const author = cardData.author || "未知UP主";
    
    // 生成B站视频iframe嵌入代码
    let iframeHtml = '';
    if (cardData.aid && cardData.bvid) {
        iframeHtml = `<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=${cardData.aid}&bvid=${cardData.bvid}&p=1&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>`;
    } else {
        // 如果没有视频信息，显示占位图
        iframeHtml = `<img src="http://iph.href.lu/320x180?text=${encodeURIComponent(cardData.alt)}" alt="${cardData.alt}" class="card-thumbnail">`;
    }
    
    card.innerHTML = `
        <div class="card-thumbnail-container">
            ${iframeHtml}
            <div class="card-duration">${cardData.duration}</div>
        </div>
        <div class="card-info">
            <h3 class="card-title">${title}</h3>
            <div class="card-meta">
                <span>UP主: ${author}</span>
                <!--<span>浏览量: ${views}</span>
                <span>好评率: ${rating}</span>-->
            </div>
        </div>
    `;
    
    return card;
}

// 为卡片添加点击事件的函数
function addCardClickEvents() {
    const contentCards = document.querySelectorAll('.content-card');
    if (contentCards.length > 0) {
        contentCards.forEach(card => {
            card.addEventListener('click', function() {
                const bvid = this.dataset.bvid;
                const title = this.querySelector('.card-title').textContent;
                
                if (bvid) {
                    // 跳转到Bilibili视频页面
                    const videoUrl = getBilibiliVideoUrl(bvid);
                    window.open(videoUrl, '_blank');
                } else {
                    alert(`您选择了"${title}"课程，即将开始学习。`);
                }
            });
        });
    }
}