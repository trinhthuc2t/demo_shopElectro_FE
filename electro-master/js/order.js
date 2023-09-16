function getAll() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/cities",
        success: function (data) {
            show(data);
        },
        error: function (err) {
            console.log(err)
            //Lỗi
        }
    });
}


function show(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        console.log(arr)
        str += ` 
        <tr>
            <td>${arr[i].id}</td>
             <td><p type="button"  onclick="showInfo(${arr[i].id})" data-toggle="modal" data-target="#exampleModalI">${arr[i].name}</p></td>
            <td>${arr[i].country.name}</td>
             <td><button type="button" class="btn btn-warning" onclick="showEdit(${arr[i].id})" data-toggle="modal" data-target="#exampleModalE">Edit</button></td>
             <td><button type="button" class="btn btn-danger" onclick="deleteA(${arr[i].id})" >Delete</button></td>
            
           
        </tr>`
    }
    document.getElementById("show").innerHTML = str;
}


function deleteA(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/cities/delete/" + id,

        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err)
        }
    });
}
function showInfo(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/cities/" + id,
        success: function (data) {
            // document.getElementById("idI").innerText = data.id;
            document.getElementById("nameI").innerText = data.name;
            document.getElementById("acreageI").innerText = data.acreage;
            document.getElementById("populationI").innerText = data.population;
            document.getElementById("gdpI").innerText = data.gdp;
            document.getElementById("describesI").innerText = data.describes;
            document.getElementById("countryI").innerText = data.country.id;
        },
        error: function (err) {
            console.log(err)
        }
    });
}