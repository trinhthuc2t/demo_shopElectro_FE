let cart = localStorage.getItem("cart") == null ? [] : JSON.parse(localStorage.getItem("cart"));

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

showCart();

function deleteCart(index) {
    cart.splice(index, 1);
    showCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}
function addCart(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products/by/" + id,
        success: function (data) {
            let index = checkProductToCart(id);
            if (index === -1) {
                data.quantity = 1;
                cart.push(data);
            } else {
                cart[index].quantity = parseInt(cart[index].quantity);
            }
            alert("Thêm thành công")

            localStorage.setItem("cart", JSON.stringify(cart));
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
