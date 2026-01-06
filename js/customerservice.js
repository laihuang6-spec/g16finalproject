// 客服表單提交處理
document.addEventListener('DOMContentLoaded', function() {
    const serviceForm = document.getElementById('service-form');
    
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止默認表單提交
            
            // 獲取表單數據
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;
            
            // 驗證表單
            if (!email || !comment) {
                alert('請填寫所有必填欄位');
                return;
            }
            
            // 跳轉到成功頁面
            window.location.href = 'success02.html';
        });
    }
});

