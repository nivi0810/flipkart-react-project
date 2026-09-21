import React, { useMemo } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomePage({ search, activeCategory, onOpen, onAddToCart }) {
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="page">
      <div className="product-grid">
        {filtered.length === 0 && (
          <p className="empty-msg">No products found. Try a different search or category.</p>
        )}
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}
