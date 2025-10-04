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
                
                // 根据选择的标签筛选内容
                const category = this.textContent;
                filterContentByCategory(category);
            });
        });
    }

    // 分类标签点击功能
    const categories = document.querySelectorAll('.category');
    if (categories.length > 0) {
        categories.forEach(category => {
            category.addEventListener('click', function() {
                // 根据选择的分类筛选内容
                const categoryName = this.textContent;
                filterContentByCategory(categoryName);
            });
        });
    }

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    // 添加搜索按钮点击事件
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // 添加输入框回车事件
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // 添加输入实时搜索功能（可选）
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = this.value.trim();
            
            // 如果输入为空，显示所有内容
            if (!searchTerm) {
                loadContentCards();
                return;
            }
            
            // 延迟搜索，避免频繁请求
            searchTimeout = setTimeout(() => {
                performSearch();
            }, 500);
        });
    }

    // AI学习助手按钮功能
    const aiButton = document.querySelector('.ai-button');
    if (aiButton) {
        aiButton.addEventListener('click', function() {
            alert('广告位招商：huangdaye42@gmail.com');
        });
    }

    // 用户图标点击功能
    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            alert('作者太懒了，这里没有开发~');
        });
    }

    // 菜单图标点击功能
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            alert('广告位招商：huangdaye42@gmail.com');
        });
    }
});

// 执行搜索功能
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput ? searchInput.value.trim() : '';
    
    if (searchTerm) {
        searchContent(searchTerm);
    } else {
        // 如果搜索词为空，显示所有内容
        loadContentCards();
    }
}

// 搜索内容函数
function searchContent(searchTerm) {
    const contentGrid = document.querySelector('.content-grid');
    
    // 显示搜索中提示
    if (contentGrid) {
        contentGrid.innerHTML = '<div class="loading-message">正在搜索"' + searchTerm + '"相关内容，请稍候...</div>';
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
                // 清空搜索中提示
                contentGrid.innerHTML = '';
                
                // 过滤匹配搜索词的卡片
                const filteredCards = data.cards.filter(card => {
                    // 将搜索词转换为小写，进行不区分大小写的搜索
                    const lowerSearchTerm = searchTerm.toLowerCase();
                    
                    // 在标题、作者、描述中搜索
                    const titleMatch = card.title && card.title.toLowerCase().includes(lowerSearchTerm);
                    const authorMatch = card.author && card.author.toLowerCase().includes(lowerSearchTerm);
                    const altMatch = card.alt && card.alt.toLowerCase().includes(lowerSearchTerm);
                    
                    return titleMatch || authorMatch || altMatch;
                });
                
                if (filteredCards.length > 0) {
                    // 显示搜索结果
                    filteredCards.forEach(card => {
                        const cardElement = createCardElement(card);
                        contentGrid.appendChild(cardElement);
                    });
                    
                    // 显示搜索结果数量
                    const resultCount = document.createElement('div');
                    resultCount.className = 'search-result-count';
                    resultCount.textContent = `找到 ${filteredCards.length} 个与"${searchTerm}"相关的结果`;
                    contentGrid.insertBefore(resultCount, contentGrid.firstChild);
                    
                    // 为新创建的卡片添加点击事件
                    addCardClickEvents();
                } else {
                    // 没有找到匹配的结果
                    contentGrid.innerHTML = `
                        <div class="no-results">
                            <p>没有找到与"${searchTerm}"相关的内容</p>
                            <button class="btn-reset-search" onclick="loadContentCards()">显示全部内容</button>
                        </div>
                    `;
                }
            }
        })
        .catch(error => {
            console.error('搜索内容失败:', error);
            contentGrid.innerHTML = '<p class="error-message">搜索失败，请稍后再试。</p>';
        });
}

// 根据分类筛选内容
function filterContentByCategory(category) {
    const contentGrid = document.querySelector('.content-grid');
    
    // 显示加载中提示
    if (contentGrid) {
        contentGrid.innerHTML = '<div class="loading-message">正在加载"' + category + '"分类内容，请稍候...</div>';
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
                
                // 过滤匹配分类的卡片
                let filteredCards = [];
                
                // 如果选择的是"首页"，显示所有内容
                if (category === '首页') {
                    filteredCards = data.cards;
                } else {
                    // 在标题、作者、描述中搜索分类关键词
                    filteredCards = data.cards.filter(card => {
                        const lowerCategory = category.toLowerCase();
                        
                        const titleMatch = card.title && card.title.toLowerCase().includes(lowerCategory);
                        const authorMatch = card.author && card.author.toLowerCase().includes(lowerCategory);
                        const altMatch = card.alt && card.alt.toLowerCase().includes(lowerCategory);
                        
                        return titleMatch || authorMatch || altMatch;
                    });
                }
                
                if (filteredCards.length > 0) {
                    // 显示筛选结果
                    filteredCards.forEach(card => {
                        const cardElement = createCardElement(card);
                        contentGrid.appendChild(cardElement);
                    });
                    
                    // 显示筛选结果数量
                    const resultCount = document.createElement('div');
                    resultCount.className = 'search-result-count';
                    resultCount.textContent = category === '首页' ? '显示全部内容' : `找到 ${filteredCards.length} 个"${category}"分类的内容`;
                    contentGrid.insertBefore(resultCount, contentGrid.firstChild);
                    
                    // 为新创建的卡片添加点击事件
                    addCardClickEvents();
                } else {
                    // 没有找到匹配的结果
                    contentGrid.innerHTML = `
                        <div class="no-results">
                            <p>没有找到"${category}"分类的内容</p>
                            <button class="btn-reset-search" onclick="loadContentCards()">显示全部内容</button>
                        </div>
                    `;
                }
            }
        })
        .catch(error => {
            console.error('筛选内容失败:', error);
            contentGrid.innerHTML = '<p class="error-message">加载失败，请稍后再试。</p>';
        });
}

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
            <!--<div class="card-duration">${cardData.duration}</div>-->
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