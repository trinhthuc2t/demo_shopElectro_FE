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
    let phone = document.getElementById("phoneE").value;
    let address = document.getElementById("addressE").value;
    let form = new FormData();
    let file = document.getElementById("imgE").files[0];
    form.append("file", file);
    form.append("id", id);
    form.append("username", username);
    form.append("password", password);
    form.append("fullName", fullName);
    form.append("phone", phone);
    form.append("address", address);


    $.ajax({
        type: "Post",
        url: "http://localhost:8080/accounts",
        data:form,
        contentType: false,
        processData: false,
        success: function (data) {
            accountLogin.fullName = fullName;
            accountLogin.address = address;
            accountLogin.phone = phone;
            if (file) accountLogin.img = file.name;
            localStorage.setItem("AccountToken", JSON.stringify(accountLogin));
            window.location.href = "index.html"
        },
        error: function (err) {
            console.log(err)
        }
    });
}
function showImageEditProfile() {
    let [file] = document.getElementById('imageE').files;
    if (file) {
        $("#imageNow").attr("src", URL.createObjectURL(file));
    }
}