
/* 
 * Slick Slider v1.8.1
 * Source: https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js
 * Purpose: Provides carousel/slider functionality.
 * Note: This is a minified third-party library. Use the CDN or download from npm (slick-carousel).
 * Example usage in HTML: <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
 */
// scripts.js
function openRegisterModal() {
    try {
        // Gỡ rate-limiting tạm thời để kiểm tra
        // if (!rateLimit.check()) return;
        console.log('Opening register modal');
        document.getElementById('registerModal').style.display = 'flex';
        document.getElementById('registerModal').classList.add('active');
        loadDraft();
    } catch (e) {
        alert('Lỗi mở form đăng ký. Vui lòng liên hệ 1900 1577.');
        console.error('Register modal error:', e);
    }
}

function openLoanCalcModal() {
    try {
        // Gỡ rate-limiting tạm thời để kiểm tra
        // if (!rateLimit.check()) return;
        console.log('Opening loan calc modal');
        document.getElementById('loanCalcModal').style.display = 'flex';
        document.getElementById('loanCalcModal').classList.add('active');
    } catch (e) {
        alert('Lỗi mở form tính khoản vay. Vui lòng liên hệ 1900 1577.');
        console.error('Loan calc modal error:', e);
    }
}

// Hàm loadDraft (được gọi trong openRegisterModal)
function loadDraft() {
    console.log('Loading draft...');
}

// Nếu scripts.js đã có nội dung khác, hãy thêm các hàm trên vào cuối tệp
