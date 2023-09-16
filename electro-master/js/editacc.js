let accountLogin = JSON.parse(localStorage.getItem("AccountToken"));
showEdit(accountLogin.id)

function showEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,
        },
        url: "http://localhost:8080/accounts/" + id,
        success: function (data) {
            document.getElementById("idE").value = id;
            document.getElementById("usernameE").value = data.username;
            document.getElementById("passwordE").value = data.password;
            document.getElementById("fullNameE").value = data.fullName;
            document.getElementById("imgE").value = data.img;
            document.getElementById("phoneE").value = data.phone;
            document.getElementById("addressE").value = data.address;
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function edit() {
    let id = document.getElementById("idE").value;
    let username = document.getElementById("usernameE").value;
    let password = document.getElementById("passwordE").value;
    let fullName = document.getElementById("fullNameE").value;
    let img = document.getElementById("imgE").value;
    let phone = document.getElementById("phoneE").value;
    let address = document.getElementById("addressE").value;
    let idRole = 1;

    let account = {id, username, password, fullName, img, phone, address, role: {id: idRole}};

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/accounts",
        data: JSON.stringify(account),
        success: function (data) {
            window.location.href = "index.html"
        },
        error: function (err) {
            console.log(err)
        }
    });
}
