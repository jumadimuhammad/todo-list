const registerForm = document.getElementById("registerForm");

let get = () => {
    if (localStorage.userData) {
        return JSON.parse(localStorage.userData);
    } else {
        localStorage.userData = "[]";
        return [];
    }
};

let save = (list) => {
    localStorage.userData = JSON.stringify(list);
};

//Display
let showUser = (myObject) => {
    userDisplay.innerText = `Welcome, ${myObject.name}`;
}

const userRegistration = (event) => {
    event.preventDefault();

    //Get data from storage
    let listUser = get();
    
    //User input
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    //Save data to object and storage
    const userData = {
        name,
        email,
        password,
    };
    listUser.push(userData);
    save(listUser)

    //Change to login page
    window.location.href = `${window.origin}/login.html`;
}

//Listeners
registerForm.addEventListener("submit", userRegistration)