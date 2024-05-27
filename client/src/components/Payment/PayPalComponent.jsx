// components/KlarnaComponent.jsx
import React, { useState } from 'react';
import '../Payment/Bank.css';

const KlarnaComponent = () => {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // Handle form submission logic here
  };

  return (
    <div className="klarna-form">
      <h2>Klarna Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name on Card:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default KlarnaComponent;
