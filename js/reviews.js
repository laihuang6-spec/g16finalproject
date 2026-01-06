// 評論功能 JavaScript
// 使用 localStorage 存儲評論數據

// 評論數據結構
// {
//   productId: [
//     {
//       id: "review-id",
//       userId: "user-id",
//       userName: "用戶名稱",
//       rating: 5, // 1-5 星
//       comment: "評論內容",
//       date: "2024-01-01",
//       verified: false // 是否為購買驗證
//     }
//   ]
// }

// 初始化評論數據
function initReviews() {
    if (!localStorage.getItem('reviews')) {
        localStorage.setItem('reviews', JSON.stringify({}));
    }
}

// 獲取商品評論
function getProductReviews(productId) {
    initReviews();
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    return reviews[productId] || [];
}

// 添加評論
function addReview(productId, review) {
    initReviews();
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    
    if (!reviews[productId]) {
        reviews[productId] = [];
    }
    
    const newReview = {
        id: 'review-' + Date.now(),
        userId: getCurrentUserId(),
        userName: getCurrentUserName(),
        rating: review.rating,
        comment: review.comment,
        date: new Date().toISOString().split('T')[0],
        verified: checkIfUserPurchased(productId)
    };
    
    reviews[productId].push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // 更新商品平均評分
    updateProductRating(productId);
    
    return newReview;
}

// 計算商品平均評分
function getProductAverageRating(productId) {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

// 更新商品評分（存儲在商品數據中）
function updateProductRating(productId) {
    // 這裡可以更新商品數據中的評分
    const avgRating = getProductAverageRating(productId);
    // 如果需要，可以更新商品列表中的評分顯示
}

// 檢查用戶是否購買過該商品
function checkIfUserPurchased(productId) {
    const orders = getOrderHistory();
    return orders.some(order => 
        order.items && order.items.some(item => item.id === productId)
    );
}

// 獲取當前用戶ID（從會員系統）
function getCurrentUserId() {
    // 優先使用會員系統的函數
    if (typeof getCurrentUser === 'function') {
        const user = getCurrentUser();
        if (user && user.id) return user.id;
    }
    
    // 備用方案
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.id) return user.id;
    
    const member = JSON.parse(localStorage.getItem('memberData') || '{}');
    return member.id || 'guest-' + Date.now();
}

// 獲取當前用戶名稱
function getCurrentUserName() {
    // 優先使用會員系統的函數
    if (typeof getCurrentUser === 'function') {
        const user = getCurrentUser();
        if (user && user.name) return user.name;
    }
    
    // 備用方案
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.name) return user.name;
    
    const member = JSON.parse(localStorage.getItem('memberData') || '{}');
    return member.name || '訪客';
}

// 獲取訂單歷史（從會員系統）
function getOrderHistory() {
    // 優先使用會員系統的函數
    if (typeof getMemberData === 'function') {
        const member = getMemberData();
        if (member && member.orders) return member.orders;
    }
    
    // 備用方案
    const member = JSON.parse(localStorage.getItem('memberData') || '{}');
    return member.orders || [];
}

// 渲染評論區
function renderReviews(productId) {
    const reviews = getProductReviews(productId);
    const avgRating = getProductAverageRating(productId);
    const ratingCount = reviews.length;
    
    // 計算各星級數量
    const ratingDistribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
            ratingDistribution[review.rating - 1]++;
        }
    });
    
    const reviewsContainer = document.getElementById('reviews-section');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = `
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-star me-2"></i>商品評論</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4 text-center mb-4">
                        <div class="mb-3">
                            <h2 class="text-primary mb-0">${avgRating}</h2>
                            <div class="mb-2">
                                ${renderStars(parseFloat(avgRating), true)}
                            </div>
                            <p class="text-muted small">共 ${ratingCount} 則評論</p>
                        </div>
                        <div class="rating-breakdown">
                            ${[5, 4, 3, 2, 1].map((star, index) => `
                                <div class="d-flex align-items-center mb-2">
                                    <span class="me-2">${star} 星</span>
                                    <div class="progress flex-grow-1" style="height: 8px;">
                                        <div class="progress-bar" role="progressbar" 
                                             style="width: ${ratingCount > 0 ? (ratingDistribution[4-index] / ratingCount * 100) : 0}%">
                                        </div>
                                    </div>
                                    <span class="ms-2 small">${ratingDistribution[4-index]}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div id="reviews-list">
                            ${reviews.length === 0 ? 
                                '<p class="text-muted text-center py-4">尚無評論，成為第一個評論者吧！</p>' :
                                reviews.map(review => renderReviewItem(review)).join('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 評論表單 -->
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">撰寫評論</h5>
            </div>
            <div class="card-body">
                <form id="review-form" onsubmit="return submitReview(event, '${productId}')">
                    <div class="mb-3">
                        <label class="form-label"><strong>評分：</strong></label>
                        <div class="rating-input">
                            ${[1, 2, 3, 4, 5].map(star => `
                                <input type="radio" name="rating" id="rating-${star}" value="${star}" required>
                                <label for="rating-${star}" class="star-label" onclick="setRating(${star})">
                                    <i class="far fa-star"></i>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="review-comment" class="form-label"><strong>評論內容：</strong></label>
                        <textarea class="form-control" id="review-comment" rows="4" 
                                  placeholder="分享您對這個商品的看法..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane me-2"></i>提交評論
                    </button>
                </form>
            </div>
        </div>
    `;
}

// 渲染單個評論項目
function renderReviewItem(review) {
    return `
        <div class="review-item border-bottom pb-3 mb-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                    <strong>${escapeHtml(review.userName)}</strong>
                    ${review.verified ? '<span class="badge bg-success ms-2">已購買</span>' : ''}
                </div>
                <small class="text-muted">${review.date}</small>
            </div>
            <div class="mb-2">
                ${renderStars(review.rating, false)}
            </div>
            <p class="mb-0">${escapeHtml(review.comment)}</p>
        </div>
    `;
}

// 渲染星級
function renderStars(rating, showHalf) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }
    return stars;
}

// 設置評分
let selectedRating = 0;
function setRating(rating) {
    selectedRating = rating;
    for (let i = 1; i <= 5; i++) {
        const label = document.querySelector(`label[for="rating-${i}"]`);
        if (label) {
            if (i <= rating) {
                label.innerHTML = '<i class="fas fa-star text-warning"></i>';
            } else {
                label.innerHTML = '<i class="far fa-star"></i>';
            }
        }
    }
}

// 提交評論
function submitReview(event, productId) {
    event.preventDefault();
    
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const rating = ratingInput ? parseInt(ratingInput.value) : selectedRating;
    const comment = document.getElementById('review-comment').value.trim();
    
    if (!rating || !comment) {
        alert('請填寫完整的評分和評論內容');
        return false;
    }
    
    addReview(productId, { rating, comment });
    renderReviews(productId);
    
    // 重置表單
    document.getElementById('review-form').reset();
    selectedRating = 0;
    for (let i = 1; i <= 5; i++) {
        const label = document.querySelector(`label[for="rating-${i}"]`);
        if (label) {
            label.innerHTML = '<i class="far fa-star"></i>';
        }
    }
    
    alert('評論已提交，感謝您的回饋！');
    return false;
}

// HTML 轉義
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

