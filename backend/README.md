# 🛒 ShopKart Backend

A FastAPI backend for the ShopKart E-commerce application with JWT Authentication and MySQL database.

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 📦 Product APIs
- 🛍️ Category APIs
- 🛒 Cart Management
- 📄 Order Management
- 🔒 Password Hashing using Bcrypt
- 📚 Interactive Swagger API Documentation

---

## 🛠️ Technologies Used

- FastAPI
- Python
- SQLAlchemy
- MySQL
- JWT (python-jose)
- Passlib (bcrypt)
- Pydantic
- Uvicorn
- Python-dotenv

---

## 📂 Project Structure

```
shopkart_backend/
│
├── routers/
│   ├── auth.py
│   ├── users.py
│   ├── products.py
│   ├── categories.py
│   ├── cart.py
│   └── orders.py
│
├── main.py
├── database.py
├── models.py
├── schemas.py
├── security.py
├── jwt_handler.py
├── config.py
├── requirements.txt
├── .gitignore
└── README.md
```

---

## 🚀 How to Run

1. Clone the repository

```
git clone <repository-url>
```

2. Create a virtual environment

```
python -m venv venv
```

3. Activate the virtual environment

Windows

```
venv\Scripts\activate
```

Linux/Mac

```
source venv/bin/activate
```

4. Install dependencies

```
pip install -r requirements.txt
```

5. Create a `.env` file and configure your database credentials.

Example:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=shopkart
DB_USER=root
DB_PASSWORD=your_password
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

6. Start the server

```
uvicorn main:app --reload
```

7. Open Swagger Documentation

```
https://shopkart-b9ei.onrender.com
```

---

## 📌 API Modules

- Authentication
- Users
- Products
- Categories
- Cart
- Orders

---

## 📈 Future Improvements

- Product Images Upload
- Wishlist
- Payment Gateway Integration
- Email Verification
- Admin Dashboard
- Docker Support

---

## 👨‍💻 Author

**Jhansi Kola**
