import React from "react";
import { CATEGORIES } from "../data/products";

export default function CategoryBar({ activeCategory, setActiveCategory }) {
  return (
    <div className="category-bar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={"category-item" + (cat === activeCategory ? " active" : "")}
          onClick={() => setActiveCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
