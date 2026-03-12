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

