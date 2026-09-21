import React, { useState } from "react";
import { formatRupees } from "../utils/format";

export default function CheckoutPage({ cart, goTo, onOrderPlaced }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [payment, setPayment] = useState("cod");
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = "Enter a valid 10 digit phone number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!/^[0-9]{6}$/.test(form.pincode)) newErrors.pincode = "Enter a valid 6 digit pincode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handlePlaceOrder() {
    if (validate()) {
      onOrderPlaced();
    }
  }

  return (
    <div className="page">
      <div className="checkout-layout">
        <div className="checkout-form">
          <h2>Delivery Address</h2>

          <div className="form-row-2">
            <div className="form-row">
              <label>Full Name</label>
              <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="form-row">
              <label>Phone Number</label>
              <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="10 digit number" />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <label>Address</label>
            <textarea rows="3" value={form.address} onChange={(e) => handleChange("address", e.target.value)}></textarea>
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="form-row-2">
            <div className="form-row">
              <label>City</label>
              <input value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
            <div className="form-row">
              <label>Pincode</label>
              <input value={form.pincode} onChange={(e) => handleChange("pincode", e.target.value)} placeholder="6 digit pincode" />
              {errors.pincode && <span className="field-error">{errors.pincode}</span>}
            </div>
          </div>

          <h2 style={{ marginTop: 24 }}>Payment Method</h2>
          <div className="payment-options">
            <label className="payment-option">
              <input type="radio" name="payment" checked={payment === "cod"} onChange={() => setPayment("cod")} />
              Cash on Delivery
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" checked={payment === "upi"} onChange={() => setPayment("upi")} />
              UPI
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" checked={payment === "card"} onChange={() => setPayment("card")} />
              Credit / Debit Card
            </label>
          </div>

          <button className="btn-primary" onClick={handlePlaceOrder}>CONFIRM ORDER</button>
        </div>

        <div className="price-summary">
          <h3>ORDER SUMMARY</h3>
          <div className="summary-row">
            <span>Items Total</span>
            <span>{formatRupees(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span>{deliveryFee === 0 ? <span style={{ color: "var(--green)" }}>FREE</span> : formatRupees(deliveryFee)}</span>
          </div>
          <div className="summary-total">
            <span>Total Payable</span>
            <span>{formatRupees(subtotal + deliveryFee)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
