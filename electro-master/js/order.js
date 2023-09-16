let accountLogin = JSON.parse(localStorage.getItem("AccountToken"));
const urlSearchParams = new URLSearchParams(window.location.search);
const idAcc = urlSearchParams.get('id');
console.log(idAcc)
function getAll() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/oder/admin",
        success: function (data) {
            showOder(data);
        },
        error: function (err) {
            console.log(err)
            //Lỗi
        }
    });
}



function showOder(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += ` 
        <tr>
             
             <td><p type="button" onclick="showOderByIdOrDerDetail(${arr[i].id})" data-toggle="modal" data-target="#exampleModalOder">${arr[i].id}</td>
             <td><p type="button" onclick="showOderByIdOrDerDetail(${arr[i].id})" data-toggle="modal" data-target="#exampleModalOder">${arr[i].account.fullName}</td>
            <td><p type="button" onclick="showOderByIdOrDerDetail(${arr[i].id})" data-toggle="modal" data-target="#exampleModalOder">${arr[i].account.address}</td>
            <td><p type="button" onclick="showOderByIdOrDerDetail(${arr[i].id})" data-toggle="modal" data-target="#exampleModalOder">${arr[i].account.phone}</td>
            <td><p type="button" onclick="showOderByIdOrDerDetail(${arr[i].id})" data-toggle="modal" data-target="#exampleModalOder">${arr[i].total}</td>
            <td><p type="button" onclick="showOderByIdOrDerDetail(${arr[i].id})" data-toggle="modal" data-target="#exampleModalOder">${arr[i].dateTime}</td>
            `
    }
    document.getElementById("show").innerHTML = str;
}


function showOderByIdOrDerDetail(id) {

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

            "Authorization": "Bearer " + accountLogin.token,
        },
        url: "http://localhost:8080/admin/orderDetail/" + id,
        success: function (data) {
            showOrderDetail(data);

        },
        error: function (err) {
            console.log(err)
        }
    });
}

function showOrderDetail(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += ` 
        <tr>
             
            <td>${arr[i].id}</td>
            <td>${arr[i].oder.account.fullName}</td>
            <td>${arr[i].oder.account.address}</td>
            <td>${arr[i].oder.account.phone}</td>
            <td>${arr[i].product.name}</td>
            <td>${arr[i].quantity}</td>
            <td>${arr[i].product.price}</td>
            <td>${arr[i].oder.dateTime}</td>
            <td>${arr[i].oder.total}</td>
           
            `
    }
    document.getElementById("showDetail").innerHTML = str;
}

function getOderByIdAcc(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/oder/admin/" + id,
        success: function (data) {
            showOder(data);
        },
        error: function (err) {
            console.log(err)
            //Lỗi
        }
    });
}


function logoutAndRedirect() {
    // Xóa token khỏi localStorage
    localStorage.removeItem('AccountToken');

    // Điều hướng người dùng đến trang đăng nhập
    window.location.href = "login.html";
}


$("#logout-button").click(function () {
    logoutAndRedirect();
});


const logoutButton = document.getElementById("logout-button");
const loginButton = document.getElementById("login-button");

if (accountLogin !== null) {
    logoutButton.style.display = "inline-block";
    // loginButton.style.display = "none";
} else {
    logoutButton.style.display = "none";
    loginButton.style.display = "inline-block";
}
function checkIdAcc(id) {
    if (id == null)
        getAll()
    else {
        getOderByIdAcc(id);

    }
}
checkIdAcc(idAcc);