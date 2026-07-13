// ==============================
// SHOPKART PRODUCTS
// ==============================

const searchInput = document.getElementById("search");
const productContainer = document.getElementById("product-container");

let products = [];

// ==============================
// LOAD PRODUCTS FROM FASTAPI
// ==============================

async function loadProducts() {

    try {

        const response = await fetch("https://shopkart-b9ei.onrender.com/products/");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        products = await response.json();

        console.log("Products from API:", products);

        displayProducts(products);

    } catch (error) {

        console.error(error);

        productContainer.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Unable to load products
            </h2>
        `;

    }

}

// ==============================
// DISPLAY PRODUCTS
// ==============================

function displayProducts(productsToShow) {

    productContainer.innerHTML = "";

    if (productsToShow.length === 0) {

        productContainer.innerHTML = `
            <h2>No Products Found</h2>
        `;

        return;
    }

    productsToShow.forEach(product => {
        let image = "";

        if (product.name === "iPhone 17 Pro") {
            image = "images/iphone17pro.jpg";
        }
        else if (product.name === "Samsung Galaxy S25 Ultra") {
            image = "images/samsung.jpg";
        }
        else if (product.name === "Google Pixel 10 Pro") {
            image = "images/pixel.jpg";
        }
        else if (product.name === "OnePlus 14") {
            image = "images/oneplus.jpg";
        }

        // Laptops
        else if (product.name === "MacBook Pro M5") {
            image = "images/macbook.jpg";
        }
        else if (product.name === "Dell XPS 15") {
            image = "images/dellxps.jpg";
        }
        else if (product.name === "HP Spectre x360") {
            image = "images/hpspectre.jpg";
        }
        else if (product.name === "Lenovo Legion Pro 7") {
            image = "images/legion.jpg";
        }

        // Fashion
        else if (product.name === "Nike Air Max") {
            image = "images/nikeairmax.jpg";
        }
        else if (product.name === "Levis Jeans") {
            image = "images/levisjeans.jpg";
        }
        else if (product.name === "Puma Hoodie") {
            image = "images/pumahoodie.jpg";
        }
        else if (product.name === "Adidas T-Shirt") {
            image = "images/adidastshirt.jpg";
        }

        // Watches
        else if (product.name === "Apple Watch Series 11") {
            image = "images/applewatch.jpg";
        }
        else if (product.name === "Samsung Galaxy Watch 8") {
            image = "images/galaxywatch.jpg";
        }
        else if (product.name === "Titan Neo") {
            image = "images/titan.jpg";
        }
        else if (product.name === "Fossil Gen 7") {
            image = "images/fossil.jpg";
        }

        // Electronics
        else if (product.name === "Sony WH-1000XM6") {
            image = "images/sonyheadphones.jpg";
        }
        else if (product.name === "JBL Flip 7") {
            image = "images/jblflip.jpg";
        }
        else if (product.name === "boAt Airdopes 901") {
            image = "images/boatairdopes.jpg";
        }
        else if (product.name === "Logitech MX Master 4") {
            image = "images/logitechmouse.jpg";
        }

        productContainer.innerHTML += `

        <div class="product-card">

            <img
                src="${image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p class="price">
                    ₹${Number(product.price).toLocaleString()}
                </p>

                

                <button
                    class="cart-btn"
                    onclick="addToCart(${product.id}, event)"
                >
                    🛒 Add to Cart
                </button>

            </div>

        </div>

        `;

    });

}

// ==============================
// LOAD PRODUCTS
// ==============================

loadProducts();

// ==============================
// ADD TO CART
// ==============================

async function addToCart(id, event) {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch("https://shopkart-b9ei.onrender.com/cart/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                product_id: id,
                quantity: 1
            })

        });

        if (!response.ok) {
            throw new Error("Unable to add product");
        }

        const button = event.target;

        button.innerHTML = "✓ Added";
        button.style.background = "#16a34a";
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = "🛒 Add to Cart";
            button.style.background = "";
            button.disabled = false;
        }, 2000);

    }
    catch (error) {

        console.error(error);

        alert("Failed to add product.");

    }

}

// ==============================
// SEARCH PRODUCTS
// ==============================

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(value)

    );

    displayProducts(filteredProducts);
    document.getElementById("products").scrollIntoView({
    behavior: "smooth"
});

});

// ==============================
// CATEGORY FILTER
// ==============================

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

    card.addEventListener("click", function () {

        const category = this.querySelector("p").innerText.toLowerCase();

        const filteredProducts = products.filter(product => {

            if (category === "mobiles") return product.category_id === 1;

            if (category === "laptops") return product.category_id === 2;

            if (category === "electronics") return product.category_id === 5;

            if (category === "watches") return product.category_id === 4;

            if (category === "fashion") return product.category_id === 3;

            return false;

        });

        displayProducts(filteredProducts);

        window.scrollTo({

            top: document.querySelector(".products").offsetTop - 80,

            behavior: "smooth"

        });

    });

});

// ==============================
// SHOW ALL PRODUCTS
// ==============================

searchInput.addEventListener("search", () => {

    displayProducts(products);

});

// ==============================
// WELCOME
// ==============================

console.log("🛍️ Welcome to ShopKart");

const heroImages = [
    "images/iphone.jpg",
    "images/macbook.jpg",
    "images/sonyheadphones.jpg",
    "images/watch.jpg",
    "images/logitechmouse.jpg"
];

let currentImage = 0;

const heroSlider = document.getElementById("hero-slider");

setInterval(() => {

    heroSlider.style.opacity = 0;

    setTimeout(() => {

        currentImage++;

        if(currentImage >= heroImages.length){
            currentImage = 0;
        }

        heroSlider.src = heroImages[currentImage];

        heroSlider.style.opacity = 1;

    },500);

},3000);