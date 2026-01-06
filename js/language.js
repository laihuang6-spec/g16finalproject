// 語言切換功能
// 支援繁體中文和英文

const translations = {
    'zh-TW': {
        // 導航欄
        'nav.home': 'HOME',
        'nav.promotion': '本月促銷',
        'nav.all-products': '所有商品',
        'nav.popmart': 'POPMART',
        'nav.shoes': '鞋子',
        'nav.sale': 'Sale',
        'nav.clothing': '服飾',
        'nav.accessories': '配飾',
        'nav.top': 'Top',
        'nav.hat': '帽子',
        'nav.bag': '背包',
        'nav.shoes-item': '鞋子',
        
        // 通用
        'common.search': 'Search',
        'common.add-to-cart': '加入購物車',
        'common.wishlist': '收藏',
        'common.cart': '購物車',
        'common.price': '價格',
        'common.quantity': '數量',
        'common.size': '尺寸',
        'common.submit': '提交',
        'common.cancel': '取消',
        'common.confirm': '確認',
        'common.back': '返回',
        'common.continue-shopping': '繼續購物',
        'common.checkout': '前往結帳',
        'common.remove': '移除',
        'common.total': '總計',
        'common.items': '件',
        
        // 商品
        'product.hot-brands': '熱門品牌',
        'product.bestsellers': '熱賣商品',
        'product.detail': '商品詳情',
        'product.added-to-cart': '商品已加入購物車！',
        'product.added-to-wishlist': '已加入收藏',
        'product.removed-from-wishlist': '已從收藏移除',
        
        // 購物車
        'cart.title': '購物車',
        'cart.empty': '購物車是空的',
        'cart.empty-message': '快去選購您喜歡的商品吧！',
        'cart.order-summary': '訂單摘要',
        'cart.item-count': '商品數量',
        
        // 收藏
        'wishlist.title': '我的收藏',
        'wishlist.empty': '收藏列表是空的',
        'wishlist.empty-message': '快去收藏您喜歡的商品吧！',
        'wishlist.remove': '移除收藏',
        
        // 會員
        'member.login': '會員登入',
        'member.register': '註冊',
        'member.account': '帳號',
        'member.password': '密碼',
        'member.remember-me': '記住我',
        'member.forgot-password': '忘記密碼或帳號',
        'member.name': '姓名',
        'member.confirm-password': '確認密碼',
        'member.phone': '驗證手機',
        'member.verification-code': '認證碼',
        'member.agree-terms': '我同意客戶隱私權政策與客戶服務條款',
        'member.receive-news': '我願意收到會員訊息',
        
        // 客服
        'service.title': '客服中心',
        'service.email': '電子信箱',
        'service.problem': '請簡述您遇到的問題(100字為限)',
        'service.submit': '提交',
        
        // 頁尾
        'footer.about': '關於商店',
        'footer.member-center': '會員中心',
        'footer.social-media': '社群媒體',
        'footer.faq': '常見問題',
        'footer.address': '位址',
        'footer.phone': '電話',
        'footer.promotions': '優惠專區',
        'footer.exclusive': '專屬優惠',
        'footer.points': '紅利點數',
        'footer.orders': '查訂單',
        'footer.service': '客服',
        'footer.inquiries': '買家詢問',
        'footer.hours': '開店時間',
        'footer.visit': '參觀時間',
        'footer.shipping': '運送相關問題',
        'footer.delivery': '出貨時間',
        'footer.sizing': '尺寸選擇',
        
        // 搜尋
        'search.title': '搜尋結果',
        'search.no-results': '找不到相關商品',
        'search.try-again': '請嘗試其他關鍵字',
        'search.enter-keyword': '請輸入搜尋關鍵字',
        
        // 跑馬燈
        'marquee.message': 'Have Your Say! 各種潮流商品！'
    },
    'en': {
        // Navigation
        'nav.home': 'HOME',
        'nav.promotion': 'Monthly Promotion',
        'nav.all-products': 'All Products',
        'nav.popmart': 'POPMART',
        'nav.shoes': 'Shoes',
        'nav.sale': 'Sale',
        'nav.clothing': 'Clothing',
        'nav.accessories': 'Accessories',
        'nav.top': 'Top',
        'nav.hat': 'Hat',
        'nav.bag': 'Bag',
        'nav.shoes-item': 'Shoes',
        
        // Common
        'common.search': 'Search',
        'common.add-to-cart': 'Add to Cart',
        'common.wishlist': 'Wishlist',
        'common.cart': 'Cart',
        'common.price': 'Price',
        'common.quantity': 'Quantity',
        'common.size': 'Size',
        'common.submit': 'Submit',
        'common.cancel': 'Cancel',
        'common.confirm': 'Confirm',
        'common.back': 'Back',
        'common.continue-shopping': 'Continue Shopping',
        'common.checkout': 'Checkout',
        'common.remove': 'Remove',
        'common.total': 'Total',
        'common.items': 'items',
        
        // Product
        'product.hot-brands': 'Hot Brands',
        'product.bestsellers': 'Bestsellers',
        'product.detail': 'Product Detail',
        'product.added-to-cart': 'Product added to cart!',
        'product.added-to-wishlist': 'Added to wishlist',
        'product.removed-from-wishlist': 'Removed from wishlist',
        
        // Cart
        'cart.title': 'Shopping Cart',
        'cart.empty': 'Cart is empty',
        'cart.empty-message': 'Go shopping for your favorite items!',
        'cart.order-summary': 'Order Summary',
        'cart.item-count': 'Items',
        
        // Wishlist
        'wishlist.title': 'My Wishlist',
        'wishlist.empty': 'Wishlist is empty',
        'wishlist.empty-message': 'Start adding items to your wishlist!',
        'wishlist.remove': 'Remove',
        
        // Member
        'member.login': 'Member Login',
        'member.register': 'Register',
        'member.account': 'Account',
        'member.password': 'Password',
        'member.remember-me': 'Remember Me',
        'member.forgot-password': 'Forgot Password or Account',
        'member.name': 'Name',
        'member.confirm-password': 'Confirm Password',
        'member.phone': 'Phone',
        'member.verification-code': 'Verification Code',
        'member.agree-terms': 'I agree to Privacy Policy and Terms of Service',
        'member.receive-news': 'I want to receive member messages',
        
        // Service
        'service.title': 'Customer Service',
        'service.email': 'Email',
        'service.problem': 'Please describe your problem (max 100 characters)',
        'service.submit': 'Submit',
        
        // Footer
        'footer.about': 'About Store',
        'footer.member-center': 'Member Center',
        'footer.social-media': 'Social Media',
        'footer.faq': 'FAQ',
        'footer.address': 'Address',
        'footer.phone': 'Phone',
        'footer.promotions': 'Promotions',
        'footer.exclusive': 'Exclusive Offers',
        'footer.points': 'Points',
        'footer.orders': 'Orders',
        'footer.service': 'Service',
        'footer.inquiries': 'Inquiries',
        'footer.hours': 'Business Hours',
        'footer.visit': 'Visit Hours',
        'footer.shipping': 'Shipping',
        'footer.delivery': 'Delivery Time',
        'footer.sizing': 'Sizing',
        
        // Search
        'search.title': 'Search Results',
        'search.no-results': 'No products found',
        'search.try-again': 'Please try other keywords',
        'search.enter-keyword': 'Please enter search keyword',
        
        // Marquee
        'marquee.message': 'Have Your Say! Various Trendy Products!'
    }
};

// 獲取當前語言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh-TW';
}

// 設置語言
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyLanguage(lang);
}

// 切換語言
function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
    setLanguage(newLang);
    return newLang;
}

// 獲取翻譯
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key] || key;
}

// 應用語言
function applyLanguage(lang) {
    document.documentElement.lang = lang;
    
    // 更新所有帶有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // 更新標題
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const pageTitle = titleElement.textContent.split(' - ')[0];
        titleElement.textContent = lang === 'zh-TW' 
            ? `${pageTitle} - HYS select shop`
            : `${pageTitle} - HYS select shop`;
    }
    
    // 觸發自定義事件，讓其他腳本知道語言已更改
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// 初始化語言
document.addEventListener('DOMContentLoaded', function() {
    const lang = getCurrentLanguage();
    applyLanguage(lang);
});

// 語言切換按鈕處理
function handleLanguageSwitch() {
    const newLang = toggleLanguage();
    const message = newLang === 'zh-TW' ? '已切換為繁體中文' : 'Switched to English';
    alert(message);
}

