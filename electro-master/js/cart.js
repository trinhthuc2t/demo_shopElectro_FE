let cart = localStorage.getItem("cart") == null ? [] : JSON.parse(localStorage.getItem("cart"));
let accountLogin = JSON.parse(localStorage.getItem("AccountToken"));

function showCart() {
    let str = '';
    for (let i = 0; i < cart.length; i++) {
        let p = cart[i];
        str += `<tr>
                          <td>${p.name}</td>
                          <td>${p.price}</td>
                          <td>${p.quantity}</td>
                          <td><img src="${p.img}" width="200" height="160"></td>
                          <td><button type="button" onclick="deleteCart(${i})" class="btn btn-danger">Delete Product</button></td>
                        </tr>`
    }
    document.getElementById("show").innerHTML = str;
}
function checkLogin(){
    if (accountLogin !== null)showCart();
}
checkLogin();

function deleteCart(index) {
    cart.splice(index, 1);
    showCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function checkProductToCart(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            return i;
        }
    }
    return -1;
}
showCartList(cart)
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
    loginButton.style.display = "none";
} else {
    logoutButton.style.display = "none";
    loginButton.style.display = "inline-block";
}