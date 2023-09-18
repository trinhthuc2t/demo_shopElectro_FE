let accountLogin = JSON.parse(localStorage.getItem("AccountToken"));


function getAllProduct() {

    return $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/products",
        success: function (data) {
            localStorage.setItem("list", JSON.stringify(data));
            // showProduct(data)
        },
        error: function () {
            console.log(err)
        }
    });

}

function getAllProductSearch() {
    let name = document.getElementById("search").value;
    return $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',

        },
        url: "http://localhost:8080/products/search/" + name,
        success: function (data) {
            showProduct(data)
        },
        error: function () {
            console.log(err)
        }
    });

}


getAllProduct();


function getAllProductByCategoryId(idCategory) {

    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',

        },
        url: "http://localhost:8080/products/category/" + idCategory,
        success: function (data) {
            showProduct(data)
        },
        error: function () {
            console.log(err)
        }
    });

}

function getAllProductByBrandId(idBrand) {

    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',

        },
        url: "http://localhost:8080/products/brand/" + idBrand,
        success: function (data) {
            showProduct(data)
        },
        error: function () {
            console.log(err)
        }
    });

}


function getAllCategory() {

    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',

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

function showCategory(arr) {
    let str = "";
    for (const a of arr) {
        str += `
        <li><a data-toggle="tab"  onclick="getAllProductByCategoryId(${a.id})">${a.name}</a></li>
        `
    }
    document.getElementById("listCategory").innerHTML = str;
}


getAllCategory();

function getAllBrand() {

    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',

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
    for (const a of arr) {
        str += `<option onclick="getAllProductByBrandId(${a.id})">${a.name}</option>
`
    }
    document.getElementById("listBrand").innerHTML = str;
}


function showProduct(arr) {
    let str = "";
    for (const a of arr) {
        str += `
                                <div class="product slick-slide slick-current slick-active" style="width: 260px">
                                    <div class="product-img" style="height: 200px">
                                        <img src="${a.img}" alt="">
                                        <div class="product-label">
                                            <span class="sale">-30%</span>
                                            <span class="new">NEW</span>
                                        </div>
                                    </div>
                                    <div class="product-body">
                                        <p class="product-category">${a.category.name}</p>
                                        <h3 class="product-name"><a href="product.html?id=${a.id}">${a.name}</a></h3>
                                        <h4 class="product-price">${a.price} <del class="product-old-price">$990.00</del></h4>
                                        <div class="product-rating">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
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
                                </div>`

    }
    document.getElementById("showProduct").innerHTML = str;
}


let cart = localStorage.getItem("cart") == null ? [] : JSON.parse(localStorage.getItem("cart"));


let arr2 = JSON.parse(localStorage.getItem("list"));
showProduct(arr2);


function checkToken(id) {
    if (accountLogin !== null) {
        addCart(id)
    } else {
        alert("Đăng nhập để thêm giỏ hàng")
        window.location.href = "login.html";
    }
}

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
                if (data.quantity >= quantityToCart) {
                    if (quantityToCart > 0) {
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
                        alert("Nhập lại số lượng lớn hơn 0")
                    }
                } else {
                    alert("Số lượng không đủ")
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


