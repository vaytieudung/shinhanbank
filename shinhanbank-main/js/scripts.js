<<<<<<< HEAD
(function() {
    emailjs.init("c-Ms5MjWbitpDBb-E");
    console.log("EmailJS initialized");
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing scripts");

    // Initialize Swiper
    try {
        new Swiper('.swiper', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 20,
        });
        console.log("Swiper initialized");
    } catch (e) {
        console.error("Swiper init failed:", e);
    }

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

    // Support buttons
    document.querySelector('.support-btn.call').addEventListener('click', () => {
        window.location.href = 'tel:19001577';
    });

    // Modal close
    document.querySelectorAll('.modal').forEach(modal => {
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
window.scrollToRegister = function() {
    document.getElementById('register-form').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('#register-form .section-toggle').click();
};

window.toggleDetails = function(button) {
    const details = button.parentElement.querySelector('.details');
    details.classList.toggle('active');
    button.textContent = details.classList.contains('active') ? 'Ẩn chi tiết' : 'Xem tiếp';
};

window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
};

window.calculateLoanInterest = function() {
    console.log("Calculating loan interest");
    const amount = parseFloat(document.querySelector('#calc-loan-amount').value);
    const term = parseInt(document.querySelector('#calc-loan-term').value);
    const loanType = document.querySelector('#calc-loan-type').value;
    const resultDiv = document.querySelector('#calc-result');
    const chartCanvas = document.getElementById('loan-chart');

    if (!chartCanvas) {
        console.error("Chart canvas not found");
        resultDiv.innerHTML = 'Lỗi: Không tìm thấy biểu đồ!';
        return;
    }

    let rate, maxAmount, maxTerm;
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

        try {
            const chartCtx = chartCanvas.getContext('2d');
            if (window.loanChart) window.loanChart.destroy();
            window.loanChart = new Chart(chartCtx, {
                type: 'bar',
                data: {
                    labels: ['Lãi suất'],
                    datasets: [{
                        label: 'Lãi suất (%)',
                        data: [rate],
                        backgroundColor: '#003087'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });
            console.log("Chart rendered successfully");
        } catch (e) {
            console.error("Chart rendering failed:", e);
            resultDiv.innerHTML += '<p>Lỗi hiển thị biểu đồ, kết quả vẫn chính xác.</p>';
        }
    }
};

let formData = {};
window.submitRegistration = function() {
    console.log("Submitting registration");
    formData = {
        name: document.querySelector('#reg-name').value.trim(),
        phone: document.querySelector('#reg-phone').value.trim(),
        email: document.querySelector('#reg-email').value.trim(),
        cccd: document.querySelector('#reg-cccd').value.trim(),
        loanAmount: parseFloat(document.querySelector('#reg-amount').value),
        loanTerm: parseInt(document.querySelector('#reg-term').value),
        loanType: document.querySelector('#reg-type').value,
        cccdFront: document.querySelector('#cccd-front').files[0],
        cccdBack: document.querySelector('#cccd-back').files[0],
        atmCard: document.querySelector('#atm-card').files[0]
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0[0-9]{9}$/;
    if (!formData.name) {
        alert('Vui lòng nhập họ và tên!');
        return;
    }
    if (!phoneRegex.test(formData.phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ!');
        return;
    }
    if (!emailRegex.test(formData.email)) {
        alert('Vui lòng nhập email hợp lệ!');
        return;
    }
    if (!formData.cccd) {
        alert('Vui lòng nhập số CCCD/CMND!');
        return;
    }
    if (isNaN(formData.loanAmount) || formData.loanAmount <= 0) {
        alert('Số tiền vay phải lớn hơn 0!');
        return;
    }
    if (isNaN(formData.loanTerm) || formData.loanTerm <= 0) {
        alert('Thời hạn vay phải lớn hơn 0!');
        return;
    }
    if (!formData.loanType) {
        alert('Vui lòng chọn loại vay!');
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

    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.style.display = 'flex';
    document.querySelector('#confirm-modal .loader').classList.add('active');
    document.querySelector('#confirm-modal button').disabled = true;

    setTimeout(() => {
        confirmModal.style.display = 'none';
        document.querySelector('#confirm-modal .loader').classList.remove('active');
        document.querySelector('#confirm-modal button').disabled = false;

        const profileCode = `SHF-${Date.now()}`;
        window.profileCode = profileCode;
        const approvalModal = document.getElementById('approval-modal');
        document.getElementById('profile-code').textContent = profileCode;
        approvalModal.style.display = 'flex';

        emailjs.send("service_ytsr91e", "template_3a7yorj", {
            name: formData.name,
            cccd: formData.cccd,
            loanAmount: formData.loanAmount.toLocaleString('vi-VN'),
            loanTerm: formData.loanTerm,
            loanType: formData.loanType,
            profileCode: profileCode,
            dateSigned: new Date().toLocaleDateString('vi-VN'),
            to_email: formData.email
        }).then(() => {
            console.log("Email sent to customer");
        }, (error) => {
            console.error("EmailJS error:", error);
            alert('Lỗi gửi email, nhưng hồ sơ đã được duyệt!');
        });
=======
(function() {
    emailjs.init("c-Ms5MjWbitpDBb-E");
    console.log("EmailJS initialized");
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing scripts");

    // Initialize Swiper
    try {
        new Swiper('.swiper', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 20,
        });
        console.log("Swiper initialized");
    } catch (e) {
        console.error("Swiper init failed:", e);
    }

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

    // Support buttons
    document.querySelector('.support-btn.call').addEventListener('click', () => {
        window.location.href = 'tel:19001577';
    });

    // Modal close
    document.querySelectorAll('.modal').forEach(modal => {
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
window.scrollToRegister = function() {
    document.getElementById('register-form').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('#register-form .section-toggle').click();
};

window.toggleDetails = function(button) {
    const details = button.parentElement.querySelector('.details');
    details.classList.toggle('active');
    button.textContent = details.classList.contains('active') ? 'Ẩn chi tiết' : 'Xem tiếp';
};

window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
};

window.calculateLoanInterest = function() {
    console.log("Calculating loan interest");
    const amount = parseFloat(document.querySelector('#calc-loan-amount').value);
    const term = parseInt(document.querySelector('#calc-loan-term').value);
    const loanType = document.querySelector('#calc-loan-type').value;
    const resultDiv = document.querySelector('#calc-result');
    const chartCanvas = document.getElementById('loan-chart');

    if (!chartCanvas) {
        console.error("Chart canvas not found");
        resultDiv.innerHTML = 'Lỗi: Không tìm thấy biểu đồ!';
        return;
    }

    let rate, maxAmount, maxTerm;
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

        try {
            const chartCtx = chartCanvas.getContext('2d');
            if (window.loanChart) window.loanChart.destroy();
            window.loanChart = new Chart(chartCtx, {
                type: 'bar',
                data: {
                    labels: ['Lãi suất'],
                    datasets: [{
                        label: 'Lãi suất (%)',
                        data: [rate],
                        backgroundColor: '#003087'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });
            console.log("Chart rendered successfully");
        } catch (e) {
            console.error("Chart rendering failed:", e);
            resultDiv.innerHTML += '<p>Lỗi hiển thị biểu đồ, kết quả vẫn chính xác.</p>';
        }
    }
};

let formData = {};
window.submitRegistration = function() {
    console.log("Submitting registration");
    formData = {
        name: document.querySelector('#reg-name').value.trim(),
        phone: document.querySelector('#reg-phone').value.trim(),
        email: document.querySelector('#reg-email').value.trim(),
        cccd: document.querySelector('#reg-cccd').value.trim(),
        loanAmount: parseFloat(document.querySelector('#reg-amount').value),
        loanTerm: parseInt(document.querySelector('#reg-term').value),
        loanType: document.querySelector('#reg-type').value,
        cccdFront: document.querySelector('#cccd-front').files[0],
        cccdBack: document.querySelector('#cccd-back').files[0],
        atmCard: document.querySelector('#atm-card').files[0]
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0[0-9]{9}$/;
    if (!formData.name) {
        alert('Vui lòng nhập họ và tên!');
        return;
    }
    if (!phoneRegex.test(formData.phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ!');
        return;
    }
    if (!emailRegex.test(formData.email)) {
        alert('Vui lòng nhập email hợp lệ!');
        return;
    }
    if (!formData.cccd) {
        alert('Vui lòng nhập số CCCD/CMND!');
        return;
    }
    if (isNaN(formData.loanAmount) || formData.loanAmount <= 0) {
        alert('Số tiền vay phải lớn hơn 0!');
        return;
    }
    if (isNaN(formData.loanTerm) || formData.loanTerm <= 0) {
        alert('Thời hạn vay phải lớn hơn 0!');
        return;
    }
    if (!formData.loanType) {
        alert('Vui lòng chọn loại vay!');
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

    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.style.display = 'flex';
    document.querySelector('#confirm-modal .loader').classList.add('active');
    document.querySelector('#confirm-modal button').disabled = true;

    setTimeout(() => {
        confirmModal.style.display = 'none';
        document.querySelector('#confirm-modal .loader').classList.remove('active');
        document.querySelector('#confirm-modal button').disabled = false;

        const profileCode = `SHF-${Date.now()}`;
        window.profileCode = profileCode;
        const approvalModal = document.getElementById('approval-modal');
        document.getElementById('profile-code').textContent = profileCode;
        approvalModal.style.display = 'flex';

        emailjs.send("service_ytsr91e", "template_3a7yorj", {
            name: formData.name,
            cccd: formData.cccd,
            loanAmount: formData.loanAmount.toLocaleString('vi-VN'),
            loanTerm: formData.loanTerm,
            loanType: formData.loanType,
            profileCode: profileCode,
            dateSigned: new Date().toLocaleDateString('vi-VN'),
            to_email: formData.email
        }).then(() => {
            console.log("Email sent to customer");
        }, (error) => {
            console.error("EmailJS error:", error);
            alert('Lỗi gửi email, nhưng hồ sơ đã được duyệt!');
        });
>>>>>>> ed7dbf625455a96c749b1b9ad88d02af5d6fb0b5
