let carList = JSON.parse(localStorage.getItem("cart"));
let accountLogin = JSON.parse(localStorage.getItem("AccountToken"));
showCartList(carList);

function showCartList(arr) {
    let sum = 0;
    let cartLength = 0
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += `  
           <div class="product-widget">
            <div class="product-img">
             <img src="${arr[i].img}" alt="">
            </div>
            <div class="product-body">
             <h3 class="product-name"><a href="product.html?id=${arr[i].id}">${arr[i].name}</a></h3>
             <h4 class="product-price"><span class="qty">${arr[i].quantity}</span>X ${arr[i].price}</h4>
            </div>
            <button class="delete"><i class="fa fa-close"></i></button>
           </div>
`
        sum += arr[i].quantity * arr[i].price
        cartLength = arr.length;

    }
    document.getElementById("sum").innerText = sum;
    document.getElementById("quantityCart").innerText = cartLength;
    document.getElementById("cart-list").innerHTML = str;
}

document.getElementById("fullName").innerText = accountLogin.fullName
document.getElementById("address").innerText = accountLogin.address
document.getElementById("phone").innerText = accountLogin.phone

function showCarOrder(arr) {
    let sumAll = 0;
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += `  
           						<div class="order-col">
									<div> ${arr[i].name}</div>
									<div> ${arr[i].quantity}</div>
									<div>${arr[i].price * arr[i].quantity}</div>
								</div>
								

`
        sumAll += arr[i].quantity * arr[i].price;

    }
    document.getElementById("sum-all").innerText = sumAll;
    document.getElementById("showListOrder").innerHTML = str;
};
showCarOrder(carList);




function addOrder() {
    let dateTime = getDateTimeNow();
    let total = 0;
    for (let i = 0; i < carList.length; i++) {
        total += carList[i].quantity * carList[i].price;
    }
    let idAcc = accountLogin.id;
    let cart = {dateTime, total, products: carList, idAcc}

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token
        },
        url: "http://localhost:8080/oder/user",
        data: JSON.stringify(cart),
        success: function (data) {
            for (let a of carList) {
                reduceProductQuantity(a.id, a.quantity)
            }
            alert("Mua hàng thành công")
            localStorage.removeItem("cart")
            window.location.href = "index.html";
        },
        error: function (err) {
            console.log(err)
        }
    });
}


function reduceProductQuantity(productId, quantityToBuy) {
     $.ajax({
        url: "http://localhost:8080/oder/" + productId + "/" + quantityToBuy,
        type: "post",
        dataType: "json",
         success: function (data){
             console.log(data)
         }
    });
}


function getProductById(id) {

    return $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token
        },
        url: "http://localhost:8080/products/by/" + id
    });

}

// async function checkQuantityPro() {
//     for (let a of carList) {
//         let productDb = await getProductById(a.id);
//         if (productDb.quantity >= a.quantity) {
//             await reduceProductQuantity(a.id, a.quantity)
//         } else {
//             alert("Mua hàng thất bai: Hết hàng")
//             return;
//         }
//     }
//
//     alert("Mua hàng thành công")
//     localStorage.removeItem("cart")
//
// }
//
// function addOrder() {
//     let dateTime = getDateTimeNow();
//     let total = 0;
//     for (let i = 0; i < carList.length; i++) {
//         total += carList[i].quantity * carList[i].price;
//     }
//     let idAcc = accountLogin.id;
//     let cart = {dateTime, total, products: carList, idAcc}
//
//     $.ajax({
//         type: "Post",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             "Authorization": "Bearer " + accountLogin.token
//         },
//         url: "http://localhost:8080/oder/user",
//         data: JSON.stringify(cart),
//         success: function (data) {
//             checkQuantityPro().then();
//             window.location.href = "index.html";
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     });
// }


function logoutAndRedirect() {
    // Xóa token khỏi localStorage
    localStorage.removeItem('AccountToken');

    // Điều hướng người dùng đến trang đăng nhập
    window.location.href = "login.html";
}


$("#logout-button").click(function () {
    logoutAndRedirect();
});

function getDateTimeNow() {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1);
}


const logoutButton = document.getElementById("logout-button");
const loginButton = document.getElementById("login-button");

if (accountLogin !== null) {
    logoutButton.style.display = "inline-block";
    loginButton.style.display = "none";
} else {
    logoutButton.style.display = "none";
    loginButton.style.display = "inline-block";
}


