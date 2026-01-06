// 會員資料管理 JavaScript
// 使用 localStorage 存儲會員數據

// 用戶帳號數據結構（存儲所有註冊用戶）
// {
//   users: [
//     {
//       id: "user-id",
//       email: "user@example.com",
//       password: "hashed-password",
//       name: "用戶名稱",
//       phone: "0912345678",
//       joinDate: "2024-01-01"
//     }
//   ]
// }

// 會員數據結構（當前登入用戶的完整資料）
// {
//   id: "user-id",
//   email: "user@example.com",
//   name: "用戶名稱",
//   phone: "0912345678",
//   address: "地址",
//   joinDate: "2024-01-01",
//   orders: [...],
//   reviews: [...],
//   points: 1000
// }

// 初始化用戶帳號系統
function initUserAccounts() {
    let accounts = { users: [] };
    
    if (localStorage.getItem('userAccounts')) {
        accounts = JSON.parse(localStorage.getItem('userAccounts'));
    }
    
    // 如果沒有用戶，創建預設測試帳號
    if (accounts.users.length === 0) {
        const testUser = {
            id: 'test-user-001',
            email: 'test@example.com',
            password: 'test1234',
            name: '測試用戶',
            phone: '0912-345-678',
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        accounts.users.push(testUser);
        localStorage.setItem('userAccounts', JSON.stringify(accounts));
        
        // 創建對應的會員資料
        const memberData = {
            id: testUser.id,
            email: testUser.email,
            name: testUser.name,
            phone: testUser.phone,
            address: '',
            joinDate: testUser.joinDate,
            orders: [],
            reviews: [],
            points: 0
        };
        
        const allMemberData = JSON.parse(localStorage.getItem('allMemberData') || '{}');
        allMemberData[testUser.id] = memberData;
        localStorage.setItem('allMemberData', JSON.stringify(allMemberData));
    }
}

// 註冊新用戶
function registerUser(userData) {
    initUserAccounts();
    const accounts = JSON.parse(localStorage.getItem('userAccounts'));
    
    // 檢查 email 是否已存在
    const existingUser = accounts.users.find(u => u.email === userData.email);
    if (existingUser) {
        return { success: false, message: '此帳號已存在' };
    }
    
    // 創建新用戶
    const newUser = {
        id: 'user-' + Date.now(),
        email: userData.email,
        password: userData.password, 
        name: userData.name,
        phone: userData.phone,
        joinDate: new Date().toISOString().split('T')[0]
    };
    
    accounts.users.push(newUser);
    localStorage.setItem('userAccounts', JSON.stringify(accounts));
    
    // 創建對應的會員資料
    const memberData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        address: '',
        joinDate: newUser.joinDate,
        orders: [],
        reviews: [],
        points: 0
    };
    
    // 如果該用戶的會員資料不存在，創建它
    const allMemberData = JSON.parse(localStorage.getItem('allMemberData') || '{}');
    allMemberData[newUser.id] = memberData;
    localStorage.setItem('allMemberData', JSON.stringify(allMemberData));
    
    return { success: true, user: newUser };
}

// 登入驗證
function loginUser(email, password) {
    initUserAccounts();
    const accounts = JSON.parse(localStorage.getItem('userAccounts'));
    
    const user = accounts.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { success: false, message: '帳號或密碼錯誤' };
    }
    
    // 載入該用戶的完整會員資料
    const allMemberData = JSON.parse(localStorage.getItem('allMemberData') || '{}');
    let memberData = allMemberData[user.id];
    
    // 如果會員資料不存在，創建基本資料
    if (!memberData) {
        memberData = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: '',
            joinDate: user.joinDate,
            orders: [],
            reviews: [],
            points: 0
        };
        allMemberData[user.id] = memberData;
        localStorage.setItem('allMemberData', JSON.stringify(allMemberData));
    }
    
    // 設置當前登入用戶
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name
    }));
    
    // 設置當前會員資料
    localStorage.setItem('memberData', JSON.stringify(memberData));
    
    return { success: true, user: user, memberData: memberData };
}

// 登出
function logoutUser() {
    localStorage.removeItem('currentUser');
    // 保留 memberData 以便下次登入時載入
    return true;
}

// 檢查是否已登入
function isLoggedIn() {
    return !!localStorage.getItem('currentUser');
}

// 獲取當前登入用戶信息
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// 初始化會員數據（已移至 loginUser 函數中處理）
function initMemberData() {
    // 會員資料現在由登入系統管理
    // 如果沒有登入，返回空資料
    if (!isLoggedIn()) {
        return null;
    }
}

// 獲取會員資料
function getMemberData() {
    if (!isLoggedIn()) {
        return null;
    }
    const memberData = localStorage.getItem('memberData');
    return memberData ? JSON.parse(memberData) : null;
}

