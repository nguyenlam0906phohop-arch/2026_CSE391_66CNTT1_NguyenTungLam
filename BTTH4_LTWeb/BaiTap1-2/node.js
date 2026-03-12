const inputName = document.querySelector(".inputName");
const inputScore = document.querySelector(".inputScore");
const btnAdd = document.querySelector(".btnAdd");
const tbody = document.querySelector("tbody");

// Hàm xếp loại
function getRank(s){
    if(s >= 8.5){
        return "Giỏi";
    }
    else if(s >= 7.0){
        return "Khá";
    }
    else if(s >= 5){
        return "Trung bình";
    }
    else
        return "Yếu";
}

//Hàm thêm học sinh
function addStudent(){
    const name = inputName.value.trim();
    const score = parseFloat(inputScore.value);

    if(name === ""){
        alert("Vui lòng nhập họ tên");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm không hợp lệ");
        return;
    }

    const rank = getRank(score);
    const stt = tbody.children.length + 1;
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${stt}</td>
        <td>${name}</td>
        <td>${score}</td>
        <td>${rank}</td>
        <td><button class="btnDel">Xóa</button></td>
    `;

    if(score < 5){
        tr.style.backgroundColor = "yellow";
    }

    tbody.appendChild(tr);

    inputName.value = "";
    inputScore.value = "";
    inputName.focus();

    updateStatistic();
}

btnAdd.addEventListener("click", addStudent);

//Xóa sinh viên
tbody.addEventListener("click", function(e){
    if(e.target.classList.contains("btnDel")){
        const row = e.target.closest("tr");
        row.remove();
        updateStatistic();
    }
});

function updateStatistic(){
    const rows = tbody.querySelectorAll("tr");
    let total = rows.length;
    let sum = 0;
    rows.forEach(row =>{
        const score = parseFloat(row.children[2].innerText);
        sum = sum + score;
    });

    const avg = total ? (sum/total).toFixed(2) : 0;
    document.getElementById("statistic").innerText =
        `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

updateStatistic();

const inputSearch = document.getElementById("search");

inputSearch.addEventListener("input", function(){
    const searchValue = inputSearch.value.trim();
    const lowerValue = searchValue.toLowerCase();
    const rows = tbody.querySelectorAll("tr");
    let found = false;
    // xóa dòng "không có kết quả" cũ nếu có
    for(let i = 0; i < rows.length; i++){
        const noResult = document.getElementById("noResult");
        const row = rows[i];
        const name = row.children[1].innerText.toLowerCase();

        if(name.includes(lowerValue)){
            row.style.display = "";
            found = true;
        }
        else{
            row.style.display = "none";
        }
    }
    // nếu không tìm thấy
    if(!found){
    noResult.style.display = "block";
}
else{
    noResult.style.display = "none";
}
    updateStatistic();
});

//Lọc theo Xếp loại
const filter = document.querySelector("#filter");
filter.addEventListener("change", function(){
    const value = filter.value.trim().toLowerCase();
    const allRows = document.querySelectorAll("tr");
    for(let i = 0; i < allRows.length; i++){
        const R = allRows[i]
        const filterValue = R.children[3].innerText.trim().toLowerCase();
        if(value === "all" || filterValue === value){
            R.style.display = "";
        }
        else{
            R.style.display = "none";
        }
    }
});


const sortScore = document.getElementById("sortScore");
let sort = true;
sortScore.addEventListener("click", function(){
    const allScore = tbody.querySelectorAll("tr");
    const ValueScore = Array.from(allScore); //Chuyển từ NodeList thành mảng
    if(sort){
        ValueScore.sort(sortIncrease);
    }
    else{
        ValueScore.sort(sortDecrease);
    }
    for(let i = 0; i < ValueScore.length; i++){
        tbody.appendChild(ValueScore[i]);
    }
    if(sort){
        sortScore.innerText = "Điểm ▲";
    }
    else{
        sortScore.innerText = "Điểm ▼";
    }
    sort = !sort;
})

function sortIncrease(a,b){
    const A = parseFloat(a.children[2].innerText);
    const B = parseFloat(b.children[2].innerText);
    return A - B;
}

function sortDecrease(a,b){
    const A = parseFloat(a.children[2].innerText);
    const B = parseFloat(b.children[2].innerText);
    return B - A;
}
