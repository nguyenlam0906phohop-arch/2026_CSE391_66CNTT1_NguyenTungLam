// ========== KHỞI TẠO CÁC BIẾN TOÀN CỤC ==========
// Lấy phần tử table từ HTML
const table = document.querySelector("table");
// Lấy nút "Thêm mới"
const addBtn = document.querySelector(".add-btn");
// Lấy phần thân (tbody) của table
const tbody = table.querySelector("tbody");
// Lấy overlay (lớp phủ mờ toàn màn hình)
const overlay = document.getElementById("overlay");
// Lấy form input
const formInput = document.querySelector(".formInput");
// Lấy nút X để đóng form
const closeBtn = document.querySelector(".close-btn");
// Lấy phần tử form (để sau này reset dữ liệu)
const nativeForm = document.querySelector(".formBody");

// ========== LOAD DỮ LIỆU TỪ FILE JSON ==========
// Gọi fetch để lấy dữ liệu từ data.json
fetch("data.json")
  .then((response) => response.json())  // Chuyển response thành JSON
  .then((data) => {  // Nhận dữ liệu JSON
    const employees = data.employees;  // Lấy mảng nhân viên
    const tbody = table.querySelector("tbody");  // Lấy tbody của table
    tbody.innerHTML = "";  // Xóa dữ liệu cũ (nếu có)

    // Duyệt qua từng nhân viên
    employees.forEach((employee) => {
      const row = document.createElement("tr");  // Tạo một hàng mới
      // Gán nội dung HTML cho hàng (hiển thị STT, họ tên, email, số điện thoại, vị trí, giới tính, ngày sinh, nút sửa/xóa)
      row.innerHTML = `
        <td>${tbody.children.length + 1}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.position}</td>
        <td>${employee.gender || ""}</td>
        <td>${employee.dob ? new Date(employee.dob).toLocaleDateString() : ""}</td>
        <td>
          <button class="edit-btn">Sửa</button>
          <button class="delete-btn">Xóa</button>
        </td>
      `;
      tbody.appendChild(row);  // Thêm hàng vào tbody
    });
  });

// ========== EVENT LISTENERS ==========

// Khi bấm nút "Thêm mới"
addBtn.addEventListener("click", function() {
  overlay.style.display = "flex";  // Hiển thị overlay + form (modal)
});

// Hàm để ẩn form
function hideForm() {
  overlay.style.display = "none";  // Ẩn overlay
  if (nativeForm) {
    nativeForm.reset();  // Reset các input trong form
  }
}

// Khi bấm nút X để đóng form
closeBtn.addEventListener("click", hideForm);

// Khi bấm ngoài form (trên overlay), cũng đóng form
overlay.addEventListener("click", function(event) {
  // Kiểm tra xem sự kiện click có từ overlay chứ không phải từ form
  if (event.target === overlay) {
    hideForm();  // Ẩn form
  }
});

const errorName = document.querySelector(".errorName");
const errorEmail = document.querySelector(".errorEmail");
const errorPhone = document.querySelector(".errorPhone");
const errorPosition = document.querySelector(".errorPosition");
const errorGender = document.querySelector(".errorGender");
const errorDob = document.querySelector(".errorDob");
const errorPassword = document.querySelector(".errorPassword");

const inputName = document.querySelector(".inputName");
const inputEmail = document.querySelector(".inputEmail");
const inputPhone = document.querySelector(".inputPhone");
const selectPosition = document.querySelector(".selectOption");
const inputDob = document.querySelector(".inputDob");
const inputPassword = document.querySelector(".inputPassword");
const genderRadios = Array.from(document.querySelectorAll(".genderRadio"));

function showError(error,message){
    error.textContent = message;
    error.style.display = "block";
    error.style.color = "red";
}

function hideError(error){
    error.textContent = "";
    error.style.display = "none";
}

function validateName(){
    const name = inputName.value.trim();
    if (name === "") {
        showError(errorName, "Họ tên không được để trống");
        return false;
    } 
    if(name.length > 30){
        showError(errorName, "Họ tên không được vượt quá 30 ký tự");
        return false;
    }
    hideError(errorName);
    return true;
}