// 更新會員資料
function updateMemberData(data) {
    if (!isLoggedIn()) {
        return null;
    }
    const member = getMemberData();
    if (!member) return null;
    
    Object.assign(member, data);
    localStorage.setItem('memberData', JSON.stringify(member));
    
    // 同時更新 allMemberData 中的資料
    const allMemberData = JSON.parse(localStorage.getItem('allMemberData') || '{}');
    allMemberData[member.id] = member;
    localStorage.setItem('allMemberData', JSON.stringify(allMemberData));
    
    return member;
}

// 添加訂單記錄
function addOrderToHistory(order) {
    if (!isLoggedIn()) {
        return null;
    }
    const member = getMemberData();
    if (!member) return null;
    
    if (!member.orders) {
        member.orders = [];
    }
    
    const newOrder = {
        orderId: 'ORD-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        items: order.items || [],
        total: order.total || 0,
        status: '已完成'
    };
    
    member.orders.push(newOrder);
    
    // 計算紅利點數（每消費100元獲得1點）
    member.points = (member.points || 0) + Math.floor(newOrder.total / 100);
    
    localStorage.setItem('memberData', JSON.stringify(member));
    
    // 同時更新 allMemberData 中的資料
    const allMemberData = JSON.parse(localStorage.getItem('allMemberData') || '{}');
    allMemberData[member.id] = member;
    localStorage.setItem('allMemberData', JSON.stringify(allMemberData));
    
    return newOrder;
}

// 渲染會員中心
function renderMemberCenter() {
    const member = getMemberData();
    const container = document.getElementById('member-center');
    if (!container) return;
    
    if (!member) {
        container.innerHTML = `
            <div class="alert alert-warning text-center">
                <h5>請先登入</h5>
                <p>您需要登入才能查看會員資料</p>
            </div>
        `;
        return;
    }
    
    const currentUser = getCurrentUser();
    
    container.innerHTML = `
        <div class="row">
            <!-- 側邊欄 -->
            <div class="col-md-3 mb-4">
                <div class="card mb-3">
                    <div class="card-body text-center">
                        <i class="fas fa-user-circle fa-4x text-primary mb-2"></i>
                        <h5 class="mb-1">${member.name || '會員'}</h5>
                        <p class="text-muted small mb-2">${member.email}</p>
                        <button class="btn btn-sm btn-outline-danger" onclick="handleLogout()">
                            <i class="fas fa-sign-out-alt me-1"></i>登出
                        </button>
                    </div>
                </div>
                <div class="list-group">
                    <a href="#profile" class="list-group-item list-group-item-action active" onclick="showMemberSection('profile'); return false;">
                        <i class="fas fa-user me-2"></i>個人資料
                    </a>
                    <a href="#orders" class="list-group-item list-group-item-action" onclick="showMemberSection('orders'); return false;">
                        <i class="fas fa-shopping-bag me-2"></i>訂單記錄
                    </a>
                    <a href="#reviews" class="list-group-item list-group-item-action" onclick="showMemberSection('reviews'); return false;">
                        <i class="fas fa-star me-2"></i>我的評論
                    </a>
                    <a href="#points" class="list-group-item list-group-item-action" onclick="showMemberSection('points'); return false;">
                        <i class="fas fa-coins me-2"></i>紅利點數
                    </a>
                </div>
            </div>
            
            <!-- 主要內容區 -->
            <div class="col-md-9">
                <div id="member-content">
                    ${renderProfileSection(member)}
                </div>
            </div>
        </div>
    `;
}

// 處理登出
function handleLogout() {
    if (confirm('確定要登出嗎？')) {
        logoutUser();
        location.reload();
    }
}

// 顯示不同區塊
function showMemberSection(section) {
    const member = getMemberData();
    const content = document.getElementById('member-content');
    const navItems = document.querySelectorAll('.list-group-item');
    
    // 更新導航狀態
    navItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.list-group-item').classList.add('active');
    
    // 渲染對應內容
    switch(section) {
        case 'profile':
            content.innerHTML = renderProfileSection(member);
            break;
        case 'orders':
            content.innerHTML = renderOrdersSection(member);
            break;
        case 'reviews':
            content.innerHTML = renderReviewsSection(member);
            break;
        case 'points':
            content.innerHTML = renderPointsSection(member);
            break;
    }
}

// 渲染個人資料區塊
function renderProfileSection(member) {
    return `
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-user me-2"></i>個人基本資料</h5>
            </div>
            <div class="card-body">
                <form id="profile-form" onsubmit="return updateProfile(event)">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="form-label"><strong>姓名：</strong></label>
                            <input type="text" class="form-control" id="member-name" value="${member.name || ''}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label"><strong>電子郵件：</strong></label>
                            <input type="email" class="form-control" id="member-email" value="${member.email || ''}" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="form-label"><strong>電話：</strong></label>
                            <input type="tel" class="form-control" id="member-phone" value="${member.phone || ''}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label"><strong>加入日期：</strong></label>
                            <input type="text" class="form-control" value="${member.joinDate || ''}" disabled>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><strong>地址：</strong></label>
                        <textarea class="form-control" id="member-address" rows="2">${member.address || ''}</textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save me-2"></i>儲存變更
                    </button>
                </form>
            </div>
        </div>
    `;
}

