let a = [];

if (localStorage.getItem('login') != null) {
    let user = JSON.parse(localStorage.getItem('login'));
    document.getElementById('modal_auth').remove();
    let modal_user = document.getElementById('modal_user');
    let out = '';
    out += '<li class="nav-item dropdown" id="user_info"><a class="nav-link dropdown-toggle"' +
        ' href="#" id="lkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">'
        + user.phone_number +
        '</a><ul class="dropdown-menu" aria-labelledby="lkDropdownMenuLink"><li>' +
        '<a class="dropdown-item" href="lk.html" id="lk">Личный кабинет</a></li>' +
        '<a class="dropdown-item" id="exit">Выйти</a></li></ul></li>';
    modal_user.innerHTML = out;
}

function getUsers() {
    a = JSON.parse((localStorage.getItem("all_users")));
    a.push({name: username, password: password});
}

document.getElementById("exit").addEventListener('click', function (event) {
    let modal_user = document.getElementById('modal_user');
    let exit = document.getElementById('menu');
    exit.innerHTML = '<li id="exit"></li>';
    modal_user.innerHTML = '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Личный кабинет</a><ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"><li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal" data-bs-target="#authorization">Войти</a></li><li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal" data-bs-target="#registration">Регистрация</a></li></ul>\n'
    localStorage.removeItem("login")
    window.location.reload();
});

document.getElementById("reg").addEventListener('click', function (event) {
    let user = {
        phone_number: document.getElementById('inputPhoneNumber1').value,
        password: document.getElementById('inputPassword1').value,
    }

    if (localStorage.getItem("users") !== null) {
        a = JSON.parse(localStorage.getItem('users'));
    }
    a.push(user);
    localStorage.setItem("users", JSON.stringify(a));
});

document.getElementById("login").addEventListener('click', function (event) {
    let username = document.getElementById("inputPhoneNumber").value;
    let password = document.getElementById("inputPassword").value;
    let appointments = JSON.parse(localStorage.getItem('users'));
    for (let item in appointments) {

        if (appointments[item].phone_number === username) {
            console.log('Login find');
            if (appointments[item].password !== password) {
                console.log('inncorrect pass');
            } else {
                let login = {
                    phone_number: appointments[item].phone_number
                };
                localStorage.setItem("login", JSON.stringify(login));
                console.log('correct pass');
                let modal_auth = document.getElementById('modal_auth');
                modal_auth.innerHTML = '';
                document.getElementById('exit').remove();
                let modal_user = document.getElementById('modal_user');
                modal_user.innerHTML = '<li class="nav-item dropdown" id="user_info"><a class="nav-link dropdown-toggle"' +
                    ' href="#" id="lkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">'
                    + appointments[item].phone_number +
                    '</a><ul class="dropdown-menu" aria-labelledby="lkDropdownMenuLink"><li>' +
                    '<a class="dropdown-item" href="lk.html" id="lk">Личный кабинет</a></li>' +
                    '<a class="dropdown-item" id="exit">Выйти</a></li></ul></li>';
            }
            break;
        }
    }
});