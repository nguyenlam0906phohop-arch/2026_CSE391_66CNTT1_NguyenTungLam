const form = document.querySelector(".form");
const product = document.querySelector(".product");
const quantity = document.querySelector(".quantity");
const deliveryDate = document.querySelector(".deliveryDate");
const address = document.querySelector(".address");
const note = document.querySelector(".note");
const paymentBox = document.querySelector(".paymentBox");

const errorProduct = document.querySelector(".errorProduct");
const errorQuantity = document.querySelector(".errorQuantity");
const errorDeliveryDate = document.querySelector(".errorDeliveryDate");
const errorAddress = document.querySelector(".errorAddress");
const errorNote = document.querySelector(".errorNote");
const errorPayment = document.querySelector(".errorPayment")

const total = document.querySelector(".total");
const noteCount = document.querySelector(".noteCount");

const confirmBox = document.querySelector(".confirmBox");

const prices = {
    phone: 5000000,
    laptop: 15000000,
    headphone: 1000000
}

function showError(error, message){
    error.style.display = "block";
    error.style.color = "red";
    error.innerText = message;
}  
function hiddenError(error){
    error.style.display = "none";
}

function validateProduct(){
    if(product.value === ""){
        showError(errorProduct, "Vui lòng chọn sản phẩm");
        return false;
    }
    hiddenError(errorProduct);
    return true;
}

function validateQuantity(){
    const quantityValue = quantity.value.trim();
    const numberValue = Number(quantityValue);
    if(quantityValue === ""){
        showError(errorQuantity, "Vui lòng nhập số lượng");
        return false;
    }
    if(!(Number.isInteger(numberValue)) || numberValue < 1 || numberValue > 99){
        showError(errorQuantity, "Giá trị không hợp lệ");
        return false;
    }
    hiddenError(errorQuantity);
    return true;
}

function validateDate(){ 
    const today = new Date(); //Tính ra mili giây
    const selected = new Date(deliveryDate.value); //tính ra mili giấy
    const diff = (selected - today)/(1000*60*60*24);
    if(!deliveryDate.value){
        showError(errorDeliveryDate, "Vui lòng chọn ngày giao hàng");
        return false;
    }
    if(diff < 0){
        showError(errorDeliveryDate, "Không được chọn ngày trong quá khứ");
        return false;
    }
    if(diff > 30){
        showError(errorDeliveryDate, "Quá 30 ngày");
        return false;
    }
    hiddenError(errorDeliveryDate);
    return true;
}

function validateAddress(){
    const addressValue = address.value.trim();
    if(addressValue === ""){
        showError(errorAddress, "Vui lòng nhập địa chỉ");
        return false;
    }
    if(addressValue.length < 10){
        showError(errorAddress, "Địa chỉ nhập phải lớn hơn hoặc bằng 10 kí tự");
        return false;
    }
    hiddenError(errorAddress);
    return true;
}

function validateNote(){
    const noteValue = note.value.trim();
    if(noteValue.length > 200){
        return false;
    }
    hiddenError(errorNote);
    return true;
}

function validatePayment(){
    const pay = document.querySelector('input[name="payment"]:checked');
    if(!pay){
        showError(errorPayment, "Bạn phải tick vào 1 phương thức thanh toán");
        return false;
    }
    hiddenError(errorPayment);
    return true;
}

//Xác thực khi submit
form.addEventListener("submit", function(e){
    e.preventDefault();
    const v1 = validateProduct();
    const v2 = validateQuantity();
    const v3 = validateDate();
    const v4 = validateAddress();
    const v5 = validateNote();
    const v6 = validatePayment();
    if(v1 && v2 && v3 && v4 && v5 && v6){
        showConfirmBox();
    }    
});

//Valide realtime
quantity.addEventListener("blur", validateQuantity);
deliveryDate.addEventListener("blur", validateDate);
address.addEventListener("blur", validateAddress);
note.addEventListener("blur", validateNote);

//Xóa lỗi khi nhập lại
quantity.addEventListener("input", () => hiddenError(errorQuantity));
deliveryDate.addEventListener("input", () => hiddenError(errorDeliveryDate));
address.addEventListener("input", () => hiddenError(errorAddress));
note.addEventListener("input", () => hiddenError(errorNote));

//Đếm kí tự realtime
const noteLength = document.querySelector(".noteCount");
note.addEventListener("input", function(){
    const noteValue = note.value.length;
    noteLength.innerText = noteValue + " / 200";
    if(noteValue > 200){
        noteLength.style.color = "red";
        showError(errorNote, "Ghi chú không được quá 200 kí tự");
        return;
    }
    else{
        noteLength.style.color = "black";
        hiddenError(errorNote);
    }
})

//Tự động tính tiền
const totalPrice = document.querySelector(".total");
function updateTotal(){
    const name = product.value;
    const count = Number(quantity.value);
    const price = prices[name];
    let total 
    if(name === "" || count === 0){
        total = 0;
    }
    else{
        total = count*price;
    }
    totalPrice.innerText = total.toLocaleString("vi-VN");
}

product.addEventListener("change", updateTotal);
quantity.addEventListener("input", updateTotal);

product.addEventListener("change", () => hiddenError(errorProduct));

//Xác nhận khi gửi 
function showConfirmBox(){
    const pname = product.options[product.selectedIndex].text;
    const pcount = quantity.value;
    const paddress = address.value;
    const ptotal = totalPrice.innerText;
    const pdate = deliveryDate.value;
    confirmBox.style.display = "block";
    confirmBox.innerHTML = `
    <h3>Xác nhận đơn hàng</h3>
    <div>Sản phẩm: ${pname}</div>
    <div>Số lượng: ${pcount}</div>
    <div>Địa chỉ: ${paddress}</div>
    <div>Tổng tiền: ${ptotal}</div>
    <div>Ngày giao: ${pdate}</div>
    <p><b>Xác nhận đặt hàng?</b></p>

    <button class="btnSubmit">Xác nhận</button>
    <button class="btnCancel">Hủy</button>
    `
    
    ConfirmEvent();
} 

function  ConfirmEvent(){
    const btnSubmit = document.querySelector(".btnSubmit");
    const btnCancel = document.querySelector(".btnCancel");
    btnSubmit.addEventListener("click", function(){
        alert("Đặt hàng thành công");
        confirmBox.style.display = "none";
        form.reset();
        totalPrice.innerText = "0";
    });
    btnCancel.addEventListener("click", function(){
        confirmBox.style.display = "none";
    });
}