// 渲染訂單記錄區塊
function renderOrdersSection(member) {
    const orders = member.orders || [];
    
    if (orders.length === 0) {
        return `
            <div class="card">
                <div class="card-body text-center py-5">
                    <i class="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">尚無訂單記錄</h5>
                    <a href="index.html" class="btn btn-primary mt-3">開始購物</a>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-shopping-bag me-2"></i>歷史消費紀錄</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>訂單編號</th>
                                <th>日期</th>
                                <th>商品</th>
                                <th>總金額</th>
                                <th>狀態</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                                <tr>
                                    <td>${order.orderId}</td>
                                    <td>${order.date}</td>
                                    <td>
                                        ${order.items && order.items.length > 0 ? order.items.map(item => `
                                            <div class="small">
                                                ${item.name || '商品'} x${item.quantity || 1}
                                                ${item.size ? `(${item.size})` : ''}
                                            </div>
                                        `).join('') : '無商品資訊'}
                                    </td>
                                    <td>NT$ ${order.total.toLocaleString()}</td>
                                    <td>
                                        <span class="badge bg-success">${order.status || '已完成'}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="mt-3">
                    <strong>總消費金額：</strong>
                    <span class="text-primary h5">
                        NT$ ${orders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// 渲染評論區塊
function renderReviewsSection(member) {
    // 從評論系統獲取該用戶的所有評論
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    const userReviews = [];
    
    Object.keys(allReviews).forEach(productId => {
        allReviews[productId].forEach(review => {
            if (review.userId === member.id) {
                // 獲取商品名稱
                const product = typeof getProductById !== 'undefined' ? getProductById(productId) : null;
                userReviews.push({
                    ...review,
                    productId: productId,
                    productName: product ? product.name : '未知商品'
                });
            }
        });
    });
    
    if (userReviews.length === 0) {
        return `
            <div class="card">
                <div class="card-body text-center py-5">
                    <i class="fas fa-star fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">尚無評論記錄</h5>
                    <a href="index.html" class="btn btn-primary mt-3">瀏覽商品</a>
                </div>
            </div>
        `;
    }
    
    // 計算平均評分
    const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
    
    return `
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-star me-2"></i>評分與評論紀錄</h5>
            </div>
            <div class="card-body">
                <div class="mb-4 p-3 bg-light rounded">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h4 class="mb-0">平均評分</h4>
                            <div class="h2 text-primary mb-0">${avgRating.toFixed(1)}</div>
                            ${renderStars(avgRating, true)}
                        </div>
                        <div class="col-md-6 text-end">
                            <h5 class="text-muted">共 ${userReviews.length} 則評論</h5>
                        </div>
                    </div>
                </div>
                
                <div class="list-group">
                    ${userReviews.map(review => `
                        <div class="list-group-item">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h6 class="mb-1">
                                        <a href="product-detail.html?id=${review.productId}" class="text-decoration-none">
                                            ${review.productName}
                                        </a>
                                    </h6>
                                    <small class="text-muted">${review.date}</small>
                                </div>
                                <div>
                                    ${renderStars(review.rating, false)}
                                </div>
                            </div>
                            <p class="mb-0">${escapeHtml(review.comment)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// 渲染紅利點數區塊
function renderPointsSection(member) {
    const points = member.points || 0;
    
    return `
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-coins me-2"></i>紅利點數</h5>
            </div>
            <div class="card-body">
                <div class="text-center py-4">
                    <i class="fas fa-coins fa-4x text-warning mb-3"></i>
                    <h2 class="text-primary mb-2">${points.toLocaleString()}</h2>
                    <p class="text-muted">目前可用點數</p>
                </div>
                <hr>
                <div class="alert alert-info">
                    <h6><i class="fas fa-info-circle me-2"></i>點數說明</h6>
                    <ul class="mb-0">
                        <li>每消費 NT$ 100 可獲得 1 點</li>
                        <li>1 點可折抵 NT$ 1</li>
                        <li>點數永久有效</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// 更新個人資料
function updateProfile(event) {
    event.preventDefault();
    
    const member = updateMemberData({
        name: document.getElementById('member-name').value,
        email: document.getElementById('member-email').value,
        phone: document.getElementById('member-phone').value,
        address: document.getElementById('member-address').value
    });
    
    alert('個人資料已更新！');
    renderProfileSection(member);
    return false;
}

// 渲染星級（從 reviews.js 複製）
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

// HTML 轉義
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

