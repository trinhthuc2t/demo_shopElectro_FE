function getAll() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/accounts",
        success: function (data) {
            show(data);
            console.log(data)
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
        str += ` <tr>
              <td>${a.id}</td>
              <td>${a.username}</td>
              <td>${a.password}</td>
              <td>${a.role.name}</td>
              <td><button type="button" class="btn btn-warning" onclick="showEdit(${a.id})" data-toggle="modal" data-target="#modalEdit" >Edit</button></td>
              <td><button type="button" class="btn btn-danger" onclick="deleteA(${a.id})" >Delete</button></td>
             </tr>`
    }
    document.getElementById("show").innerHTML = str;
}

function deleteA(idA) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/accounts/delete/" + idA,
        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function showEdit(idA) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/accounts/" + idA,
        success: function (data) {
            document.getElementById("idE").value = data.id;
            document.getElementById("usernameE").value = data.username;
            document.getElementById("passwordE").value = data.password;
            document.getElementById("idRoleE").value = data.role.id;
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
    let idRole = document.getElementById("idRoleE").value;

    let account = {id, username, password, role: {id: idRole}};

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/accounts",
        data: JSON.stringify(account),
        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function add() {
    let id = document.getElementById("id").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let idRole = document.getElementById("roleId").value;

    let account = {id, username, password, role: {id: idRole}};

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/accounts",
        data: JSON.stringify(account),
        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err)
        }
    });

}
function search(){
    let search = $("#search").val();
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/accounts/search?name="+ search,
        success: function (data) {
            show(data);
        },
        error: function (err) {
            console.log(err)
        }
    });
}
