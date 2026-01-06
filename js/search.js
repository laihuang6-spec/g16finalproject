// 站內搜尋功能
// 商品數據庫（實際應用中應該從後端獲取）
const productsDatabase = [
    // Drew House 商品
    { id: 'drew-001', name: 'Drew House', brand: 'Drew House', description: '笑臉滿月狼', price: 2800, image: 'photos/drew.jpg', category: 'Drew House' },
    { id: 'drew-002', name: 'Drew House', brand: 'Drew House', description: '日本限定款', price: 3200, image: 'photos/drew1.jpg', category: 'Drew House' },
    { id: 'drew-003', name: 'Drew House', brand: 'Drew House', description: '背面恐龍', price: 2900, image: 'photos/drew2.jpg', category: 'Drew House' },
    { id: 'drew-004', name: 'Drew House', brand: 'Drew House', description: '素描氣球', price: 2700, image: 'photos/drew3.jpg', category: 'Drew House' },
    { id: 'drew-005', name: 'Drew House', brand: 'Drew House', description: '字體愛心', price: 2600, image: 'photos/drew4.jpg', category: 'Drew House' },
    { id: 'drew-006', name: 'Drew House', brand: 'Drew House', description: 'JOY氣球', price: 3000, image: 'photos/drew5.jpg', category: 'Drew House' },
    { id: 'drew-007', name: 'Drew House', brand: 'Drew House', description: '愛心字體', price: 2750, image: 'photos/drew6.jpg', category: 'Drew House' },
    { id: 'drew-008', name: 'Drew House', brand: 'Drew House', description: '太陽笑臉', price: 2850, image: 'photos/drew7.jpg', category: 'Drew House' },
    
    // FOG Essentials 商品
    { id: 'fog-001', name: 'FOG Essentials 2023', brand: 'FOG Essentials', description: '大LOGO 黑', price: 4500, image: 'photos/fog.jpg', category: 'FOG Essentials' },
    { id: 'fog-002', name: 'FOG Essentials 2023', brand: 'FOG Essentials', description: '大LOGO 蛋白', price: 4500, image: 'photos/fog1.jpg', category: 'FOG Essentials' },
    { id: 'fog-003', name: 'FOG Essentials 2023', brand: 'FOG Essentials', description: '大LOGO 木頭', price: 4500, image: 'photos/fog2.jpg', category: 'FOG Essentials' },
    { id: 'fog-004', name: 'FOG Essentials 2023', brand: 'FOG Essentials', description: '大LOGO 淡黃', price: 4500, image: 'photos/fog3.jpg', category: 'FOG Essentials' },
    { id: 'fog-005', name: 'FOG Essentials 2023', brand: 'FOG Essentials', description: '大LOGO 煙灰', price: 4500, image: 'photos/fog4.jpg', category: 'FOG Essentials' },
    { id: 'fog-006', name: 'FOG Essentials 2023', brand: 'FOG Essentials', description: '大LOGO 珊瑚', price: 4500, image: 'photos/fog5.jpg', category: 'FOG Essentials' },
    { id: 'fog-007', name: 'FOG Essentials', brand: 'FOG Essentials', description: 'STAR TEE', price: 4200, image: 'photos/fog6.jpg', category: 'FOG Essentials' },
    { id: 'fog-008', name: 'FOG Essentials', brand: 'FOG Essentials', description: '網眼短褲', price: 3800, image: 'photos/fog7.jpg', category: 'FOG Essentials' },
    
    // Human Made 商品
    { id: 'human-001', name: 'HumanMade 2023-05', brand: 'Human Made', description: '兔兔草', price: 3800, image: 'photos/human.jpg', category: 'Human Made' },
    { id: 'human-002', name: 'HumanMade 2022-36 I know Nigo', brand: 'Human Made', description: '魔毯狗狗', price: 4200, image: 'photos/human1.jpg', category: 'Human Made' },
    { id: 'human-003', name: 'HumanMade 2023-10', brand: 'Human Made', description: '伊勢丹限定', price: 4000, image: 'photos/human2.jpg', category: 'Human Made' },
    { id: 'human-004', name: 'HumanMade 2023-12', brand: 'Human Made', description: '大熊', price: 3900, image: 'photos/human3.jpg', category: 'Human Made' },
    { id: 'human-005', name: 'HumanMade x KAWS 2021-36', brand: 'Human Made', description: '飛天鴨', price: 5000, image: 'photos/human4.jpg', category: 'Human Made' },
    { id: 'human-006', name: 'HumanMade 2022-33', brand: 'Human Made', description: '愛心', price: 3600, image: 'photos/human5.jpg', category: 'Human Made' },
    { id: 'human-007', name: 'HumanMade 2023-01', brand: 'Human Made', description: 'AI機器人', price: 4100, image: 'photos/human6.jpg', category: 'Human Made' },
    { id: 'human-008', name: 'HumanMade 2023-17', brand: 'Human Made', description: '眼鏡貓頭鷹', price: 3950, image: 'photos/human7.jpg', category: 'Human Made' },
    
    // STUSSY 商品
    { id: 'stussy-001', name: 'STUSSY', brand: 'STUSSY', description: 'POP TOP TEE', price: 2200, image: 'photos/ami.jpg', category: 'STUSSY' },
    { id: 'stussy-002', name: 'STUSSY', brand: 'STUSSY', description: 'CLUB PIGMENT DYED TEE', price: 2400, image: 'photos/ami1.jpg', category: 'STUSSY' },
    { id: 'stussy-003', name: 'STUSSY', brand: 'STUSSY', description: 'BOUQUET TEE', price: 2300, image: 'photos/ami2.jpg', category: 'STUSSY' },
    { id: 'stussy-004', name: 'STUSSY', brand: 'STUSSY', description: '20 WARRIOR MAN TEE', price: 2500, image: 'photos/ami3.jpg', category: 'STUSSY' },
    { id: 'stussy-005', name: 'STUSSY', brand: 'STUSSY', description: 'OLD CROWN TEE', price: 2350, image: 'photos/ami4.jpg', category: 'STUSSY' },
    { id: 'stussy-006', name: 'STUSSY', brand: 'STUSSY', description: 'STOCK FLEECE SHORT', price: 3200, image: 'photos/ami5.jpg', category: 'STUSSY' },
    { id: 'stussy-007', name: 'STUSSY', brand: 'STUSSY', description: 'STOCK WATER SHORT', price: 3000, image: 'photos/ami6.jpg', category: 'STUSSY' },
    { id: 'stussy-008', name: 'STUSSY', brand: 'STUSSY', description: 'SAY IT LOUD TEE', price: 2400, image: 'photos/ami7.jpg', category: 'STUSSY' },
];

