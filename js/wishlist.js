// 收藏功能 JavaScript
// 使用 localStorage 存儲收藏列表

// 初始化收藏列表
function initWishlist() {
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify([]));
    }
}

// 獲取收藏列表
function getWishlist() {
    initWishlist();
    return JSON.parse(localStorage.getItem('wishlist'));
}

// 保存收藏列表
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// 檢查商品是否已收藏
function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === productId);
}

// 添加商品到收藏
function addToWishlist(product) {
    const wishlist = getWishlist();
    
    // 檢查是否已存在
    if (isInWishlist(product.id)) {
        showWishlistMessage('商品已在收藏列表中', 'info');
        return false;
    }
    
    // 添加商品
    wishlist.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category || '',
        addedAt: new Date().toISOString()
    });
    
    saveWishlist(wishlist);
    updateWishlistBadge();
    showWishlistMessage('已加入收藏', 'success');
    
    // 如果當前在收藏頁面，重新渲染
    if (isWishlistPage()) {
        renderWishlist();
    }
    
    return true;
}

// 從收藏移除商品
function removeFromWishlist(productId) {
    const wishlist = getWishlist();
    const newWishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist(newWishlist);
    updateWishlistBadge();
    
    // 如果當前在收藏頁面，重新渲染
    if (isWishlistPage()) {
        renderWishlist();
    }
    
    showWishlistMessage('已從收藏移除', 'success');
}

// 獲取收藏商品總數
function getWishlistCount() {
    return getWishlist().length;
}

// 更新收藏徽章
function updateWishlistBadge() {
    const count = getWishlistCount();
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// 顯示收藏訊息
function showWishlistMessage(message, type = 'success') {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-info';
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${alertClass} position-fixed top-0 start-50 translate-middle-x mt-3`;
    messageDiv.style.zIndex = '9999';
    messageDiv.style.minWidth = '300px';
    messageDiv.innerHTML = `<i class="fas fa-heart me-2"></i>${message}`;
    
    document.body.appendChild(messageDiv);
    
    // 3秒後自動移除
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 渲染收藏頁面
function renderWishlist() {
    const wishlist = getWishlist();
    const wishlistContainer = document.getElementById('wishlist-items');
    
    if (!wishlistContainer) return;
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-heart fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">收藏列表是空的</h4>
                <p class="text-muted">快去收藏您喜歡的商品吧！</p>
                <a href="index.html" class="btn btn-primary mt-3">繼續購物</a>
            </div>
        `;
        return;
    }
    
    // 渲染商品列表
    wishlistContainer.innerHTML = `
        <div class="row g-4">
            ${wishlist.map(item => `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="product-card p-3 rounded border h-100">
                        <a href="product-detail.html?id=${item.id}">
                            <img src="${item.image}" class="img-fluid mb-3" alt="${item.name}">
                        </a>
                        <div><b>${item.name}</b></div>
                        <div class="text-secondary mb-2">${item.description}</div>
                        <div class="text-primary mb-3"><strong>NT$ ${item.price.toLocaleString()}</strong></div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" onclick="addToCartFromWishlist('${item.id}')">
                                <img style="height: 18px;" src="photos/buy.png"> 加入購物車
                            </button>
                            <button class="btn btn-outline-danger" onclick="removeFromWishlist('${item.id}')">
                                <i class="fas fa-trash me-1"></i> 移除收藏
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 從收藏列表加入購物車
function addToCartFromWishlist(productId) {
    const wishlist = getWishlist();
    const product = wishlist.find(item => item.id === productId);
    
    if (product) {
        // 使用購物車功能
        if (typeof addToCart === 'function') {
            addToCart(product);
        } else {
            alert('購物車功能未載入');
        }
    }
}

// 切換收藏狀態（用於商品詳情頁）
function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        return false;
    } else {
        addToWishlist(product);
        return true;
    }
}

// 更新收藏按鈕狀態
function updateWishlistButton(productId, buttonElement) {
    if (isInWishlist(productId)) {
        buttonElement.innerHTML = '<i class="fas fa-heart me-2"></i>已收藏';
        buttonElement.classList.remove('btn-outline-secondary');
        buttonElement.classList.add('btn-danger');
    } else {
        buttonElement.innerHTML = '<i class="far fa-heart me-2"></i>收藏';
        buttonElement.classList.remove('btn-danger');
        buttonElement.classList.add('btn-outline-secondary');
    }
}

// 更新商品卡片上的收藏按鈕（右上角愛心）
function updateWishlistIcon(productId, iconElement) {
    if (isInWishlist(productId)) {
        iconElement.innerHTML = '<i class="fas fa-heart"></i>';
        iconElement.classList.add('active');
    } else {
        iconElement.innerHTML = '<i class="far fa-heart"></i>';
        iconElement.classList.remove('active');
    }
}

// 切換商品收藏狀態（用於商品卡片）
function toggleProductWishlist(productId, productData) {
    let product = productData;
    
    if (!product && typeof getProductById === 'function') {
        product = getProductById(productId);
    }
    
    // 如果還是沒有，嘗試從按鈕的 onclick 屬性中提取
    if (!product) {
        const btn = document.querySelector(`[data-product-id="${productId}"]`);
        if (btn && btn.onclick) {
            console.warn('無法獲取商品資料，請確保已載入 search.js');
        }
    }
    
    if (!product) {
        console.error('商品不存在:', productId);
        alert('無法找到商品資料，請刷新頁面重試');
        return false;
    }
    
    const isInList = isInWishlist(productId);
    
    if (isInList) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(product);
    }
    
    // 更新頁面上所有該商品的收藏圖標
    document.querySelectorAll(`[data-product-id="${productId}"]`).forEach(btn => {
        updateWishlistIcon(productId, btn);
    });
    
    return !isInList;
}

// 檢查是否在收藏頁面（跨平台相容）
function isWishlistPage() {
    const path = window.location.pathname || window.location.href;
    return path.includes('wishlist.html') || path.endsWith('wishlist.html');
}

// 初始化頁面上所有商品的收藏圖標狀態
function initProductWishlistIcons() {
    document.querySelectorAll('.wishlist-btn[data-product-id]').forEach(btn => {
        const productId = btn.getAttribute('data-product-id');
        updateWishlistIcon(productId, btn);
    });
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    initWishlist();
    updateWishlistBadge();
    
    // 初始化所有商品卡片的收藏圖標
    initProductWishlistIcons();
    
    // 如果在收藏頁面，渲染收藏列表
    if (isWishlistPage()) {
        renderWishlist();
    }
});

