// --- router.js ---
// File này sẽ được thêm vào tất cả các trang trong quy trình đăng ký.
// Nhiệm vụ của nó là kiểm tra trạng thái người dùng và điều hướng đến đúng bước.

(function() {
    /**
     * Hàm lấy dữ liệu người dùng đã mã hóa từ localStorage và giải mã.
     * @returns {object | null} Dữ liệu người dùng hoặc null nếu không có.
     */
    function getDecryptedUserData() {
        try {
            const encryptedData = localStorage.getItem('userData');
            if (!encryptedData) {
                return null;
            }
            const bytes = CryptoJS.AES.decrypt(encryptedData, 'shinhan-secret-key');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        } catch (error) {
            console.error('Không thể giải mã dữ liệu người dùng:', error);
            // Nếu có lỗi, xóa dữ liệu hỏng để tránh lặp lại lỗi
            localStorage.removeItem('userData');
            return null;
        }
    }

    /**
     * Dựa trên dữ liệu người dùng, xác định xem họ nên ở bước nào.
     * Đây là logic cốt lõi bạn đã yêu cầu.
     * @param {object | null} userData - Dữ liệu của người dùng.
     * @returns {number} Số thứ tự của bước mà người dùng nên được hiển thị.
     */
    function getRequiredStep(userData) {
        // 1. Không có dữ liệu -> Phải ở Step 1.
        if (!userData) {
            return 1;
        }

        // 2. Có dữ liệu và đã hoàn thành Step 8 (chúng ta giả sử có thuộc tính status: 'completed')
        // Bạn cần đảm bảo ở bước cuối cùng, bạn sẽ gán trạng thái này.
        if (userData.status === 'completed') {
            return 5;
        }

        // 3. Có dữ liệu, chưa hoàn thành -> Hiển thị bước hiện tại của họ (2-7).
        // Nếu không có currentStep, mặc định là 1.
        return userData.currentStep || 1;
    }

    /**
     * Lấy số của trang hiện tại từ tên file (ví dụ: 'step3.html' -> 3)
     * @returns {number | null} Số của trang hoặc null nếu không khớp.
     */
    function getCurrentPageStep() {
        const path = window.location.pathname;
        const match = path.match(/step(\d+)\.html/);
        return match ? parseInt(match[1], 10) : null;
    }

    // --- LOGIC CHÍNH CỦA ROUTER ---
    document.addEventListener('DOMContentLoaded', function() {
        const userData = getDecryptedUserData();
        const requiredStep = getRequiredStep(userData);
        const currentPage = getCurrentPageStep();
        
        console.log(`Router: Người dùng đang ở trang step ${currentPage}. Dữ liệu yêu cầu ở step ${requiredStep}.`);

        // Nếu trang hiện tại không phải là trang được yêu cầu, hãy chuyển hướng.
        // Chúng ta cũng cần đảm bảo không bị lặp chuyển hướng vô tận.
        if (currentPage !== null && currentPage !== requiredStep) {
            console.log(`Chuyển hướng từ step ${currentPage} đến step ${requiredStep}...`);
            // Điều chỉnh đường dẫn cho phù hợp với cấu trúc thư mục của bạn
            const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
            window.location.href = `${baseUrl}/step${requiredStep}.html`;
        }
    });

})();
