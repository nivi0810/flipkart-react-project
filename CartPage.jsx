import React from "react";
import { formatRupees } from "../utils/format";

export default function CartPage({ cart, updateQty, removeItem, goTo }) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const totalMrp = cart.reduce((sum, item) => sum + item.product.mrp * item.qty, 0);
  const discount = totalMrp - subtotal;
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-cart">
          <div style={{ fontSize: 60 }}>🛒</div>
          <h2>Your cart is empty!</h2>
          <p style={{ color: "var(--muted)" }}>Add items to it now.</p>
          <button className="btn-secondary" onClick={() => goTo("home")}>Shop Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header">My Cart ({totalItems} items)</div>
          {cart.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <div className="cart-item-thumb" style={{ background: item.product.color }}>
                {item.product.icon}
              </div>
              <div className="cart-item-info">
                <p className="cart-item-title">{item.product.name}</p>
                <div className="cart-item-price">{formatRupees(item.product.price)}</div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => updateQty(item.product.id, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.product.id, item.qty + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.product.id)}>REMOVE</button>
              </div>
            </div>
          ))}
        </div>

        <div className="price-summary">
          <h3>PRICE DETAILS</h3>
          <div className="summary-row">
            <span>Price ({totalItems} items)</span>
            <span>{formatRupees(totalMrp)}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span style={{ color: "var(--green)" }}>- {formatRupees(discount)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span>{deliveryFee === 0 ? <span style={{ color: "var(--green)" }}>FREE</span> : formatRupees(deliveryFee)}</span>
          </div>
          <div className="summary-total">
            <span>Total Amount</span>
            <span>{formatRupees(subtotal + deliveryFee)}</span>
          </div>
          <button className="place-order-btn" onClick={() => goTo("checkout")}>PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
}
