
$(document).ready(function () {

    // Gắn sự kiện click cho nút Đăng Nhập
    $("#login-button").click(function () {
        loginAndCheckUserRole();
    });

    // Gắn sự kiện click cho nút Đăng Xuất
    $("#logout-button").click(function () {
        logoutAndCheckUserRole();
    });
});


function showAdmin() {
    window.location.href = "index2.html";
    document.getElementById("product-list").style.display = "block";
    document.getElementById("product-crud").style.display = "none";
    // $("#user-info").html("<p>Chào Admin!</p>");
    // $("#product-crud").show();
    // $("#product-list").hide();
}

function showUser() {
    window.location.href = "index2.html";
    document.getElementById("product-list").style.display = "none";
    document.getElementById("product-crud").style.display = "block";
    // $("#user-info").html("<p>Xin chào User!</p>");
    // $("#product-crud").hide();
    // $("#product-list").show();
}

function showDefault() {
    window.location.href = "index2.html";
    document.getElementById("product-list").style.display = "none";
    document.getElementById("product-crud").style.display = "block";
    // $("#user-info").html("<p>Chưa đăng nhập!</p>");
    // $("#product-crud").hide();
    // $("#product-list").hide();
}

function loginAndCheckUserRole() {

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let account = {username, password};
    $.ajax({
        type: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/accounts/login?username=" + username + "&password=" + password,
        data: JSON.stringify(account),

        success: function (data) {
            if (data.role.name === "admin") {
                // Hiển thị giao diện quản lý sản phẩm
                showAdmin();
            } else if (data.role === "user") {
                // Hiển thị danh sách sản phẩm
                showUser();
            } else {
                // Hiển thị giao diện mặc định (chưa đăng nhập)
                showDefault();
            }
        },
        error: function () {
            // Xử lý lỗi đăng nhập
            alert("Đăng nhập thất bại!");
        }
    });
}

// function logoutAndCheckUserRole() {
//     $.ajax({
//         url: "/accounts/logout",
//         type: "POST",
//         success: function () {
//             // Đăng xuất thành công, kiểm tra và hiển thị lại UI
//             checkUserRoleAndShowUI();
//         },
//         error: function () {
//             // Xử lý lỗi đăng xuất
//             alert("Đăng xuất thất bại!");
//         }
//     });
// }
