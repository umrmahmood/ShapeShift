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
          <label htmlFor="name">Branch:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Branch Name'
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="expirationDate">Account Number:</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
            placeholder="IBAN"
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">Pin:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            required
            placeholder='Pin No:'
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default KlarnaComponent;
