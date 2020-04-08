let cek = localStorage.getItem("isLogin");

if (cek != "true") {
    window.location.href = `${window.origin}/login.html`;
}

//Elements
let userData = JSON.parse(localStorage.userLogin);
let addButton = document.getElementById("add");
let searchButton = document.getElementById("search");
let logoutButton = document.getElementById("logoutButton");
let userDisplay = document.getElementById("userDisplay");
let screen = document.getElementById("screen");

// Storage
let get = () => {
    if (localStorage.todos) {
        return JSON.parse(localStorage.todos);
    } else {
        localStorage.todos = "[]";
        return [];
    }
};

let save = (list) => {
    localStorage.todos = JSON.stringify(list);
};

//Display
let showUser = (myObject) => {
    let name = myObject.name + " | ";
    userDisplay.innerText = `${name.toUpperCase()}`;
};

let showList = (list = get()) => {
    if (list.length != 0) {
        screen.innerHTML = "";
        list.forEach((list) => {
            let temp = list.replace(/[\s]/g, "");
            screen.innerHTML += `<li id="index" class="d-flex justify-content-between align-items-center bg-light p-1">
            <span>${list}</span>
            <span> <i <i id="edit-${temp}" class="fa fa-pencil btn-sm btn-warning" aria-hidden="true" aria-hidden="true" onclick="editButton(this)"></i>
            <i id="del-${temp}" class="fa fa-trash btn-danger btn-sm" aria-hidden="true" onclick="deleteButton(this)"></i></span></li>`;
        });
    }
};

//Features
let add = (event) => {
    event.preventDefault();
    let todos = get();
    let inputTodo = document.getElementById("todo").value;
    if (inputTodo) {
        todos.push(inputTodo);
        save(todos);
        showList();
    } else {
        alert("Text can't be empty");
    }
};

let editButton = (temp) => {
    let todos = get();
    let element = temp.id.replace("edit-", "");
    let id = 0;
    for (let i = 0; i < todos.length; i++) {
        let compare = todos[i].replace(/[\s]/g, "");
        if (element == compare) {
            id = i;
        }
    }
    const text = prompt(`update ${todos[id]}:`);

    if (text) {
        todos[id] = text;
        save(todos);
        showList();
    } else {
        alert("Text can't be empty");
    }
};

let deleteButton = (temp) => {
    let todos = get();
    let element = temp.id.replace("del-", "");
    let id = 0;

    todos.forEach((todo, i) => {
        let compare = todo.replace(/[\s]/g, "");
        if (element == compare) {
            id = i;
        }
    });

    todos.splice(id, 1);
    save(todos);
    showList();
};

let search = (event) => {
    event.preventDefault();
    let todos = get();
    let filtered = [];
    let inputSearch = document.getElementById("searchForm").value.toLowerCase();

    todos.forEach((todo) => {
        if (inputSearch == todo) {
            filtered.push(inputSearch);
        }
    });

    if (filtered.length > 0) {
        showList(filtered);
        document.getElementById("searchForm").value = "";
    } else {
        alert("Item not found");
        document.getElementById("searchForm").value = "";
        showList(todos);
    }
};

// Menambahkan class checked pada li
var list = document.querySelector("#screen");
list.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    }
});

let logOut = () => {
    localStorage.setItem("isLogin", false);
    window.location.href = `${window.origin}/login.html`;
};

//Initialization
showUser(userData);
showList();

//Listeners
addButton.addEventListener("click", add);
searchButton.addEventListener("click", search);
logOutButton.addEventListener("click", logOut);
