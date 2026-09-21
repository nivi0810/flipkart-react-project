import React, { useState } from "react";
import { formatRupees } from "../utils/format";

export default function DetailsPage({ product, goTo, onAddToCart }) {
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="page">
        <p>Product not found.</p>
        <button className="btn-secondary" onClick={() => goTo("home")}>Back to Home</button>
      </div>
    );
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="page">
      <div className="breadcrumb">
        <button onClick={() => goTo("home")}>Home</button> / {product.category} / {product.name}
      </div>
      <div className="details-wrap">
        <div className="details-thumb" style={{ background: product.color }}>
          {product.icon}
        </div>
        <div className="details-info">
          <h1>{product.name}</h1>
          <div>
            <span className="rating-pill">{product.rating} ★</span>
            <span style={{ color: "var(--muted)", fontSize: 13 }}>Category: {product.category}</span>
          </div>
          <div className="details-price">
            {formatRupees(product.price)}{" "}
            <span className="price-strike" style={{ fontSize: 15, marginLeft: 8 }}>
              {formatRupees(product.mrp)}
            </span>
            <span className="price-off" style={{ marginLeft: 8 }}>{discount}% off</span>
          </div>
          <p className="details-desc">{product.description}</p>

          <div className="qty-row">
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Quantity</span>
            <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <div className="details-actions">
            <button className="btn-secondary" onClick={() => onAddToCart(product, qty)}>
              ADD TO CART
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onAddToCart(product, qty);
                goTo("cart");
              }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
