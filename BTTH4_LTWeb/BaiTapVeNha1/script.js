const form = document.querySelector(".form");
const inputName = document.querySelector(".inputName");
const inputEmail = document.querySelector(".inputEmail");
const inputPhone = document.querySelector(".inputPhone");
const inputPassword = document.querySelector(".inputPassword");
const inputPasswordConfirm = document.querySelector(".inputPasswordConfirm");

const errorName = document.querySelector(".errorName");
const errorEmail = document.querySelector(".errorEmail");
const errorPhone = document.querySelector(".errorPhone");
const errorPassword = document.querySelector(".errorPassword");
const errorPasswordConfirm = document.querySelector(".errorPasswordConfirm");
const errorGender = document.querySelector(".errorGender");
const errorTerms = document.querySelector(".errorTerms");
const checkboxTerms = document.querySelector(".terms");

function showError(error, message){
    error.style.display = "block";
    error.style.color = "red";
    error.innerText = message;
}    

function hiddenError(error){
    error.style.display = "none";
}

function validateName(){
    let valueCurrent = inputName.value.trim();
    if(valueCurrent === ""){
        showError(errorName, "Họ tên không được để trống!");
        return false;
    }
    if(valueCurrent.length < 3){
        showError(errorName, "Họ tên phải lớn hơn hoặc bằng 3 kí tự");
        return false;
    }
    if(!/^[a-zA-ZÀ-ỹ\s]+$/.test(valueCurrent)){
        showError(errorName, "Họ tên chỉ được chứa chữ cái");
        return false;
    }

    hiddenError(errorName);
    return true;
}


function validateEmail(){
    let valueCurrent = inputEmail.value.trim();
    if(valueCurrent === ""){
        showError(errorEmail, " Email không được để trống");
        return false;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueCurrent)){
        showError(errorEmail, "Email không đúng định dạng");
        return false;
    }
    hiddenError(errorEmail);
    return true;
}

function validatePhone(){
    let valueCurrent = inputPhone.value.trim();
    if(valueCurrent === ""){
        showError(errorPhone, "Số điện thoại không được để trống");
        return false;
    }
    if(!/^0[0-9]{9}$/.test(valueCurrent)){
        showError(errorPhone, "Số điện thoại phải bắt đầu bằng 0, có đủ 10 số");
        return false;
    }
    hiddenError(errorPhone);
    return true;
}

function validatePassword(){
    const valuePassword = inputPassword.value.trim()
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(valuePassword)){
        showError(errorPassword,"Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 kí tự số");
        return;
    }
    if(valuePassword === ""){
        showError(errorPassword,"Mật khẩu không được để trống");
        return false;
    }
    hiddenError(errorPassword);
    return true;
}

function validatePasswordComfirm(){
    const valuePassword = inputPassword.value.trim();
    const valueComfirm = inputPasswordConfirm.value.trim();
    if(!(valueComfirm === valuePassword)){
        showError(errorPasswordConfirm, "Xác thực mật khẩu phải giống mật khẩu đã nhập");
        return false;
    }
    if(valueComfirm === ""){
        showError(errorPasswordConfirm, "Vui lòng xác thực mật khẩu");
        return false;
    }
    hiddenError(errorPasswordConfirm);
    return true;
}

function validateGender(){
    const gender = document.querySelector('input[name="gender"]:checked');
    if(!gender){
        showError(errorGender, "Vui lòng chọn giới tính");
        return false;
    }
    hiddenError(errorGender);
    return true;
}

function validateTerms(){
    if(!checkboxTerms.checked){
        showError(errorTerms,"Bạn phải đồng ý điều khoản");
        return false;
    }
    hiddenError(errorTerms);
    return true;
}

//Validate submit
form.addEventListener("submit", function(e){
    e.preventDefault();
    if(!validateName()) return;
    if(!validateEmail()) return;
    if(!validatePhone()) return;
    if(!validatePassword()) return;
    if(!validatePasswordComfirm())  return;
    if(!validateGender())   return;
    if(!validateTerms())    return;

    alert("Đăng kí thành công");
})

//Validate realtime
inputName.addEventListener("blur", validateName);
inputEmail.addEventListener("blur", validateEmail);
inputPhone.addEventListener("blur", validatePhone);
inputPassword.addEventListener("blur", validatePassword);
inputPasswordConfirm.addEventListener("blur", validatePasswordComfirm);

//Xóa lỗi khi nhập
inputName.addEventListener("input",() => hiddenError(errorName));
inputEmail.addEventListener("input",() => hiddenError(errorEmail));
inputPhone.addEventListener("input",() => hiddenError(errorPhone));
inputPassword.addEventListener("input",() => hiddenError(errorPassword));
inputPasswordConfirm.addEventListener("input",() => hiddenError(errorPasswordConfirm));

const nameCount = document.querySelector(".nameCount");
inputName.addEventListener("input", function(){
    const nameLength = inputName.value.length;
    nameCount.innerText = nameLength + " / 50";
    if(nameLength > 50){
        showError(errorName,"Họ tên không được quá 50 kí tự");
        nameCount.style.color = "red";
    }
    else{
        hiddenError(errorName);
        nameCount.style.color = "black";
    }
});

let valueIcon1 = true;
const icon1 = document.querySelector(".icon1");
icon1.addEventListener("click", function(){
    if(valueIcon1){
        inputPassword.type = "text";
        valueIcon1 = false;
    }
    else{
        inputPassword.type = "password";
        valueIcon1 = true;
    }    
});

let valueIcon2 = true;
const icon2 = document.querySelector(".icon2");
icon2.addEventListener("click", function(){
    if(valueIcon2){
        inputPasswordConfirm.type = "text";
        valueIcon2 = false;
    }
    else{
        inputPasswordConfirm.type = "password";
        valueIcon2 = true;
    }    
})

const strengthBar = document.querySelector(".strengthBar");
const strengthText = document.querySelector(".strengthText");

function checkPassword(p){
    let score = 0;
    if(p.length >= 8)   score++;
    if(/[A-Z]/.test(p)) score++;
    if(/[0-9]/.test(p)) score++;
    if(/[^A-Za-z0-9]/.test(p))  score++;
    return score;
}

inputPassword.addEventListener("input", function(){

    const password = inputPassword.value;
    const s = checkPassword(password);
    if(s <= 1){
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
        strengthText.innerText = "Mật khẩu yếu";
    }
    else if(s == 2 || s == 3){
        strengthBar.style.width = "66%";
        strengthBar.style.background = "yellow";
        strengthText.innerText = "Mật khẩu trung bình";
    }
    else{
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        strengthText.innerText = "Mật khẩu mạnh";
    }
});