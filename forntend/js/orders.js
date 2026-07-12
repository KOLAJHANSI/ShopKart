const ordersContainer = document.getElementById("orders-container");

const token = localStorage.getItem("token");

let products = [];
let orders = [];

async function loadOrders() {

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    try {

        // Load products
        const productResponse = await fetch("http://127.0.0.1:8000/products/");
        products = await productResponse.json();

        // Load orders
        const orderResponse = await fetch("http://127.0.0.1:8000/orders/", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        orders = await orderResponse.json();

        displayOrders();

    } catch (error) {

        console.error(error);

    }

}

function displayOrders() {

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {

        ordersContainer.innerHTML = "<h2>No Orders Yet</h2>";

        return;

    }

    orders.forEach(order => {

        const product = products.find(
            p => p.id === order.product_id
        );

        if (!product) return;

        let image = "iphone17pro.jpg";

        if (product.name.toLowerCase().includes("samsung"))
            image = "samsung.jpg";
        else if (product.name.toLowerCase().includes("pixel"))
            image = "headphones.jpg";
        else if (product.name.toLowerCase().includes("oneplus"))
            image = "watch.jpg";

        ordersContainer.innerHTML += `

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

                <p><strong>Quantity :</strong> ${order.quantity}</p>

                <p><strong>Total :</strong> ₹${Number(order.total_price).toLocaleString()}</p>

                <p class="status"> ${order.status}</p>

            </div>

        </div>

        `;

    });

}

loadOrders();