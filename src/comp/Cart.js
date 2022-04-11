import React from "react"

export default function Cart({cart}) {
  const CART_BUBBLE = document.getElementById("cart-bubble");

  if (cart.length > 0) {
    CART_BUBBLE.classList.remove("hidden");
  } 

  return (
    <div className="cart-icon-container">
    <i className="bi bi-cart"></i>
    <span className="cart-length hidden" id="cart-bubble">{cart.length}</span>
    </div>
  )
}

