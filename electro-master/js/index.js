function getAll() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/products",
        success: function (data) {
            show(data);
        },
        error: function (err) {
            console.log(err)
            //Lỗi
        }
    });
}

function getAdm() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
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

getAll();

function show(arr) {
    let str = "";
    for (const a of arr) {
        str += `<div class="product-img">
\t\t\t\t\t\t\t\t\t\t\t\t<img src="${a.img1}" alt="">
\t\t\t\t\t\t\t\t\t\t\t\t<div class="product-label">
\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="sale">-30%</span>
\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="new">NEW</span>
\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="product-body">
\t\t\t\t\t\t\t\t\t\t\t\t<p class="product-category">${a.category.name}</p>
\t\t\t\t\t\t\t\t\t\t\t\t<h3 class="product-name"><a href="#">${a.name}</a></h3>
\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="product-price">${a.price}<del class="product-old-price">$990.00</del></h4>
\t\t\t\t\t\t\t\t\t\t\t\t<div class="product-rating">
\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-star"></i>
\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-star"></i>
\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-star"></i>
\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-star"></i>
\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-star"></i>
\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t<div class="product-btns">
\t\t\t\t\t\t\t\t\t\t\t\t\t<button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
\t\t\t\t\t\t\t\t\t\t\t\t\t<button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
\t\t\t\t\t\t\t\t\t\t\t\t\t<button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="add-to-cart">
\t\t\t\t\t\t\t\t\t\t\t\t<button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>Thêm giỏ hàng</button>
\t\t\t\t\t\t\t\t\t\t\t</div>`
    }
    document.getElementById("showProduct").innerHTML = str;
}

function showAdm(arr) {
    let str = "";
    for (const a of arr) {
        str += `<tr>
                        <td>${a.name}</td>
                        <td><img src="${a.img1}" height="200" width="200" alt=""></td>
                        <td><a href="">Xóa</a></td>
                        <td><a href="">Sửa</a></td>
                    </tr>`
    }
    document.getElementById("showAdm").innerHTML = str;
}

getAdm()
