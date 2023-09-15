let token = localStorage.getItem('AccountToken');


    // Gắn sự kiện click cho nút Đăng Nhập
    $("#loginPassword").on('keypress', function (e) {
        if (e.key === 'Enter')
            loginAndCheckUserRole();
    });
    $("#login-button").click(function () {
            loginAndCheckUserRole();
    });

    // Gắn sự kiện click cho nút Đăng Xuất
    $("#logout-button").click(function () {
        logoutAndCheckUserRole();
    });






function loginAndCheckUserRole() {

    let username =$("#loginUsername").val();
    let password = document.getElementById("loginPassword").value;

    let account = {username, password};
    $.ajax({
        type: "POST",
        headers: {
            'Content-Type': 'application/json', //dữ liệu gửi lên sever dạng json
            'Accept': 'application/json', //dữ liệu nhận về từ sever dạng json

        },
        url: "http://localhost:8080/login",
        data: JSON.stringify(account), //dữ liệu gửi lên sever với kiểu dữ liệu
        success: function (data) {
            localStorage.setItem("AccountToken",JSON.stringify(data));
           checkRole(data)

        },
        error: function () {
            // Xử lý lỗi đăng nhập
            alert("Đăng nhập thất bại!");
            location.href = "login.html";

        }
    });
}

function checkRole(data){
    if (data.roles.name === "ROLE_ADMIN") {
        window.location.href = "admProduct.html";

    } else if (data.roles.name === "ROLE_USER") {
        window.location.href = "index.html";
    } else {
        window.location.href = "index.html";

    }
}


function logoutAndCheckUserRole() {
    $.ajax({
        url: "/accounts/logout",
        type: "POST",
        success: function () {
            // Đăng xuất thành công, kiểm tra và hiển thị lại UI
            alert("ok")
            location.href = "index.html";

        },
        error: function () {
            // Xử lý lỗi đăng xuất
            alert("Đăng xuất thất bại!");
        }
    });
}