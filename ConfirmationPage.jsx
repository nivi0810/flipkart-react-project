import React from "react";

export default function ConfirmationPage({ orderId, goTo }) {
  return (
    <div className="page">
      <div className="confirmation">
        <div className="tick">✓</div>
        <h2>Order placed successfully!</h2>
        <p style={{ color: "var(--muted)" }}>
          Your order ID is <strong>{orderId}</strong>. It will be delivered in 3-5 business days.
        </p>
        <button className="btn-secondary" onClick={() => goTo("home")} style={{ marginTop: 16 }}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
