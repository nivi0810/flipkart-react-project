import React from "react";
import { formatRupees } from "../utils/format";

export default function ProductCard({ product, onOpen, onAddToCart }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <div className="product-card" onClick={() => onOpen(product)}>
      <div className="product-thumb" style={{ background: product.color }}>
        {product.icon}
      </div>
      <p className="product-title">{product.name}</p>
      <div className="product-meta">
        <span className="rating-pill">{product.rating} ★</span>
        {product.category}
      </div>
      <div className="price-row">
        <span className="price">{formatRupees(product.price)}</span>
        <span className="price-strike">{formatRupees(product.mrp)}</span>
        <span className="price-off">{discount}% off</span>
      </div>
      <button
        className="add-cart-btn"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product, 1);
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
}
