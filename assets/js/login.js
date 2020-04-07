const userLogin = document.getElementById("userLogin");

let get = () => {
    if (localStorage.userData) {
        return JSON.parse(localStorage.userData);
    } else {
        localStorage.userData = "[]";
        return [];
    }
};

let loginUser = (event) => {
    event.preventDefault();
    const userData = get();
    let flag = false;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    userData.forEach((user) => {
        if (user.email == email && user.password == password) {
            flag = true;
            let name = user.name;
            let userLogin = {
                name,
                email,
                password,
            };

            localStorage.setItem("isLogin", true);
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
        }
    });

    if (flag) {
        alert("Anda berhasil login");
        window.location.href = `${window.origin}/index.html`;
    } else {
        alert("email atau password salah");
    }
};

userLogin.addEventListener("submit", loginUser);
