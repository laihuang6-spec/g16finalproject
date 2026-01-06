// 註冊表單提交處理
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // 獲取表單數據
            const userName = document.querySelector('input[name="user_name"]').value;
            const userEmail = document.querySelector('input[name="user_email"]').value;
            const userPasswd = document.getElementById('user_passwd').value;
            const confirmPasswd = document.querySelector('input[name="confirm_password"]').value;
            const userPhone = document.querySelector('input[name="user_phone"]').value;
            const agreeTerm = document.getElementById('agreeTerm').checked;
            
            // 驗證必填欄位
            if (!userName || !userEmail || !userPasswd || !confirmPasswd || !userPhone) {
                alert('請填寫所有必填欄位');
                return;
            }
            
            // 驗證密碼是否一致
            if (userPasswd !== confirmPasswd) {
                alert('密碼與確認密碼不一致，請重新輸入');
                return;
            }
            
            // 驗證密碼長度（至少8個字符）
            if (userPasswd.length < 8) {
                alert('密碼長度至少需要8個字符');
                return;
            }
            
            // 驗證密碼包含字母和數字
            if (!/[a-z]/i.test(userPasswd)) {
                alert('密碼必須包含至少一個字母');
                return;
            }
            if (!/[0-9]/.test(userPasswd)) {
                alert('密碼必須包含至少一個數字');
                return;
            }
            
            // 驗證是否同意條款
            if (!agreeTerm) {
                alert('請同意客戶隱私權政策與客戶服務條款');
                return;
            }
            
            // 驗證手機號碼格式
            const phonePattern = /^[0-9]{4}-[0-9]{3}-[0-9]{3}$/;
            if (!phonePattern.test(userPhone)) {
                alert('請輸入正確的手機號碼格式 (例如: 0912-345-678)');
                return;
            }
            
            // 使用會員系統註冊
            if (typeof registerUser === 'function') {
                const result = registerUser({
                    name: userName,
                    email: userEmail,
                    password: userPasswd,
                    phone: userPhone
                });
                
                if (result.success) {
                    alert('註冊成功！即將跳轉到登入頁面...');
                    // 自動登入
                    const loginResult = loginUser(userEmail, userPasswd);
                    if (loginResult.success) {
                        window.location.href = 'member.html';
                    } else {
                        window.location.href = 'member.html';
                    }
                } else {
                    alert(result.message || '註冊失敗，請稍後再試');
                }
            } else {
                // 如果會員系統未載入，使用原有方式
                alert('註冊功能載入中，請稍後再試');
            }
        });
    }
});