// 搜尋商品
function searchProducts(query) {
    if (!query || query.trim() === '') {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    return productsDatabase.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.brand.toLowerCase().includes(searchTerm) ||
               product.description.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm);
    });
}

// 處理搜尋表單提交
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value : '';
    
    if (query.trim() === '') {
        alert('請輸入搜尋關鍵字');
        return false;
    }
    
    // 將搜尋關鍵字存儲到 sessionStorage
    sessionStorage.setItem('searchQuery', query);
    
    // 導向搜尋結果頁面
    window.location.href = 'search.html';
    return false;
}

// 渲染搜尋結果
function renderSearchResults() {
    const query = sessionStorage.getItem('searchQuery') || '';
    const resultsContainer = document.getElementById('search-results');
    const queryDisplay = document.getElementById('search-query');
    
    if (!resultsContainer) return;
    
    if (queryDisplay) {
        queryDisplay.textContent = query;
    }
    
    if (!query || query.trim() === '') {
        resultsContainer.innerHTML = '<div class="text-center py-5"><p class="text-muted">請輸入搜尋關鍵字</p></div>';
        return;
    }
    
    const results = searchProducts(query);
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">找不到相關商品</h4>
                <p class="text-muted">請嘗試其他關鍵字</p>
                <a href="index.html" class="btn btn-primary mt-3">返回首頁</a>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = `
        <div class="row g-4">
            ${results.map(product => `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="product-card p-3 rounded border h-100">
                        <a href="product-detail.html?id=${product.id}">
                            <img src="${product.image}" class="img-fluid mb-3" alt="${product.name}">
                        </a>
                        <div><b>${product.name}</b></div>
                        <div class="text-secondary mb-2">${product.description}</div>
                        <div class="text-primary mb-3"><strong>NT$ ${product.price.toLocaleString()}</strong></div>
                        <button class="btn-custom-cart w-100" onclick="addProductToCart('${product.id}')">
                            <img style="height: 18px;" src="photos/buy.png"> 加入購物車
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 根據商品 ID 獲取商品信息
function getProductById(id) {
    return productsDatabase.find(product => product.id === id);
}

// 添加商品到購物車（從搜尋結果頁面）
function addProductToCart(productId) {
    const product = getProductById(productId);
    if (product) {
        addToCart(product);
    }
}

// 檢查是否在搜尋頁面（跨平台相容）
function isSearchPage() {
    const path = window.location.pathname || window.location.href;
    return path.includes('search.html') || path.endsWith('search.html');
}

// 頁面載入時執行
document.addEventListener('DOMContentLoaded', function() {
    // 如果在搜尋結果頁面，渲染結果
    if (isSearchPage()) {
        renderSearchResults();
    }
});

