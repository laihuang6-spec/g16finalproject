// 購物車功能 JavaScript
// 使用 localStorage 存儲購物車數據

// 購物車數據結構
// {
//   items: [
//     {
//       cartItemId: "product-id-size", // 唯一標識（商品ID + 尺寸）
//       id: "product-id",
//       name: "商品名稱",
//       brand: "品牌",
//       description: "商品描述",
//       price: 價格,
//       image: "圖片路徑",
//       quantity: 數量,
//       size: "尺寸" // 可選
//     }
//   ],
//   total: 總金額
// }

// 生成購物車項目唯一ID
function generateCartItemId(product) {
    const baseId = product.id;
    const size = product.size || '';
    return size ? `${baseId}-${size}` : baseId;
}

// 初始化購物車
function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify({ items: [], total: 0 }));
    }
}

// 獲取購物車
function getCart() {
    initCart();
    return JSON.parse(localStorage.getItem('cart'));
}

// 保存購物車
function saveCart(cart) {
    // 計算總金額
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 添加商品到購物車
function addToCart(product) {
    const cart = getCart();
    const cartItemId = generateCartItemId(product);
    
    // 查找相同商品和尺寸的項目（使用 cartItemId）
    const existingItem = cart.items.find(item => item.cartItemId === cartItemId);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.items.push({
            ...product,
            cartItemId: cartItemId,
            quantity: product.quantity || 1,
            size: product.size || ''
        });
    }
    
    saveCart(cart);
    updateCartBadge();
    showAddToCartMessage();
}

// 從購物車移除商品（使用 cartItemId）
function removeFromCart(cartItemId) {
    const cart = getCart();
    cart.items = cart.items.filter(item => item.cartItemId !== cartItemId);
    saveCart(cart);
    updateCartBadge();
    
    if (isCartPage()) {
        renderCart();
    }
}

// 更新商品數量（使用 cartItemId，限制最大值為 99）
function updateQuantity(cartItemId, quantity) {
    if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
    }
    
    // 限制最大數量為 99
    if (quantity > 99) {
        quantity = 99;
        alert('單一商品數量最多為 99 件');
    }
    
    const cart = getCart();
    const item = cart.items.find(item => item.cartItemId === cartItemId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
        updateCartBadge();
        
        if (isCartPage()) {
            renderCart();
        }
    }
}

// 清空購物車
function clearCart() {
    localStorage.setItem('cart', JSON.stringify({ items: [], total: 0 }));
    updateCartBadge();
    if (isCartPage()) {
        renderCart();
    }
}

// 檢查是否在購物車頁面（跨平台相容）
function isCartPage() {
    const path = window.location.pathname || window.location.href;
    return path.includes('cart.html') || path.endsWith('cart.html');
}

// 檢查是否在收藏頁面（跨平台相容）
function isWishlistPage() {
    const path = window.location.pathname || window.location.href;
    return path.includes('wishlist.html') || path.endsWith('wishlist.html');
}

// 檢查是否在搜尋頁面（跨平台相容）
function isSearchPage() {
    const path = window.location.pathname || window.location.href;
    return path.includes('search.html') || path.endsWith('search.html');
}

// 獲取購物車商品總數
function getCartItemCount() {
    const cart = getCart();
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

// 更新購物車徽章（顯示商品數量）
function updateCartBadge() {
    const count = getCartItemCount();
    const badge = document.getElementById('cart-badge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// 顯示加入購物車成功訊息
function showAddToCartMessage() {
    // 創建提示訊息
    const message = document.createElement('div');
    message.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    message.style.zIndex = '9999';
    message.style.minWidth = '300px';
    message.innerHTML = '<i class="fas fa-check-circle me-2"></i>商品已加入購物車！';
    
    document.body.appendChild(message);
    
    // 3秒後自動移除
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// 渲染購物車頁面
function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartContainer) return;
    
    if (cart.items.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">購物車是空的</h4>
                <p class="text-muted">快去選購您喜歡的商品吧！</p>
                <a href="index.html" class="btn btn-primary mt-3">繼續購物</a>
            </div>
        `;
        if (cartSummary) {
            cartSummary.innerHTML = '';
        }
        return;
    }
    
    // 渲染商品列表
    cartContainer.innerHTML = cart.items.map(item => `
        <div class="card mb-3 cart-item" data-cart-item-id="${item.cartItemId || item.id}">
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}" style="object-fit: cover; height: 150px; width: 100%;">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted mb-1">${item.brand}</p>
                        <p class="card-text text-muted small">${item.description}</p>
                        ${item.size ? `<p class="card-text text-muted small mb-2"><strong>尺寸：</strong>${item.size}</p>` : ''}
                        <div class="d-flex align-items-center mt-3">
                            <label class="me-2">數量：</label>
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.cartItemId || item.id}', ${item.quantity - 1})">-</button>
                                <input type="number" class="form-control text-center" value="${item.quantity}" min="1" max="99" onchange="updateQuantity('${item.cartItemId || item.id}', Math.min(99, Math.max(1, parseInt(this.value) || 1)))">
                                <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.cartItemId || item.id}', ${Math.min(99, item.quantity + 1)})">+</button>
                            </div>
                            <button class="btn btn-link text-danger ms-3" onclick="removeFromCart('${item.cartItemId || item.id}')">
                                <i class="fas fa-trash"></i> 移除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <div class="card-body">
                        <h5 class="text-primary">NT$ ${item.price.toLocaleString()}</h5>
                        <p class="text-muted small">小計：NT$ ${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // 渲染購物車摘要
    if (cartSummary) {
        cartSummary.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">訂單摘要</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <span>商品數量：</span>
                        <span>${getCartItemCount()} 件</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <span><strong>總計：</strong></span>
                        <span class="text-primary"><strong>NT$ ${cart.total.toLocaleString()}</strong></span>
                    </div>
                    <button class="btn btn-primary w-100 mb-2" onclick="checkout()">前往結帳</button>
                    <a href="index.html" class="btn btn-outline-secondary w-100">繼續購物</a>
                </div>
            </div>
        `;
    }
}

// 結帳功能（目前顯示提示）
function checkout() {
    const cart = getCart();
    if (cart.items.length === 0) {
        alert('購物車是空的！');
        return;
    }
    
    // 如果會員系統已載入，將訂單添加到會員歷史記錄
    if (typeof addOrderToHistory === 'function') {
        addOrderToHistory({
            items: cart.items,
            total: cart.total
        });
    }
    
    alert('結帳成功！總金額：NT$ ' + cart.total.toLocaleString());
    
    // 清空購物車
    clearCart();
    
    // 未來可以導向結帳頁面
    // window.location.href = 'checkout.html';
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    updateCartBadge();
    
    // 如果在購物車頁面，渲染購物車
    if (isCartPage()) {
        renderCart();
    }
});

