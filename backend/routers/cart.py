from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Cart, Product
from schemas import CartCreate, CartResponse
from jwt_handler import get_current_user

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


@router.post("/", response_model=CartResponse)
def add_to_cart(
    cart: CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    product = db.query(Product).filter(
        Product.id == cart.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    new_cart = Cart(
        user_id=current_user.id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )

    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)

    return new_cart


@router.get("/", response_model=list[CartResponse])
def view_cart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return db.query(Cart).filter(
        Cart.user_id == current_user.id
    ).all()


@router.put("/{cart_id}", response_model=CartResponse)
def update_cart(
    cart_id: int,
    cart: CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    db_cart = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not db_cart:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db_cart.quantity = cart.quantity

    db.commit()
    db.refresh(db_cart)

    return db_cart


@router.delete("/{cart_id}")
def remove_from_cart(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    cart_item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)
    db.commit()

    return {
        "message": "Product removed from cart"
    }