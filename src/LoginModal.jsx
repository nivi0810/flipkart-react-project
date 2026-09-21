import React, { useState } from "react";

export default function LoginModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!emailOrPhone.trim()) {
      setError("Please enter your email or mobile number");
      return;
    }
    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    // This is a fake login - it accepts any valid-looking input.
    // There is no real backend or database checking these credentials.
    const displayName =
      mode === "signup" ? name : emailOrPhone.split("@")[0].split(/[0-9]/)[0] || "User";
    onLogin(displayName || "User");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-left">
          <h2>{mode === "login" ? "Login" : "Looks like you're new here!"}</h2>
          <p>
            {mode === "login"
              ? "Get access to your Orders, Wishlist and Recommendations"
              : "Sign up with your email or mobile number"}
          </p>
        </div>
        <div className="modal-right">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="text"
            placeholder="Enter Email/Mobile number"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="modal-error">{error}</p>}
          <p className="modal-note">
            This is a demo login for a practice project — no real account is created and nothing is sent anywhere.
          </p>
          <button className="modal-submit" onClick={handleSubmit}>
            {mode === "login" ? "Login" : "Continue"}
          </button>
          <p
            className="modal-switch"
            onClick={() => {
              setError("");
              setMode(mode === "login" ? "signup" : "login");
            }}
          >
            {mode === "login" ? "New to Flipcart? Create an account" : "Existing user? Log in"}
          </p>
        </div>
      </div>
    </div>
  );
}
