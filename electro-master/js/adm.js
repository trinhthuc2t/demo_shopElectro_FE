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
function showAdm(arr) {
    let str = "";
    for (const a of arr) {
        str += `<tr>
                        <td>${a.name}</td>
                        <td><img src="${a.img1}" height="200" width="200" alt=""></td>
                        <td><button type="button" class="btn btn-warning" onclick="showEdit(${a.id})" data-toggle="modal" data-target="#modalEdit" >Edit</button></td>
              <td><button type="button" class="btn btn-danger" onclick="deleteA(${a.id})" >Delete</button></td>
                    </tr>`
    }
    document.getElementById("showAdm").innerHTML = str;
}

getAdm()

