function add() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let fullName = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let img = document.getElementById("img").value;
    let idRole =1;

    let account = { username, password,fullName,img,phone,address, role: {id: idRole}};

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/accounts",
        data: JSON.stringify(account),
        success: function (data) {
            location.href = "login.html";
        },
        error: function (err) {
            console.log(err)
        }
    });

}