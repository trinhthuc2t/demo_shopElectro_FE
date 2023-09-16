
let accountLogin = JSON.parse(localStorage.getItem("AccountToken"));

function getAdm() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/products",
        success: function (data) {
            showAdm(data);
        },
        error: function (err) {
            console.log(err)
            //Lỗi
        }
    });
}
getAdm();
function showAdm(arr) {
    let str = "";
    for (const a of arr) {
        str += `<tr>
                        <td>${a.name}</td>
                        <td><img src="${a.img}" height="200" width="200" alt=""></td>
                        <td><button type="button" class="btn btn-warning" onclick="showEdit(${a.id})" data-toggle="modal" data-target="#exampleModalE" >Edit</button></td>
                        <td><button type="button" class="btn btn-danger" onclick="deleteA(${a.id})" >Delete</button></td>
                </tr>`
    }
    document.getElementById("showAdm").innerHTML = str;
}

function deleteA(idA) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,



        },
        url: "http://localhost:8080/products/admin/delete/" + idA,
        success: function (data) {
            getAdm();
        },
        error: function (err) {
            console.log(err)
        }
    });
}


function getAllCategory() {

    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/products/category",
        success: function (data) {
            showCategory(data)
        },
        error: function () {
            console.log(err)
        }
    });
}
getAllCategory()
function showCategory(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += `<option value="${arr[i].id}">${arr[i].name}</option>`
    }
    document.getElementById("categoryId").innerHTML = str;
   document.getElementById("categoryIdE").innerHTML = str;
}
function getAllBrand() {

    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/products/brand",
        success: function (data) {
            showBrand(data)
        },
        error: function () {
            console.log(err)
        }
    });

}

getAllBrand();
function showBrand(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += `<option value="${arr[i].id}">${arr[i].name}</option>`
    }
    document.getElementById("brandId").innerHTML = str;
    document.getElementById("brandIdE").innerHTML = str;
}
function add() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let img = document.getElementById("img").value;
    let detail = document.getElementById("detail").value;
    let date = getDateTimeNow();
    let idCategory = document.getElementById("categoryId").value;
    let idBrand = document.getElementById("brandId").value;

     let product = {name,price, quantity,img, detail,date,  Category: {id: idCategory},Brand: {id: idBrand}};

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,
        },
        url: "http://localhost:8080/products/admin",
        data: JSON.stringify(product),
        success: function (data) {
            getAdm();
        },
        error: function (err) {
            console.log(err)
        }
    });
}
function edit() {
    let id = document.getElementById("idE").value
    let name = document.getElementById("nameE").value;
    let price = document.getElementById("priceE").value;
    let quantity = document.getElementById("quantityE").value;
    let img = document.getElementById("imgE").value;
    let detail = document.getElementById("detailE").value;
    let date = getDateTimeNow();
    let idCategory = document.getElementById("categoryIdE").value;
    let idBrand = document.getElementById("brandIdE").value;

     let product = {id,name,price, quantity,img, detail,date,  Category: {id: idCategory},Brand: {id: idBrand}};

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/products/admin",
        data: JSON.stringify(product),
        success: function (data) {
            getAdm();
        },
        error: function (err) {
            console.log(err)
        }
    });

}
function getDateTimeNow() {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1);
}
function showEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,


        },
        url: "http://localhost:8080/products/admin/" + id,
        success: function (data) {
            console.log(data)
            document.getElementById("idE").value = data.id;
            document.getElementById("nameE").value = data.name;
            document.getElementById("priceE").value = data.price;
            document.getElementById("quantityE").value = data.quantity;
            document.getElementById("imgE").value = data.img;
            document.getElementById("detailE").value = data.detail;
            document.getElementById("categoryIdE").value = data.category.id;
            document.getElementById("brandIdE").value = data.brand.id;
        },
        error: function (err) {
            console.log(err)
        }
    });
}
function logoutAndRedirect() {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');

    // Điều hướng người dùng đến trang đăng nhập
    window.location.href = "login.html";
}
$("#logout-button").click(function () {
    logoutAndRedirect();
});