function validateEmail(){
    const email = inputEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        showError(errorEmail, "Email không được để trống");
        return false;
    }
    if (!emailRegex.test(email)) {
        showError(errorEmail, "Email không hợp lệ");
        return false;
    }
    hideError(errorEmail);
    return true;
}

function validatePhone(){
    const phone = inputPhone.value.trim();
    const phoneRegex = /^\d{10}$/;
    if (phone === "") {
        showError(errorPhone, "Số điện thoại không được để trống");
        return false;
    }
    if (!phoneRegex.test(phone)) {
        showError(errorPhone, "Số điện thoại không hợp lệ");
        return false;
    }
    hideError(errorPhone);
    return true;
}

function validatePosition(){
    const position = selectPosition.value;
    if (position === "") {
        showError(errorPosition, "Vui lòng chọn vị trí");
        return false;
    }
    hideError(errorPosition);
    return true;
}

function validateGender(){
    const selected = genderRadios.some(r => r.checked);
    if (!selected) {
        showError(errorGender, "Vui lòng chọn giới tính");
        return false;
    }
    hideError(errorGender);
    return true;
}

function validateDob(){
    const dobValue = inputDob.value;
    if (!dobValue) {
        showError(errorDob, "Ngày sinh không được để trống");
        return false;
    }
    const birthDate = new Date(dobValue);
    if (Number.isNaN(birthDate.getTime())) {
        showError(errorDob, "Ngày sinh không hợp lệ");
        return false;
    }
    const today = new Date();
    const age = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 365.25));
    if (age < 18) {
        showError(errorDob, "Tuổi phải lớn hơn hoặc bằng 18");
        return false;
    }
    hideError(errorDob);
    return true;
}

function validatePassword(){
    const value = inputPassword.value;
    if (!value) {
        showError(errorPassword, "Mật khẩu không được để trống");
        return false;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!regex.test(value)) {
        showError(errorPassword, "Mật khẩu cần >=8 ký tự, 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt");
        return false;
    }
    hideError(errorPassword);
    return true;
}

inputName.addEventListener("blur", validateName);
inputEmail.addEventListener("blur", validateEmail);
inputPhone.addEventListener("blur", validatePhone);
selectPosition.addEventListener("change", validatePosition);
genderRadios.forEach(r => r.addEventListener("change", validateGender));
inputDob.addEventListener("blur", validateDob);
inputPassword.addEventListener("blur", validatePassword);

inputName.addEventListener("input", () => hideError(errorName));
inputEmail.addEventListener("input", () => hideError(errorEmail));
inputPhone.addEventListener("input", () => hideError(errorPhone));
selectPosition.addEventListener("change", () => hideError(errorPosition));
genderRadios.forEach(r => r.addEventListener("change", () => hideError(errorGender)));
inputDob.addEventListener("input", () => hideError(errorDob));
inputPassword.addEventListener("input", () => hideError(errorPassword));

nativeForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPositionValid = validatePosition();
    const isGenderValid = validateGender();
    const isDobValid = validateDob();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPhoneValid && isPositionValid && isGenderValid && isDobValid && isPasswordValid) {
        const selectedGender = genderRadios.find(r => r.checked)?.value || "";
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${tbody.children.length + 1}</td>
            <td>${inputName.value}</td>
            <td>${inputEmail.value}</td>
            <td>${inputPhone.value}</td>
            <td>${selectPosition.options[selectPosition.selectedIndex].text}</td>
            <td>${selectedGender}</td>
            <td>${inputDob.value ? new Date(inputDob.value).toLocaleDateString() : ""}</td>
            <td>
                <button class="edit-btn">Sửa</button>
                <button class="delete-btn">Xóa</button>
            </td>
        `;

        // 🔥 THÊM VÀO TABLE
        tbody.appendChild(newRow);

        // đóng + reset
        hideForm();
        nativeForm.reset();
    }
});