import React, { useState } from "react";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import LoginModal from "./components/LoginModal";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  function goTo(nextPage) {
    setPage(nextPage);
    window.scrollTo(0, 0);
  }

  function openProduct(product) {
    setSelectedProduct(product);
    goTo("details");
  }

  function addToCart(product, qty) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { product, qty }];
    });
  }

  function updateQty(productId, newQty) {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, qty: newQty } : item))
    );
  }

  function removeItem(productId) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function handleOrderPlaced() {
    const newOrderId = "FC" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setCart([]);
    goTo("confirmation");
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div>
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        goTo={goTo}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => setUser(null)}
      />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(name) => {
            setUser(name);
            setShowLogin(false);
          }}
        />
      )}

      {page === "home" && (
        <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      )}

      {page === "home" && (
        <HomePage
          search={search}
          activeCategory={activeCategory}
          onOpen={openProduct}
          onAddToCart={addToCart}
        />
      )}

      {page === "details" && (
        <DetailsPage product={selectedProduct} goTo={goTo} onAddToCart={addToCart} />
      )}

      {page === "cart" && (
        <CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} goTo={goTo} />
      )}

      {page === "checkout" && (
        <CheckoutPage cart={cart} goTo={goTo} onOrderPlaced={handleOrderPlaced} />
      )}

      {page === "confirmation" && <ConfirmationPage orderId={orderId} goTo={goTo} />}

      <div className="footer">
        Flipcart Clone - Built for practice using React. Not affiliated with any real e-commerce brand.
      </div>
    </div>
  );
}
