const registerForm = document.querySelector(".register-form");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("https://shopkart-b9ei.onrender.com/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {

            message.style.color = "green";
            message.innerText = "Registration Successful! Redirecting to Login...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

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