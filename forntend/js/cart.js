const cartContainer = document.getElementById("cart-container");
const token = localStorage.getItem("token");

let products = [];
let cartItems = [];

async function loadCart() {

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    try {

        const productResponse = await fetch("http://127.0.0.1:8000/products/");
        products = await productResponse.json();

        const cartResponse = await fetch("http://127.0.0.1:8000/cart/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        cartItems = await cartResponse.json();

        displayCart();

    } catch (error) {
        console.error(error);
    }
}

function displayCart() {

    cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<h2>Your Cart is Empty</h2>";
        return;
    }

    cartItems.forEach(item => {

        const product = products.find(
            p => p.id === item.product_id
        );

        if (!product) return;

        let image = "iphone17pro.jpg";

        if (product.name.toLowerCase().includes("samsung"))
            image = "samsung.jpg";
        else if (product.name.toLowerCase().includes("pixel"))
            image = "headphones.jpg";
        else if (product.name.toLowerCase().includes("oneplus"))
            image = "watch.jpg";

        cartContainer.innerHTML += `

        <div class="product-card">

            <img
                src="images/${image}"
                class="product-image"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p class="price">
                    ₹${Number(product.price).toLocaleString()}
                </p>

                <p>Quantity : ${item.quantity}</p>

                <button
                    class="cart-btn"
                    onclick="removeItem(${item.id})"
                >
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    // Place Order Button
    cartContainer.innerHTML += `

        <div style="grid-column:1/-1; text-align:center; margin-top:20px;">

            <button id="place-order-btn" onclick="placeOrder()">
                Place Order
            </button>

        </div>

    `;
}

async function removeItem(id) {

    await fetch(`http://127.0.0.1:8000/cart/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    loadCart();
}

async function placeOrder() {

    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {

        for (const item of cartItems) {

            await fetch("http://127.0.0.1:8000/orders/", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    product_id: item.product_id,
                    quantity: item.quantity
                })

            });

        }

        alert("Order placed successfully!");

        window.location.href = "orders.html";

    } catch (error) {

        console.error(error);
        alert("Failed to place order");

    }
}

loadCart();