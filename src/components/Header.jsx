import React, { useState } from "react";

export default function Header({ search, setSearch, cartCount, goTo, user, onLoginClick, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="header">
      <div className="logo" onClick={() => goTo("home")}>
        Flipcart
        <span>Explore Plus</span>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>🔍</button>
      </div>
      <div className="header-actions">
        {user ? (
          <div className="user-menu">
            <button className="user-name-btn" onClick={() => setShowDropdown((s) => !s)}>
              👤 {user}
            </button>
            {showDropdown && (
              <div className="user-dropdown">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={onLoginClick}>Login</button>
        )}
        <button className="cart-link" onClick={() => goTo("cart")}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
}
