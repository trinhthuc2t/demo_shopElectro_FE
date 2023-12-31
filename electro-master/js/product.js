const accountLogin = JSON.parse(localStorage.getItem("AccountToken"));
const urlSearchParams = new URLSearchParams(window.location.search);
const idPro = urlSearchParams.get('id');

function checkToken(id) {
    if (accountLogin !== null) {
        addCart(id)
    } else {
        alert("Đăng nhập để thêm giỏ hàng")
        window.location.href = "login.html";
    }
}

function getAllImgPro(id) {

    return $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',

        },
        url: "http://localhost:8080/imgPro/" + id,
        success: function (data) {
            localStorage.setItem("listImgPro", JSON.stringify(data));

        },
        error: function () {
            console.log(err)
        }
    });

}

getAllImgPro(idPro);

function showImgPro(arr) {
    let str = "";
    for (const a of arr) {
        str += `
              <div class="product-preview">
                <img src="${a.name}" alt="">
              </div>
`
    }

    document.getElementById("product-imgs").innerHTML = str;
    document.getElementById("product-main-img").innerHTML = str;
}


let arr2 = JSON.parse(localStorage.getItem("listImgPro"));
showImgPro(arr2)


function getProduct(id) {

    return $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',

        },
        url: "http://localhost:8080/products/by/" + id,
        success: function (data) {
            document.getElementById("namePro").innerText = data.name;
            document.getElementById("pricePro").innerText = data.price;
            document.getElementById("detailPro").innerText = data.detail;

        },
        error: function () {
            console.log(err)
        }
    });
}

getProduct(idPro)


function showProduct(arr) {
    let str = "";
    for (const a of arr) {
        str += `<!-- product -->
     <div class="col-md-3 col-xs-6">
      <div class="product">
       <div class="product-img" style="height: 200px">
        <img src="${a.img}" alt="">
        <div class="product-label">
         <span class="sale">-30%</span>
        </div>
       </div>
       <div class="product-body">
        <p class="product-category">${a.category.name}</p>
        <h3 class="product-name"><a href="product.html?id=${a.id}">${a.name}</a></h3>
        <h4 class="product-price">${a.price} <del class="product-old-price">$990.00</del></h4>
        <div class="product-rating">
        </div>
        <div class="product-btns">
         <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
         <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
         <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
        </div>
       </div>
       <div class="add-to-cart">
        <button class="add-to-cart-btn" onclick="checkToken(${a.id})"><i class="fa fa-shopping-cart"></i>Thêm giỏ hàng</button>
       </div>
      </div>
     </div>
     <!-- /product -->`

    }
    document.getElementById("productInfo").innerHTML = str;
}

let arr = JSON.parse(localStorage.getItem("list"));
showProduct(arr);


let cart = localStorage.getItem("cart") == null ? [] : JSON.parse(localStorage.getItem("cart"));


function addCart(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accountLogin.token

        },
        url: "http://localhost:8080/products/by/" + id,
        success: function (data) {
            let quantityToCart = 1;
            quantityToCart = +document.getElementById("quantityOrder").value
            if (quantityToCart > 0) {
                if (data.quantity >= quantityToCart) {
                    let index = checkProductToCart(id);
                    if (index === -1) {
                        data.quantity = quantityToCart;
                        cart.push(data);
                    } else {
                        cart[index].quantity = parseInt(cart[index].quantity) + quantityToCart;
                    }
                    alert("Thêm thành công")

                    localStorage.setItem("cart", JSON.stringify(cart));
                } else {
                    alert("Số lượng không đủ")


                }
            } else {
                alert("Nhập lại số lượng lớn hơn 0")

            }

        },
        error: function (err) {
            console.log(err)
        }
    });
}


function checkProductToCart(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            return i;
        }
    }
    return -1;
}

let carList = JSON.parse(localStorage.getItem("cart"));
showCartList(carList);

function showCartList(arr) {
    let sum = 0;
    let cartLength = 0
    let str = "";
    if (arr !== null) {
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
    }

    document.getElementById("sum").innerText = sum;
    document.getElementById("quantityCart").innerText = cartLength;
    document.getElementById("cart-list").innerHTML = str;
}


function getAllCmt(id) {

    return $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/cmt/" + id,
        success: function (data) {
            showCmt(data)

        },
        error: function () {
            console.log(err)
        }
    });

}

getAllCmt(idPro)

function showCmt(arr) {
    let str = "";
    for (const a of arr) {
        let createTime = pastTime(a.createdAt);
        str += `
               <li>
              <div class="review-heading">
               <h5 class="name">${a.account.fullName}</h5>
               <p class="date">${createTime}</p>
               <div class="review-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o empty"></i>
               </div>
              </div>
              <div class="review-body">
               <p>${a.cmt}</p>
              </div>
             </li>

`
    }
    document.getElementById("cmt").innerHTML = str;
}


function checkAcc() {
    if (accountLogin !== null) {
        saveCmt();
    } else {
        alert("Đăng nhập để comment")
        window.location.href = "login.html";

    }
}

function saveCmt() {

    let username = accountLogin.username;
    let cmt = document.getElementById("input-cmt").value;
    let createdAt = getDateTimeNow();
    let id = idPro;

    let comment = {cmt, createdAt, account: {username}, product: {id}}
    return $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accountLogin.token

        },

        url: "http://localhost:8080/cmt/" + id,
        data: JSON.stringify(comment),
        success: function (data) {
            window.location.href = "product.html?id=" + idPro;
            showCmt(data)

        },
        error: function () {
            console.log(err)
        }
    });

}
function pastTime(sqlDatetime) {
    let sqlTimestamp = new Date(sqlDatetime).getTime();
    let currentTime = new Date().getTime();
    let elapsedHTML;
    let elapsedMilliseconds = currentTime - sqlTimestamp;
    let years = Math.floor(elapsedMilliseconds / (86400000 * 365));
    let months = Math.floor(elapsedMilliseconds / (86400000 * 30));
    let weeks = Math.floor(elapsedMilliseconds / (86400000 * 7));
    let days = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
    let hours = Math.floor((elapsedMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    if (years) elapsedHTML = years + " năm";
    else if (months) elapsedHTML = months + " tháng";
    else if (weeks) elapsedHTML = weeks + " tuần";
    else if (days) elapsedHTML = days + " ngày";
    else if (hours) elapsedHTML = hours + " giờ";
    else if (minutes) elapsedHTML = minutes + " phút";
    else elapsedHTML = " Vừa xong";
    return elapsedHTML;
}
function getDateTimeNow() {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1);
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
