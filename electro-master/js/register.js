function add() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let fullName = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let form = new FormData();
    let file = document.getElementById("img").files[0];
    form.append("file", file);
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
            location.href = "login.html";
        },
        error: function (err) {
            console.log(err)
        }
    });

}
function showImageRegister() {
    let [file] = document.getElementById('img').files;
    if (file) {
        $("#fileImg").attr("src", URL.createObjectURL(file));
    }
}