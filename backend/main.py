from fastapi import FastAPI

from database import Base, engine

import models

from routers.auth import router as auth_router
from routers.products import router as product_router
from routers.categories import router as category_router
from routers.cart import router as cart_router
from routers.orders import router as order_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
# Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(auth_router)
app.include_router(category_router)
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(order_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to E-Commerce Backend API 🚀"
    }