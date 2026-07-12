const loginForm = document.querySelector(".login-form");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {

        const response = await fetch("http://127.0.0.1:8000/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: formData

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.access_token);

            message.style.color = "green";
            message.innerText = "Login Successful!";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } else {

            message.style.color = "red";
            message.innerText = data.detail;

        }

    } catch (error) {

        console.error(error);

        message.style.color = "red";
        message.innerText = "Unable to connect to server.";

    }

});